import React, { useState } from 'react';
 
const TransactionTableMonthly = ({ transactions }) => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
 
  // Aggregate transactions by customer, month, and year
  const aggregatedTransactions = transactions.flatMap((customer) =>
    customer.monthlyPoints.map((pointData) => {
      const totalPoints = pointData.transactions.reduce(
        (acc, transaction) => acc + transaction.points,
        0
      );
      const year = new Date(pointData.transactions[0].transactionDate).getFullYear();
      return {
        customerId: customer.customerId,
        customerName: customer.customerName,
        month: pointData.month,
        year,
        totalPoints,
      };
    })
  );
 
  // Sort transactions by year and month in descending order
  const filteredTransactions = aggregatedTransactions
    .filter((transaction) => {
      return (
        (selectedMonth ? transaction.month === parseInt(selectedMonth) : true) &&
        (selectedYear ? transaction.year === parseInt(selectedYear) : true)
      );
    })
    .sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });
 
  const formatMonth = (month) => {
    const options = { month: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(
      new Date(0, month - 1)
    );
  };
 
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
 
export default TransactionTableMonthly;