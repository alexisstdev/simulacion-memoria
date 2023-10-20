export interface Process {
  id: string;
  size: number;
  name: string;
  color: Color;
}

export interface Partition {
  id: number;
  size: number;
  process: Process | null;
  available: number;
}

export interface Memory {
  size: number;
  available: number;
  partitions: Partition[];
}
