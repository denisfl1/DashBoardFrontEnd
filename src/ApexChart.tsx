import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { API } from "./Api"


function Chart(){

    let Dates:String[]= []
    let valuesX:String[] = []

    useEffect(()=>{

        (async()=>{

        await API.get('/api/data').then(
            res=>{
                if(res.status === 200){
                for(const key in res.data['Weekly Time Series']){
                    Dates.push(key)
                    valuesX.push(res.data['Weekly Time Series'][key]['1. open'])
                }      
            }

            console.log(Dates)
            console.log(valuesX)
            },error=>{
                console.log(error)
            }
        )

        })()


    },[])



    const options:object = {
        xaxis:{
            type:'datetime'
        },
        yaxis:{
            tooltip:{
                enabled:true
            }
        }
    }

    const series= [{

        data: [{
            x: new Date(1538778600000),
            y: [6629.81, 6650.5, 6623.04, 6633.33]
            
      }]

    }]



return(
    <ReactApexChart 
    options={options} 
    series={series}
    type="candlestick"
    height={350}
  
    
    />


)

}export default Chart