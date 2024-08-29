import React, { useState } from 'react';
import { getLastThreeMonths } from '../../utils/commonFunctions';
 
const CombinedTransactionTable = ({ transactions }) => {
  // Get the last three months
  const [sortConfig, setSortConfig] = useState({ key: 'totalPoints', direction: 'desc' });
 
  // Get the last three months
  const lastThreeMonths = getLastThreeMonths(transactions);
 
  // Filter and aggregate transactions by customer for the last three months
  const customerRewards = transactions.map((customer) => {
    const totalPoints = customer.monthlyPoints.reduce((acc, pointData) => {
      const transactionDate = new Date(
        pointData.transactions[0].transactionDate
      );
      const month = transactionDate.getMonth() + 1;
      const year = transactionDate.getFullYear();
 
      const isInLastThreeMonths = lastThreeMonths.some(
        (monthYear) =>
          monthYear.month === month && monthYear.year === year
      );
 
      return isInLastThreeMonths ? acc + pointData.points : acc;
    }, 0);
 
    return {
      customerId: customer.customerId,
      customerName: customer.customerName,
      totalPoints,
    };
  });
 
  // Sorting logic
  const sortedCustomerRewards = customerRewards.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
 
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
 
  return (
    <table>
      <thead>
        <tr>
          <th>
            <button onClick={() => requestSort('customerId')}>
              Customer ID {sortConfig.key === 'customerId' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </button>
          </th>
          <th>
            <button onClick={() => requestSort('customerName')}>
              Customer Name {sortConfig.key === 'customerName' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </button>
          </th>
          <th>
            <button onClick={() => requestSort('totalPoints')}>
              Total Rewards (Last 3 Months) {sortConfig.key === 'totalPoints' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedCustomerRewards.map((customer) => (
          <tr key={customer.customerId}>
            <td>{customer.customerId}</td>
            <td>{customer.customerName}</td>
            <td>{customer.totalPoints}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default React.memo(CombinedTransactionTable);