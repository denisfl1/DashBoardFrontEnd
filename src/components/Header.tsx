import React, { useContext } from "react";

import { AuthContext } from "../contexts/authContext";
import folha from "../Icons/folha.jpg"

function Header(){

const {UserName} = useContext(AuthContext)

return(

    <div className="Header">

        <h1>Bem vindo {UserName}</h1> <img style={{marginLeft:"10px"}} height={"40px"} src={folha}></img>

    </div>


)


}

export default Header