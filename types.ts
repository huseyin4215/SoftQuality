
export enum TestStatus {
  PASSED = 'PASSED',
  FAILED = 'FAILED',
  SKIPPED = 'SKIPPED',
  RUNNING = 'RUNNING'
}

export interface TestCase {
  id: string;
  name: string;
  type: 'API' | 'UI' | 'Integration';
  status: TestStatus;
  duration: number; // ms cinsinden
  timestamp: string;
  failureReason?: string;
}

export interface TestSuite {
  name: string;
  total: number;
  passed: number;
  failed: number;
  skipped: number;
}
