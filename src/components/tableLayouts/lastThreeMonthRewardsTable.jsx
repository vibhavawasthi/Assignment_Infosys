import React, { useState } from 'react';
import { getCustomerRewardsForLastThreeMonths, sortCustomerRewards } from '../../utils/commonFunctions';

 
const LastThreeMonthRewardsTable = ({ transactions }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'totalPoints', direction: 'desc' });
  const customerRewardsData = getCustomerRewardsForLastThreeMonths(transactions);
  const sortedCustomerRewards = sortCustomerRewards(customerRewardsData, sortConfig);

  // Sorting logic
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
export default React.memo(LastThreeMonthRewardsTable);