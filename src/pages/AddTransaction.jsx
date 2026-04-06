import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTransactions } from '../hooks/useTransactions';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const schema = yup.object({
  title: yup.string().required('Title is required').max(50, 'Max 50 characters'),
  amount: yup.number().positive('Must be positive').required('Amount is required').typeError('Amount must be a number'),
  category: yup.string().required('Category is required'),
  date: yup.date().required('Date is required').typeError('Valid date required'),
  type: yup.string().oneOf(['income', 'expense']).required('Type is required'),
  notes: yup.string().max(200, 'Max 200 characters').nullable(),
  recurring: yup.boolean()
}).required();

const CATEGORIES = ['Food', 'Travel', 'Rent', 'Shopping', 'Entertainment', 'Health', 'Utilities', 'Subscriptions', 'Salary', 'Other'];

const AddTransaction = () => {
  const { addTransaction, updateTransaction } = useTransactions();
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.transaction;

  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      recurring: false
    }
  });

  useEffect(() => {
    if (editData) {
      setValue('title', editData.title);
      setValue('amount', editData.amount);
      setValue('category', editData.category);
      setValue('date', new Date(editData.date).toISOString().split('T')[0]);
      setValue('type', editData.type);
      setValue('notes', editData.notes || '');
      setValue('recurring', editData.recurring || false);
    }
  }, [editData, setValue]);

  const onSubmit = async (data) => {
    try {
      if (editData) {
        updateTransaction(editData.id, { ...data, date: new Date(data.date).toISOString() });
        toast.success('Transaction updated');
      } else {
        addTransaction({ ...data, date: new Date(data.date).toISOString() });
        toast.success('Transaction added');
      }
      navigate('/transactions');
    } catch (error) {
      toast.error('Failed to save transaction');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-container" style={{ padding: '2.5rem', maxWidth: '600px', margin: '0 auto', marginTop: '1rem' }}>
      <h1 style={{ marginBottom: '2rem', marginTop: 0 }}>{editData ? 'Edit Transaction' : 'New Transaction'}</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <label style={{ flex: 1 }}>
            <span style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Type</span>
            <select {...register("type")} className="glass-input" style={{ color: '#000' }}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <p style={{ color: 'var(--danger)', fontSize: '0.8rem', margin: '0.4rem 0 0 0' }}>{errors.type?.message}</p>
          </label>
          <label style={{ flex: 1 }}>
            <span style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Date</span>
            <input type="date" {...register("date")} className="glass-input tabular-nums" style={{ color: 'var(--text-primary)' }} />
            <p style={{ color: 'var(--danger)', fontSize: '0.8rem', margin: '0.4rem 0 0 0' }}>{errors.date?.message}</p>
          </label>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Title</label>
          <input type="text" {...register("title")} className="glass-input" placeholder="e.g. Weekly Groceries" />
          <p style={{ color: 'var(--danger)', fontSize: '0.8rem', margin: '0.4rem 0 0 0' }}>{errors.title?.message}</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Amount (₹)</label>
            <input type="number" step="1" {...register("amount")} className="glass-input tabular-nums" placeholder="0" />
            <p style={{ color: 'var(--danger)', fontSize: '0.8rem', margin: '0.4rem 0 0 0' }}>{errors.amount?.message}</p>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Category</label>
            <select {...register("category")} className="glass-input" style={{ color: '#000' }}>
              <option value="">Select...</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <p style={{ color: 'var(--danger)', fontSize: '0.8rem', margin: '0.4rem 0 0 0' }}>{errors.category?.message}</p>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Notes (Optional)</label>
          <textarea {...register("notes")} className="glass-input" rows="3" placeholder="Additional details..." />
          <p style={{ color: 'var(--danger)', fontSize: '0.8rem', margin: '0.4rem 0 0 0' }}>{errors.notes?.message}</p>
        </div>

        <motion.div whileHover={{ scale: 1.01 }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid transparent' }}>
          <input type="checkbox" {...register("recurring")} id="recurring" style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--primary-color)' }} />
          <label htmlFor="recurring" style={{ color: 'var(--text-primary)', cursor: 'pointer', userSelect: 'none', fontWeight: 500 }}>Mark as a Recurring Transaction</label>
        </motion.div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="button" onClick={() => navigate(-1)} className="glass-button-secondary" style={{ flex: 1, padding: '0.8rem', borderRadius: '12px', fontWeight: 600 }}>
            Cancel
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isSubmitting} className="glass-button" style={{ flex: 2 }}>
            {isSubmitting ? 'Saving...' : 'Save Transaction'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddTransaction;
