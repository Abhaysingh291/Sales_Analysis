// routes/sales.js
const express = require('express');
const router = express.Router();
const XLSX = require('xlsx');
const path = require('path');

// Function to aggregate data by year
function aggregateData(data,type) {
  const aggregatedData = {};
  // console.log(data);
  data.forEach((record) => {
    let query;
    if(type==="Year") query = record.Year; 
    else if(type==="Product_Category") query = record["Product Category"]; 
    const revenue = record["Sales Revenue"];
    const profit = record["Profit/Loss"];
    const salesUnits = record["Sales Units"];
    if (!aggregatedData[query]) {
      // If not, initialize it with zeros for revenue, profit, and sales units
      aggregatedData[query] = {
        revenue: 0,
        profit: 0,
        salesUnits: 0,
      };
    }

    // Add the revenue, profit, and sales units to the aggregated data for the respective year
    aggregatedData[query].revenue += revenue;
    if(profit==="Profit"){
    aggregatedData[query].profit += 1;}
    else {
      aggregatedData[query].profit -= 1;
    }
    aggregatedData[query].salesUnits += salesUnits;
  });
  console.log(aggregatedData);
  return aggregatedData;
}




router.get('/sales', async (req, res) => {
    try {
        // Load the Excel file
        const parentDir = path.resolve(__dirname, '..'); // Navigate one folder back
        const filePath = path.join(parentDir, 'data', 'DataSet.xlsx');
        const workbook = XLSX.readFile(filePath);
        // Get the first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        // Convert the worksheet to JSON format
        let data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Apply filters if provided in query parameters
        // console.log(req.query);

        const { Year: year, Region: region, 'Product Category': productCategory } = req.query;

        console.log(year + " " + region + " " + productCategory);


        console.log("row is" + data[1][10]);
        // Convert year to an integer using parseInt
        const yearInt = parseInt(year, 10);

        // Filter function to filter data based on year as an integer
        if (!isNaN(yearInt)) {
            data = data.filter(row => parseInt(row[10], 10) === yearInt);
        }
        if (region) data = data.filter(row => row[8] === region);
        if (productCategory) data = data.filter(row => row[2] === productCategory);
        // Log the filtered data to the console
        // console.log(data);

        // Send the filtered data as response
        res.json(data);
    } catch (error) {
        res.status(500).send(error);
    }
});

  
  router.get('/aggregateSales', async (req, res) => {
    try {
      const { type } = req.query; // Extract the aggregation type from the query parameters
      console.log(type);
      // Load the Excel file
      const parentDir = path.resolve(__dirname, '..'); // Navigate one folder back
      const filePath = path.join(parentDir, 'data', 'DataSet.xlsx');
      const workbook = XLSX.readFile(filePath);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet);
  
      let aggregatedData;
  
      // Perform aggregation based on the specified type
      switch (type) {
        case 'Year':
          aggregatedData = aggregateData(data,"Year");
          break;
        case 'Product_Category':
          aggregatedData = aggregateData(data,"Product_Category");
          break;
        // Add more cases for other aggregation types if needed
        default:
          // Handle invalid or unsupported aggregation types
          return res.status(400).json({ error: 'Invalid aggregation type' });
      }
  
      // Send the aggregated data as the response
      console.log(aggregatedData);
      res.json(aggregatedData);
    } catch (error) {
      console.error('Error aggregating sales data:', error);
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  });
  
module.exports = router;
