import { useState } from "react"

export const Changeprofile=(props)=>{
    const [newusername,setNewusename] = useState("");
return(
    <div>
        <input type="text" onChange={(event)=>{
            setNewusename(event.target.value);
        }}/>
        <button onClick={()=>{
            props.setUsername(newusername);
        }}>change the user</button>
    </div>
)
};