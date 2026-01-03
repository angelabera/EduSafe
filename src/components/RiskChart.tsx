import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface RiskChartProps {
  distribution: {
    safe: number;
    watchlist: number;
    atRisk: number;
  };
}

/**
 * RiskChart Component
 * Displays a bar chart showing the distribution of students across risk categories.
 * Uses Recharts for clean, responsive visualization.
 */
export function RiskChart({ distribution }: RiskChartProps) {
  const data = [
    { name: 'Safe', value: distribution.safe, color: '#22c55e' },
    { name: 'Watchlist', value: distribution.watchlist, color: '#eab308' },
    { name: 'At Risk', value: distribution.atRisk, color: '#ef4444' },
  ];

  const total = distribution.safe + distribution.watchlist + distribution.atRisk;

  if (total === 0) {
    return null;
  }

  return (
    <div className="risk-chart-container">
      <h2>Risk Distribution Overview</h2>
      
      {/* Summary cards */}
      <div className="summary-cards">
        <div className="summary-card safe">
          <span className="count">{distribution.safe}</span>
          <span className="label">Safe</span>
          <span className="percentage">
            {((distribution.safe / total) * 100).toFixed(0)}%
          </span>
        </div>
        <div className="summary-card watchlist">
          <span className="count">{distribution.watchlist}</span>
          <span className="label">Watchlist</span>
          <span className="percentage">
            {((distribution.watchlist / total) * 100).toFixed(0)}%
          </span>
        </div>
        <div className="summary-card at-risk">
          <span className="count">{distribution.atRisk}</span>
          <span className="label">At Risk</span>
          <span className="percentage">
            {((distribution.atRisk / total) * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Bar chart */}
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6b7280', fontSize: 14 }}
              axisLine={{ stroke: '#d1d5db' }}
            />
            <YAxis 
              tick={{ fill: '#6b7280', fontSize: 14 }}
              axisLine={{ stroke: '#d1d5db' }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value: number | undefined) => [`${value ?? 0} students`, 'Count']}
            />
            <Bar 
              dataKey="value" 
              radius={[8, 8, 0, 0]}
              maxBarSize={80}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
