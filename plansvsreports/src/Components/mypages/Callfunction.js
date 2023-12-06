import React from "react";
import { useState } from "react";

export const Callfunction=(initial =90)=>{
const [count , setCount] = useState(initial);

const increase =()=>{
    setCount((valuess)=>valuess + 1
    )
}

const decrease =()=>{
    setCount((valuess)=>valuess - 1
    )
}
const restore =()=>{
    setCount(0);
}
return {count, increase,decrease,restore};
}



