import React from "react";
import Menu from "./components/menu"
import Header from "./components/Header";
import LateralBar from "./components/LatateralBar";


function HomePage(){



return(

    <div className="HomePageContainer">
            <LateralBar></LateralBar>
          
            <div className="HomePageContent">
                
                <Menu></Menu>
                
            </div>   

    </div>


)


}

export default HomePage