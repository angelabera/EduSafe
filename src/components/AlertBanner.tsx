import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

interface AlertBannerProps {
  atRiskCount: number;
}

/**
 * AlertBanner Component
 * Displays a prominent alert when students are at high risk.
 * Dismissible by user but reappears on data change.
 */
export function AlertBanner({ atRiskCount }: AlertBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (atRiskCount === 0 || isDismissed) {
    return null;
  }

  return (
    <div className="alert-banner">
      <div className="alert-content">
        <AlertTriangle size={24} className="alert-icon" />
        <div className="alert-text">
          <strong>{atRiskCount} student{atRiskCount > 1 ? 's are' : ' is'} at high risk this week</strong>
          <p>Immediate attention recommended. Click on student rows to see detailed risk factors.</p>
        </div>
      </div>
      <button 
        className="dismiss-btn" 
        onClick={() => setIsDismissed(true)}
        aria-label="Dismiss alert"
      >
        <X size={20} />
      </button>
    </div>
  );
}
