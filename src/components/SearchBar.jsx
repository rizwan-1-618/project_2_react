import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useDebounce } from '../hooks/useDebounce';

const SearchBar = ({ onSearch, placeholder = "Search transactions..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div style={{ position: 'relative', width: '100%', marginBottom: '1rem' }}>
      <FiSearch 
        style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} 
        size={18}
      />
      <input 
        type="text" 
        className="glass-input" 
        placeholder={placeholder}
        style={{ paddingLeft: '2.5rem' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
