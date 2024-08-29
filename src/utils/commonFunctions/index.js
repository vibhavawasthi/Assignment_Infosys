  export const adjustPoints = (points) => {
    const decimalPart = points % 1;
    if (decimalPart <= 0.8) {
      return Math.floor(points);
    } else {
      return Math.ceil(points);
    }
  };

  // Function to get all unique months from the transaction data
  export const getAllMonths = (transactions) => {
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
 
    return uniqueMonths;
  };
  
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
 
  export const getLastQuarter = (transactions) => {
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
 
    const lastQuarterMonths = uniqueMonths.slice(0, 3);
    return lastQuarterMonths.length === 3 ? lastQuarterMonths : [];
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
 
  
