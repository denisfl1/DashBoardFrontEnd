import React, {  useContext } from "react"
import qrCodeIMG from "../Icons/licensed-image.jpeg"
import MyQRCODE from "./QRCodePage"
import Swal from "sweetalert2";
import { UserContext } from "../contexts/context";
import { API } from "../Api";


function UserSchedule(props:{data:any,setAllSchedules:React.Dispatch<React.SetStateAction<object[]>>,My_QR:boolean,setMy_My_QR:React.Dispatch<React.SetStateAction<boolean>>,setMy_QR_Code:React.Dispatch<React.SetStateAction<object>>}){

    const {Alert} = useContext(UserContext)


    const Handle_MyQR= (data:object)=>{

        if(!props.My_QR){
            props.setMy_My_QR(true)
            props.setMy_QR_Code(data)
        }else{
            props.setMy_My_QR(false)
            props.setMy_QR_Code([])
        }


    }


    const handleCancell:React.MouseEventHandler<HTMLButtonElement> = (e)=>{

        if(e.target instanceof HTMLButtonElement){
        const id  = e.target.id
       
        Swal.fire({

            title: "Deseja mesmo cancelar?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim",
            cancelButtonText:"Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
                
                API.put('/cancell_scheduling',{id}).then(

                res=>{

                    if(res.status == 200){

                        Alert && Alert("Cancelado com sucesso","success")
                        props.setAllSchedules((data:any)=>data.map((items:any)=>{return items.id == id ?{...items,status:"Canceled"}:items}))
                    }

                },error=>{

                        Alert && Alert(error.response.data,"error")

                }


                )

               
            }
          })

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
                    <button id={items.id} style={{cursor:"pointer"}} onClick={handleCancell}>Cancelar</button>
                </ul>



            </div>


            </div>
            )
        })
        
        
    }
   
    
    </>





)



}
export default UserSchedule