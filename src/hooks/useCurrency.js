import { useState, useEffect } from 'react';
import { getRates } from '../services/api';

export const useCurrency = (base = 'INR') => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await getRates(base);
        setRates(data.rates || {});
      } catch (error) {
        console.error('Error fetching currency rates:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, [base]);

  return { rates, loading };
};
