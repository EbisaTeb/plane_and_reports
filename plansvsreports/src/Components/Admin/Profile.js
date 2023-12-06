import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Profile() {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/profile', { withCredentials: true })
      .then((res) => {
        if (res.data.Status === 'Success') {
          setProfile(res.data.Profile);
        } else {
          setError(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='border p-4  border border-dark'>
      {/* <h2>Profile</h2> */}
      {error && <div className="text-danger">{error}</div>}
      <div>
        <strong>Name:</strong> {profile.Firstname} {profile.Middlename} {profile.Lastname}
      </div>
      <div>
        <strong>Email:</strong> {profile.email}
      </div><div>
        <strong>Role:</strong> {profile.Role}
      </div><div>
        <strong>Department:</strong> {profile.Department}
      </div>
      <Link to='/ChangePassword' className='btn btn-primary btn-sm me-2'>change password</Link>
    </div>
       
  );
}

export default Profile;
