import type { 
  AttendanceRecord, 
  AssessmentRecord, 
  AttemptsRecord, 
  StudentProfile, 
  StudentRiskProfile,
  RiskFlag 
} from '../types';

/**
 * Merges data from three CSV sources into unified student profiles.
 * Uses StudentID as the join key.
 */
export function mergeStudentData(
  attendance: AttendanceRecord[],
  assessment: AssessmentRecord[],
  attempts: AttemptsRecord[]
): StudentProfile[] {
  // Create lookup maps for O(1) access
  const attendanceMap = new Map(attendance.map(a => [a.StudentID, a]));
  const assessmentMap = new Map(assessment.map(a => [a.StudentID, a]));
  const attemptsMap = new Map(attempts.map(a => [a.StudentID, a]));

  // Get all unique student IDs
  const allStudentIds = new Set([
    ...attendance.map(a => a.StudentID),
    ...assessment.map(a => a.StudentID),
    ...attempts.map(a => a.StudentID)
  ]);

  // Merge data for each student
  const profiles: StudentProfile[] = [];
  
  for (const studentId of allStudentIds) {
    const att = attendanceMap.get(studentId);
    const assess = assessmentMap.get(studentId);
    const att2 = attemptsMap.get(studentId);

    const testScores = assess 
      ? [assess.TestScore1, assess.TestScore2, assess.TestScore3]
      : [0, 0, 0];

    profiles.push({
      studentId,
      attendance: att?.AttendancePercentage ?? 0,
      testScores,
      averageScore: testScores.reduce((a, b) => a + b, 0) / testScores.length,
      attemptsUsed: att2?.AttemptsUsed ?? 0
    });
  }

  return profiles.sort((a, b) => a.studentId.localeCompare(b.studentId));
}

/**
 * Rule-based risk scoring system.
 * Each rule is transparent and explainable.
 * 
 * Rules:
 * - Attendance < 75% → +30 points
 * - Average test score < 40% → +30 points  
 * - Declining test score trend → +20 points
 * - AttemptsUsed ≥ 2 → +20 points
 */
export function calculateRiskScore(profile: StudentProfile): StudentRiskProfile {
  const riskFlags: RiskFlag[] = [];
  let riskScore = 0;

  // Rule 1: Low attendance
  if (profile.attendance < 75) {
    const points = 30;
    riskScore += points;
    riskFlags.push({
      rule: 'Low Attendance',
      points,
      description: `Attendance is ${profile.attendance.toFixed(1)}% (below 75% threshold)`
    });
  }

  // Rule 2: Low average test score
  if (profile.averageScore < 40) {
    const points = 30;
    riskScore += points;
    riskFlags.push({
      rule: 'Low Test Average',
      points,
      description: `Average score is ${profile.averageScore.toFixed(1)}% (below 40% threshold)`
    });
  }

  // Rule 3: Declining test score trend
  const [score1, score2, score3] = profile.testScores;
  const isDeclining = score1 > score2 && score2 > score3;
  if (isDeclining) {
    const points = 20;
    riskScore += points;
    riskFlags.push({
      rule: 'Declining Trend',
      points,
      description: `Test scores declining: ${score1} → ${score2} → ${score3}`
    });
  }

  // Rule 4: Multiple attempts used
  if (profile.attemptsUsed >= 2) {
    const points = 20;
    riskScore += points;
    riskFlags.push({
      rule: 'Multiple Attempts',
      points,
      description: `Used ${profile.attemptsUsed} attempts (threshold: 2)`
    });
  }

  // Cap risk score at 100
  riskScore = Math.min(riskScore, 100);

  // Determine risk level
  const riskLevel = getRiskLevel(riskScore);

  return {
    ...profile,
    riskScore,
    riskLevel,
    riskFlags
  };
}

/**
 * Maps numeric risk score to categorical risk level.
 */
export function getRiskLevel(score: number): 'safe' | 'watchlist' | 'at-risk' {
  if (score <= 30) return 'safe';
  if (score <= 60) return 'watchlist';
  return 'at-risk';
}

/**
 * Processes all students and returns risk profiles sorted by risk score (descending).
 */
export function analyzeAllStudents(
  attendance: AttendanceRecord[],
  assessment: AssessmentRecord[],
  attempts: AttemptsRecord[]
): StudentRiskProfile[] {
  const profiles = mergeStudentData(attendance, assessment, attempts);
  const riskProfiles = profiles.map(calculateRiskScore);
  
  // Sort by risk score (highest first)
  return riskProfiles.sort((a, b) => b.riskScore - a.riskScore);
}

/**
 * Counts students in each risk category for chart display.
 */
export function getRiskDistribution(profiles: StudentRiskProfile[]): {
  safe: number;
  watchlist: number;
  atRisk: number;
} {
  return {
    safe: profiles.filter(p => p.riskLevel === 'safe').length,
    watchlist: profiles.filter(p => p.riskLevel === 'watchlist').length,
    atRisk: profiles.filter(p => p.riskLevel === 'at-risk').length
  };
}
