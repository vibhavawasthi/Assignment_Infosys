import React from 'react';
import { adjustPoints } from '../../utils/commonFunctions';

const TransactionTable = ({ transactions, month, year }) => {
  const filteredTransactions = transactions
    .flatMap((customer) => customer.monthlyPoints)
    .filter((transaction) => transaction.month === month && transaction.year === year);

    const formatAmount = (amount) => {
      return Number.isInteger(amount) ? amount : amount.toFixed(2);
    };

  return (
    <table>
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Customer Name</th>
          <th>Transaction ID</th>
          <th>Amount Spent</th>
          <th>Transaction Date</th>
          <th>Transaction Year</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {filteredTransactions.map((transaction) => (
          <tr key={`${transaction.customerId}-${transaction.month}-${transaction.year}`}>
            <td>{transaction.customerId}</td>
            <td>{transaction.customerName}</td>
            <td>{transaction.transactions.map((t) => t.transactionId).join(', ')}</td>
            <td>{transaction.transactions.map((t) => `$${formatAmount(t.amountSpent)}`).join(', ')}</td>
            <td>{transaction.transactions.map((t) => t.transactionDate).join(', ')}</td>
            <td>{transaction.year}</td>
            <td>{adjustPoints(transaction.points)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
