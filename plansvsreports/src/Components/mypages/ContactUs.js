// import React from 'react'
//import { useState } from "react";
// function ContactUs() {
//  const myarraymap = ["wegene" ,"argow", "tilahun" ,"bro vs mam"];
//   //const age = 5; //for if else  operation
//   //  if(age>=18){
//   //   return <h1>over age</h1>
//   //  }
//   //  else{
//   //   return <h2>under age</h2>
//   //  }
//  // or use
// //  const age = 75; //for if else  operation
// //    if(age>=18){
// //     return <h1>over age</h1>
// //     }
// //   return <h2>under age</h2> 
// const isGreen =true;
//   // const age = 9; //ternary operation
//   // return (
//   //   <div>
//   //     {age>=43? <h1>good to merry</h1> : <h2>you have to grow</h2>}
//   //   </div>
//   // )
//   return(
// <div>
//     <h1 style={{color : isGreen? "green" : "red"}}>this is boolean</h1>
//     {isGreen && <button>if true add the button</button>}
// </div>
//   )
//  {myarraymap.map((myinfo,keys)=>{
//   return(
//     <div style={{background : "green" ,width:"50%" }}>
//    <marque><h1>dededede</h1></marque>
//         <div style={{background : "" ,color:"red"}}>
//       <marque><h1 key={keys}>{myinfo}</h1></marque>
//     </div>
//     </div>
//   )
//   }
// //   return (
// //  //bellow is calling the component Comp which is start with the capital letter
// //     <div className='contact-us'> 
// // <Comp name="wegene" salary= {34332} status ="manager" experience="senior"/> 
// // <Comp name="wegene" salary= {34332} status ="manager" experience="senior"/>
// // <Comp name="wegene" salary= {34332} status ="manager" experience="senior"/>
// // <Comp name="wegene" salary= {34332} status ="manager" experience="senior"/>
// // <Comp name="wegene" salary= {34332} status ="manager" experience="senior"/>
// //     </div>
// //   )
//   //}
// // const Comp =(props)=>{
// // return(
// //   <div>
// //   <h3>{props.name}</h3>
// //   <h3>{props.salary}</h3>
// //   <h3>{props.status}</h3>
// //   <h3>{props.experience}</h3>

// //   </div>
// // )
// }

// export default ContactUs;




// import React from 'react'
// function ContactUs() 
//   const myobjt = [
// {name:"wegene", age:23, sex:"male"},
// {name:"argow", age:23, sex:"male"},
// {name:"tilahun", age:23, sex:"male"},
//   ];
//   return (
//     <div>
//       {myobjt.map((obdata,key)=>{
//         return(
          
//             <h1 key={key}> {obdata.name} {obdata.age} {obdata.sex}</h1>
//         )
//       })}
//     </div>
//   )
// }
// export default ContactUs;




// import React from 'react'
// import {Userd} from './Userdata';

// function ContactUs() {
//     const myobjt = [
// {name:"wegene", age:23, sex:"male"},
// {name:"argow", age:23, sex:"male"},
// {name:"tilahun", age:2443, sex:"male"},
//   ];
//   return (
//     <div>
//       {myobjt.map((mydata,key)=>{
//         return <h1><Userd name = {mydata.name} sex ={mydata.sex} age={mydata.age}/>  </h1> 
//         {/* return  <h1 key={key}> {mydata.name} {mydata.age} {mydata.sex}</h1>  */}
//       })}
//     </div>
//   )
// }
// // const Userdata =(props)=>{
// //   return(
// //     <div>
// //         {props.name} {props.sex} {props.age}
// //     </div>
// //   )
// // }
// export default ContactUs





// import React from 'react'
// function ContactUs() {
//   const myplant = [
//     {name : "mars" ,isGas : false},
//     {name : "uranes" ,isGas : true},
//     {name : "venus" ,isGas : false},
//     {name : "galaxy" ,isGas : true},
//   ]
//   return (
//     <div>
//       {myplant.map((datas,key)=>{
//         if(datas.isGas){
//              return <h1>{datas.name}</h1>
//         }
//       })}
//     </div>
//   )
// }
// export default ContactUs
//OR
// import React from 'react'

// function ContactUs() {
//   const myplant = [
//     {name : "mars" ,isGas : false},
//     {name : "uranes" ,isGas : true},
//     {name : "venus" ,isGas : false},
//     {name : "galaxy" ,isGas : true},
//   ]
//   return (
//     <div>
//       {myplant.map((value,key)=>{
//         return(
//            value.isGas && <h1>{value.name}</h1>
//         )
//       })}
//     </div>
//   )
// }
// export default ContactUs




//     useState  for the cost per use in  restaurant
// import React from "react";
// import { useState } from "react"; 
// function ContactUs() {
//   const [services,setServices] = useState(0);
//   const [min,setMin] = useState(3);
//   const Addservices =()=>{
//     setServices(services +1);
//   }
//   const Minservices=()=>{
//     setServices(services -1);
//   }
//   return (
//     <div style={{alignItems:"center", margin:"500px"}}>
//       {services} <button onClick={Addservices}>add the age</button>
//       <button onClick={Minservices}> MIN THE AGE</button>
      
//      <h1> the cost is  = {services *5 + min}</h1>
//     </div>
//   )
// }
// export default ContactUs




//the use of input state
// import React from 'react'
// import { useState } from 'react'
// function ContactUs() {
//   const [input, setInput] = useState("");
//   const handleInput=(event)=>{
//    //console.log(event.target.value);
//   setInput(event.target.value);
//   }
//   return (
//     <div style={{margin : "500px"}}>
//       <input placeholder='type here' style={{width:"500px" ,height:"100px" }} type='text' onChange={handleInput}/>
//       {input}
//     </div>
//   )
// }

// export default ContactUs




//hide and show the  text  by button click

// import React from 'react'
// import { useState } from 'react'
// function ContactUs() {
//   const [mytext , setText] = useState(true);
//   return (
//     <div style={{margin:"400px"}}>
//     <button onClick={()=>{
//       setText(!mytext);
//     }
//     }>click me to visit the text</button>

//     {mytext &&  <h1>well come to my boot camp</h1>   }

//     </div>
//   )
// }
// export default ContactUs




// for make the page be viewed in  diffrent  colors 
// import React from 'react'
// import { useState } from 'react'

// function ContactUs() {
//   const [mycolor , setColor] = useState("#303");
//   return (
//     <div>
// <button onClick={()=>{
//   setColor("#445")
// }}>green</button> 
// <button onClick={()=>{
//   setColor("#4545")
// }}>orange</button>
// <button onClick={()=>{
//   setColor("#453")
// }}>white</button>
//       <h1 style={{background:mycolor ,height:"600px"}}> this is the page  background color</h1>
//     </div>
//   )
// }
// export default ContactUs
//or for using only 2 colors 
// import React from 'react'
// import { useState } from 'react'

// function ContactUs() {
//   const [myclor,setMyscolor] =useState("#638");
//   return (
//     <div>
//      <button onClick={()=>{
//       setMyscolor(myclor === "#638" ? "#1fff" : "#638");
//      }}>change color</button>

//        <h1 style={{background: myclor ,height:"555px" ,textAlign:"center", display:"flex" ,flexDirection:"column-reverse"}}>well come to wege  programming  with the MARN stack</h1> 
//     </div>
//   )
// }
// export default ContactUs




// button to increSE DECREASE AND  SET TO THE  ZERO
// import React from 'react'
// import { useState } from 'react'
// function ContactUs() {
// const [inc,setInc] = useState(0);
// const handleInc =()=>{
//   setInc(inc +1);
// }
// const handleDec=()=>{
//   setInc(inc -1);
// }
// const setZero = ()=>{
//   setInc(0);
// }
//   return (
//     <div>
// <button onClick={handleInc}>Increase</button>
// <button onClick={handleDec}>DECREASE</button>
// <button  onClick={setZero} > Set ZERO</button>
  
//   <h1>the value is = {inc} </h1>
//     </div>
//   )
// }
// export default ContactUs




// //CRUD OPERATION FOR THE TODOLIST
//  import { useState } from 'react'
//  import React from 'react';

//   function ContactUs() {
//   const [myinput,setInput] = useState("");
//   const [mytask ,setTask] = useState([]);
//   const handlechange =(event)=>{
//   setInput(event.target.value);
//  };
// const addtaaskbutton =()=>{
// const newTasks = [...mytask,myinput];
// setTask(newTasks);

//   // or short in 
// setTask( [...mytask,myinput]);

// } 
//  const handledelete = (taskname)=>{
// const updatedTasks =mytask.filter((task)=>{

//   if(task === taskname){
//      return false;
//      }
//     else{
//       return true;
//        }
// })
// // //   // this above code is delete all the  task with the same name they have to hold with the single  delete button of one of them 
 
// // //   const updatedTasks = mytask.filter((task) => task !== taskname);  //w/hich is also delete as the code above do to the same name of the task at te same time to be deleted
//   setTask(updatedTasks);
// }
//   return (
//    <div>
//       <div >
//         <input type='text' onChange={handlechange}/>
//        <button  onClick={addtaaskbutton}>Add Tasks</button>
//     </div>
//      <div >
//        {mytask.map((task)=>{
//          return(
//             <div>
//                 <h1>{task}</h1>   
//                    <button onClick={()=> handledelete(task)}>Delete</button>                
//           </div>
//       )
//       })}
//       </div>
//       </div>
//   ) }
// export default ContactUs



///  THE FOLLOWING CODE IS COPLETELY DELETE THE TASK ONLY SINGLE TASK ADDED WITH THE ID 
import React from 'react'
import { useState ,useEffect} from 'react'
import Axios from 'axios';
function ContactUs() {
  const [initialinput , setInput] = useState("");
  const [mydata ,setMydata] =useState([]);
  const [firstdata,setFirstdata] = useState("");


//the useEffect is used to control the change on the page for each change 
  useEffect(()=>{
   console.log("the component is mounted")
    // return(
    //  console.log(" the component is unmounted")
    //   )
  } );   

  // const handleapi=()=>{
  // Axios.get("http://localhost:3000/api/get-tables").then((res)=>{
  //  setFirstdata(res.data);
  //   })
  // }

//to fetch the data from the api without axios by only fetch function
fetch("http://localhost:3000/api/get-tables")
.then((res)=>res.json())
.then((data)=>{
console.log(data)
})

//OR 

// Axios.get("http://localhost:3000/api/get-tables").then((res)=>{
//   setMydata(res.data);
// })


  //the change is for the overall array the  change display is for the all once
  //   useEffect(()=>{
  //  console.log("the component is now mounted once only")
  //   return(
  //    console.log(" the component is now unmounted once only")
  //     )
  // },[]);   

const handlechange=(event)=>{
  setInput(event.target.value);
}
const handleadd =()=>{
  const mytasks={
  id:mydata.length === 0 ? 1: mydata[mydata.length-1].id +1 ,
  taskName: initialinput,
}
  setMydata([...mydata,mytasks]);
}
const handledelete =(id)=>{
setMydata(mydata.filter((task)=>task.id !== id));
}
  return (
    <div>

{/* <div>
 <button onClick={handleapi}>add the api</button>
  <h1>this is my information</h1>
   <p>  {firstdata}</p>
</div> */}


<div className='1'>
<input type='text' onChange={handlechange}/>
<button onClick={handleadd}>add task</button>
</div>
<div className='2'>
{mydata.map((task)=>{
  return(
    <div>
   
      <span> <h1>{task.taskName}</h1>
       <button onClick={()=>handledelete(task.id)}>Delete</button>
       </span>
    </div>
  )
})}
</div>
    </div>
  )
}
export default ContactUs