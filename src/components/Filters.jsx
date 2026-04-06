import React from 'react';

const CATEGORIES = ['All', 'Food', 'Travel', 'Rent', 'Shopping', 'Entertainment', 'Health', 'Utilities', 'Subscriptions'];

const Filters = ({ filters, setFilters }) => {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
      <select 
        className="glass-input" 
        style={{ flex: 1, minWidth: '150px' }}
        value={filters.type}
        onChange={(e) => setFilters({...filters, type: e.target.value})}
      >
        <option value="all" style={{color: '#000'}}>All Types</option>
        <option value="income" style={{color: '#000'}}>Income</option>
        <option value="expense" style={{color: '#000'}}>Expense</option>
      </select>

      <select 
        className="glass-input" 
        style={{ flex: 1, minWidth: '150px' }}
        value={filters.category}
        onChange={(e) => setFilters({...filters, category: e.target.value})}
      >
        {CATEGORIES.map(cat => (
          <option key={cat} value={cat.toLowerCase()} style={{color: '#000'}}>{cat}</option>
        ))}
      </select>
      
      <select 
        className="glass-input" 
        style={{ flex: 1, minWidth: '150px' }}
        value={filters.sort}
        onChange={(e) => setFilters({...filters, sort: e.target.value})}
      >
        <option value="date-desc" style={{color: '#000'}}>Newest First</option>
        <option value="date-asc" style={{color: '#000'}}>Oldest First</option>
        <option value="amount-desc" style={{color: '#000'}}>Highest Amount</option>
        <option value="amount-asc" style={{color: '#000'}}>Lowest Amount</option>
      </select>
    </div>
  );
};

export default Filters;
