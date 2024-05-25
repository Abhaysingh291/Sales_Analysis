// components/DimensionSelector.js
import React, { useState } from 'react';

const DimensionSelector = ({ dimensions, onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleChange = (event, dimensionName) => {
    const { value } = event.target;
    setSelectedFilters({ ...selectedFilters, [dimensionName]: value });
  };

  const handleApplyFilters = () => {
    onFilterChange(selectedFilters);
  };

  return (
    <div>
      {dimensions.map((dimension) => (
        <div key={dimension.name}>
          <label htmlFor={dimension.name}>{dimension.name}</label>
          <select
            id={dimension.name}
            name={dimension.name}
            onChange={(e) => handleChange(e, dimension.name)}
            value={selectedFilters[dimension.name] || 'All'}
          >
            {dimension.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default DimensionSelector;
