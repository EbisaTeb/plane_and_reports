import axios from 'axios'
import React, { useEffect, useState } from 'react'

function AdiminHome() {
  const [adminCount, setAdminCount] = useState()
  const [employeeCount, setEmployeeCount] = useState()
  const [gender, setGenderCounts] = useState({ female: 0, male: 0 });

  useEffect(() => {
    axios.get('http://localhost:3000/adminCount')
		.then(res => {
			setAdminCount(res.data[0].admin)
		}).catch(err => console.log(err));

    axios.get('http://localhost:3000/employeeCount')
		.then(res => {
			setEmployeeCount(res.data[0].admin)
		}).catch(err => console.log(err));

    axios.get('http://localhost:3000/genderCount')
  .then(res => {
    setGenderCounts(res.data);
  })
  .catch(err => console.log(err));


  } , [])
  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {adminCount}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {employeeCount}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Gender</h4>
          </div>
          <hr />
          <div className=''>
          <h5>Female: {gender.female}</h5>
          <h5>Male: {gender.male}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdiminHome