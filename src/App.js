import React, { useState, useEffect } from 'react';
import './styles.css'; 
 
const RewardPointsCalculator = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/transactionData.json');
        if (!response.ok) {
          throw new Error('Response was not loaded');
        }
        const data = await response.json();
 
        const calculatePoints = (amount) => {
          if (amount > 100) {
            return (amount - 100) * 2 + 50; // 2 points for every dollar over $100 + 1 point for every dollar between $50 and $100
          } else if (amount > 50) {
            return amount - 50; // 1 point for every dollar between $50 and $100
          }
          return 0;
        };
 
        const updatedTransactions = data.map((transaction) => ({
          ...transaction,
          points: calculatePoints(transaction.amountSpent)
        }));
 
        setTransactions(updatedTransactions); // Update state with new transactions
      } catch (error) {
        setError('Failed to load transactions.');
      } finally {
        setLoading(false);
      }
    };
 
    fetchTransactions();
  }, []);
 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
 
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
              <td>${transaction.amountSpent.toFixed(2)}</td> 
              <td>{transaction.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
 
export default RewardPointsCalculator;