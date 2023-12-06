import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Employee() {
  const [data, setData] = useState([])

  useEffect(()=> {
    axios.get('http://localhost:3000/getEmployee')
    .then(res => {
      if(res.data.Status === "Success") {
        setData(res.data.Result);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }, [])

  const handleDelete = (ID) => {
    axios.delete('http://localhost:3000/delete/'+ID)
    .then(res => {
      if(res.data.Status === "Success") {
        window.location.reload(true);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>USER LIST</h3>
      </div>
      <Link to="/create" className='btn btn-primary'>Add User</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Firstname</th>
              <th>Middlename</th>
              <th>Lastname</th>
              <th>Gender</th>
              <th>email</th>
              {/* <th>Password</th> */}
              <th>Department</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => {
              return <tr key={index}>
                  <td>{employee.ID}</td>
                  <td>{employee.Firstname}</td>
                  <td>{employee.Middlename}</td>
                  <td>{employee.Lastname}</td>
                  <td>{employee.Gender}</td>
                  <td>{employee.email}</td>
                  {/* <td>{employee.Password}</td> */}
                  <td>{employee.Department}</td>
                  <td>{employee.Role}</td>
                  <td>
                    {/* <Link to={`/employeeEdit/${employee.ID.toString()}`} className='btn btn-primary btn-sm me-2'>edit</Link> */}
                    {/* <button onClick={e => handleDelete(employee.ID)} className='btn btn-sm btn-danger'>delete</button> */}
                    {/* <Link to={`/employeeEdit/${parseInt(employee.ID)}`} className='btn btn-primary btn-sm me-2'>edit</Link>
                    <button onClick={e => handleDelete(parseInt(employee.ID))} className='btn btn-sm btn-danger'>delete</button> */}
                   <Link to={`/employeeEdit/${encodeURIComponent(employee.ID)}`} className='btn btn-primary btn-sm me-2'>edit</Link>

                    <button onClick={e => handleDelete(encodeURIComponent(employee.ID))} className='btn btn-sm btn-danger'>delete</button>

                  </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee