import React, { useContext } from "react";
import Menu from '../Icons/options.png'
import { AuthContext } from "../contexts/authContext";
import folha from "../Icons/folha.jpg"

function Header(){

const {UserName} = useContext(AuthContext)

return(

    <div className="Header">

        <h1>{'> '}Bem vindo {UserName}</h1>

    </div>


)


}

export default Header