import React from 'react';
import './SalesTable.css';

const SalesTable = ({ sales }) => {
    return (
        <table className="sales-table">
            <thead>
                <tr>
                    <th>Customer Name</th>
                    <th>Products</th>
                    <th>Product Category</th>
                    <th>Sales Price</th>
                    <th>Sales Units</th>
                    <th>Sales Revenue</th>
                    <th>Cost of Sales</th>
                    <th>Profit or Loss</th>
                    <th>Geography</th>
                    <th>Country</th>
                    <th>Year</th>
                    <th>Quarter</th>
                    <th>Month</th>
                </tr>
            </thead>
            <tbody>
                {/* {console.log(sales)} */}
                {sales.map((sale, index) => (
                    <tr key={index}>
                        <td>{sale[0]}</td>
                        <td>{sale[1]}</td>
                        <td>{sale[2]}</td>
                        <td>{sale[3]}</td>
                        <td>{sale[4]}</td>
                        <td>{sale[5]}</td>
                        <td>{sale[6]}</td>
                        <td>{sale[7]}</td>
                        <td>{sale[8]}</td>
                        <td>{sale[9]}</td>
                        <td>{sale[10]}</td>
                        <td>{sale[11]}</td>
                        <td>{sale[12]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SalesTable;
