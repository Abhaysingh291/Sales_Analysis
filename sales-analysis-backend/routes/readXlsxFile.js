const XLSX = require('xlsx');
const path = require('path');

// Path to the XLSX file
const parentDir = path.resolve(__dirname, '..'); // Navigate one folder back
const filePath = path.join(parentDir, 'data', 'DataSet.xlsx');

const workbook = XLSX.readFile(filePath);

// Get the first sheet
const firstSheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[firstSheetName];

// Convert the worksheet to JSON format
const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

// Log the data to the console
console.log(data);
