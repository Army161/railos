import { afterEach, describe, expect, it } from 'vitest';

import { buildApp } from './app.js';

const apps: Array<ReturnType<typeof buildApp>> = [];

afterEach(async () => {
  await Promise.all(apps.splice(0).map(async (app) => app.close()));
});

describe('RailOS API evidence boundary', () => {
  it('reports the application shell as healthy without claiming external health', async () => {
    const app = buildApp({ logger: false });
    apps.push(app);

    const response = await app.inject({ method: 'GET', url: '/health' });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ service: 'railos-api', status: 'healthy' });
  });

  it('exposes fail-closed integration states', async () => {
    const app = buildApp({ logger: false });
    apps.push(app);

    const response = await app.inject({ method: 'GET', url: '/v1/integrations/status' });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      integrations: [
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
      ],
    });
  });
});
