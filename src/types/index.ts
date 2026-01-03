// Raw CSV data types
export interface AttendanceRecord {
  StudentID: string;
  AttendancePercentage: number;
}

export interface AssessmentRecord {
  StudentID: string;
  TestScore1: number;
  TestScore2: number;
  TestScore3: number;
}

export interface AttemptsRecord {
  StudentID: string;
  AttemptsUsed: number;
}

// Merged student profile
export interface StudentProfile {
  studentId: string;
  attendance: number;
  testScores: number[];
  averageScore: number;
  attemptsUsed: number;
}

// Risk assessment result
export interface RiskFlag {
  rule: string;
  points: number;
  description: string;
}

export interface StudentRiskProfile extends StudentProfile {
  riskScore: number;
  riskLevel: 'safe' | 'watchlist' | 'at-risk';
  riskFlags: RiskFlag[];
}

// Upload state
export interface UploadState {
  attendance: AttendanceRecord[] | null;
  assessment: AssessmentRecord[] | null;
  attempts: AttemptsRecord[] | null;
}
