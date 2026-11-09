import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { readHostingConfig } from "../build/hosting-config.mjs";

async function fixture(t) {
  const directory = await mkdtemp(join(tmpdir(), "taste-hosting-config-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return join(directory, "hosting.json");
}

test("allows missing generated hosting metadata for local builds", async (t) => {
  assert.deepEqual(readHostingConfig(await fixture(t)), {});
});

test("preserves configured local binding names", async (t) => {
  const path = await fixture(t);
  const bindings = { d1: "DB", r2: "MEDIA" };
  await writeFile(path, JSON.stringify(bindings));
  assert.deepEqual(readHostingConfig(path), bindings);
});

test("rejects malformed generated hosting metadata", async (t) => {
  const path = await fixture(t);
  await writeFile(path, "{ invalid JSON");
  assert.throws(() => readHostingConfig(path), SyntaxError);
});

test("preserves file errors other than missing generated metadata", async (t) => {
  const path = await fixture(t);
  assert.throws(() => readHostingConfig(dirname(path)), { code: "EISDIR" });
});
