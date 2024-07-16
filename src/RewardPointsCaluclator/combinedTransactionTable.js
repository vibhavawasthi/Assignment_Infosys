//combined 3 months point customer wise

import React from 'react';
 
const CombinedTransactionTable = ({ transactions }) => {
  return (
    <table className='transaction-table'>
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Total Points</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.customerId}>
            <td>{transaction.customerId}</td>
            <td>{transaction.totalPoints}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
 
export default CombinedTransactionTable;