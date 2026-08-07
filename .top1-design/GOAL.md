# Design goal contract

Status: active
Version: 1

## User and context

- Target user: AI Builder founders, design engineers, and product teams
- Situation: an AI-generated website works but still feels generic or unsafe to release
- Existing knowledge: understands websites and Agents; may not be a designer
- Device and environment: desktop for review, mobile for approval and comparison

## Job to be done

- When: an AI Builder has produced a runnable site
- I want to: compare, repair, and verify it without directing every intermediate edit
- So I can: ship a stronger website with inspectable evidence and a reversible patch

## Primary outcome

- Primary decision or action: run a website review
- User success signal: understands why one candidate wins and what blocks release
- Business success signal: the matched pilot cohort meets all four product targets
- Measurement window: one review run and a predeclared pilot cohort

## Product truth

- Promise: every candidate must earn a release decision with browser evidence
- Evidence that supports it: score report, A/B record, defect ledger, Release Bar
- Claims that must not be made: objective beauty, universal repository mutation, current pilot success
- Real product behavior that must be shown: analysis input, pairwise verdict, Taste IR, release gates

## Experience direction

- Mode: persuade
- Emotional target: sharp confidence without aesthetic theater
- Desired three-word character: decisive, cultured, inspectable
- Forbidden three-word character: glossy, generic, mystical
- One memorable idea: Taste is a verdict, not a vibe.

## Scope

- Project stage: early
- Operating mode: greenfield
- Adapter status: supported React/Tailwind
- Maximum authorized change level: 5
- Required surfaces: landing page and interactive sample review
- Required viewports: 1440×900 and 390×844
- Required states: default, focus, analyzing, error, success
- Required motion states: rest, Compare, Compile, Release, analyzing,
  completion, offscreen pause, reduced motion
- Required accessibility methods: automated semantics/contrast and keyboard replay
- Primary flow: enter URL → run sample review → inspect verdict → inspect release method
- Minimum scope depth: 4
- Promotion threshold: 95

The promotion threshold is not the Release Bar and is not an objective aesthetic
success percentage. Declare the binary Release Bar coverage in the active run's
`RELEASE_MANIFEST.json`.

## Hard gates

- functional
- truth
- accessibility
- responsive
- states
- motion_safety
- performance

Add `seo` only for an SEO-facing surface.

## Autonomy

Agent may:

- inspect and capture the scoped project;
- create local branches and reversible patches;
- run tests and write proposal artifacts.

Agent must ask before:

- changing factual product claims;
- publishing or deploying;
- enabling analytics or tracking;
- purchasing services;
- deleting data;
- changing the product workflow beyond the approved goal.

## Release Bar

- Required visual scopes: hero, analysis lab, compiler, strategy, release, pilot
- Required interaction states: default, focus, analyzing, error, success
- Required motion evidence: rest, stage change, analysis midpoint, completion,
  compact mode, offscreen pause, and reduced-motion fallback
- Required responsive viewports: desktop and mobile
- Required accessibility methods: automated and keyboard
- Required functional flows: sample review and stage tabs
- Maximum permitted unresolved severity: moderate
- Tests: build, rendered HTML, lint, browser flow
- Blast-radius review: all changes remain inside examples/taste-view
- Rollback mechanism: isolated nested repository and saved source version

## Acceptance scenarios

### Scenario 1

Given:

The visitor is viewing the default Compare state.

When:

They move between Compare, Compile, and Release, then run a review.

Then:

The evidence field changes spatial grammar with the selected stage, scatters
during analysis, and converges when the verdict is ready.

Quality expectation:

The motion explains state without obscuring copy or changing layout. The same
form, status text, and tabs remain usable before, during, and after motion.

Evidence required:

Desktop and compact before/midpoint/after browser evidence, runtime draw-call
measurement, console inspection, and reduced-motion replay.

### Scenario 2

Given:

The visitor requests reduced motion or WebGL is unavailable.

When:

The hero enters the viewport.

Then:

No WebGL evidence nodes are created and a static CSS evidence field remains.

Quality expectation:

No product meaning, action, focus state, or status announcement depends on the
animated renderer.

Evidence required:

Emulated reduced-motion result, source cleanup test, and server-rendered static
fallback.
