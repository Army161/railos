import { getIntegrationStatuses } from '@railos/contracts';

const capabilities = [
  'Deterministic policy evaluation',
  'Precision-safe collateral calculations',
  'Policy-gated settlement routing',
  'Reconciliation and append-only audit history',
];

export default function CommandCenter() {
  const statuses = getIntegrationStatuses();

  return (
    <main>
      <header className="hero">
        <div>
          <p className="eyebrow">INVESTOR PROTOTYPE · NON-CUSTODIAL</p>
          <h1>RailOS Command Center</h1>
          <p className="lede">
            The control plane that determines whether an institutional-style transaction is
            permitted, how collateral is treated, and which approved rail may execute it.
          </p>
        </div>
        <div className="milestone">
          <span>Current milestone</span>
          <strong>00 · FOUNDATION</strong>
        </div>
      </header>

      <section aria-labelledby="integration-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">EVIDENCE BOUNDARY</p>
            <h2 id="integration-heading">Integration status</h2>
          </div>
          <p>No production connectivity is implied.</p>
        </div>
        <div className="status-grid">
          {statuses.map((status) => (
            <article className="status-card" key={status.integration}>
              <span className={`dot dot-${status.status.toLowerCase().replace('_', '-')}`} />
              <p>{status.integration}</p>
              <h3>{status.displayLabel}</h3>
              <small>Production enabled: NO</small>
            </article>
          ))}
        </div>
      </section>

      <section className="capability-panel" aria-labelledby="capability-heading">
        <div>
          <p className="eyebrow">V1 PROOF TARGET</p>
          <h2 id="capability-heading">One traceable settlement path</h2>
        </div>
        <ol>
          {capabilities.map((capability, index) => (
            <li key={capability}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {capability}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
