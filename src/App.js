import React, { useState, useEffect } from 'react';
import transactionsData from './transactionData';
import './styles.css';
 
const RewardPointsCalculator = () => {
  const [transactions, setTransactions] = useState([]);
 
  useEffect(() => {
    // Calculate reward points and update state
    const calculatePoints = (amount) => {
      if (amount > 100) {
        return (amount - 100) * 2 + 50; // 2 points for every dollar over $100 + 1 point for every dollar between $50 and $100
      } else if (amount > 50) {
        return amount - 50; // 1 point for every dollar between $50 and $100
      }
      return 0;
    };
 
    const updatedTransactions = transactionsData.map((transaction) => ({
      ...transaction,
      points: calculatePoints(transaction.amountSpent)
    }));
 
    setTransactions(updatedTransactions); // Update state with new transactions
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
              <td>${transaction.amountSpent}</td>
              <td>{transaction.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
 
export default RewardPointsCalculator;






// Implementation with pagination below

// import React, { useState, useEffect } from 'react';
// import transactionsData from './transactionData';
// import './styles.css'; 
 
// const RewardPointsCalculator = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const transactionsPerPage = 10;
 
//   useEffect(() => {
//     // Calculate reward points and update state
//     const calculatePoints = (amount) => {
//       if (amount > 100) {
//         return (amount - 100) * 2 + 50; // 2 points for every dollar over $100 + 1 point for every dollar between $50 and $100
//       } else if (amount > 50) {
//         return amount - 50; // 1 point for every dollar between $50 and $100
//       }
//       return 0;
//     };
 
//     const updatedTransactions = transactionsData.map((transaction) => ({
//       ...transaction,
//       points: calculatePoints(transaction.amountSpent)
//     }));
 
//     setTransactions(updatedTransactions); // Update state with new transactions
//   }, []);
 
//   // Calculate the transactions to display based on current page
//   const indexOfLastTransaction = currentPage * transactionsPerPage;
//   const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
//   const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
 
//   // Handle pagination
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(transactions.length / transactionsPerPage); i++) {
//     pageNumbers.push(i);
//   }
 
//   return (
//     <div>
//       <h2>Reward Points Summary</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Customer ID</th>
//             <th>Transaction ID</th>
//             <th>Amount Spent</th>
//             <th>Points</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentTransactions.map((transaction) => (
//             <tr key={transaction.transactionId}>
//               <td>{transaction.customerId}</td>
//               <td>{transaction.transactionId}</td>
//               <td>{transaction.amountSpent}</td>
//               <td>{transaction.points}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="pagination">
//         {pageNumbers.map((number) => (
//           <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
//             {number}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };
 
// export default RewardPointsCalculator;

