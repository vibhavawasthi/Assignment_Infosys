// Calculate reward points based on amount spent
const calculatePoints = (amount) => {
    return isNaN(amount) ? 0 : Math.round(amount > 100 ? (amount - 100) * 2 + 50 : amount > 50 ? amount - 50 : 0);
};

// Process transactions to calculate points and aggregate data
const processTransactions = (data) => {
    // Calculate points for each transaction
    const transactionsWithPoints = data.map((transaction) => ({
        ...transaction,
        points: calculatePoints(transaction.amountSpent),
    }));

    // Group transactions by customer, year, and month
    const customerPoints = transactionsWithPoints.reduce((acc, transaction) => {
        const date = new Date(transaction.transactionDate);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const key = `${transaction.customerId}-${year}-${month}`;

        if (!acc[key]) {
            acc[key] = {
                customerId: transaction.customerId,
                customerName: transaction.customerName,
                year,
                month,
                points: 0,
                transactions: [],
            };
        }
        acc[key].points += transaction.points;
        acc[key].transactions.push(transaction);
        return acc;
    }, {});

    // Summarize total points per customer
    const totalPoints = Object.values(customerPoints).reduce((acc, transaction) => {
        if (!acc[transaction.customerId]) {
            acc[transaction.customerId] = {
                customerId: transaction.customerId,
                customerName: transaction.customerName,
                totalPoints: 0,
                monthlyPoints: [],
            };
        }
        acc[transaction.customerId].totalPoints += transaction.points;
        acc[transaction.customerId].monthlyPoints.push(transaction);
        return acc;
    }, {});

    return Object.values(totalPoints);
};

module.exports = { calculatePoints, processTransactions };