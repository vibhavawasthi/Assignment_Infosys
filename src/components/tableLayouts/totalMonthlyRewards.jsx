import React, { useState } from 'react';
import { aggregateTransactions, filterAndSortTransactions, formatMonth } from '../../utils/commonFunctions';

const TransactionTableMonthly = ({ transactions }) => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
 
  // Aggregate transactions by customer, month, and year
  const aggregatedTransactions = aggregateTransactions(transactions);

  // Sort transactions by year and month in descending order
  const filteredTransactions = filterAndSortTransactions(aggregatedTransactions, selectedMonth, selectedYear)
 
  const uniqueMonths = Array.from(
    new Set(aggregatedTransactions.map((transaction) => transaction.month))
  ).sort((a, b) => a - b);
 
  const uniqueYears = Array.from(
    new Set(aggregatedTransactions.map((transaction) => transaction.year))
  ).sort((a, b) => b - a);
 
  return (
    <div>
      <div className="filters">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">All Months</option>
          {uniqueMonths.map((month) => (
            <option key={month} value={month}>
              {formatMonth(month)}
            </option>
          ))}
        </select>
 
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">All Years</option>
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
 
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Month</th>
            <th>Year</th>
            <th>Total Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction, index) => (
            <tr key={`${transaction.customerId}-${index}`}>
              <td>{transaction.customerId}</td>
              <td>{transaction.customerName}</td>
              <td>{formatMonth(transaction.month)}</td>
              <td>{transaction.year}</td>
              <td>{transaction.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
 
export default React.memo(TransactionTableMonthly);