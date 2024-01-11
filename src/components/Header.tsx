import React, { useContext } from "react";

import { AuthContext } from "../contexts/authContext";

function Header(){

const {UserName} = useContext(AuthContext)

return(

    <div className="Header">

        <h1>{UserName}</h1> <img style={{marginLeft:"10px"}} height={"40px"} ></img>

    </div>


)


}

export default Header