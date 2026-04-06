import React from 'react';
import { motion } from 'framer-motion';
import { FiEdit, FiTrash2, FiRepeat } from 'react-icons/fi';
import { formatCurrency } from '../utils/currencyFormatter';
import { format } from 'date-fns';

const TransactionCard = ({ transaction, onEdit, onDelete }) => {
  const { id, title, amount, category, type, date, notes, recurring } = transaction;

  return (
    <motion.div 
      className="glass-card" 
      style={{ padding: '1.25rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.01 }}
      layout
    >
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
          <h3 style={{ margin: 0, color: type === 'income' ? 'var(--success)' : 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {title}
          </h3>
          {recurring && <FiRepeat style={{ color: 'var(--primary-color)', minWidth: '14px' }} title="Recurring" />}
        </div>
        <p style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {category} • {format(new Date(date), 'MMM dd, yyyy')}
        </p>
        {notes && <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', opacity: 0.7, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{notes}</p>}
      </div>
      
      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem', minWidth: '100px' }}>
        <h3 className="tabular-nums" style={{ margin: 0, color: type === 'income' ? 'var(--success)' : 'var(--text-primary)' }}>
          {type === 'income' ? '+' : '-'}{formatCurrency(amount)}
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => onEdit(transaction)} className="glass-button-secondary" style={{ padding: '0.35rem 0.6rem' }}>
            <FiEdit size={14} />
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => onDelete(id)} className="glass-button-secondary" style={{ padding: '0.35rem 0.6rem', color: 'var(--danger)' }}>
            <FiTrash2 size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionCard;
