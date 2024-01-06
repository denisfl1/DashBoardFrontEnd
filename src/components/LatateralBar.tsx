import React, { useContext, useState } from "react";
import logo from '../Icons/logo.png'
import logout from '../Icons/sair.png'
import config from '../Icons/configuracoes.png'
import agend from '../Icons/agenda.png'
import home from '../Icons/home.png'
import categories_icon from '../Icons/categories.png'
import leftArrow from '../Icons/left-arrow.png'
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/authContext";

    const LateralBar:React.FC=()=>{

    const [OPEN_BAR,setOPEN_BAR] = useState(false)
    const {Logout} = useContext(AuthContext)

    const Handle_Window:React.MouseEventHandler<HTMLImageElement> = (e)=>{
        
        if(e.target instanceof HTMLElement){

            if(!OPEN_BAR){        
                setOPEN_BAR(true)
            }else{
                setOPEN_BAR(false)
            }
        }
      
    }

    const HandleLogout=()=>{

        Swal.fire({
            title: "Deseja mesmo sair?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim",
            cancelButtonText:"Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
            Logout && Logout()
            }
          });

    }


return(
    <div className={ !OPEN_BAR ? "LateralBarContainer": "LateralBarContainer hide"}>

        <div  className="LateralBar">

                <div style={{overflow:"hidden"}}  className="LateralBarHeader">
                 <img width='100px' height='100px' style={{minWidth:"100px"}} src={logo}></img><img className="LateralBarImg" onClick={Handle_Window} src={leftArrow}></img>
                </div>

            <ul>

                <div className="LateralBarList"><img src={home}></img><li>Home</li></div>
                <div className="LateralBarList"><img src={agend}></img><li>Agenda</li></div>
                <div className="LateralBarList"><img src={categories_icon }></img><li>Categories</li></div>
                <div className="LateralBarList"><img src={config}></img><li>Settings</li></div>
                <div className="LateralBarList" onClick={HandleLogout}><img src={logout}></img><li>Sair</li></div>

            </ul>


        </div>



    </div>
)



}
export default LateralBar