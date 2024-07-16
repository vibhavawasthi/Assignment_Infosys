// Driver file for complete functionality

import React, { useState, useEffect } from 'react';
import fetchTransactions from './actions';
import TransactionTable from './transactionTable';
import CombinedTransactionTable from './combinedTransactionTable';
import logger from '../logger';
 
const RewardPointsCalculator = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 // action/api call
  useEffect(() => {
    const getTransactions = async () => {
      try {
        const data = await fetchTransactions();
        logger.debug('Fetched transactions:', data);  //logger implemented
        setTransactions(data);
      } catch (error) {
        logger.error('Failed to load transactions:', error); //logger implemented
        setError('Failed to load transactions.');
      } finally {
        setLoading(false);
      }
    };
 
    getTransactions();
  }, []);
 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
 
  return (
    <div className="container">
      <h2>Reward Points Summary</h2>
      <h3>April</h3>
      <TransactionTable transactions={transactions} month={4} />
      <h3>May</h3>
      <TransactionTable transactions={transactions} month={5} />
      <h3>June</h3>
      <TransactionTable transactions={transactions} month={6} />
      <h3>Combined Points for 3 Months</h3>
      <CombinedTransactionTable transactions={transactions} />
    </div>
  );
};
 
export default RewardPointsCalculator;