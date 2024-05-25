const AggregateTable = ({ data, type }) => {
    // Check if data is undefined or null
    console.log("data is "+data); 
    // if (!data ) {
    //   return <div>No data available</div>;
    // }
  
    return (
      <div>
        <h1>Aggregated Sales Data</h1>
        <table>
          <thead>
            <tr>
              <th>{type}</th>
              <th>Revenue</th>
              <th>Profit</th>
              <th>Sales Units</th>
            </tr>
          </thead>
          <tbody>
            {console.log(data)}
            {data&&Object.entries(data).map(([Atype, { revenue, profit, salesUnits }]) => (
              <tr key={Atype}>
                <td>{Atype}</td>
                <td>{revenue}</td>
                <td>{profit}</td>
                <td>{salesUnits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default AggregateTable;
  