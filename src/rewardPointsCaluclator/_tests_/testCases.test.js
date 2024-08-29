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