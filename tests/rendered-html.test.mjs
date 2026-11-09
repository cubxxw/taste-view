import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { gzipSync } from "node:zlib";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(import.meta.url);

async function render(t) {
  const configPath = new URL("../dist/server/wrangler.json", import.meta.url);
  const config = JSON.parse(await readFile(configPath, "utf8"));
  assert.equal(config.main, "index.js", "expected the actual built Worker entry");
  assert.equal(config.no_bundle, true, "test the precompiled production modules");
  assert.deepEqual(config.services ?? [], [], "additional Workers need their actual local configs");

  const stateRoot = await mkdtemp(join(tmpdir(), "taste-production-worker-"));
  let child;
  let closed = Promise.resolve();
  const signalOwnedChild = (signal) => {
    if (!child?.pid) return;
    try {
      if (process.platform === "win32") child.kill(signal);
      else process.kill(-child.pid, signal);
    } catch (error) {
      if (error.code !== "ESRCH") throw error;
    }
  };
  const waitForClose = async (milliseconds) => {
    let timer;
    try {
      return await Promise.race([
        closed.then(() => true),
        new Promise((resolve) => { timer = setTimeout(() => resolve(false), milliseconds); }),
      ]);
    } finally {
      clearTimeout(timer);
    }
  };
  t.after(async () => {
    try {
      if (child?.pid) {
        signalOwnedChild("SIGTERM");
        if (!await waitForClose(2000)) {
          signalOwnedChild("SIGKILL");
          assert.ok(await waitForClose(2000), "the owned Worker process did not stop");
        }
      }
    } finally {
      await rm(stateRoot, { recursive: true, force: true });
    }
  });

  const cliPath = join(dirname(require.resolve("wrangler/package.json")), "bin/wrangler.js");
  child = spawn(process.execPath, [
    cliPath, "dev", "--local", "--config", fileURLToPath(configPath),
    "--ip", "127.0.0.1", "--port", "0", "--inspector-port", "0",
    "--persist-to", join(stateRoot, "state"),
    "--show-interactive-dev-session=false", "--log-level", "warn",
  ], {
    cwd: projectRoot,
    detached: process.platform !== "win32",
    stdio: ["ignore", "pipe", "pipe", "ipc"],
    env: {
      PATH: process.env.PATH,
      SystemRoot: process.env.SystemRoot,
      CI: "true",
      NODE_ENV: "production",
      TMPDIR: stateRoot,
      XDG_CONFIG_HOME: join(stateRoot, "config"),
      XDG_CACHE_HOME: join(stateRoot, "cache"),
      WRANGLER_SEND_METRICS: "false",
      WRANGLER_LOG_PATH: join(stateRoot, "wrangler.log"),
      WRANGLER_REGISTRY_PATH: join(stateRoot, "registry"),
      MINIFLARE_REGISTRY_PATH: join(stateRoot, "miniflare-registry"),
      CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV: "false",
      X_LOCAL_EXPLORER: "false",
      X_LOCAL_OBSERVABILITY: "false",
    },
  });
  let output = "";
  const capture = (chunk) => { output = (output + chunk.toString()).slice(-8192); };
  child.stdout.on("data", capture);
  child.stderr.on("data", capture);
  closed = new Promise((resolve) => child.once("close", resolve));

  // Wrangler's own CLI forwards this ready event and its OS-assigned port.
  // https://github.com/cloudflare/workers-sdk/blob/wrangler%404.156.1/packages/wrangler/src/dev/start-dev.ts
  let startupTimer;
  try {
    const origin = await new Promise((resolve, reject) => {
      startupTimer = setTimeout(() => reject(new Error("Worker startup exceeded 30s")), 30000);
      child.once("error", reject);
      child.once("exit", (code, signal) => reject(new Error(`Worker exited before the request: ${code}/${signal}`)));
      child.on("message", (value) => {
        try {
          const message = typeof value === "string" ? JSON.parse(value) : value;
          if (message?.event !== "DEV_SERVER_READY") return;
          assert.equal(message.ip, "127.0.0.1");
          assert.ok(Number.isInteger(message.port) && message.port > 0 && message.port < 65536);
          resolve(`http://127.0.0.1:${message.port}/`);
        } catch (error) {
          reject(error);
        }
      });
    });
    clearTimeout(startupTimer);
    t.diagnostic(`actual local production Worker: ${origin}; dist/server/wrangler.json`);
    // One real response, including a failing status, reaches the original assertions.
    return await fetch(origin, {
      headers: { accept: "text/html" },
      redirect: "manual",
      credentials: "omit",
      signal: AbortSignal.timeout(5000),
    });
  } catch (error) {
    throw new Error(`Production Worker request failed. ${output}`, { cause: error });
  } finally {
    clearTimeout(startupTimer);
  }
}

test("server-renders the taste.view product thesis and release evidence", { timeout: 45000 }, async (t) => {
  const response = await render(t);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>taste\.view \| Taste is a verdict<\/title>/i);
  assert.match(html, /Make taste/);
  assert.match(html, /prove itself\./);
  assert.match(html, /Interactive sample review/);
  assert.match(html, /verdict-field/);
  assert.match(html, /verdict-field-canvas/);
  assert.match(html, /One loop\. No taste theater\./);
  assert.match(html, /A skill, not a sentence\./);
  assert.match(html, /Release Bar/);
  assert.match(html, /Commercial proof, without the fake beauty claim\./);
  assert.match(html, /pilot targets, not current performance/i);
  assert.match(html, /Skip to content/);
  assert.match(html, /aria-label="Primary navigation"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps interaction, accessibility, responsive, and deployment safeguards in source", async () => {
  const [
    page,
    lab,
    field,
    layout,
    css,
    packageJson,
    vercelJson,
    nextConfig,
  ] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/taste-lab.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/verdict-field.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../vercel.json", import.meta.url), "utf8"),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<main id="main">/);
  assert.match(page, /href="#main"/);
  assert.match(lab, /role="tablist"/);
  assert.match(lab, /role="tabpanel"/);
  assert.match(lab, /aria-selected=/);
  assert.match(lab, /aria-live="polite"/);
  assert.match(lab, /role="alert"/);
  assert.match(lab, /disabled=\{reviewState === "analyzing"\}/);
  assert.match(lab, /setStage\("view"\);\s+setReviewState\("analyzing"\)/);
  assert.match(lab, /event\.key === "ArrowRight"/);
  assert.match(lab, /event\.key === "ArrowLeft"/);
  assert.match(lab, /event\.key === "Home"/);
  assert.match(lab, /event\.key === "End"/);
  assert.match(lab, /taste:motion-state/);
  assert.match(field, /await import\("three"\)/);
  assert.match(field, /IntersectionObserver/);
  assert.match(field, /setAnimationLoop/);
  assert.match(field, /prefers-reduced-motion/);
  assert.match(field, /renderer\.dispose\(\)/);
  assert.match(field, /nodeGeometry\.dispose\(\)/);
  assert.match(field, /nodeMaterial\.dispose\(\)/);
  assert.match(field, /COMPACT_EVIDENCE_NODE_COUNT/);
  assert.match(layout, /<html lang="en" suppressHydrationWarning>/);
  assert.match(layout, /VERCEL_PROJECT_PRODUCTION_URL/);
  assert.match(layout, /metadataBase,/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /max-width:\s*767px/);
  assert.match(css, /forced-colors:\s*active/);
  assert.match(packageJson, /"three": "0\.185\.1"/);
  assert.match(JSON.parse(packageJson).dependencies.next, /^16\.\d+\.\d+$/);
  assert.match(packageJson, /"build:vercel": "next build"/);
  assert.match(vercelJson, /"framework": "nextjs"/);
  assert.match(vercelJson, /"buildCommand": "npm run build:vercel"/);
  assert.match(nextConfig, /tsconfigPath: "tsconfig\.vercel\.json"/);
  assert.doesNotMatch(nextConfig, /ignoreBuildErrors/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page + lab + field + layout, /[—–]/);
});

test("keeps the lazy three.js field inside its declared transfer budget", async (t) => {
  const clientRoot = new URL("../dist/client/", import.meta.url);
  const [manifest, referenceSources] = await Promise.all([
    readFile(new URL(".vite/manifest.json", clientRoot), "utf8").then(JSON.parse),
    readFile(new URL(".vite/vinext-client-reference-sources.json", clientRoot), "utf8").then(JSON.parse),
  ]);
  const entries = Object.entries(manifest);
  t.diagnostic(`actual client manifest: ${JSON.stringify(manifest)}`);
  const findUnique = (name, predicate) => {
    const matches = entries.filter(([key, chunk]) => predicate(key, chunk));
    assert.equal(matches.length, 1, `expected one unambiguous ${name} client chunk`);
    return matches[0];
  };
  const [threeKey, threeChunk] = findUnique("three.js", (key, chunk) =>
    key === "node_modules/three/build/three.module.js" || chunk.src === "node_modules/three/build/three.module.js");
  const [fieldKey, fieldChunk] = findUnique("verdict-field", (key, chunk) =>
    key === "app/verdict-field.tsx" || chunk.src === "app/verdict-field.tsx" || chunk.name === "verdict-field");
  const fieldReference = referenceSources["app/verdict-field.tsx"];
  assert.equal(typeof fieldReference, "string", "expected the real compiled client reference");
  const [referenceKey] = findUnique("verdict-field reference", (_key, chunk) => chunk.file === fieldReference);
  const staticClosure = (key, found = new Set()) => {
    if (found.has(key)) return found;
    const chunk = manifest[key];
    assert.ok(Object.hasOwn(manifest, key), `missing referenced client manifest entry ${key}`);
    found.add(key);
    for (const imported of chunk.imports ?? []) staticClosure(imported, found);
    return found;
  };
  assert.ok(staticClosure(referenceKey).has(fieldKey), "the registered field must load its real implementation");
  const fieldImports = staticClosure(fieldKey);
  assert.equal(threeChunk.isDynamicEntry, true, "expected a genuinely dynamic three.js entry");
  assert.ok(!fieldImports.has(threeKey), "three.js must remain outside the field's eager imports");
  assert.ok([...fieldImports].some((key) => manifest[key].dynamicImports?.includes(threeKey)),
    "the actual field must retain its dynamic three.js import");
  assert.notEqual(threeChunk.file, fieldChunk.file, "expected separate three.js and field chunks");
  for (const chunk of [threeChunk, fieldChunk]) {
    assert.match(chunk.file, /^_next\/static\/chunks\/[A-Za-z0-9._-]+\.js$/);
  }
  const [threeSource, fieldSource] = await Promise.all([
    readFile(new URL(threeChunk.file, clientRoot)),
    readFile(new URL(fieldChunk.file, clientRoot)),
  ]);

  assert.ok(threeSource.byteLength < 750 * 1024);
  assert.ok(gzipSync(threeSource).byteLength < 200 * 1024);
  assert.ok(fieldSource.byteLength < 12 * 1024);
  t.diagnostic(`actual lazy payload: ${JSON.stringify({ three: threeChunk.file, rawBytes: threeSource.byteLength,
    gzipBytes: gzipSync(threeSource).byteLength, field: fieldChunk.file, fieldBytes: fieldSource.byteLength })}`);
});
