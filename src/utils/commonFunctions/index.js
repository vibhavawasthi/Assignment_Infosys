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

  export const formatMonth = (date) => {
    const options = { month: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(
      new Date(date.year, date.month - 1)
    );
  };

  export const adjustPoints = (points) => {
    const decimalPart = points % 1;
    if (decimalPart <= 0.8) {
      return Math.floor(points);
    } else {
      return Math.ceil(points);
    }
  };
