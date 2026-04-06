import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTransactions } from '../hooks/useTransactions';
import { CategoryPieChart, IncomeExpenseBarChart, TrendLineChart } from '../components/Charts';

const Analytics = () => {
  const { transactions } = useTransactions();

  const chartData = useMemo(() => {
    // Pie Data: Spending by category
    const categoryMap = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + Number(t.amount);
    });
    const pieData = Object.keys(categoryMap).map(key => ({ name: key, value: categoryMap[key] }));

    // Bar Data: Income vs Expense
    let tIncome = 0;
    let tExpense = 0;
    transactions.forEach(t => {
      if (t.type === 'income') tIncome += Number(t.amount);
      if (t.type === 'expense') tExpense += Number(t.amount);
    });
    const barData = [
      { name: 'Income', amount: tIncome },
      { name: 'Expense', amount: tExpense }
    ];

    // Line Data: Monthly Trend
    const monthlyMap = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      const monthYear = new Date(t.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      monthlyMap[monthYear] = (monthlyMap[monthYear] || 0) + Number(t.amount);
    });
    // sort chronological
    const lineData = Object.keys(monthlyMap)
      .map(key => ({ date: key, amount: monthlyMap[key] }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return { pieData, barData, lineData };
  }, [transactions]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 style={{ marginBottom: '2rem' }}>Detailed Analytics</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="glass-container" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', marginTop: 0 }}>Spending by Category</h3>
          <CategoryPieChart data={chartData.pieData} />
        </div>
        
        <div className="glass-container" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', marginTop: 0 }}>Income vs Expense</h3>
          <IncomeExpenseBarChart data={chartData.barData} />
        </div>

        <div className="glass-container" style={{ padding: '1.5rem', gridColumn: '1 / -1' }}>
          <h3 style={{ marginBottom: '1.5rem', marginTop: 0 }}>Monthly Spending Trend</h3>
          <TrendLineChart data={chartData.lineData} />
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;
