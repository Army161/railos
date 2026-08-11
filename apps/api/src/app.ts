import Fastify, { type FastifyServerOptions } from 'fastify';

import { getIntegrationStatuses } from '@railos/contracts';

export function buildApp(options: FastifyServerOptions = {}) {
  const app = Fastify(options);

  app.get('/health', () => ({
    service: 'railos-api',
    status: 'healthy',
  }));

  app.get('/v1/integrations/status', () => ({
    integrations: getIntegrationStatuses(),
  }));

  return app;
}
