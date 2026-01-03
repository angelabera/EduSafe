import { useState, useMemo, useCallback } from 'react';
import { Shield } from 'lucide-react';
import { CSVUpload, StudentTable, RiskChart, AlertBanner } from './components';
import { analyzeAllStudents, getRiskDistribution } from './utils/riskCalculator';
import type { 
  AttendanceRecord, 
  AssessmentRecord, 
  AttemptsRecord,
  UploadState 
} from './types';
import './App.css';

/**
 * EduSafe - Student Early-Risk Identification Dashboard
 * 
 * Main application component that orchestrates:
 * - CSV file uploads
 * - Data merging and risk calculation
 * - Dashboard visualization
 */
function App() {
  // State for uploaded CSV data
  const [uploadState, setUploadState] = useState<UploadState>({
    attendance: null,
    assessment: null,
    attempts: null
  });

  // Handlers for each CSV upload
  const handleAttendanceUpload = useCallback((data: AttendanceRecord[]) => {
    setUploadState(prev => ({ ...prev, attendance: data }));
  }, []);

  const handleAssessmentUpload = useCallback((data: AssessmentRecord[]) => {
    setUploadState(prev => ({ ...prev, assessment: data }));
  }, []);

  const handleAttemptsUpload = useCallback((data: AttemptsRecord[]) => {
    setUploadState(prev => ({ ...prev, attempts: data }));
  }, []);

  // Check if all data is uploaded
  const isDataComplete = uploadState.attendance && uploadState.assessment && uploadState.attempts;

  // Analyze students only when all data is available
  const studentProfiles = useMemo(() => {
    if (!isDataComplete) return [];
    return analyzeAllStudents(
      uploadState.attendance!,
      uploadState.assessment!,
      uploadState.attempts!
    );
  }, [uploadState, isDataComplete]);

  // Calculate risk distribution for chart
  const riskDistribution = useMemo(() => {
    return getRiskDistribution(studentProfiles);
  }, [studentProfiles]);

  // Reset all data
  const handleReset = () => {
    setUploadState({ attendance: null, assessment: null, attempts: null });
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="logo">
          <Shield size={32} />
          <h1>EduSafe</h1>
        </div>
        <p className="tagline">Student DropOut Identification Dashboard</p>
      </header>

      <main className="app-main">
        {/* Upload Section */}
        <section className="upload-section">
          <h2> Upload Student Data</h2>
          <p className="section-description">
            Upload three CSV files containing attendance, assessment, and attempts data.
          </p>
          
          <div className="upload-grid">
            <CSVUpload<AttendanceRecord>
              label="Attendance Data"
              description="StudentID, AttendancePercentage"
              onDataLoaded={handleAttendanceUpload}
              isLoaded={!!uploadState.attendance}
            />
            <CSVUpload<AssessmentRecord>
              label="Assessment Data"
              description="StudentID, TestScore1, TestScore2, TestScore3"
              onDataLoaded={handleAssessmentUpload}
              isLoaded={!!uploadState.assessment}
            />
            <CSVUpload<AttemptsRecord>
              label="Attempts Data"
              description="StudentID, AttemptsUsed"
              onDataLoaded={handleAttemptsUpload}
              isLoaded={!!uploadState.attempts}
            />
          </div>

          {isDataComplete && (
            <button className="reset-btn" onClick={handleReset}>
              Reset All Data
            </button>
          )}
        </section>

        {/* Alert Banner */}
        {isDataComplete && (
          <AlertBanner atRiskCount={riskDistribution.atRisk} />
        )}

        {/* Dashboard Section */}
        {isDataComplete && (
          <section className="dashboard-section">
            {/* Risk Chart */}
            <RiskChart distribution={riskDistribution} />

            {/* Risk Rules Explanation */}
            <div className="rules-card">
              <h3>📋 Risk Scoring Rules</h3>
              <ul className="rules-list">
                <li><span className="rule-points">+30</span> Attendance below 75%</li>
                <li><span className="rule-points">+30</span> Average test score below 40%</li>
                <li><span className="rule-points">+20</span> Declining test score trend</li>
                <li><span className="rule-points">+20</span> 2 or more attempts used</li>
              </ul>
              <div className="risk-levels">
                <span className="level safe">0-30: Safe</span>
                <span className="level watchlist">31-60: Watchlist</span>
                <span className="level at-risk">61-100: At Risk</span>
              </div>
            </div>

            {/* Student Table */}
            <div className="table-section">
              <h2>👥 Student Risk Profiles</h2>
              <p className="section-description">
                Click on any row to see detailed risk explanations. Sorted by risk score (highest first).
              </p>
              <StudentTable students={studentProfiles} />
            </div>
          </section>
        )}

        {/* Instructions when no data */}
        {!isDataComplete && (
          <section className="instructions-section">
            <h2> Getting Started</h2>
            <div className="instructions-content">
              <p>Upload all three CSV files above to analyze student dropout risk levels.</p>
              
              <h3>Expected CSV Format:</h3>
              <div className="csv-examples">
                <div className="csv-example">
                  <h4>attendance.csv</h4>
                  <code>
                    StudentID,AttendancePercentage<br/>
                    STU001,85<br/>
                    STU002,62<br/>
                    STU003,91
                  </code>
                </div>
                <div className="csv-example">
                  <h4>assessment.csv</h4>
                  <code>
                    StudentID,TestScore1,TestScore2,TestScore3<br/>
                    STU001,75,80,72<br/>
                    STU002,45,38,32<br/>
                    STU003,88,92,95
                  </code>
                </div>
                <div className="csv-example">
                  <h4>attempts.csv</h4>
                  <code>
                    StudentID,AttemptsUsed<br/>
                    STU001,1<br/>
                    STU002,3<br/>
                    STU003,1
                  </code>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>@2026 EduSafe | Built with 💙 by Angela Bera</p>
      </footer>
    </div>
  );
}

export default App;
