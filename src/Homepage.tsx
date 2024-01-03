import React from "react";
import Chart from './ApexChart';
import Header from "./components/Header";



function HomePage(){



return(

    <div className="HomePageContainer">
             <Header></Header>

            <div className="Dashboard1">
            <Chart></Chart>
            </div>
     
       
    </div>


)


}

export default HomePage