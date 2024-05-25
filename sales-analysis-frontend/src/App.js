import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SalesTable from './components/SalesTable';
import AggregateTable from './components/AggregateTable';
import DimensionSelector from './components/DimensionSelector';

const App = () => {
  const [sales, setSales] = useState([]);
  const [aggregatedata, setAggregatedata] = useState([]);
  const [filters, setFilters] = useState({});
  const [aggregationType, setAggregationType] = useState('');

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sales', { params: filters });
        setSales(response.data);
       
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
      console.log(sales);
    };
    fetchSalesData();
    
    const fetchAggregatedSalesData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/aggregateSales', {
          params: { type: aggregationType }
        });
        setAggregatedata(response.data); // Set the aggregated data here
         // Log the updated aggregated data
      } catch (error) {
        console.error('Error fetching aggregated sales data:', error);
      }
    };

    if (aggregationType) {
      fetchAggregatedSalesData();
    }

  }, [filters, aggregationType]);

  console.log(sales);
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleAggregationTypeChange = (event) => {
    setAggregationType(event.target.value);
  };

  const years = Array.from({ length: 35 }, (_, index) => (1990 + index).toString());
  const dimensions = [
    {
      name: 'Year',
      options: ['All', ...years],
    },
    {
      name: 'Region',
      options: ['All', 'North', 'South', 'East', 'West', 'South West', 'South East', 'North West', 'North East'],
    },
    {
      name: 'Product Category',
      options: ['All', 'Women Fashion', 'Electronics', 'Men Fashion', 'Instant Food', 'Baby Care', 'Books', 'Ice Cream', 'Stationery', 'Beauty & Cosmetics', 'Oil', 'Health Supplements', 'Vegetables & Fruits', 'Dry Fruits', 'Dairy, Breads, Eggs', 'Bakery'],
    },
  ];

  return (
    <div>
      <h1>Sales Analysis</h1>
      <div>
        <label htmlFor="aggregationType">Aggregation Type: </label>
        <select id="aggregationType" onChange={handleAggregationTypeChange}>
          <option value="">Select Aggregation Type</option>
          <option value="Year">Time Period</option>
          <option value="geography">Geography</option>
          <option value="Product_Category">Product Categories</option>
          <option value="customerDemographics">Customer Demographics</option>
        </select>
      </div>
       <AggregateTable aggregatedata={aggregatedata} type={aggregationType} />
      <DimensionSelector dimensions={dimensions} onFilterChange={handleFilterChange} />
      <SalesTable sales={sales} />
    </div>
  );
};

export default App;
