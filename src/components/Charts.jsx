import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#f43f5e', '#14b8a6'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card" style={{ padding: '0.5rem 1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
        <p style={{ margin: '0 0 0.25rem 0', fontWeight: '600', color: 'var(--text-primary)' }}>{label || payload[0].name}</p>
        <p style={{ margin: 0, color: payload[0].payload.fill || payload[0].color || 'var(--text-primary)' }}>
          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export const CategoryPieChart = ({ data }) => {
  if (!data || data.length === 0) return <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>No data available</div>;

  return (
    <div style={{ height: 300, width: '100%' }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={110}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const IncomeExpenseBarChart = ({ data }) => {
  if (!data || data.length === 0) return <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>No data available</div>;

  return (
    <div style={{ height: 300, width: '100%' }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} />
          <YAxis stroke="var(--text-secondary)" tickFormatter={(value) => `₹${value}`} tick={{fill: 'var(--text-secondary)'}} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.name === 'Income' ? 'var(--success)' : 'var(--danger)'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const TrendLineChart = ({ data }) => {
  if (!data || data.length === 0) return <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>No data available</div>;

  return (
    <div style={{ height: 300, width: '100%' }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <XAxis dataKey="date" stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} />
          <YAxis stroke="var(--text-secondary)" tickFormatter={(value) => `₹${value}`} tick={{fill: 'var(--text-secondary)'}} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="amount" stroke="var(--primary-color)" strokeWidth={4} dot={{ fill: 'var(--primary-color)', r: 4 }} activeDot={{ r: 8, strokeWidth: 0 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
