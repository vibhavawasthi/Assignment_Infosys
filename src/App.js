import React, { useState, useEffect } from 'react';

const RewardPointsCalculator = () => {
  const transactions = [
    { customerId: 1, transactionId: 101, amountSpent: 120, points: 0 },
    { customerId: 2, transactionId: 102, amountSpent: 80, points: 0 },
    // ... other transactions
  ];

  useEffect(() => {
    // Simulate API call to fetch transactions
    // Calculate reward points and update state
    transactions.forEach((transaction) => {
      const { amountSpent } = transaction;
      const points = Math.max(0, (amountSpent - 100) * 2 + Math.max(0, amountSpent - 50));
      transaction.points = points; // Update points in each transaction
    });
  }, []);

  // Render transactions in a table
  return (
    <div>
      <h2>Reward Points Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Transaction ID</th>
            <th>Amount Spent</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.transactionId}>
              <td>{transaction.customerId}</td>
              <td>{transaction.transactionId}</td>
              <td>{transaction.amountSpent}</td>
              <td>{transaction.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RewardPointsCalculator;
