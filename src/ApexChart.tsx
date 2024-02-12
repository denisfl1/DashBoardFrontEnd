import React, { useCallback, useEffect, useState } from "react";
import { API } from "./Api"


const Chart:React.FC=()=>{

    const [Options,setOptions] = useState<String>('')
    const GetData:String|null = localStorage.getItem('apex') 
    const a = ["1","2","3","4","5"]
    let Dates:String[] = []
    let OpenX:String[] = []
    let HighX:String[] = []
    let LowX:String[] = []
    let CloseX:String[] = []

    const [DATES,setDates] = useState<String[]>([])
    const [OPEN,setOpen] = useState<String[]>([])
    const [HIGH,setHigh] = useState<String[]>([])
    const [LOW,setLow] = useState<String[]>([])
    const [CLOSE,setClose] = useState<String[]>([])
    
    const DATAObjects = []

    useEffect(()=>{

        (async()=>{

        await API.get('/api/data').then(
            res=>{
                if(res.status === 200){
                for(const key in res.data['Time Series (Daily)']){
                    Dates.push(key)        
                    OpenX.push(res.data['Time Series (Daily)'][key]['1. open'])
                    HighX.push(res.data['Time Series (Daily)'][key]['2. high'])
                    LowX.push(res.data['Time Series (Daily)'][key]['3. low'])
                    CloseX.push(res.data['Time Series (Daily)'][key]['4. close'])
                }

            }
            setDates(Dates)
            setOpen(OpenX)
            setHigh(HighX)
            setLow(LowX)
            setClose(CloseX)

            },error=>{
                console.log(error)
            }
        )

        })()


    },[Options])



    const options:object = {
        xaxis:{
            type:'datetime'
        },
        yaxis:{
            tooltip:{
                enabled:true
            }
        },
        title:{
            text: "IBM Grafic",
            align:'center',
            style:{
                fontSize:"40px"
            }
        }
       
    }

for (let i = 0; i < DATES.length; i++) {
  const dataObject = {
    x: DATES[i],
    y: [OPEN[i], HIGH[i], LOW[i], CLOSE[i]]
  }

  DATAObjects.push(dataObject);
}

    const series= [
        
        44, 55, 41, 17, 15
        // {
        // data:DATAObjects
    
        // }
    
    
    ]

const GraphiceType =

[
    "bar", 
    "line", 
    "area",
    "pie",
    "donut", 
    "radialBar", 
    "scatter",
    "bubble",
    "heatmap", 
    "candlestick", 
    "boxPlot", 
    "radar", 
    "polarArea", 
    "rangeBar",
    "rangeArea",
    "treemap" 

]

return(
    <>
    {/* <ReactApexChart 
    options={options} 
    series={series}
    type={"pie"}
    height={'450'}
    width={"100%"}
  
    
    /> */}
    {/* <select onChange={HandleClick}  >
    {GraphiceType.map((it)=>{
        return(
        <option value={it}>{it}</option>
        )
    })}
    </select> */}
    </>
 
)

}
export default Chart