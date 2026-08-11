import { describe, expect, it } from 'vitest';

import { getIntegrationStatuses } from './integration-status.js';

describe('integration evidence status', () => {
  it('fails closed when no external integration has verified evidence', () => {
    expect(getIntegrationStatuses()).toEqual([
      {
        integration: 'XRPL',
        status: 'UNCONFIGURED',
        displayLabel: 'XRPL TESTNET — UNCONFIGURED',
        productionEnabled: false,
      },
      {
        integration: 'KALEIDO',
        status: 'CONNECTOR_READY',
        displayLabel: 'KALEIDO — CONNECTOR READY',
        productionEnabled: false,
      },
      {
        integration: 'CUSTODY',
        status: 'PRODUCTION_DISABLED',
        displayLabel: 'BNY / CUSTODY — PRODUCTION DISABLED',
        productionEnabled: false,
      },
    ]);
  });
});
