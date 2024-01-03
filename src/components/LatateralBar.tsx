import React, { useState } from "react";
import logout from '../Icons/sair.png'
import config from '../Icons/configuracoes.png'
import grafic from '../Icons/grafico.png'
import home from '../Icons/home.png'
import categories_icon from '../Icons/categories.png'
import leftArrow from '../Icons/left-arrow.png'

    const LateralBar:React.FC=()=>{

    const [OPEN_BAR,setOPEN_BAR] = useState(false)



    const Handle_Window:React.MouseEventHandler<HTMLImageElement> = (e)=>{
        
        if(e.target instanceof HTMLElement){
            console.log(e.target.className)
            console.log(OPEN_BAR)
            if(!OPEN_BAR){        
                setOPEN_BAR(true)
            }else{
                setOPEN_BAR(false)
            }
        }
      
    }


return(
    <div className={ !OPEN_BAR ? "LateralBarContainer": "LateralBarContainer hide"}>

        <div className="LateralBar">

                <div className="LateralBarHeader">
             <img className="LateralBarImg" onClick={Handle_Window} src={leftArrow}></img>
                </div>

            <ul>
                <div className="LateralBarList"><img src={home}></img><li>Home</li></div>
                <div className="LateralBarList"><img src={grafic}></img><li>Dashboard</li></div>
                <div className="LateralBarList"><img src={categories_icon }></img><li>Categories</li></div>
                <div className="LateralBarList"><img src={config}></img><li>Settings</li></div>
                <div className="LateralBarList"><img src={logout}></img><li>Sair</li></div>

            </ul>


        </div>



    </div>
)



}
export default LateralBar