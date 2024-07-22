import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../utils/services/apiServices';
import { processTransactions } from './helpers/calculatePoints';
import TransactionTable from '../components/tableLayouts/transactionTable';
import CombinedTransactionTable from '../components/tableLayouts/combinedTransactionTable';
import logger from 'loglevel';

const RewardPointsCalculator = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getLastThreeMonths = (transactions) => {
    const months = transactions
      .flatMap((customer) => customer.monthlyPoints)
      .map((transaction) => {
        const date = new Date(transaction.transactions[0].transactionDate);
        return { month: date.getMonth() + 1, year: date.getFullYear() };
      });

    const uniqueMonths = Array.from(
      new Set(months.map((m) => `${m.year}-${m.month}`))
    ).map((dateStr) => {
      const [year, month] = dateStr.split('-').map(Number);
      return { month, year };
    });

    uniqueMonths.sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });

    return uniqueMonths.slice(0, 3);
  };

  const formatMonth = (date) => {
    const options = { month: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(
      new Date(date.year, date.month - 1)
    );
  };

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

  if (loading) return <p className='loader'>Loading...</p>;
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
