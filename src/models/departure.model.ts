export interface Departure {
  readonly scheduleId: string;
  readonly name: string;
  readonly time: Date;
  readonly destination: string;
  readonly trainNumber: string;
  readonly status: string | null;
  readonly platform: string | null;
  readonly color: string;
}
