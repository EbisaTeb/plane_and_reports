import { Changeprofile } from "./Changeprofile";
import React from "react";
export const Profile=(props)=>{
    return(
        <div>
            { ""}
           THE  PROFILE IS: {props.username}
            
            <Changeprofile setUsername={props.setUsername}/>
        </div>
    )
};