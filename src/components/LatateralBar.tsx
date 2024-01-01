import React from "react";
import logout from '../Icons/sair.png'
import config from '../Icons/configuracoes.png'
import grafic from '../Icons/grafico.png'
import home from '../Icons/home.png'

const LateralBar:React.FC=()=>{


return(
    <div className="LateralBarContainer">

        <div className="LateralBar">

            <h1>Denis </h1>

            <ul>
                <div className="LateralBarList"><img src={home}></img><li>Home</li></div>
                <div className="LateralBarList"><img src={grafic}></img><li>Dashboard</li></div>
                <div className="LateralBarList"><img ></img><li>Products</li></div>
                <div className="LateralBarList"><img ></img><li>Categories</li></div>
                <div className="LateralBarList"><img src={config}></img><li>Settings</li></div>
                <div className="LateralBarList"><img src={logout}></img><li>Sair</li></div>

            </ul>


        </div>



    </div>
)



}
export default LateralBar