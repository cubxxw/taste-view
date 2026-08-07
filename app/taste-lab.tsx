"use client";

import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useId,
  useState,
} from "react";

type Stage = "view" | "compile" | "release";
type ReviewState = "idle" | "analyzing" | "success" | "error";

const STAGES: Array<{ id: Stage; label: string }> = [
  { id: "view", label: "Compare" },
  { id: "compile", label: "Compile" },
  { id: "release", label: "Release" },
];

export function TasteLab() {
  const [stage, setStage] = useState<Stage>("view");
  const [url, setUrl] = useState("https://your-product.example");
  const [reviewState, setReviewState] = useState<ReviewState>("idle");
  const fieldId = useId();

  useEffect(() => {
    if (reviewState !== "analyzing") return;
    const timer = window.setTimeout(() => {
      setReviewState("success");
      setStage("view");
    }, 900);
    return () => window.clearTimeout(timer);
  }, [reviewState]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("taste:motion-state", {
        detail: { reviewState, stage },
      }),
    );
  }, [reviewState, stage]);

  function runReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!url.trim()) {
      setReviewState("error");
      return;
    }
    setStage("view");
    setReviewState("analyzing");
  }

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, current: Stage) {
    const currentIndex = STAGES.findIndex((item) => item.id === current);
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % STAGES.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + STAGES.length) % STAGES.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = STAGES.length - 1;
    }

    if (nextIndex === null) return;
    event.preventDefault();
    const nextStage = STAGES[nextIndex].id;
    setStage(nextStage);
    document.getElementById(`tab-${nextStage}`)?.focus();
  }

  return (
    <section className="taste-lab" aria-label="Interactive sample review">
      <div className="lab-topline">
        <span>Sample analysis</span>
        <span aria-live="polite">
          {reviewState === "analyzing"
            ? "Reading product and viewport"
            : reviewState === "success"
              ? "Verdict ready"
              : "Local evidence only"}
        </span>
      </div>

      <form className="review-form" onSubmit={runReview} noValidate>
        <label htmlFor={fieldId}>Website URL</label>
        <div className="review-input-row">
          <input
            id={fieldId}
            type="url"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value);
              if (reviewState === "error") setReviewState("idle");
            }}
            aria-describedby={`${fieldId}-help ${fieldId}-error`}
          />
          <button type="submit" disabled={reviewState === "analyzing"}>
            {reviewState === "analyzing" ? "Reviewing" : "Run demo"}
          </button>
        </div>
        <span id={`${fieldId}-help`} className="field-help">
          Demo data stays in this page.
        </span>
        <span id={`${fieldId}-error`} className="field-error" role="alert">
          {reviewState === "error" ? "Enter a website URL to run the review." : ""}
        </span>
      </form>

      <div className="lab-tabs" role="tablist" aria-label="Review stages">
        {STAGES.map((item) => (
          <button
            key={item.id}
            id={`tab-${item.id}`}
            type="button"
            role="tab"
            aria-selected={stage === item.id}
            aria-controls={`panel-${item.id}`}
            tabIndex={stage === item.id ? 0 : -1}
            onClick={() => setStage(item.id)}
            onKeyDown={(event) => moveTab(event, item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        id={`panel-${stage}`}
        role="tabpanel"
        aria-labelledby={`tab-${stage}`}
        className={`lab-panel ${reviewState === "analyzing" ? "is-analyzing" : ""}`}
      >
        {stage === "view" ? <ComparePanel /> : null}
        {stage === "compile" ? <CompilePanel /> : null}
        {stage === "release" ? <ReleasePanel /> : null}
      </div>
    </section>
  );
}

function ComparePanel() {
  return (
    <div className="compare-panel">
      <article className="candidate candidate-a">
        <div className="candidate-heading">
          <span>Candidate A</span>
          <strong>Polished default</strong>
        </div>
        <div className="composition-map map-a" aria-label="Centered composition map">
          <span />
          <span />
          <span />
          <span />
        </div>
        <p>Clear, but interchangeable after the logo is removed.</p>
      </article>
      <article className="candidate candidate-b">
        <div className="candidate-heading">
          <span>Candidate B</span>
          <strong>Evidence-led</strong>
        </div>
        <div className="composition-map map-b" aria-label="Asymmetric composition map">
          <span />
          <span />
          <span />
          <span />
        </div>
        <p>Wins on product truth, hierarchy, and recall.</p>
      </article>
      <aside className="verdict">
        <span>Verdict</span>
        <strong>B survives.</strong>
        <p>Keep the asymmetry. Repair mobile density before release.</p>
      </aside>
    </div>
  );
}

function CompilePanel() {
  return (
    <div className="compile-panel">
      <div className="artifact-heading">
        <span>taste-profile.yaml</span>
        <span>Inspectable output</span>
      </div>
      <pre>
        <code>{`product_mode: persuade
strategy: greenfield
thesis: "evidence before ornament"
keep:
  - asymmetric decision field
  - product mechanism in hero
reject:
  - generic AI gradients
  - unsupported quality claims
release_bar:
  viewports: [desktop, mobile]
  gates: [functional, responsive, accessibility]`}</code>
      </pre>
    </div>
  );
}

function ReleasePanel() {
  const gates = [
    ["Primary flow", "pass"],
    ["Keyboard and focus", "pass"],
    ["Mobile composition", "repair"],
    ["Rollback boundary", "pass"],
  ];
  return (
    <div className="release-panel">
      <div className="release-summary">
        <span>Current decision</span>
        <strong>Not releasable</strong>
        <p>One severe responsive defect blocks the candidate.</p>
      </div>
      <div className="gate-list" aria-label="Sample release gates">
        {gates.map(([label, status]) => (
          <div key={label} className="gate-row">
            <span>{label}</span>
            <strong data-status={status}>{status}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
