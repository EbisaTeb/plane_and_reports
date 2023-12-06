import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EmployeeDetail() {
    const {ID} = useParams();
    const navigate = useNavigate()
    const [employee, setEmployee] = useState([])
    useEffect(()=> {
        axios.get(`http://localhost:3000/get/${ID}`)
        .then(res => setEmployee(res.data.Result[0]))
        .catch(err => console.log(err));
    })
    const handleLogout = () => {
		axios.get('http://localhost:3000/logout')
		.then(res => {
			navigate('/start')
		}).catch(err => console.log(err));
	}
  return (
    <div>
        <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
            
            <div className='d-flex align-items-center flex-column mt-5'>
                <h3>ID: {employee.ID}</h3> 
                <h3>Department:{employee.Department}</h3> 
                <h3>Name: {employee.Lastname}</h3> 
                <h3>{employee.Firstname}</h3> 
                <h3>Email: {employee.email}</h3>
                <h3>Role: {employee.Role}</h3>
            </div>
            <div>
                <button className='btn btn-primary me-2'>Edit</button>
                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default EmployeeDetail