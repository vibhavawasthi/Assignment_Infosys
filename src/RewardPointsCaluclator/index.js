// Driver file for complete functionality

import React, { useState, useEffect } from 'react';
import fetchTransactions from './actions';
import TransactionTable from './transactionTable';
import CombinedTransactionTable from './combinedTransactionTable';
 
const RewardPointsCalculator = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  // making the action/api call through
  useEffect(() => {
    const getTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (error) {
        setError('Failed to load transactions.');
      } finally {
        setLoading(false);
      }
    };
 
    getTransactions();
  }, []);
 
  if (loading) return <p>Loading...</p>;
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