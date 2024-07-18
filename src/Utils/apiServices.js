const fetchTransactions = async () => {
  try {
    const response = await fetch('/transactionData.json');
    if (!response.ok) {
      let errorMessage = `Error: ${response.status} ${response.statusText}`;
      switch (response.status) {
        case 404:
          errorMessage = 'Error 404: Transaction data not found.';
          break;
        case 500:
          errorMessage = 'Error 500: Server error while fetching transaction data.';
          break;
        default:
          errorMessage = `Error ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error; // Re-throw the error to propagate it further if needed
  }
};
 
module.exports = { fetchTransactions };