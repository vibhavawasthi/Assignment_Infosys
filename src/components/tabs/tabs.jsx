import React from 'react';
 
const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="tab-container">
      <div className='tab-buttons'>
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            className={activeTab === id ? 'active' : ''}
            onClick={() => setActiveTab(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
 
export default Tabs;