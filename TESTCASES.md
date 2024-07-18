                                               Documentation for Test Cases 


                                            Test Case 1: Fetching Transactions 

      Test ID: TC01 

      Test Name: Fetch Transactions Data 

      Objective: Ensure that the transaction data is fetched correctly from the JSON file. 

      Steps: 

  1. Launch the application. 

  2. Verify that the application attempts to fetch the data from `transactionData.json`. 

      Expected Result: The transaction data should be successfully fetched without errors. 

      Actual Result: The data is fetched. 

      Status: Pass 

 

 

 

                                   Test Case 2: Calculating Points for a Single Transaction 

      Test ID: TC02 

      Test Name: Calculate Points for Single Transaction 

      Objective: Ensure that reward points are calculated correctly for a single transaction. 

      Steps: 

  1. Provide a sample transaction amount (e.g., $120). 

  2. Calculate the points manually: (120-100) * 2 + 50 = 90 points. 

  3. Verify the application's calculation. 

      Expected Result: The calculated points should match the manual calculation. 

      Actual Result: 90 

      Status: Pass 

  

 

 

                                  Test Case 3: Calculating Points for Multiple Transactions 

      Test ID: TC03 

      Test Name: Calculate Points for Multiple Transactions 

      Objective: Ensure that reward points are calculated correctly for multiple transactions and grouped by customer and month. 

      Steps: 

  1. Provide multiple sample transactions for different customers and months. 

  2. Calculate the points manually for each transaction and sum them up by customer and month. 

  3. Verify the application's calculation. 

      Expected Result: The calculated points for each customer and month should match the manual calculations. 

      Actual Result: Fulfilled 

      Status: Pass 

  

 

 

 

 

                                              Test Case 4: Displaying Transactions in Table 

      Test ID: TC04 

      Test Name: Display Transactions in Table 

      Objective: Ensure that transactions are displayed correctly in the table with all details. 

      Steps: 

  1. Provide sample transaction data. 

  2. Verify that the table displays transaction ID, customer ID, amount spent, transaction date, and points correctly. 

      Expected Result: The table should display all transaction details correctly. 

      Actual Result: It is displaying 

      Status: Pass 

  

 

 

 

 

 

                                        Test Case 5: Displaying Monthly and Combined Points 

      Test ID: TC05 

      Test Name: Display Monthly and Combined Points 

      Objective: Ensure that the monthly and combined points are displayed correctly for each customer. 

      Steps: 

  1. Provide sample transaction data. 

  2. Verify that the application displays separate tables for each month and a combined table for all three months. 

  3. Verify the points in each table. 

      Expected Result: The monthly and combined points should be displayed correctly for each customer. 

      Actual Result: It is displaying 

      Status: Pass 

 
