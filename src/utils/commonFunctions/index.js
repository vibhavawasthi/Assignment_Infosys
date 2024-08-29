import { useMemo } from "react";

// Helper function to get the last three unique months from the transactions data
 export const getLastThreeMonths = (transactions) => {
    const months = transactions
      .flatMap((customer) => customer.monthlyPoints)
      .map((transaction) => {
        const date = new Date(transaction.transactions[0].transactionDate);
        return { month: date.getMonth() + 1, year: date.getFullYear() };
      });
 
    const uniqueMonths = Array.from(
      new Set(months.map((m) => `${m.year}-${m.month}`))
    ).map((dateStr) => {
      const [year, month] = dateStr.split('-').map(Number);
      return { month, year };
    });
 
    uniqueMonths.sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });
 
    return uniqueMonths.slice(0, 3);
  };
 
   // Filter transactions based on date range
   export const filterTransactionsByDate = (transactions, startDate, endDate) => {
    if (!startDate || !endDate) return transactions;
 
    const start = new Date(startDate);
    const end = new Date(endDate);
 
    return transactions.filter((customer) =>
      customer.monthlyPoints.some((transaction) =>
        transaction.transactions.some(
          (t) => {
            const transactionDate = new Date(t.transactionDate);
            return transactionDate >= start && transactionDate <= end;
          }
        )
      )
    );
  };

  export const formatMonth = (month) => {
    const options = { month: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(
      new Date(0, month - 1)
    );
  };
 
  
