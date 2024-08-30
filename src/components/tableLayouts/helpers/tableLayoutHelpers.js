import { getLastThreeMonths } from "../../../utils/commonFunctions";

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