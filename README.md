# Reward points calculator

Project created using [Create React App](https://github.com/facebook/create-react-app).

## Problem statement

A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.  

A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent between $50 and $100 in each transaction. 

(e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points). 
  
Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total. 

**Assumption:- The record could be of many years so displaying the records of the latest three months in descending order and combined points as per customer ID for the last three months.**

## Running the project

### Clone the project from github repository

`https://github.com/vibhavawasthi/Assignment_Infosys`

### Install the dependencies

`npm install`

### Run the app in development mode.

### Run the app in development mode.

`npm start`

### Launch the test runner.

`npm test`

The testcases file can be found in '/workspaces/Assign/src/RewardPointsCaluclator/_tests_/testCases.test.js'

 The code has passed below test cases

![App Screenshot](https://drive.google.com/uc?export=view&id=1CaEhL5LDnktUFLKAWHCudrsk9r4RtNzw)
calculatePoints function

    ✓ should handle negative amount
    
    ✓ should handle decimal amount
    
    ✓ should handle large amount like 1,000,000
    
    ✓ should calculate points correctly for amount over $100 (2 ms)
    
    ✓ should calculate points correctly for amount between $50 and $100

    ✓ should calculate points correctly for amount exactly $50
    
    ✓ should handle amount less than $50
    
  processTransactions function
  
    ✓ should process transactions and calculate points correctly (1 ms)
    
    ✓ should handle empty transactions array
  fetchTransactions
  
    ✓ should fetch transaction data successfully (1 ms)
    
    ✓ should handle 404 error (49 ms)
    
    ✓ should handle 500 error (3 ms)
    
    ✓ should handle other fetch errors (2 ms)
    
    ✓ should handle network errors (3 ms)
    
### Build the app for production to the `build` folder.

`npm run build`

## Screen shots of application

### Application running state

**Assumption:- The record could be of many years so displaying the records of the latest three months in descending order and combined points as per customer ID for the last three months.**

![App Screenshot](https://drive.google.com/uc?export=view&id=1xFvFC9qrBn2K3ni5ud1FbI8O_6yPyleH)

### Application loading state

![App Screenshot](https://drive.google.com/uc?export=view&id=1VHHDyIor65M3wWUaE2ls_RYtZ5P1iO2X)

### Application error 

![App Screenshot](https://drive.google.com/uc?export=view&id=1wQAwnY08F9VcGfSqO3i804NpK64QeJi3)

## Sample data

To modify the json-server data, make changes to the file in public/transactionData.json

![App Screenshot](https://drive.google.com/uc?export=view&id=1Xpvkbc5DTyCpvDRtnIykszuI66WyMjM7)

### Flow Diagram
![App Screenshot](https://drive.google.com/uc?export=view&id=1CJqXOA0MNgqJiPn_l3-BgXZLNo4kwUdj)


## Credits
List of contributors:
- Vibhav Awasthi - Developer (vibhavawasthi54@gmail.com)
