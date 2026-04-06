import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/currencyFormatter';

const BudgetCard = ({ budget, totalExpenses, remainingBudget, percentageUsed }) => {
  const isOverBudget = remainingBudget < 0;

  return (
    <motion.div 
      className="glass-container" 
      style={{ padding: '1.5rem', marginBottom: '1.5rem' }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Monthly Budget Setup</h2>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span style={{ color: 'var(--text-secondary)' }}>Budget Allocation</span>
        <span className="tabular-nums" style={{ fontWeight: '600' }}>{formatCurrency(budget)}</span>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span style={{ color: 'var(--text-secondary)' }}>Total Spent</span>
        <span className="tabular-nums" style={{ fontWeight: '600' }}>{formatCurrency(totalExpenses)}</span>
      </div>
      
      <div style={{ background: 'rgba(0,0,0,0.05)', height: '12px', borderRadius: '6px', overflow: 'hidden', marginBottom: '1rem' }}>
        <motion.div 
          style={{ 
            height: '100%', 
            background: isOverBudget ? 'var(--danger)' : 'var(--primary-color)',
            width: `${Math.min(percentageUsed, 100)}%`,
            borderRadius: '6px'
          }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentageUsed, 100)}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      
      <div className="tabular-nums" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: isOverBudget ? 'var(--danger)' : 'var(--text-secondary)' }}>
        <span>{percentageUsed}% Used</span>
        <span style={{ fontWeight: '500' }}>{isOverBudget ? `Over by ${formatCurrency(Math.abs(remainingBudget))}` : `${formatCurrency(remainingBudget)} Remaining`}</span>
      </div>
    </motion.div>
  );
};

export default BudgetCard;
