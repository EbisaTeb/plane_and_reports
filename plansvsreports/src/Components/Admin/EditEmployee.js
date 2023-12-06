import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
function EditEmployee() {
	const [data, setData] = useState({
		ID: '',
		Firstname: '',
		Middlename: '',
		Lastname: '',
		Gender: '',
		email: '',
		Password: '',
		Department: '',
		Role: '',
	})
	const navigate = useNavigate()
	const {ID} = useParams();
	const originalID = decodeURIComponent(ID);
	  useEffect(() => {
		console.log("Original ID:", originalID); // Check the decoded ID
		axios.get(`http://localhost:3000/getEmployee/${encodeURIComponent(originalID)}`)
		  .then((res) => {
			console.log("Data from backend:", res.data); // Check the data received
			setData({
				ID: res.data.Result[0].ID,
				Firstname: res.data.Result[0].Firstname,
				Middlename: res.data.Result[0].Middlename,
				Lastname: res.data.Result[0].Lastname,
				Gender: res.data.Result[0].Gender,
				email: res.data.Result[0].email,
				Password: res.data.Result[0].Password,
				Department: res.data.Result[0].Department,
				Role: res.data.Result[0].Role,
			  });
		  })
		  .catch((err) => console.log(err));
	  }, [originalID]);
   const handleSubmit = (e) => {
	e.preventDefault();
	axios.put(`http://localhost:3000/update/${encodeURIComponent(ID)}`, data, {
    headers: {
    'Content-Type': 'application/json',
     }
      })
		.then(res => {
			if(res.data.Status === "Success") {		
				navigate('/employee')
			}
		})
		.catch(err => console.log(err));
	}
  return (
    <div className='d-flex flex-column align-items-center pt-4' >
			<h2 className='border'> Update User</h2>
			<form className="row g-3 w-50 border" onSubmit={handleSubmit}>
			<div className="col-12">
			<label htmlFor="inputID" className="form-label">ID</label>
					<input type="text " className="form-control " id="inputID" placeholder='Enter ID' autoComplete='off'
					onChange={e => setData({...data, ID: e.target.value})} value={data.ID}/>
				</div>
				<div className="col-12">
			<label htmlFor="inputFirstname" className="form-label">Firstname</label>
					<input type="text" className="form-control" id="inputFirstname" placeholder='Enter Firstname' autoComplete='off'
					onChange={e => setData({...data, Firstname: e.target.value})}value={data.Firstname}/>
				</div>
				<div className="col-12">
			<label htmlFor="inputMiddlename" className="form-label">Middlename</label>
					<input type="text" className="form-control" id="inputMiddlename" placeholder='Enter Middlename' autoComplete='off'
					onChange={e => setData({...data, Middlename: e.target.value})} value={data.Middlename}/>
				</div>
				<div className="col-12">
			<label htmlFor="inputLastname" className="form-label">Lastname</label>
					<input type="text" className="form-control" id="inputLastname" placeholder='Enter Lastname' autoComplete='off'
					onChange={e => setData({...data, Lastname: e.target.value})} value={data.Lastname}/>
				</div>
				<div className="col-12">
			<label htmlFor="inputGender" className="form-label"> Gender
              <select className="form-control  browser-default custom-select" id="inputGender"   name="Gender" 
               onChange={e => setData({...data, Gender: e.target.value})} >
                <option value="female">female</option>
                <option value="male">male</option>
                <option  value="other">other</option>
               </select>
            </label>
				</div>

				<div className="col-12">
					<label htmlFor="inputEmail4" className="form-label">Email</label>
					<input type="email" className="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
					onChange={e => setData({...data, email: e.target.value})} value={data.email}/>
				</div>
				<div className="col-12">
					<label htmlFor="inputPassword4" className="form-label">Password</label>
					<input type="password" className="form-control" name="Password"  id="inputPassword4" placeholder='Enter Password'
					 onChange={e => setData({...data, Password: e.target.value})} value={data.Password}/>
				</div>
				<div className="col-12">
			<label htmlFor="inputDepartment" className="form-label"> Department
              <select  className="form-control  browser-default custom-select" id="inputDepartment"  name="Department"
               onChange={e => setData({...data, Department: e.target.value})} >
                 <option value="software">software</option>
                 <option value="computer science">computer science</option>
                <option value="Information System">Information System</option>
                <option value="Information Technology">Information Technology</option>
               </select>
            </label>
				</div>

				<div className="col-12">
			<label htmlFor="inputRole" className="form-label"> Role
              <select className="form-control  browser-default custom-select" id="inputRole"  name="Role"
               onChange={e => setData({...data, Role: e.target.value})} >
                 <option value="Heads Office and Cordinetor">Heads Office and Cordinetor</option>
                 <option value="College Deans">College Deans</option>
                <option value="Plan Offices">Plan Offices</option>
                <option value="Teacher">Teacher</option>
                <option value="president">president</option>
               </select>
            </label>
				</div>
				<div className="col-12">
					<button type="submit" className="btn btn-primary w-50 p-3 position-relative">UPDATE</button>
				</div>
			</form>

		</div>
  )
}

export default EditEmployee