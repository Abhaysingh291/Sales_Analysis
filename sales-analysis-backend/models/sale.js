// models/sale.js
const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    customerName: String,
    products: String,
    productCategory: String,
    salesPrice: Number,
    salesUnits: Number,
    salesRevenue: Number,
    costOfSales: Number,
    profitOrLoss: String,
    geography: String,
    country: String,
    year: Number,
    quarter: String,
    month: String,
});

module.exports = mongoose.model('Sale', SaleSchema);
