# taste.view design decision tree

## D0 product invariant

- Visitor: AI Builder founders, design engineers, and product teams shipping an
  AI-generated website.
- Tension: the site works, but nobody trusts its taste or knows when iteration
  should stop.
- Understand: taste.view supplies references, comparison, code repair, and a
  falsifiable release decision.
- Feel: sharp judgment, not aesthetic theater.
- Do: run a site review, inspect the evidence, then install the local execution
  package.
- Unique product truth: the same system that proposes a design also has to
  produce browser evidence and pass a declared Release Bar.

## Cheap breadth scan

Six initial worlds were considered:

1. Reference observatory
2. Taste compiler
3. Design tribunal
4. Calibration lab
5. Evidence desk
6. Release foundry

`Reference observatory` was rejected because it collapses toward a better
inspiration gallery. `Calibration lab` and `evidence desk` were useful tones but
weak product architectures. `Release foundry` overemphasized production and hid
the reference intelligence. The two materially different survivors were Taste
Compiler and Design Tribunal.

## D1 brand theorem

### Branch A: Taste Compiler

- Theorem: taste becomes durable only when it compiles into an inspectable
  artifact.
- Metaphor: source material entering a compiler and leaving as a signed package.
- Spatial grammar: left-to-right transformation, narrow input rail, expanding
  artifact.
- Content priority: Taste IR, portability, installation, reproducibility.
- Signature mechanic: a brief transforms into a versioned Skill manifest.
- Anti-reference: no generic code terminal floating inside a dark gradient.

### Branch B: Design Tribunal

- Theorem: every design should earn a verdict before it earns a release.
- Metaphor: two candidates placed under evidence, with one decision and a repair
  order.
- Spatial grammar: asymmetric A/B field, visible loser, decisive signal color.
- Content priority: pairwise comparison, defects, browser proof, Release Bar.
- Signature mechanic: compare candidate compositions, reveal the causal verdict,
  then compile the winning repair.
- Anti-reference: no passive inspiration feed and no centered monochrome SaaS
  manifesto.

### Pairwise decision

| Criterion | Weight | Compiler | Tribunal | Reason |
|---|---:|---:|---:|---|
| Ownability | 25 | 1 | 2 | the A/B verdict is recognizable without the logo |
| Product truth | 25 | 1 | 2 | comparison and release are the differentiating mechanism |
| Five-second clarity | 15 | 1 | 2 | a winner/loser relationship explains the product faster |
| Structural distinction | 15 | 1 | 2 | the evidence field creates a page architecture, not a style |
| Emotional precision | 10 | 1 | 2 | judgment feels sharper than infrastructure |
| Feasibility | 5 | 2 | 2 | both can be implemented honestly |
| Accessibility/performance risk | 5 | 2 | 2 | neither requires heavy visual effects |

Winner: Design Tribunal.

Challenger retained: Taste Compiler becomes the second major section and the
portable output model.

Backtrack condition: if the A/B mechanism reads as a static comparison toy
instead of a real release workflow, move the compiler artifact into the hero.

## D2 architecture

### Branch B1: verdict first

1. Hero: live sample review with candidate A/B evidence.
2. Loop: retrieve, generate, compare, repair, verify.
3. Compile: show the durable Taste IR output.
4. Strategy: Greenfield, Rescue, Governed permissions.
5. Release: weakest-link gate and declared coverage.
6. Pilot: the four commercial targets.
7. Final action: review a site.

### Branch B2: reference first

1. Hero: current taste landscape.
2. Reference atlas.
3. Personal pairwise choices.
4. Taste profile.
5. Local Agent handoff.
6. Release proof.

Winner: B1. It demonstrates the paid outcome before explaining the corpus.

Challenger retained: B2 should become the later authenticated `View` product,
not the public landing-page journey.

## D3 visual prototypes

### Prototype A: black evidence room

- Near-black canvas, white typography, signal-orange verdict.
- Dense comparison field dominates the first viewport.
- Strength: dramatic and product-like.
- Failure: too close to the default dark AI-tool category and expensive to make
  calm across the whole page.

### Prototype B: daylight proof sheet

- Mineral off-white canvas, charcoal typography, signal-orange verdict.
- Large asymmetric headline paired with a working analysis surface.
- Strength: combines research credibility with a decisive product mechanism.
- Failure risk: without motion and meaningful interaction it can become a static
  editorial page.

Winner: B.

Motion requirement: motion communicates the path from input to analysis to
verdict. Hover-only decoration is excluded.

## D4 system

- Typeface: Geist Sans for product clarity, Geist Mono only for evidence and
  artifacts.
- Palette: mineral off-white, charcoal, one signal-orange accent.
- Shape: near-square 2px radius; buttons, fields, and panels follow the same
  system.
- Grid: 12 columns on desktop; every asymmetric composition collapses to one
  column below 768px.
- Theme: system light/dark tokens at the page root; no section theme inversion.
- Motion: opacity/transform only; analysis sweep and state transitions respect
  reduced motion.
- Imagery: the hero visual is the real interactive review component. No
  third-party screenshots or fake dashboard image.

## D5 motion escalation

The static daylight proof sheet is already coherent, so one high-ambition motion
moment is authorized in the hero. Four lower-scope motion directions were
compared:

1. Particle nebula
   - Impact: high.
   - Failure: interchangeable AI decoration with no relation to review.
2. Wireframe terrain
   - Impact: high.
   - Failure: implies exploration, not judgment or release.
3. Verdict gravity field
   - Impact: high.
   - Mechanism: candidate evidence nodes begin as competing groups, scatter
     during analysis, then converge around the surviving verdict.
   - Product fit: the same field responds to Compare, Compile, Release, and the
     form's analyzing/success states.
4. Kinetic headline
   - Impact: medium.
   - Failure: moves the brand claim but does not prove product behavior.

Winner: Verdict gravity field.

The field is ambient evidence, not a required control. Pointer movement may
disturb its camera, but all essential state remains textual in the sample review.
The renderer must:

- load only when the hero approaches the viewport;
- use one instanced draw call for candidate nodes;
- cap pixel ratio at 1.5 on desktop and 1 on compact screens;
- reduce node count on compact screens;
- pause offscreen and when the document is hidden;
- dispose renderer, geometry, and material resources on unmount;
- retain a static CSS evidence field when WebGL is unavailable;
- skip WebGL entirely when reduced motion is requested.

Performance budget:

- no textures, models, lights, post-processing, shadows, or audio;
- no more than four draw calls per frame;
- dynamic three.js chunk under 750 KiB before compression and under 200 KB
  with gzip;
- the page remains operable before and without the renderer.

## Reference mechanisms

- Cosmos: preserve a large quiet field around one primary act of discovery.
- Mobbin MCP: name the Agent's missing capability in direct language.
- Same Energy: search starts with an object, not a taxonomy lecture.
- Are.na: make research structure feel trustworthy without excessive polish.

Only mechanisms transfer. No reference's trademark, composition, screenshots,
copy, or visual identity is copied.
