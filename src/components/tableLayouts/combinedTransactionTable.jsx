import React from 'react';
 
const CombinedTransactionTable = ({ transactions }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Customer Name</th>
          <th>Total Points</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((customer) => (
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
 
export default CombinedTransactionTable;