import React, { useState, useEffect } from 'react';
const { fetchTransactions } = require('../Utils/apiServices');
import { processTransactions } from './calculatePoints';
import TransactionTable from './transactionTable';
import CombinedTransactionTable from './combinedTransactionTable';
import logger from 'loglevel';

 
const RewardPointsCalculator = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  //api call
  useEffect(() => {
    const getTransactions = async () => {
      try {
        const data = await fetchTransactions();
        logger.debug('Fetched transactions:', data);
        const processedData = processTransactions(data);
        logger.debug('Processed transactions:', processedData);
        setTransactions(processedData);
      } catch (error) {
        logger.error('Failed to load transactions:', error);
        setError('Failed to load transactions.');
      } finally {
        setLoading(false);
      }
    };
 
    getTransactions();
  }, []);
 
  if (loading) return <p className='loader'></p>;
  if (error) return <p className='error'>{error}</p>;
 
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