// month wise transaction display and point calculation

import React from 'react';
 
const TransactionTable = ({ transactions, month }) => {
  return (
    <table className='transaction-table'>
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Customer ID</th>
          <th>Amount Spent</th>
          <th>Transaction Date</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          transaction.monthlyPoints.map((monthly) => (
            monthly.month === month && monthly.transactions.map((trans) => (
              <tr key={trans.transactionId}>
                <td>{trans.transactionId}</td>
                <td>{trans.customerId}</td>
                <td>${trans.amountSpent.toFixed(2)}</td>
                <td>{trans.transactionDate}</td>
                <td>{trans.points}</td>
              </tr>
            ))
          ))
        ))}
      </tbody>
    </table>
  );
};
 
export default TransactionTable;