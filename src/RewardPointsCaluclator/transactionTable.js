import React from 'react';
 
const TransactionTable = ({ transactions, month }) => {
  const filteredTransactions = transactions
    .flatMap((customer) => customer.monthlyPoints)
    .filter((transaction) => transaction.month === month);
 
  return (
    <table>
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Customer Name</th>
          <th>Transaction ID</th>
          <th>Amount Spent</th>
          <th>Transaction Date</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {filteredTransactions.map((transaction) => (
          <tr key={`${transaction.customerId}-${transaction.month}`}>
            <td>{transaction.customerId}</td>
            <td>{transaction.customerName}</td>
            <td>{transaction.transactions.map((t) => t.transactionId).join(', ')}</td>
            <td>{transaction.transactions.map((t) => `$${t.amountSpent.toFixed(2)}`).join(', ')}</td>
            <td>{transaction.transactions.map((t) => t.transactionDate).join(', ')}</td>
            <td>{transaction.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
 
export default TransactionTable;