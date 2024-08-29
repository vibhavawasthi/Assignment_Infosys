import React from 'react';
 
const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tab-container">
    <div className='tab-buttons'>
      <button
        className={activeTab === 'allTransactions' ? 'active' : ''}
        onClick={() => setActiveTab('allTransactions')}
      >
        All Transactions
      </button>
      <button
        className={activeTab === 'monthlyTransactions' ? 'active' : ''}
        onClick={() => setActiveTab('monthlyTransactions')}
      >
        Monthly Transactions
      </button>
      <button
        className={activeTab === 'totalRewards' ? 'active' : ''}
        onClick={() => setActiveTab('totalRewards')}
      >
        Total Rewards (Last Three Months)
      </button>
      </div>
    </div>
  );
};
 
export default Tabs;