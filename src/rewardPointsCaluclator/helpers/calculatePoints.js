// 2 points for every dollar over $100 + 1 point for every dollar between $50 and $100
// 1 point for every dollar between $50 and $100
const calculatePoints = (amount) => {
    return Math.round(amount > 100 ? (amount - 100) * 2 + 50 : amount > 50 ? amount - 50 : 0);

};

const processTransactions = (data) => {
    // Calculate points for each transaction
    const transactionsWithPoints = data.map((transaction) => ({
        ...transaction,
        points: calculatePoints(transaction.amountSpent),
    }));

    // Group transactions by customer and month
    const customerPoints = transactionsWithPoints.reduce((acc, transaction) => {
        const date = new Date(transaction.transactionDate);
        const month = date.getMonth() + 1; // JavaScript months are 0-11, so we add 1
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

    // Summarize points per month and total for each customer
    const summarizedTransactions = Object.values(customerPoints);
    const totalPoints = summarizedTransactions.reduce((acc, transaction) => {
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