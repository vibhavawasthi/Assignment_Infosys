import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../utils/services/apiServices';
import { processTransactions } from './helpers/calculatePoints';
import TransactionTable from '../components/tableLayouts/transactionTable';
import LastThreeMonthRewardsTable from '../components/tableLayouts/lastThreeMonthRewardsTable';
import DateFilter from '../components/filters/dateFilter';
import Tabs from '../components/tabs/tabs';
import logger from 'loglevel';
import { filterTransactionsByDate } from '../utils/commonFunctions';
import Header from '../components/header/header';
import TransactionTableMonthly from '../components/tableLayouts/totalMonthlyRewards';
 
const RewardPointsCalculator = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('allTransactions');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
 
  // Tab data
  const tabs = [
    { id: 'allTransactions', label: 'All Transactions' },
    { id: 'monthlyTransactions', label: 'Total Monthly Rewards' },
    { id: 'totalRewards', label: 'Total Rewards (Last Three Months)' },
  ];
 
  useEffect(() => {
    const getTransactions = async () => {
      try {
        const data = await fetchTransactions();
        const processedData = processTransactions(data);
        setTransactions(processedData);
      } catch (error) {
        logger.error('Failed to load transactions:', error);
        setError('An error occurred while loading transactions. Please try again.');
      } finally {
        setLoading(false);
      }
    };
 
    getTransactions();
  }, []);
 
  if (loading) return <p className='loader'>Loading...</p>;
  if (error) return <p className='error'>{error}</p>;
 
  const filteredTransactions = filterTransactionsByDate(transactions, startDate, endDate);
 
  return (
    <div>
      <Header />
      <div className="container">
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'allTransactions' && (
          <div>
            <h3>All Transactions</h3>
            <DateFilter
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
            />
            <TransactionTable transactions={filteredTransactions} />
          </div>
        )}
        {activeTab === 'monthlyTransactions' && (
          <div>
            <h3>Monthly Transactions</h3>
            <TransactionTableMonthly transactions={transactions} month={true} />
          </div>
        )}
        {activeTab === 'totalRewards' && (
          <div>
            <h3>Total Rewards</h3>
            <LastThreeMonthRewardsTable transactions={transactions} />
          </div>
        )}
      </div>
    </div>
  );
};
 
export default React.memo(RewardPointsCalculator);