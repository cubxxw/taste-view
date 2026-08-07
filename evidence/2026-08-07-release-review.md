# taste.view release review

Run ID: `taste-view-2026-08-07`

This is project-local evidence for the current source state. It does not verify
the four commercial cohort targets and does not prove objective aesthetic
quality.

## Visual

- Desktop first view reviewed at 1710 × 971 in the in-app Chromium browser.
- Mobile first view reviewed at 390 × 844 in the same browser.
- The hero keeps a two-line headline on both viewports.
- The interactive review surface is visible without relying on a product
  screenshot or decorative device mockup.
- Full-page review confirmed a continuous mineral, charcoal, and signal-orange
  system across method, compiler, strategy, release, pilot, and closing scopes.
- No raw third-party screenshots are stored in the repository.

## Interaction and states

- URL input and `Run demo` form are reachable by keyboard.
- Empty input produces the inline alert
  `Enter a website URL to run the review.`
- A valid demo URL enters the analyzing state and resolves to
  `Verdict ready`.
- Compare, Compile, and Release tabs reveal their matching panels.
- A discovered keyboard defect in the tab interface was repaired. ArrowLeft,
  ArrowRight, Home, and End now move focus and selection through the tabs.
- Browser replay confirmed ArrowRight moves selection and focus from Compare to
  Compile and exposes `taste-profile.yaml`.
- Compare, Compile, and Release dispatch distinct spatial grammars to the hero
  evidence field.
- The analyzing state scatters the evidence nodes and the success state
  converges them around the verdict while the live region changes from
  `Reading product and viewport` to `Verdict ready`.
- Motion review found and fixed a state synchronization defect: starting a new
  review from Release now immediately returns the panel to Compare.

## Motion and WebGL

- three.js version `0.185.1` is pinned and loaded through a client-only dynamic
  import.
- Desktop runtime created 48 instanced evidence nodes, used three draw calls,
  and rendered 588 triangles per sampled frame.
- Compact runtime at 390 × 844 created 24 evidence nodes.
- Browser console inspection after initialization and stage transitions returned
  no errors or warnings.
- The field responds to pointer position without capturing pointer events or
  becoming a required control.
- Intersection and document-visibility observers pause the animation loop when
  the hero is offscreen or the document is hidden.
- With `prefers-reduced-motion: reduce` emulated before navigation, the field
  reported `renderer=static`, created no WebGL node count, kept canvas opacity at
  zero, and kept the CSS fallback at opacity `0.22`.
- The generated three.js chunk is 724,459 bytes before compression and 182,609
  bytes with gzip. The product-specific field controller is approximately 6 KB.
- No textures, remote models, post-processing, lights, shadows, or audio are
  used.

## Responsive

- Browser measurement returned no horizontal overflow at 1710 × 971.
- Browser measurement returned no horizontal overflow at 390 × 844.
- Navigation is intentionally reduced on mobile while the primary review action
  remains available.
- The candidate comparison converts to a single-column reading order on mobile.

## Accessibility

- `eslint-plugin-jsx-a11y` passes with zero errors.
- The page has one `main`, one `h1`, a skip link, named navigation, a visible
  input label, polite status announcements, and an alert region.
- Tabs use the tablist, tab, and tabpanel pattern with linked IDs, controlled
  panels, selected state, and keyboard movement.
- Focus tokens provide at least 5.21:1 contrast in the light theme and 8.57:1
  in the dark theme.
- Normal text token pairs are at least 5.00:1 in the light theme and 7.46:1 in
  the dark theme. Accent text pairs are at least 5.08:1 and 6.32:1.
- Reduced-motion and forced-colors adaptations are present.

## Functional and build

- `npm run lint` passes.
- `npm run build` completes a production worker build.
- `node --test tests/rendered-html.test.mjs` passes two tests.
- Server-rendered HTML returns status 200 and includes product thesis, review
  UI, Release Bar, truth boundary, metadata, and accessibility landmarks.
- Client-side review state, error recovery, success state, and tab switching
  were replayed in the browser.
- The review component is approximately 5 KB and the product-specific WebGL
  controller is approximately 6 KB before compression. The social card is
  metadata-only and is not rendered in the page.

## Change control

- All product changes are confined to this isolated repository.
- No production branch, external data, analytics, paid service, or user account
  was modified.
- The source is reviewable through Git and can be reverted at file level.
- Publishing remains a separate hosting action.

## Known limits

- The sample review uses local deterministic demo state; it does not yet crawl
  an arbitrary website or modify a connected repository.
- Contrast evidence covers declared color tokens, not every possible
  user-supplied value.
- No independent blind preference cohort has evaluated this direction yet.
- Production performance after remote deployment is not measured here.
