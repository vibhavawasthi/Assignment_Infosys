const { calculatePoints, processTransactions } = require('../helpers/calculatePoints');
const { fetchTransactions } = require('../../utils/services/apiServices');

// Mock data for testing
describe('calculatePoints function', () => {
  it('should calculate points correctly for amount over $100', () => {
      const points = calculatePoints(120);
      expect(points).toBe(90); // (120 - 100) * 2 + 50 = 90 points
  });

  it('should calculate points correctly for amount between $50 and $100', () => {
      const points = calculatePoints(75);
      expect(points).toBe(25); // 75 - 50 = 25 points
  });

  it('should calculate points correctly for amount exactly $50', () => {
      const points = calculatePoints(50);
      expect(points).toBe(0); // 50 does not give any points
  });

  it('should handle amount less than $50', () => {
      const points = calculatePoints(30);
      expect(points).toBe(0); // 30 does not give any points
  });


  it('should handle decimal amount', () => {
      const points = calculatePoints(75.50);
      expect(points).toBe(26); // 75.50 - 50 = 25.50 points
  });

  it('should handle large amount like 1,000,000', () => {
      const points = calculatePoints(1000000);
      expect(points).toBe(1999850); // 1,000,000 - 100 = 999,900 * 2 + 50 = 1,999,850 points
  });
});

describe('processTransactions function', () => {
  it('should process transactions and calculate points correctly', () => {
      const transactions = [
          { customerId: 1, customerName: 'John Doe', amountSpent: 120, transactionDate: '2024-07-01' },
          { customerId: 1, customerName: 'John Doe', amountSpent: 60, transactionDate: '2024-07-02' },
          { customerId: 2, customerName: 'Jane Smith', amountSpent: 200, transactionDate: '2024-07-03' },
          { customerId: 1, customerName: 'John Doe', amountSpent: 1000000, transactionDate: '2024-08-01' },
          { customerId: 1, customerName: 'John Doe', amountSpent: 75.50, transactionDate: '2024-08-02' },
      ];

      const expectedResult = [
          {
              customerId: 1,
              customerName: 'John Doe',
              totalPoints: 1999975.5,
              monthlyPoints: [
                  {
                      customerId: 1,
                      customerName: 'John Doe',
                      year: 2024,
                      month: 7,
                      points: 100, // 120 gives 90, 60 gives 10
                      transactions: [
                          { customerId: 1, customerName: 'John Doe', amountSpent: 120, transactionDate: '2024-07-01', points: 90 },
                          { customerId: 1, customerName: 'John Doe', amountSpent: 60, transactionDate: '2024-07-02', points: 10 }
                      ]
                  },
                  {
                      customerId: 1,
                      customerName: 'John Doe',
                      year: 2024,
                      month: 8,
                      points: 1999875.5, // 1000000 gives 1999850, 75.50 gives 25.50
                      transactions: [
                          { customerId: 1, customerName: 'John Doe', amountSpent: 1000000, transactionDate: '2024-08-01', points: 1999850 },
                          { customerId: 1, customerName: 'John Doe', amountSpent: 75.50, transactionDate: '2024-08-02', points: 25.50 }
                      ]
                  }
              ]
          },
          {
              customerId: 2,
              customerName: 'Jane Smith',
              totalPoints: 250, // 200 gives 250
              monthlyPoints: [
                  {
                      customerId: 2,
                      customerName: 'Jane Smith',
                      year: 2024,
                      month: 7,
                      points: 250, // 200 gives 250
                      transactions: [
                          { customerId: 2, customerName: 'Jane Smith', amountSpent: 200, transactionDate: '2024-07-03', points: 250 }
                      ]
                  }
              ]
          }
      ];

      const result = processTransactions(transactions);
      expect(result).toEqual(expectedResult);
  });

  it('should handle empty transactions array', () => {
      const transactions = [];
      const result = processTransactions(transactions);
      expect(result).toEqual([]); // Empty array should result in empty output
  });
});
 
describe('fetchTransactions', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });
 
  afterEach(() => {
    jest.resetAllMocks();
  });
 
  it('should fetch transaction data successfully', async () => {
    const mockData = [{ id: 1, amountSpent: 120 }];
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });
 
    const data = await fetchTransactions();
    expect(data).toEqual(mockData);
  });
 
  it('should handle 404 error', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });
 
    await expect(fetchTransactions()).rejects.toThrow('Error 404: Transaction data not found.');
  });
 
  it('should handle 500 error', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });
 
    await expect(fetchTransactions()).rejects.toThrow('Error 500: Server error while fetching transaction data.');
  });
 
  it('should handle other fetch errors', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
      statusText: 'Forbidden',
    });
 
    await expect(fetchTransactions()).rejects.toThrow('Error 403: Forbidden');
  });
 
  it('should handle network errors', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network Error'));
 
    await expect(fetchTransactions()).rejects.toThrow('Network Error');
  });
})