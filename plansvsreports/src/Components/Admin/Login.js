import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Login() {
    const [values, setValues] = useState({
        ID: '',
        password: '',
    });

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post('http://localhost:3000/login', values, { withCredentials: true })
            .then((res) => {
                if (res.data.Status === 'Success') {
                    // Check the user's role (admin or employee)
                    if (res.data.Role === 'admin') {
                        navigate('/'); // Navigate to the admin page
                <option value="Teacher">Teacher</option>
            } else if (res.data.Role === 'Heads Office and Cordinetor'||'College Deans'||'Plan Offices'||'Teacher'||'president') {
                        navigate('/services'); // Navigate to the employee page
                    } else {
                        setError('Unknown Role'); // Handle an unknown role if necessary
                    }
                } else {
                    setError(res.data.Error);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm shadow p-3 mb-5 bg-body rounded'>
                <div className='text-danger'>
                    {error && error}
                </div>
                <h2 >Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="ID"><strong>ID</strong></label>
                        <input type="text" placeholder='Enter your ID' name='ID' 
                          onChange={e => setValues({...values, ID: e.target.value})} className='form-control rounded-0' autoComplete='off'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" ><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password'
                          onChange={e => setValues({...values,  Password: e.target.value})} className='form-control rounded-0' />
                    </div>
                    <button type='submit' className='btn btn-primary w-100 rounded-0'> Log in</button>
                
                </form>
            </div>
        </div>
    )
}

export default Login