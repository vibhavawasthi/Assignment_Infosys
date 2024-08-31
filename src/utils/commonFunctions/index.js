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

// Filter and aggregate transactions by customer for the last three months
export const customerRewards = (transactions) => {
    const lastThreeMonths = getLastThreeMonths(transactions);
   
    return transactions.map((customer) => {
      const totalPoints = customer.monthlyPoints.reduce((acc, pointData) => {
        const transactionDate = new Date(pointData.transactions[0].transactionDate);
        const month = transactionDate.getMonth() + 1;
        const year = transactionDate.getFullYear();
   
        const isInLastThreeMonths = lastThreeMonths.some(
          (monthYear) => monthYear.month === month && monthYear.year === year
        );
   
        return isInLastThreeMonths ? acc + pointData.points : acc;
      }, 0);
   
      return {
        customerId: customer.customerId,
        customerName: customer.customerName,
        totalPoints,
      };
    });
  };

  export const sortCustomerRewards = (customerRewards, sortConfig) => {
    return customerRewards?.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

// Aggregate transactions by customer, month, and year
  export function aggregateTransactions(transactions) {
    return transactions.flatMap((customer) =>
      customer.monthlyPoints.map((pointData) => {
        const totalPoints = pointData.transactions.reduce(
          (acc, transaction) => acc + transaction.points,
          0
        );
        const year = new Date(pointData.transactions[0].transactionDate).getFullYear();
        return {
          customerId: customer.customerId,
          customerName: customer.customerName,
          month: pointData.month,
          year,
          totalPoints,
        };
      })
    );
  }

  export function filterAndSortTransactions(aggregatedTransactions, selectedMonth, selectedYear) {
    return aggregatedTransactions
      .filter((transaction) => {
        return (
          (selectedMonth ? transaction.month === parseInt(selectedMonth) : true) &&
          (selectedYear ? transaction.year === parseInt(selectedYear) : true)
        );
      })
      .sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return b.month - a.month;
      });
  }

  export function aggregateAllTransactions(transactions) {
    return transactions.flatMap((customer) =>
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
  }
 
  
