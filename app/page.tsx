import { TasteLab } from "./taste-lab";
import { VerdictField } from "./verdict-field";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a className="wordmark" href="#main" aria-label="taste.view home">
          <span className="wordmark-mark" aria-hidden="true">
            <i />
            <i />
          </span>
          taste.view
        </a>
        <nav aria-label="Primary navigation">
          <a href="#view">View</a>
          <a href="#compile">Compile</a>
          <a href="#release">Release</a>
        </nav>
        <a className="header-action" href="#view">
          Review a site
        </a>
      </header>

      <main id="main">
        <section className="hero" id="view">
          <VerdictField />
          <div className="hero-copy">
            <p className="hero-label">Taste engine for AI builders</p>
            <h1>
              Make taste
              <br />
              prove itself.
            </h1>
            <p className="hero-deck">
              Compare real references, rebuild in isolation, and release only
              what survives the evidence.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#view">
                Review a site
              </a>
              <a className="text-action" href="#method">
                See the method
              </a>
            </div>
          </div>
          <TasteLab />
        </section>

        <section className="method-section" id="method">
          <div className="method-heading">
            <h2>One loop. No taste theater.</h2>
            <p>
              The system searches widely, lands carefully, and records why the
              winner deserved to survive.
            </p>
          </div>
          <ol className="method-rail">
            <li>
              <span>01</span>
              <strong>Read the product</strong>
              <p>Audience, task, truth, constraints.</p>
            </li>
            <li>
              <span>02</span>
              <strong>Acquire taste</strong>
              <p>Relevant mechanisms, plus anti-references.</p>
            </li>
            <li>
              <span>03</span>
              <strong>Run the tournament</strong>
              <p>Distinct candidates, blinded pairwise choice.</p>
            </li>
            <li>
              <span>04</span>
              <strong>Repair the winner</strong>
              <p>One defect class per reversible patch.</p>
            </li>
            <li>
              <span>05</span>
              <strong>Prove release</strong>
              <p>Browser evidence and weakest-link gates.</p>
            </li>
          </ol>
        </section>

        <section className="compile-section" id="compile">
          <div className="compile-copy">
            <h2>A skill, not a sentence.</h2>
            <p>
              The website compiles context into a versioned Taste IR. Your local
              Agent receives rules, references, authority, and a stopping
              condition it can inspect.
            </p>
            <div className="compile-path" aria-label="Taste compilation outputs">
              <span>Brief + evidence</span>
              <span>Taste IR</span>
              <span>Skill / MCP / CI</span>
            </div>
          </div>
          <div className="manifest-window">
            <div className="manifest-title">
              <span>taste-ir.json</span>
              <span>pinned and portable</span>
            </div>
            <pre>
              <code>{`{
  "product_truth": "release requires evidence",
  "strategy": "greenfield",
  "taste": {
    "prefer": ["clear hierarchy", "owned mechanism"],
    "reject": ["template mimicry", "score theater"]
  },
  "authority": {
    "change_level": 5,
    "production_branch": false
  },
  "stop_when": "release_bar_met"
}`}</code>
            </pre>
          </div>
        </section>

        <section className="strategy-section">
          <div className="strategy-intro">
            <h2>Same engine. Different authority.</h2>
            <p>
              Maturity changes the size of the patch, not the standard of
              evidence.
            </p>
          </div>
          <div className="strategy-list">
            <article>
              <div>
                <span>Greenfield</span>
                <span>Level 5</span>
              </div>
              <h3>Find the direction.</h3>
              <p>Generate broad visual worlds, then implement one winner.</p>
            </article>
            <article>
              <div>
                <span>Rescue</span>
                <span>Level 2-3</span>
              </div>
              <h3>Fix the shared cause.</h3>
              <p>Preserve product structure. Repair components and tokens.</p>
            </article>
            <article>
              <div>
                <span>Governed</span>
                <span>Level 0-1</span>
              </div>
              <h3>Prevent the drift.</h3>
              <p>Audit, localize, and propose a small reversible patch.</p>
            </article>
          </div>
        </section>

        <section className="release-section" id="release">
          <div className="release-statement">
            <p>Release Bar</p>
            <h2>A binary decision with visible evidence.</h2>
            <p>
              No parent average can hide a broken mobile flow, keyboard trap, or
              false claim.
            </p>
          </div>
          <div className="release-evidence">
            <div className="release-number">
              <span>Candidate state</span>
              <strong>BLOCKED</strong>
              <p>Missing mobile error recovery</p>
            </div>
            <div className="release-matrix">
              {[
                ["Visual", "pass"],
                ["Interaction", "pass"],
                ["Responsive", "blocked"],
                ["Accessibility", "pass"],
                ["Functional", "pass"],
              ].map(([label, state]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong data-state={state}>{state}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pilot-section">
          <div className="pilot-copy">
            <p>Product validation targets</p>
            <h2>Commercial proof, without the fake beauty claim.</h2>
            <p>
              These are pilot targets, not current performance and not a promise
              that 95% of sites become top-tier design.
            </p>
          </div>
          <div className="pilot-metrics">
            <article>
              <strong>95%</strong>
              <p>No severe visual or interaction defect</p>
            </article>
            <article>
              <strong>90%</strong>
              <p>Eligible projects reach Release Bar</p>
            </article>
            <article>
              <strong>70%</strong>
              <p>Blind preference for the Taste Engine version</p>
            </article>
            <article>
              <strong>50%</strong>
              <p>Reduction in matched human edit time</p>
            </article>
          </div>
        </section>

        <section className="closing-section">
          <h2>Let the machine explore. Make the winner prove itself.</h2>
          <a className="primary-action" href="#view">
            Review a site
          </a>
        </section>
      </main>

      <footer>
        <a className="wordmark" href="#main" aria-label="taste.view home">
          <span className="wordmark-mark" aria-hidden="true">
            <i />
            <i />
          </span>
          taste.view
        </a>
        <p>Open method. Local execution. Evidence before release.</p>
        <a href="https://github.com/cubxxw/top1-design">GitHub</a>
      </footer>
    </>
  );
}
