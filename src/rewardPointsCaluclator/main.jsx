import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../utils/services/apiServices';
import { processTransactions } from './helpers/calculatePoints';
import TransactionTable from '../components/tableLayouts/transactionTable';
import CombinedTransactionTable from '../components/tableLayouts/combinedTransactionTable';
import DateFilter from '../components/filters/dateFilter';
import Tabs from '../components/tabs/tabs';
import logger from 'loglevel';
import { filterTransactionsByDate, formatMonth, getAllMonths, getLastQuarter } from '../utils/commonFunctions';
import Header from '../components/header/header';
import TransactionTableMonthly from '../components/tableLayouts/totalMonthlyRewards';

const RewardPointsCalculator = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('allTransactions');

  // State for date filtering
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  // API call
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

  const allMonths = getAllMonths(transactions);
  const lastQuarter = getLastQuarter(transactions);
  const filteredTransactions = filterTransactionsByDate(transactions, startDate, endDate);

  return (
    <div>
      <Header />
      <div className="container">


        {/* Tab navigation */}
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Render content based on active tab */}
        {activeTab === 'allTransactions' && (
          <div>
            <h3>All Transactions</h3>

            {/* Date Filter Component */}
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
          <>
            <h3>Monthly Transactions</h3>
            
                <TransactionTableMonthly transactions={transactions} month={true} />
          
          </>
        )}

        {activeTab === 'totalRewards' && (
          <>

            <>
              <h3>Total Rewards</h3>

              <div>

                <CombinedTransactionTable transactions={transactions} />
              </div>

            </>
          </>
        )}


      </div>
    </div>
  );
};

export default RewardPointsCalculator;