import React from 'react';
import { formatMonth } from '../../utils/commonFunctions';
 
const TransactionTable = ({ transactions }) => {
  // Flatten transactions and add the month and year to each transaction
  const allTransactions = transactions.flatMap((customer) =>
    customer.monthlyPoints.flatMap((pointData) =>
      pointData.transactions.map((transaction) => ({
        customerId: customer.customerId,
        customerName: customer.customerName,
        month: pointData.month,
        year: new Date(transaction.transactionDate).getFullYear(),
        ...transaction,
      }))
    )
  );
 
  // Sort transactions by year and month in descending order
  allTransactions.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });
 
  return (
    <table>
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Customer Name</th>
          <th>Transaction ID</th>
          <th>Amount Spent</th>
          <th>Transaction Date</th>
          <th>Month</th>
          <th>Year</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {allTransactions.map((transaction, index) => (
          <tr key={`${transaction.customerId}-${index}`}>
            <td>{transaction.customerId}</td>
            <td>{transaction.customerName}</td>
            <td>{transaction.transactionId}</td>
            <td>${transaction.amountSpent.toFixed(2)}</td>
            <td>{transaction.transactionDate}</td>
            <td>{formatMonth(transaction.month)}</td>
            <td>{transaction.year}</td>
            <td>{transaction.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
 
export default TransactionTable;