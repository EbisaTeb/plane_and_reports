
import React from 'react'
import {Callfunction} from './Callfunction';


export const  Home =(props)=> {
  const {count , increase,decrease,restore} = Callfunction();
  return (
    <div className='homegv'>
  <div>  <h1>the buttom fo the class in the Callfunction  </h1></div>
    {count}
<button onClick={increase}>increase</button>
<button onClick={decrease}>decrease</button>
<button onClick={restore}>restore</button>




    USER PROFILE IN HOME: {props.username}
    </div>
  )
}

export default Home;