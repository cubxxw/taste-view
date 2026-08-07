# Approved taste system

Status: run-calibrated
Version: 1

This file stores durable project taste, not one-run preferences. Promote a rule only after the user approves it or it succeeds across multiple surfaces.

## Design thesis

- Product character: decisive, cultured, inspectable
- Product mode: persuade with a real interactive proof surface
- One memorable idea: Taste is a verdict, not a vibe.
- Relationship between brand and product UI: the comparison and release mechanics are the brand

## Invariants

Use this format:

```text
Rule:
Reason:
Applies to:
Does not apply to:
Evidence:
Approved by:
```

## Typography

- Display: Geist Sans, tight but never oversized
- UI: Geist Sans
- Body: Geist Sans
- Numeric or code: Geist Mono
- Scale: fluid clamp system from 14px to 86px
- Line length: 62ch body maximum
- Tracking: tight display, normal body, restrained uppercase evidence labels

## Layout and density

- Grid: 12-column asymmetric desktop grid
- Spacing scale: 4, 8, 12, 20, 32, 52, 84, 132
- Container logic: 1480px maximum with 24-48px gutters
- Mobile transformation: strict single column, no preserved desktop asymmetry

## Color and material

- Semantic tokens: mineral surface, charcoal ink, signal-orange decision
- Border: currentColor at low opacity
- Radius: 2px across fields, panels, and buttons
- Shadow: none by default
- Background: one global mineral theme with related tints

## Interaction and motion

- Feedback: tactile button shift, clear focus, inline error, explicit completion
- Spatial continuity: analysis moves from source to candidates to verdict
- Duration/easing family: 180-700ms, cubic-bezier(0.16, 1, 0.3, 1)
- Reduced-motion behavior: instant state replacement, no sweep or reveal
- High-ambition invariant:
  - Rule: one hero evidence field may use 3D motion only when its formations are
    driven by real Compare, Compile, Release, analyzing, and verdict states.
  - Reason: the renderer should reveal the product mechanism rather than add a
    generic technology aesthetic.
  - Applies to: public product thesis and sample review.
  - Does not apply to: operational release controls or content sections.
  - Evidence: `design/decision-tree.md#d5-motion-escalation`.
  - Approved by: user request on 2026-08-07.

## Copy

- Vocabulary: evidence, verdict, compile, repair, release
- Sentence length: short and concrete
- CTA rule: one stable label per intent
- Error rule: explain the missing input and the next action

## Anti-patterns

- Generic patterns rejected: centered AI hero, three equal feature cards, fake terminal, screenshot wall
- Category clichés rejected: purple glow, mystical taste claims, unsupported score theater
- Approved intentional deviations: one uppercase hero label because it acts as category context

## Calibration set

| Reference ID | Scope | Approved score | Reason |
|---|---|---:|---|
