import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBudget } from '../hooks/useBudget';
import BudgetCard from '../components/BudgetCard';
import { toast } from 'react-toastify';

const Budget = () => {
  const { budget, setBudget, totalExpenses, remainingBudget, percentageUsed } = useBudget();
  const [newBudget, setNewBudget] = useState(budget || 0);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (newBudget < 0) {
      toast.error("Budget cannot be negative");
      return;
    }
    setBudget({ monthlyBudget: Number(newBudget) });
    toast.success("Monthly Budget updated successfully");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 style={{ marginBottom: '2rem' }}>Budget Management</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div>
          <div className="glass-container" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', marginTop: 0 }}>Update Monthly Target</h2>
            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Target Amount</label>
                <input 
                  type="number" 
                  className="glass-input" 
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  min="0"
                  step="500"
                  required
                />
              </div>
              <button type="submit" className="glass-button">
                Save Target Profile
              </button>
            </form>
          </div>
        </div>
        
        <div>
          <BudgetCard 
            budget={budget} 
            totalExpenses={totalExpenses} 
            remainingBudget={remainingBudget} 
            percentageUsed={percentageUsed} 
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Budget;
