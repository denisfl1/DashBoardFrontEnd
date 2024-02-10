import React, { useEffect, useState } from "react"
import qrCodeIMG from "../Icons/licensed-image.jpeg"
import MyQRCODE from "./QRCodePage"

function userSchedule(props:{data:any,My_QR:boolean,setMy_My_QR:React.Dispatch<React.SetStateAction<boolean>>,setMy_QR_Code:React.Dispatch<React.SetStateAction<object>>}){

    const Handle_MyQR= (data:object)=>{

        if(!props.My_QR){
            props.setMy_My_QR(true)
            props.setMy_QR_Code(data)
        }else{
            props.setMy_My_QR(false)
            props.setMy_QR_Code([])
        }


    }

return(

    <>
        {props.data.map((items:any)=>{
    return(
            <div className="userSchedule">


            <div className="userScheduleContent">
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"10px",alignItems:"center"}}><img onClick={()=>Handle_MyQR(items)} style={{height:"60px",width:"60px",cursor:"pointer"}}src={qrCodeIMG}></img><div style={{margin:"0",marginRight:"5px"}} className={`statusSchedule ${items.status} forUser`}></div></div>
                <ul>
                    <li><span style={{fontWeight:"bold",fontSize:"20px"}}>{items.specialty}</span></li>
                    <li><span style={{fontWeight:"bold"}}>Médico: </span>{items.doctor}</li>
                
                    <li><span style={{fontWeight:"bold"}}>Data: </span>{items.date}</li>
                    <li><span style={{fontWeight:"bold"}}>Horário: </span>{items.hour}</li>
                    <button>Cancelar</button>
                </ul>



            </div>


            </div>
            )
        })
        
        
    }
   
    
    </>





)



}
export default userSchedule