import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function AddEmployee() {
	const [data, setData] = useState({
		ID: '',
		Firstname: '',
		Middlename: '',
		Lastname: '',
		Gender: '',
		email: '',
		Password: '',
		Department: '',
		Role: ''
	})
	const navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault();
		const formdata = new FormData();
		formdata.append("ID", data.ID);
		formdata.append("Firstname", data.Firstname);
		formdata.append("Middlename", data.Middlename);
		formdata.append("Lastname", data.Lastname);
		formdata.append("Gender", data.Gender);
		formdata.append("email", data.email);
		formdata.append("Password", data.Password);
		formdata.append("Department", data.Department);
		formdata.append("Role", data.Role);
		axios.post('http://localhost:3000/create', formdata, {
			headers: {
			  'Content-Type': 'application/json',
			}
		  })
		.then(res => {
			navigate('/employee')
		})
		.catch(err => console.log(err));
	}
	return (
		<div className='d-flex flex-column align-items-center pt-4' >
			<h2 className='border'> Add User</h2>
			<form className="row g-3 w-50 border" onSubmit={handleSubmit}>
			<div className="col-12">
			<label htmlFor="inputID" className="form-label">ID</label>
					<input type="text " className="form-control " id="inputID" placeholder='Enter ID' autoComplete='off'
					onChange={e => setData({...data, ID: e.target.value})}/>
				</div>
				<div className="col-12">
			<label htmlFor="inputFirstname" className="form-label">Firstname</label>
					<input type="text" className="form-control" id="inputFirstname" placeholder='Enter Firstname' autoComplete='off'
					onChange={e => setData({...data, Firstname: e.target.value})}/>
				</div>
				<div className="col-12">
			<label htmlFor="inputMiddlename" className="form-label">Middlename</label>
					<input type="text" className="form-control" id="inputMiddlename" placeholder='Enter Middlename' autoComplete='off'
					onChange={e => setData({...data, Middlename: e.target.value})}/>
				</div>
				<div className="col-12">
			<label htmlFor="inputLastname" className="form-label">Lastname</label>
					<input type="text" className="form-control" id="inputLastname" placeholder='Enter Lastname' autoComplete='off'
					onChange={e => setData({...data, Lastname: e.target.value})}/>
				</div>
				<div className="col-12">
			<label htmlFor="inputGender" className="form-label"> Gender
              <select className="form-control  browser-default custom-select" id="inputGender"   name="Gender" defaultValue={data}
               onChange={e => setData({...data, Gender: e.target.value})}>
                <option value="female">female</option>
                <option value="male">male</option>
                <option  value="other">other</option>
               </select>
            </label>
				</div>

				<div className="col-12">
					<label htmlFor="inputEmail4" className="form-label">Email</label>
					<input type="email" className="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
					onChange={e => setData({...data, email: e.target.value})}/>
				</div>
				<div className="col-12">
					<label htmlFor="inputPassword4" className="form-label">Password</label>
					<input type="password" className="form-control" name="Password"  id="inputPassword4" placeholder='Enter Password'
					 onChange={e => setData({...data, Password: e.target.value})}/>
				</div>
				<div className="col-12">
			<label htmlFor="inputDepartment" className="form-label"> Department
              <select  className="form-control  browser-default custom-select" id="inputDepartment"  name="Department" defaultValue={data}
               onChange={e => setData({...data, Department: e.target.value})}>
                 <option value="software">software</option>
                 <option value="computer science">computer science</option>
                <option value="Information System">Information System</option>
                <option value="Information Technology">Information Technology</option>
               </select>
            </label>
				</div>

				<div className="col-12">
			<label htmlFor="inputRole" className="form-label"> Role
              <select className="form-control  browser-default custom-select" id="inputRole"  name="Role" defaultValue={data}
               onChange={e => setData({...data, Role: e.target.value})}>
                 <option value="Heads Office and Cordinetor">Heads Office and Cordinetor</option>
                 <option value="College Deans">College Deans</option>
                <option value="Plan Offices">Plan Offices</option>
                <option value="Teacher">Teacher</option>
                <option value="president">president</option>
               </select>
            </label>
				</div>
				<div className="col-12">
					<button type="submit" className="btn btn-primary w-50 p-3 position-relative">Create</button>
				</div>
			</form>
		</div>

	)
}

export default AddEmployee