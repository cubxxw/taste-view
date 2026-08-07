# taste.view

`taste.view` is the web intelligence and compilation surface for TOP1 DESIGN.
It shows the product wedge: compare candidates, compile a portable Taste IR,
and refuse release when required evidence is missing.

This repository is a dogfood product prototype, not a claim that the commercial
pilot targets have already been achieved.

## Product thesis

- The website understands and compiles taste.
- The local TOP1 DESIGN skill reads and modifies private repositories.
- Broad candidate exploration happens in isolation.
- Only a verified, reversible winner reaches the Release Bar.

The interactive hero demonstrates three concrete outputs: a pairwise verdict,
an inspectable taste profile, and a binary release decision.

## Run locally

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Then open the URL printed by the development server.

## Verify

```bash
npm run lint
npm test
npm run build:vercel
```

## Deploy to Vercel

Import the repository into Vercel. The checked-in `vercel.json` selects the
Next.js framework and runs the independent `npm run build:vercel` path. The
existing vinext commands remain available for the Cloudflare-compatible worker.

The repository also includes:

- `.top1-design/GOAL.md`: product goal and declared Release Bar;
- `.top1-design/TASTE.md`: durable visual and interaction rules;
- `design/decision-tree.md`: divergent concepts and recorded decisions;
- `evidence/2026-08-07-release-review.md`: current browser and build evidence;
- `evaluation.json`: project-local promotion score;
- `release-manifest.json`: binary Release Bar inputs.

Score 95 is a promotion threshold for deeper review. It is not proof of
objective beauty or a commercial success percentage.

## Implementation

The site uses React 19, Tailwind CSS 4, vinext, and a Cloudflare-compatible
worker build. The independent Next.js path provides the Vercel deployment.
