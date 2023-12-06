 import React, { useState, useRef } from 'react';
import './Services.css';
import axios from 'axios';
// import * as XLSX from 'xlsx';

function Services() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [fileNameInput, setFileNameInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Add this state variable

  
const [editedHeaderText, setEditedHeaderText] = useState({});
const [editingHeaderCell, setEditingHeaderCell] = useState(null);




  const [editingHeader, setEditingHeader] = useState(null);
  const [confirmDeleteTable, setConfirmDeleteTable] = useState(false);
  const [tableToDelete, setTableToDelete] = useState(null);
  const [confirmDeleteRow, setConfirmDeleteRow] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [confirmDeleteColumn, setConfirmDeleteColumn] = useState(false);
  const [columnToDelete, setColumnToDelete] = useState(null);
  const tableRef = useRef(null);

 
 
  const handleSelectTable = (tableId) => {
    setSelectedTable(tableId);
  };


 const handleAddTable = () => {
  setTables((prevTables) => {
    const newTable = {
      fileName: '',
      id: prevTables.length + 1,
      columns: [
        { id: 1, title: 'No' },
        { id: 2, title: 'First' },
        { id: 3, title: 'Last' },
        { id: 4, title: 'Handle' },
      ],
      rows: [
        { id: 1, cells: ['1', 'Mark', 'Otto', '@mdo'] },
        { id: 2, cells: ['2', 'Jacob', 'Thornton', '@fat'] },
        { id: 3, cells: ['3', 'hi man  the Bird', '', '@twitter'] },
      ],
    };
    setSelectedTable(newTable.id); // Set the newly added table as selected
    return [...prevTables, newTable];
  });
};





// const handleAddTable = () => {
//   setTables((prevTables) => {
//     const newTable = {
//       fileName: '', // Empty file name for the new table
//       id: prevTables.length + 1,
//       columns: [
//         { id: 1, title: 'No' },
//         { id: 2, title: 'First' },
//         { id: 3, title: 'Last' },
//         { id: 4, title: 'Handle' },
//       ],
//       rows: [
//         { id: 1, cells: ['1', 'Mark', 'Otto', '@mdo'] },
//         { id: 2, cells: ['2', 'Jacob', 'Thornton', '@fat'] },
//         { id: 3, cells: ['3', 'hi man  the Bird', '', '@twitter'] },
//       ],
//     };
//     setSelectedTable(newTable.id); // Set the newly added table as selected
//     return [...prevTables, newTable];
//   });
// };

  const handleDeleteTable = (tableId) => {
    setTableToDelete(tableId);
    setConfirmDeleteTable(true);
  };

  const handleConfirmDeleteTable = (confirm) => {
    if (confirm && tableToDelete) {
      const updatedTables = tables.filter((table) => table.id !== tableToDelete);
      setTables(updatedTables);
      setSelectedTable(null);
    }
    setConfirmDeleteTable(false);
    setTableToDelete(null);
  };

  const handleAddRow = (tableId) => {
    if (selectedTable) {
      const updatedTables = tables.map((table) => {
        if (table.id === tableId) {
          const newRow = { id: table.rows.length + 1, cells: [String(table.rows.length + 1)] };
          for (let i = 1; i < table.columns.length; i++) {
            newRow.cells.push('');
          }
          return {
            ...table,
            rows: [...table.rows, newRow]
          };
        }
        return table;
      });
      setTables(updatedTables);
    }
  };

  const handleDeleteRow = (tableId) => {
    setTableToDelete(tableId);
    setConfirmDeleteRow(true);
  };

  const handleConfirmDeleteRow = (confirm) => {
    if (confirm && tableToDelete) {
      const updatedTables = tables.map((table) => {
        if (table.id === tableToDelete) {
          const updatedRows = [...table.rows];
          updatedRows.pop();
          return {
            ...table,
            rows: updatedRows
          };
        }
        return table;
      });
      setTables(updatedTables);
      setSelectedTable(null);
    }
    setConfirmDeleteRow(false);
    setTableToDelete(null);
  };

  const handleAddColumn = (tableId) => {
    if (selectedTable) {
      const updatedTables = tables.map((table) => {
        if (table.id === tableId) {
          const newColumn = { id: table.columns.length + 1, title: 'New Column' };
          return {
            ...table,
            columns: [...table.columns, newColumn],
            rows: table.rows.map((row) => {
              row.cells.push('');
              return row;
            })
          };
        }
        return table;
      });
      setTables(updatedTables);
    }
  };

  const handleDeleteColumn = (tableId) => {
    setTableToDelete(tableId);
    setConfirmDeleteColumn(true);
  };

  const handleConfirmDeleteColumn = (confirm) => {
    if (confirm && tableToDelete) {
      const updatedTables = tables.map((table) => {
        if (table.id === tableToDelete) {
          const updatedColumns = [...table.columns];
          updatedColumns.pop();

          const updatedRows = table.rows.map((row) => {
            row.cells.pop();
            return row;
          });

          return {
            ...table,
            columns: updatedColumns,
            rows: updatedRows
          };
        }
        return table;
      });
      setTables(updatedTables);
    }
    setConfirmDeleteColumn(false);
    setTableToDelete(null);
  };

  const handleCellChange = (tableId, rowId, cellIndex, value) => {
    const updatedTables = tables.map((table) => {
      if (table.id === tableId) {
        const updatedRows = table.rows.map((row) => {
          if (row.id === rowId) {
            const updatedCells = [...row.cells];
            updatedCells[cellIndex] = value;
            return {
              ...row,
              cells: updatedCells
            };
          }
          return row;
        });
        return {
          ...table,
          rows: updatedRows
        };
      }
      return table;
    });
    setTables(updatedTables);
  };

  const handleTextareaChange = (event) => {
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };







const handleEditHeader = (tableId, columnId) => {
    if (columnId !== 1) {
      setEditingHeader({ tableId, columnId });
    }
  };

const handleHeaderTextareaInput = (event, tableId, columnId) => {
  const textarea = event.target;
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;

  // Update the edited header text for the specific column
  setEditedHeaderText((prevEditedHeaderText) => ({
    ...prevEditedHeaderText,
    [tableId]: {
      ...prevEditedHeaderText[tableId],
      [columnId]: textarea.value,
    },
  }));
};














/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const handleUploadExcel = (event) => {
//   const file = event.target.files[0];
//   const reader = new FileReader();
//   reader.onload = (e) => {	
//     const data = new Uint8Array(e.target.result);
//     const workbook = XLSX.read(data, { type: 'array' });
//     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//     const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//     const existingTableIds = tables.map((table) => table.id);
//     const newTableId = existingTableIds.length > 0 ? Math.max(...existingTableIds) + 1 : 1;

//     const newTable = {
//       id: newTableId,
//       columns: [
//         { id: 1, title: 'No' }, // Add the first column with the header "No"
//         ...json[0].map((column, index) => ({ id: index + 2, title: column || '' })) // Fetch the remaining headers
//       ],
//       rows: json.slice(1).map((row, index) => ({
//         id: index + 1,
//         cells: [String(index + 1)].concat(row.map((cell) => cell || ''))
//       }))
//     };

//     setTables([...tables, newTable]);
//   };

//   reader.readAsArrayBuffer(file);
// };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

















  const handleSaveFile = () => {
    if (fileNameInput.trim() === '') {
      setErrorMessage('File name cannot be empty.');
      return;
    }

    // Prepare the data to be sent to the backend
    const dataToSave = tables.map((table) => {
      const updatedColumns = table.columns.map((column) => ({
        ...column,
        title: editedHeaderText[table.id] && editedHeaderText[table.id][column.id]
          ? editedHeaderText[table.id][column.id]
          : column.title,
      }));

      return {
        fileName: fileNameInput,
        id: table.id,
        columns: updatedColumns,
        rows: table.rows,
      };
    });

    // Make an API call to save the data to the backend
    axios
      .post('http://localhost:3000/api/save-tables', dataToSave) // Replace the URL with your backend server address
      .then((response) => {
        console.log(response.data.message); // Optional: Display a success message if needed
      })
      .catch((error) => {
        console.error('Error saving tables to the database:', error);
        setErrorMessage('Error saving tables to the database.');
      });
  };





  return (
     <div className="container mt-4">
      <div className="btn-group-vertical" role="group">
        <button className="btn btn-primary" onClick={handleAddTable}>
          Add New Table
        </button>

        {tables && tables.map((table) => (
          <div key={table.id}>
            <button className="btn btn-primary" onClick={() => handleSelectTable(table.id)}>
              Table {table.id}
            </button>
            {selectedTable === table.id && (
              <>
                <button className="btn btn-primary" onClick={() => handleAddRow(table.id)}>
                  Add Row
                </button>
                <button className="btn btn-primary" onClick={() => handleAddColumn(table.id)}>
                  Add Column
                </button>
                <button className='btn btn-danger' onClick={() => handleDeleteColumn(table.id)}>
                  Delete Column
                </button>
                <button className='btn btn-danger' onClick={() => handleDeleteRow(table.id)}>
                  Delete Row
                </button>
                <button className='btn btn-primary' onClick={() => handleDeleteTable(table.id)}>
                  Delete Table
                </button>

                {confirmDeleteTable && (
                  <div className="confirmation-dialog">
                    <p>Are you sure you want to delete this table?</p>
                    <button className="btn btn-danger" onClick={() => handleConfirmDeleteTable(true)}>OK</button>
                    <button className="btn btn-secondary" onClick={() => setConfirmDeleteTable(false)}>Cancel</button>
                  </div>
                )}

                {confirmDeleteRow && (
                  <div className="confirmation-dialog">
                    <p>Are you sure you want to delete this row?</p>
                    <button className="btn btn-danger" onClick={() => handleConfirmDeleteRow(true)}>
                      OK
                    </button>
                    <button className="btn btn-secondary" onClick={() => handleConfirmDeleteRow(false)}>
                      Cancel
                    </button>
                  </div>
                )}

                {confirmDeleteColumn && (
                  <div className="confirmation-dialog">
                    <p>Are you sure you want to delete the last column?</p>
                    <button className="btn btn-danger" onClick={() => handleConfirmDeleteColumn(true)}>OK</button>
                    <button className="btn btn-secondary" onClick={() => handleConfirmDeleteColumn(false)}>Cancel</button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {tables && tables.map((table) => (
        <div key={table.id} className="mt-4">
          <table className="table" ref={tableRef}>
            <thead>
              <tr>


{table.columns.map((column, index) => (
  <th key={column.id} scope="col" className="th">
    {index === 0 ? (
      'No'
    ) : (
      <textarea
        className={`tableHeader-cell ${editingHeaderCell && editingHeaderCell.tableId === table.id && editingHeaderCell.columnId === column.id ? 'editing' : ''}`}
        onClick={() => handleEditHeader(table.id, column.id)}
        onInput={(event) => handleHeaderTextareaInput(event, table.id, column.id)} // Pass tableId and columnId
        value={editedHeaderText[table.id] && editedHeaderText[table.id][column.id] ? editedHeaderText[table.id][column.id] : column.title}
      />
    )}
  </th>
))}




              </tr>
            </thead>
            <tbody>
              {table.rows.map((row) => (
                <tr key={row.id}>
                  {row.cells.map((cell, index) => (
                    <td key={index} className={`table-cell ${index === 0 ? 'normal-cell' : ''}`}>
                      {index === 0 ? (
                        cell
                      ) : (
                        <textarea
                          value={cell}
                          onChange={(event) =>
                            handleCellChange(table.id, row.id, index, event.target.value)
                          }
                          onInput={handleTextareaChange}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
  
                    <input
        type="text"
        value={fileNameInput}
        onChange={(e) => setFileNameInput(e.target.value)}
        placeholder="Enter file name..."
      />

      {/* Display error message if any */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* Add the "Save File" button */}
      <button className="btn btn-primary" onClick={handleSaveFile}>
        Save File
      </button>

      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      {/* <div className="btn btn-primary">
          <input type="file" onChange={handleUploadExcel} />
        </div> */}
      {/* ////////////////////////////////////////////////////////////////////////////////////// */}


    </div>
  );
};

export default Services;