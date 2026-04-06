import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';

export const useBudget = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useBudget must be used within a FinanceProvider');
  }

  const { transactions, budget, setBudget } = context;

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
    
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const monthlyBudget = budget.monthlyBudget || 0;
  const remainingBudget = monthlyBudget - totalExpenses;
  const percentageUsed = monthlyBudget > 0 ? (totalExpenses / monthlyBudget) * 100 : 0;

  return {
    budget: monthlyBudget,
    setBudget,
    totalExpenses,
    totalIncome,
    remainingBudget,
    percentageUsed: Math.min(percentageUsed, 100).toFixed(2),
  };
};
