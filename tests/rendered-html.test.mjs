import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import { gzipSync } from "node:zlib";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the taste.view product thesis and release evidence", async () => {
  const response = await render();
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
  assert.match(packageJson, /"next": "16\.2\.6"/);
  assert.match(packageJson, /"build:vercel": "next build"/);
  assert.match(vercelJson, /"framework": "nextjs"/);
  assert.match(vercelJson, /"buildCommand": "npm run build:vercel"/);
  assert.match(nextConfig, /tsconfigPath: "tsconfig\.vercel\.json"/);
  assert.doesNotMatch(nextConfig, /ignoreBuildErrors/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page + lab + field + layout, /[—–]/);
});

test("keeps the lazy three.js field inside its declared transfer budget", async () => {
  const chunkRoot = new URL("../dist/client/_next/static/chunks/", import.meta.url);
  const files = await readdir(chunkRoot);
  const threeChunk = files.find((name) => /^three\.module-.+\.js$/.test(name));
  const fieldChunk = files.find((name) => /^verdict-field-.+\.js$/.test(name));

  assert.ok(threeChunk, "expected a separate lazy three.js chunk");
  assert.ok(fieldChunk, "expected a separate verdict-field component chunk");

  const [threeSource, fieldSource] = await Promise.all([
    readFile(new URL(threeChunk, chunkRoot)),
    readFile(new URL(fieldChunk, chunkRoot)),
  ]);

  assert.ok(threeSource.byteLength < 750 * 1024);
  assert.ok(gzipSync(threeSource).byteLength < 200 * 1024);
  assert.ok(fieldSource.byteLength < 12 * 1024);
});
