import React, { useEffect, useState ,useContext} from "react";
import {API} from './Api'
import lupa from "./Icons/lupa.png"
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import  MyQRCODE from "./components/QRCodePage"
import QRReader from "./components/QRCodeReader";
import qrCodeIMG from "./Icons/licensed-image.jpeg"
import { UserContext } from "./contexts/context";
import UserSchedule from "./components/userSchedule";

function  Schedules_User(){

    const[AllSchedules,setAllSchedules] = useState<Object[]>([])
    const [search,setSearch] = useState<string[]>([])
    const key = ["patient_Name","patient_Email","status"]
    const search2 = typeof search !== undefined ? AllSchedules.filter((data:any)=>key.find(keys=>data[keys].toLowerCase().includes(search))): AllSchedules
    const [My_QR_Code,setMy_QR_Code] = useState<object>([])
    const [My_QR,setMy_My_QR] = useState<boolean>(false)
    const {Alert} = useContext(UserContext)

    useEffect(()=>{


        (async()=>{

            await API.get('/getschedules').then(
            res=>{

                if(res && res.status){
                    console.log(res.data)
                    setAllSchedules(res.data)
                
            }
            },error=>{
                
                console.log(error)
  
            }
          )


        })()



    },[])
    

    
  


return(

    <div className="SchedulesContainer">
                        <h1 style={{marginLeft:"140px"}}>Agendamentos</h1>
                        <div style={{display:"flex",alignItems:"center"}}>
                        <div className="container_Input_DoctorList"><input placeholder="Nome, CRM ou CRP" onChange={(e)=>setSearch([e.target.value])}></input><img src={lupa}></img></div>
                        <div style={{display:"flex",flexDirection:"column",border:"1px solid black",marginLeft:"5px"}}>
                                                   
    
                                                 
                            </div>
                        <div className="statusDescription">
                  
                            <ul>
                             <div style={{display:"flex",alignItems:"center"}}><div style={{margin:"0",marginRight:"5px"}} className={`statusSchedule Active`}></div><li>Ativo</li> </div>
                             <div style={{display:"flex",alignItems:"center"}}> <div style={{margin:"0",marginRight:"5px"}} className={`statusSchedule Finished`}></div> <li>Finalizado</li></div>
                             <div style={{display:"flex",alignItems:"center"}}> <div style={{margin:"0",marginRight:"5px"}} className={`statusSchedule Canceled`}></div><li>Cancelado</li>  </div>
                            </ul>
                        </div>
                        <select onChange={(e:any)=>setSearch(e.target.value)
                        
                        } style={{width:"125px",fontSize:"20px"}}>
                         <option selected value={[]}>Todos</option>
                        <option value="active">Ativo</option>
                        <option value="finished">Finalizado</option>
                        <option value="canceled">Cancelado</option>

                        </select>
                        
                        </div>
        <div className="SchedulesContent" style={{display:"flex"}}>
                
            <UserSchedule data={search2} setMy_QR_Code={setMy_QR_Code} My_QR={My_QR} setMy_My_QR={setMy_My_QR}/>
                 
            </div>
            {My_QR &&<MyQRCODE My_QR_Code={My_QR_Code} setMy_My_QR={setMy_My_QR}/>}
    </div>
  

)



}

export default Schedules_User