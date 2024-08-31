// Filter transactions based on date range
export const filterTransactionsByDate = (transactions, startDate, endDate) => {
  if (!startDate || !endDate) return transactions;

  const start = new Date(startDate);
  const end = new Date(endDate);

  return transactions.filter(customer =>
      customer.monthlyPoints.some(pointData =>
          pointData.transactions.some(t => {
              const transactionDate = new Date(t.transactionDate);
              return transactionDate >= start && transactionDate <= end;
          })
      )
  );
};

// Format month number to month name
export const formatMonth = (month) => {
  return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(0, month - 1));
};

// Sort customer rewards based on configuration
export const sortCustomerRewards = (customerRewards, { key, direction }) => {
  return customerRewards.sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
  });
};

// Aggregate transactions based on the specified level
export const aggregateTransactions = (transactions, { aggregateAll = false } = {}) => {
    return transactions.flatMap(customer =>
      customer.monthlyPoints.flatMap(pointData => {
        const totalPoints = pointData.transactions.reduce(
          (acc, transaction) => acc + transaction.points,
          0
        );
        const year = new Date(pointData.transactions[0].transactionDate).getFullYear();
   
        // Return either all transactions or aggregated monthly data
        return aggregateAll
          ? pointData.transactions.map(transaction => ({
              customerId: customer.customerId,
              customerName: customer.customerName,
              month: pointData.month,
              year,
              ...transaction
            }))
          : [{
              customerId: customer.customerId,
              customerName: customer.customerName,
              month: pointData.month,
              year,
              totalPoints
            }];
      })
    );
  };

// Filter and sort aggregated transactions
export const filterAndSortTransactions = (aggregatedTransactions, selectedMonth, selectedYear) => {
  return aggregatedTransactions
      .filter(transaction =>
          (!selectedMonth || transaction.month === parseInt(selectedMonth)) &&
          (!selectedYear || transaction.year === parseInt(selectedYear))
      )
      .sort((a, b) => a.year !== b.year ? b.year - a.year : b.month - a.month);
};

// Get customer rewards based on the last three unique months
export const getCustomerRewardsForLastThreeMonths = (transactions) => {
    // Compute last three unique months
    const months = transactions
      .flatMap(customer => customer.monthlyPoints)
      .map(pointData => {
        const date = new Date(pointData.transactions[0].transactionDate);
        return { month: date.getMonth() + 1, year: date.getFullYear() };
      });
   
    const uniqueMonths = Array.from(
      new Set(months.map(m => `${m.year}-${m.month}`))
    ).map(dateStr => {
      const [year, month] = dateStr.split('-').map(Number);
      return { month, year };
    });
   
    uniqueMonths.sort((a, b) => a.year !== b.year ? b.year - a.year : b.month - a.month);
   
    const lastThreeMonths = uniqueMonths.slice(0, 3);
   
    // Aggregate rewards based on the last three months
    return transactions.map(customer => {
      const totalPoints = customer.monthlyPoints.reduce((acc, pointData) => {
        const transactionDate = new Date(pointData.transactions[0].transactionDate);
        const month = transactionDate.getMonth() + 1;
        const year = transactionDate.getFullYear();
   
        return lastThreeMonths.some(m => m.month === month && m.year === year)
          ? acc + pointData.points
          : acc;
      }, 0);
   
      return {
        customerId: customer.customerId,
        customerName: customer.customerName,
        totalPoints
      };
    });
  };
  
