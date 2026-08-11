export type IntegrationKind = 'XRPL' | 'KALEIDO' | 'CUSTODY';

export type EvidenceStatus = 'UNCONFIGURED' | 'CONNECTOR_READY' | 'PRODUCTION_DISABLED';

export interface IntegrationStatus {
  readonly integration: IntegrationKind;
  readonly status: EvidenceStatus;
  readonly displayLabel: string;
  readonly productionEnabled: false;
}

const unverifiedStatuses = [
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
] as const satisfies readonly IntegrationStatus[];

export function getIntegrationStatuses(): IntegrationStatus[] {
  return unverifiedStatuses.map((status) => ({ ...status }));
}
