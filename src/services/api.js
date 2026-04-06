import axios from 'axios';

const api = axios.create({
  baseURL: 'https://open.er-api.com/v6/latest/',
});

export const getRates = async (baseCurrency = 'INR') => {
  try {
    const response = await api.get(baseCurrency);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch exchange rates", error);
    throw error;
  }
};

export default api;
