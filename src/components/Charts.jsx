import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const COLORS = ['#10ac84', '#0abde3', '#54a0ff', '#ff9f43', '#feca57', '#ff6b6b', '#c8d6e5', '#8395a7'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)', border: '0.5px solid rgba(255, 255, 255, 0.4)', borderRadius: '20px', padding: '1rem 1.25rem', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 0 20px rgba(255,255,255,0.6)', color: 'var(--text-primary)' }}>
        <p style={{ margin: '0 0 0.25rem 0', fontWeight: '600' }}>{label || payload[0].name}</p>
        <p className="tabular-nums" style={{ margin: 0, color: payload[0].payload.fill || payload[0].color || 'var(--text-primary)' }}>
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
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.2)' }} />
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
          <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} />
          <YAxis stroke="var(--text-secondary)" tickFormatter={(value) => `₹${value}`} tick={{fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.2)' }} />
          <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
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
          <XAxis className="tabular-nums" dataKey="date" stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} />
          <YAxis className="tabular-nums" stroke="var(--text-secondary)" tickFormatter={(value) => `₹${value}`} tick={{fill: 'var(--text-secondary)'}} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1 }} />
          <Line type="monotone" dataKey="amount" stroke="var(--primary-color)" strokeWidth={4} dot={{ fill: '#fff', stroke: 'var(--primary-color)', strokeWidth: 2, r: 6 }} activeDot={{ r: 8, strokeWidth: 0 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
