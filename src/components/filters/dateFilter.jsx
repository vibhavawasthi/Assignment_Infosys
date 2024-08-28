import React from 'react';
 
const DateFilter = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  return (
    <div className="date-filter">
      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
        />
      </label>
    </div>
  );
};
 
export default DateFilter;