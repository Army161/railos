export type HealthState = 'HEALTHY' | 'DEGRADED' | 'UNAVAILABLE' | 'UNCONFIGURED';

export interface HealthStatus {
  readonly state: HealthState;
  readonly checkedAt: string;
  readonly correlationId: string;
  readonly safeMessage?: string;
}

export interface WorkflowInput {
  readonly railosTransactionId: string;
  readonly workflowType: string;
  readonly payload: Readonly<Record<string, unknown>>;
  readonly correlationId: string;
}

export interface WorkflowReference {
  readonly externalId: string;
  readonly railosTransactionId: string;
}

export interface WorkflowStatus {
  readonly externalId: string;
  readonly state: 'PENDING' | 'RUNNING' | 'SUCCEEDED' | 'FAILED';
  readonly safeMessage?: string;
}

export interface EnterpriseOrchestrationAdapter {
  health(): Promise<HealthStatus>;
  submitWorkflow(input: WorkflowInput): Promise<WorkflowReference>;
  getWorkflow(id: string): Promise<WorkflowStatus>;
}

export interface CustodyAccount {
  readonly id: string;
  readonly displayName: string;
}

export interface CustodyPosition {
  readonly accountId: string;
  readonly assetId: string;
  readonly quantityMinorUnits: bigint;
  readonly observedAt: string;
}

export interface PledgeInstruction {
  readonly accountId: string;
  readonly assetId: string;
  readonly quantityMinorUnits: bigint;
  readonly correlationId: string;
}

export interface ReleaseInstruction extends PledgeInstruction {
  readonly pledgeReference: string;
}

export interface SettlementInstruction {
  readonly sourceAccountId: string;
  readonly destinationReference: string;
  readonly assetId: string;
  readonly amountMinorUnits: bigint;
  readonly correlationId: string;
}

export interface InstructionRef {
  readonly externalId: string;
  readonly state: 'ACCEPTED' | 'REJECTED' | 'PENDING';
}

export interface CustodyAdapter {
  health(): Promise<HealthStatus>;
  listAccounts(): Promise<readonly CustodyAccount[]>;
  getPositions(accountId: string): Promise<readonly CustodyPosition[]>;
  createPledge(input: PledgeInstruction): Promise<InstructionRef>;
  releasePledge(input: ReleaseInstruction): Promise<InstructionRef>;
  createSettlementInstruction(input: SettlementInstruction): Promise<InstructionRef>;
}
