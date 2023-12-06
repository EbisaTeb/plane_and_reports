
import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import './App.css';
import {Home} from './Components/mypages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './Components/mypages/Services';
import Products from './Components/mypages/Products';
import ContactUs from './Components/mypages/ContactUs';
import Marketing from './Components/mypages/Marketing';
import Consulting from './Components/mypages/Consulting';
import Development from './Components/mypages/Development';
import {Changeprofile} from './Components/mypages/Changeprofile';
import AdiminHome from './Components/Admin/Home';
import Dashboard from './Components/Admin/Dashboard';
import Employee from './Components/Admin/Employee';
import AddEmployee from './Components/Admin/AddEmployee';
import EditEmployee from './Components/Admin/EditEmployee';
import Login from './Components/Admin/Login';
import EmployeeLogin from './Components/Admin/EmployeeLogin';
import EmployeeDetail from './Components/Admin/EmployeeDetail';
import Profile from './Components/Admin/Profile';
import ChangePassword from './Components/Admin/ChangePassword';



function App() {
  const [username,setUsername] =useState("wegene");
  return (

    <div className=''>

      <Router>
       {/* <Navbar />  */}
      <Routes>
        <Route path='' element={<Dashboard username={username} />} />
        <Route path='/changeprofile' element={<Changeprofile/>} />

        <Route path='/services' element={<Services />} />
        <Route path='/products' element={<Products />} />      
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/marketing' element={<Marketing />} />
        <Route path='/consulting' element={<Consulting />} />
        <Route path='/development' element={<Development />} />
        <Route path='/' element={<Dashboard/>}>
        <Route path='' element={<Home/>}></Route>
        <Route path='/employee' element={<Employee />}></Route>
        <Route path='/Profile' element={<Profile />}></Route>
        <Route path='/create' element={<AddEmployee />}></Route>
        <Route path='/employeeEdit/:ID' element={<EditEmployee />}></Route>
        <Route path='/Home' element={<AdiminHome/>} />
        <Route path='/ChangePassword' element={<ChangePassword/>} />
        </Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/employeeLogin' element={<EmployeeLogin />}></Route>
        <Route path='/employeedetail/:ID' element={<EmployeeDetail />}></Route>
        <Route path='*' element={<h1 style={{alignItems:"center" , margin:"250px" ,fontFamily:"bold" ,color:"red"}}>Dear ! User  THE PAGE IS NOT EXIST</h1>} />
       </Routes>
     </Router>
    </div>
    
  );
}
export default App;
