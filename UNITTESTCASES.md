                                          1. Fetch Transactions API Call
 
    Test Case ID: TC01    
    Description: Verify that the fetchTransactions API call retrieves transaction data correctly.  
    Preconditions: `transactionData.json` file exists and contains valid transaction data.  
    Test Steps:
    1. Invoke the `fetchTransactions` function.
    2. Check if the response is successful.
    3. Verify that the returned data is in JSON format and contains transaction details.
 
    Expected Result: The API call should return a JSON object with transaction data.
 

 
                                             2. Calculate Points for Amount Spent
 
    Test Case ID: TC02  
    Description: Verify that points are calculated correctly based on the amount spent.  
    Preconditions: The `calculatePoints` function is available.  
    Test Steps:
    1. Call `calculatePoints` with `amount` = 120.
    2. Call `calculatePoints` with `amount` = 75.
    3. Call `calculatePoints` with `amount` = 45.
     
    Expected Result:
    1. For `amount` = 120, points should be 90 (2 * (120 - 100) + 50).
    2. For `amount` = 75, points should be 25 (75 - 50).
    3. For `amount` = 45, points should be 0.
 
 
                                      3. Process Transactions and Calculate Points
 
    Test Case ID: TC03  
    Description: Verify that transactions are processed correctly and points are calculated for each transaction.  
    Preconditions: The `processTransactions` function is available.  
    Test Steps:
    1. Prepare a sample transaction data array:
       ```json
       [
         {
        "transactionId": "T004",
        "customerId": "C002",
        "customerName": "Jane Smith",
        "amountSpent": 200,
        "transactionDate": "2023-05-05"
      },{
        "transactionId": "T005",
        "customerId": "C001",
        "customerName": "John Doe",
        "amountSpent": 90,
        "transactionDate": "2023-06-07"
      },{
        "transactionId": "T006",
        "customerId": "C002",
        "customerName": "Jane Smith",
        "amountSpent": 300,
        "transactionDate": "2023-06-10"
      },
       ]
       ```
    2. Call `processTransactions` with the sample data.
    3. Verify that the returned object contains the correct points for each customer and each month.
     
    Expected Result: The returned object should contain the correct points for each customer and each month.
 

 
                                      4. Group Transactions by Customer and Month
 
    Test Case ID: TC04  
    Description: Verify that transactions are grouped by customer and month correctly.  
    Preconditions:** The `processTransactions` function is available.  
    Test Steps:**
    1. Prepare a sample transaction data array:
       ```json
       [
         {
        "transactionId": "T004",
        "customerId": "C002",
        "customerName": "Jane Smith",
        "amountSpent": 200,
        "transactionDate": "2023-05-05"
      },
      {
        "transactionId": "T005",
        "customerId": "C001",
        "customerName": "John Doe",
        "amountSpent": 90,
        "transactionDate": "2023-06-07"
      },
      {
        "transactionId": "T006",
        "customerId": "C002",
        "customerName": "Jane Smith",
        "amountSpent": 300,
        "transactionDate": "2023-06-10"
      }
       ]
       ```
    2 Call `processTransactions` with the sample data.
    3. Verify that the transactions are grouped correctly by customer and month.
     
    Expected Result: Transactions should be grouped correctly by customer and month.
 
---
 
                                             5. Summarize Points per Month
 
    Test Case ID: TC05  
    Description: Verify that points are summarized correctly per month for each customer.  
    Preconditions: The `processTransactions` function is available.  
    Test Steps:
    1. Prepare a sample transaction data array:
       ```json
       [
          {
        "transactionId": "T004",
        "customerId": "C002",
        "customerName": "Jane Smith",
        "amountSpent": 200,
        "transactionDate": "2023-05-05"
      },
      {
        "transactionId": "T005",
        "customerId": "C001",
        "customerName": "John Doe",
        "amountSpent": 90,
        "transactionDate": "2023-06-07"
      },
      {
        "transactionId": "T006",
        "customerId": "C002",
        "customerName": "Jane Smith",
        "amountSpent": 300,
        "transactionDate": "2023-06-10"
      }
       ]
       ```
    2. Call `processTransactions` with the sample data.
    3. Verify that the points are summarized correctly per month for each customer.
     
    Expected Result: Points should be summarized correctly per month for each customer.
     
---
 
                                          6. Calculate Total Points for Each Customer
 
    Test Case ID: TC06  
    Description: Verify that total points are calculated correctly for each customer.  
    Preconditions: The `processTransactions` function is available.  
    Test Steps:
    1. Prepare a sample transaction data array:
       ```json
       [
          {
        "transactionId": "T004",
        "customerId": "C002",
        "customerName": "Jane Smith",
        "amountSpent": 200,
        "transactionDate": "2023-05-05"
      },
      {
        "transactionId": "T005",
        "customerId": "C001",
        "customerName": "John Doe",
        "amountSpent": 90,
        "transactionDate": "2023-06-07"
      },
      {
        "transactionId": "T006",
        "customerId": "C002",
        "customerName": "Jane Smith",
        "amountSpent": 300,
        "transactionDate": "2023-06-10"
      }
       ]
       ```
    2. Call `processTransactions` with the sample data.
    3. Verify that the total points are calculated correctly for each customer.
     
    Expected Result: Total points should be calculated correctly for each customer.
     
---
 
                                                     7. Handle No Transactions
 
    Test Case ID: TC07  
    Description: Verify that the functions handle cases with no transactions correctly.  
    Preconditions: The `fetchTransactions` and `processTransactions` functions are available.  
    Test Steps:
    1. Call `processTransactions` with an empty array.
    2. Verify that the returned object is empty.
     
    Expected Result: The returned object should be empty.
 
---
 
                                                        8. Handle Invalid Amounts
 
    Test Case ID: TC08  
    Description: Verify that the functions handle invalid amounts correctly.  
    Preconditions: The `calculatePoints` function is available.  
    Test Steps:
    1. Call `calculatePoints` with `amount` = -10.
    2. Call `calculatePoints` with `amount` = null.
    3. Call `calculatePoints` with `amount` = undefined.
     
    Expected Result:
    1. For `amount` = -10, points should be 0.
    2. For `amount` = null, points should be 0.
    3. For `amount` = undefined, points should be 0.
 
---
 
                                                9. Handle Different Date Formats
 
    Test Case ID: TC09  
    Description: Verify that the functions handle different date formats correctly.  
    Preconditions: The `processTransactions` function is available.  
    Test Steps:
    1. Prepare a sample transaction data array with different date formats:
       ```json
       [
          {
        "transactionId": "T004",
        "customerId": "C002",
        "customerName": "Jane Smith",
        "amountSpent": 200,
        "transactionDate": "2023-05-05"
      },
      {
        "transactionId": "T005",
        "customerId": "C001",
        "customerName": "John Doe",
        "amountSpent": 90,
        "transactionDate": "2023-06-07"
      },
      {
        "transactionId": "T006",
        "customerId": "C002",
        "customerName": "Jane Smith",
        "amountSpent": 300,
        "transactionDate": "2023-06-10"
      }
       ]
       ```
    2. Call `processTransactions` with the sample data.
    3. Verify that the transactions are processed correctly.
     
    Expected Result: Transactions should be processed correctly, regardless of date format.
 
---
 
                                                    10. Handle Large Amounts
 
    Test Case ID: TC10  
    Description: Verify that the functions handle large amounts correctly.  
    Preconditions: The `calculatePoints` function is available.  
    Test Steps:
    1. Call `calculatePoints` with `amount` = 1000000.
    2. Verify the points calculation.
     
    Expected Result: Points should be calculated correctly for large amounts.
     
---
 
                                             11. Handle Large Number of Transactions
 
    Test Case ID: TC11  
    Description: Verify that the functions handle a large number of transactions correctly.  
    Preconditions: The `fetchTransactions` and `processTransactions` functions are available.  
    Test Steps:
    1. Prepare a sample transaction data array with a large number of transactions.
    2. Call `processTransactions` with the sample data.
    3. Verify that the transactions are processed correctly.
     
    Expected Result: Transactions should be processed correctly, even with a large number of transactions.
     
---
 
                                      12. Verify Points Calculation for Multiple Customers
 
    Test Case ID: TC12  
    Description: Verify that points are calculated correctly for multiple customers.  
    Preconditions: The `processTransactions` function is available.  
    Test Steps:
    1. Prepare a sample transaction data array for multiple customers:
       ```json
       [
          {
        "transactionId": "T004",
        "customerId": "C002",
        "customerName": "Jane Smith",
        "amountSpent": 200,
        "transactionDate": "2023-05-05"
      },
      {
        "transactionId": "T005",
        "customerId": "C001",
        "customerName": "John Doe",
        "amountSpent": 90,
        "transactionDate": "2023-06-07"
      },
      {
        "transactionId": "T006",
        "customerId": "C002",
        "customerName": "Jane Smith",
        "amountSpent": 300,
        "transactionDate": "2023-06-10"
      }
       ]
       ```
    2. Call `processTransactions` with the sample data.
    3. Verify that the points are calculated correctly for each customer.
