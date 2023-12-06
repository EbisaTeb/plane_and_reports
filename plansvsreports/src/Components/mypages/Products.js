// import React, { useState, useEffect } from 'react';
// import '../../App.css';
// import axios from 'axios';

// export default function Products() {
//   const [tables, setTables] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');



 
//   const fetchTableData = () => {
//     axios
//       .get('http://localhost:3000/api/get-tables') // Make sure the URL matches your backend server address
//       .then((response) => {
//         console.log(response.data); // Optional: Display the fetched data in the console
//         // Set the fetched table data in your component state, for example:
//         // setTables(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching table data:', error);
//       });
//   };

//   // Call fetchTableData to fetch data when the component mounts
//   useEffect(() => {
//     fetchTableData();
//   }, []);

//   return (
//     <div className="container">
//       <h1 className="products">PRODUCTS</h1>
//       {tables.map((table) => (
//         <div key={table.id} className="mt-4">
//           <h2>{table.fileName}</h2>
//           <table className="table">
//             <thead>
//               <tr>
//                 {table.columns.map((column) => (
//                   <th key={column.id} scope="col">
//                     {column.title}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {table.rows.map((row) => (
//                 <tr key={row.id}>
//                   {row.cells.map((cell, index) => (
//                     <td key={index} className={`table-cell ${index === 0 ? 'normal-cell' : ''}`}>
//                       {cell}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ))}
//       {errorMessage && <div className="error-message">{errorMessage}</div>}
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import '../../App.css';
// import axios from 'axios';

// export default function Products() {
//   const [tables, setTables] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');

//   const fetchTableData = () => {
//     axios
//       .get('http://localhost:3000/api/get-tables') // Make sure the URL matches your backend server address
//       .then((response) => {
//         setTables(response.data); // Save the fetched data in the state
//       })
//       .catch((error) => {
//         console.error('Error fetching table data:', error);
//         setErrorMessage('Error fetching table data.');
//       });
//   };

//   useEffect(() => {
//     fetchTableData();
//   }, []);

//   return (
//     <div className="container">
//       <h1 className="products">PRODUCTS</h1>
//       {tables.map((table) => (
//         <div key={table.id} className="mt-4">
//           <h2>{table.fileName}</h2>
//           <table className="table">
//             <thead>
//               <tr>
//                 {table.columns.map((column) => (
//                   <th key={column.id} scope="col">
//                     {column.title}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {table.rows.map((row) => (
//                 <tr key={row.id}>
//                   {row.cells.map((cell, index) => (
//                     <td key={index} className={`table-cell ${index === 0 ? 'normal-cell' : ''}`}>
//                       {cell}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ))}
//       {errorMessage && <div className="error-message">{errorMessage}</div>}
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Products() {
//   const [tables, setTables] = useState([]);

//   useEffect(() => {
//     // Fetch data from the API endpoint
//     axios.get('http://localhost:3000/api/get-tables')
//       .then(response => {
//         setTables(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []); // Empty dependency array to run the effect only once

//   const handleTextareaChange = (event) => {
//     event.target.style.height = 'auto';
//     event.target.style.height = `${event.target.scrollHeight}px`;
//   };

//   const handleEditHeader = (columnId) => {
//     if (columnId !== 1) {
//       // Implement your logic for editing the header here
//     }
//   };

//   const handleHeaderTextareaInput = (event) => {
//     const textarea = event.target;
//     textarea.style.height = 'auto';
//     textarea.style.height = `${textarea.scrollHeight}px`;
//   };

//   return (
//     <div className="container mt-4">
//       {tables.map(table => (
//         <div key={table.id} className="mt-4">
//           <table className="table">
//             <thead>
//               <tr>
//                 {table.columns.map(column => (
//                   <th key={column.id} scope="col" className="th">
//                     {column.title}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {table.rows.map(row => (
//                 <tr key={row.id}>
//                   {row.cells.map((cell, index) => (
//                     <td key={index} className={`table-cell ${index === 0 ? 'normal-cell' : ''}`}>
//                       {cell}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Products;
import React from 'react'

function Products() {
  return (
    <div>Products</div>
  )
}

export default Products

