import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const localData = localStorage.getItem('transactions');
    return localData ? JSON.parse(localData) : [];
  });

  const [budget, setBudget] = useState(() => {
    const localData = localStorage.getItem('budget');
    return localData ? JSON.parse(localData) : { monthlyBudget: 50000 };
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('budget', JSON.stringify(budget));
  }, [budget]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [{ ...transaction, id: uuidv4() }, ...prev]);
  };

  const updateTransaction = (id, updatedData) => {
    setTransactions((prev) => 
      prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <FinanceContext.Provider value={{
      transactions,
      budget,
      setBudget,
      addTransaction,
      updateTransaction,
      deleteTransaction
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
