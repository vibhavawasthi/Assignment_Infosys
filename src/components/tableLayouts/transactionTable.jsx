import React from 'react';
 
const TransactionTable = ({ transactions, month, year }) => {
  const filteredTransactions = transactions
    .flatMap((customer) => customer.monthlyPoints)
    .filter((transaction) => {
      if (month && year) {
        return transaction.month === month && transaction.year === year;
      }
      return true; // Show all transactions if no month/year provided
    });
 
  const adjustPoints = (points) => {
    const decimalPart = points % 1;
    if (decimalPart <= 0.8) {
      return Math.floor(points);
    } else {
      return Math.ceil(points);
    }
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
          <tr key={`${transaction.customerId}-${transaction.month}`}>
            <td>{transaction.customerId}</td>
            <td>{transaction.customerName}</td>
            <td>{transaction.transactions.map((t) => t.transactionId).join(', ')}</td>
            <td>{transaction.transactions.map((t) => `$${t.amountSpent.toFixed(2)}`).join(', ')}</td>
            <td>{transaction.transactions.map((t) => t.transactionDate).join(', ')}</td>
            <td>{transaction.transactions.map((t) => t.transactionDate.substring(0, 4)).join(', ')}</td>
            <td>{adjustPoints(transaction.points)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
 
export default TransactionTable;