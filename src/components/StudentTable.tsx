import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, Eye, ShieldCheck } from 'lucide-react';
import type { StudentRiskProfile } from '../types';

interface StudentTableProps {
  students: StudentRiskProfile[];
}

/**
 * StudentTable Component
 * Displays all students with their risk scores and expandable flag details.
 * Color-coded by risk level for quick visual identification.
 */
export function StudentTable({ students }: StudentTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (studentId: string) => {
    setExpandedId(expandedId === studentId ? null : studentId);
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'at-risk': return <AlertTriangle size={18} />;
      case 'watchlist': return <Eye size={18} />;
      default: return <ShieldCheck size={18} />;
    }
  };

  const getRiskLabel = (level: string) => {
    switch (level) {
      case 'at-risk': return 'At Risk';
      case 'watchlist': return 'Watchlist';
      default: return 'Safe';
    }
  };

  if (students.length === 0) {
    return (
      <div className="empty-state">
        <p>No student data to display. Upload all three CSV files to begin analysis.</p>
      </div>
    );
  }

  return (
    <div className="student-table-container">
      <table className="student-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Attendance</th>
            <th>Avg Score</th>
            <th>Attempts</th>
            <th>Risk Score</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <>
              <tr 
                key={student.studentId} 
                className={`risk-row ${student.riskLevel}`}
              >
                <td className="student-id">{student.studentId}</td>
                <td>{student.attendance.toFixed(1)}%</td>
                <td>{student.averageScore.toFixed(1)}%</td>
                <td>{student.attemptsUsed}</td>
                <td>
                  <span className="risk-score">{student.riskScore}</span>
                </td>
                <td>
                  <span className={`risk-badge ${student.riskLevel}`}>
                    {getRiskIcon(student.riskLevel)}
                    {getRiskLabel(student.riskLevel)}
                  </span>
                </td>
                <td>
                  <button 
                    className="expand-btn"
                    onClick={() => toggleExpand(student.studentId)}
                    aria-label={expandedId === student.studentId ? 'Collapse' : 'Expand'}
                  >
                    {expandedId === student.studentId 
                      ? <ChevronUp size={20} /> 
                      : <ChevronDown size={20} />
                    }
                  </button>
                </td>
              </tr>
              
              {/* Expandable risk flags section */}
              {expandedId === student.studentId && (
                <tr key={`${student.studentId}-details`} className="details-row">
                  <td colSpan={7}>
                    <div className="risk-flags">
                      <h4>Risk Flags Explanation</h4>
                      {student.riskFlags.length === 0 ? (
                        <p className="no-flags">No risk flags - student is performing well!</p>
                      ) : (
                        <ul>
                          {student.riskFlags.map((flag, index) => (
                            <li key={index} className="risk-flag-item">
                              <span className="flag-rule">{flag.rule}</span>
                              <span className="flag-points">+{flag.points} pts</span>
                              <span className="flag-description">{flag.description}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      {/* Test scores breakdown */}
                      <div className="scores-breakdown">
                        <span>Test Scores: </span>
                        {student.testScores.map((score, i) => (
                          <span key={i} className="test-score">
                            Test {i + 1}: {score}
                            {i < 2 && ' → '}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
