import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../utils/services/apiServices';
import { processTransactions } from './helpers/calculatePoints';
import TransactionTable from '../components/tableLayouts/transactionTable';
import CombinedTransactionTable from '../components/tableLayouts/combinedTransactionTable';
import logger from 'loglevel';
import { formatMonth, getLastThreeMonths } from '../utils/commonFunctions';

const RewardPointsCalculator = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  // API call
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

  const lastThreeMonths = getLastThreeMonths(transactions);

  return (
    <div className="container">
      <h2>Reward Points Summary</h2>
      {lastThreeMonths.map((monthDate, index) => (
        <div key={index}>
          <h3>{formatMonth(monthDate)} {monthDate.year}</h3>
          <TransactionTable transactions={transactions} month={monthDate.month} year={monthDate.year} />
        </div>
      ))}
      <h3>Combined points for the last 3 months</h3>
      <CombinedTransactionTable transactions={transactions} />
    </div>
  );
};

export default RewardPointsCalculator;
