import React, { useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
 
const Marketing = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Function to fetch data from the API
  const fetchDataFromAPI = async () => {
   try {
      const response = await fetch("http://localhost:3000/api/get-tables");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setTableData(jsonData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);


  // Function to generate the table HTML based on the JSON data
  const generateTable = (tableData) => {
    const columns = JSON.parse(tableData.columns);
    const rows = JSON.parse(tableData.rows);

    if (!Array.isArray(columns) || !Array.isArray(rows)) {
      return null; // If data is not in the expected format, return null
    }

    return (
      <div className="table table-bordered border-primary  " key={tableData.id}>
        <h2>{tableData.fileName}</h2>
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.id}>{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {row.cells.map((cellData, index) => (
                  <td key={index}>{cellData}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );



  };

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div>{tableData.map((table) => generateTable(table))}</div>;
};

export default Marketing;
