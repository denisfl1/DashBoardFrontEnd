import React, { useEffect, useState ,useContext} from "react";
import {API} from './Api'
import lupa from "./Icons/lupa.png"
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import  MyQRCODE from "./components/QRCodePage"
import QRReader from "./components/QRCodeReader";
import qrCodeIMG from "./Icons/licensed-image.jpeg"
import { UserContext } from "./contexts/context";
import markshedule from "./Icons/listCheck.png"

function Schedules(){

    const[AllSchedules,setAllSchedules] = useState<Object[]>([])
    const [search,setSearch] = useState<string[]>([])
    const key = ["patient_Name","patient_Email","status"]
    const search2 = typeof search !== undefined ? AllSchedules.filter((data:any)=>key.find(keys=>data[keys].toLowerCase().includes(search))): AllSchedules
    const [QRReaderOpen,setQRReaderOpen] = useState<boolean>(false)
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
    


    const handleDelete:React.MouseEventHandler<HTMLButtonElement> = (e)=>{
        if(e.target instanceof HTMLButtonElement){
        const id = e.target.id
                     
        Swal.fire({
            title: "Deseja excluir este agendamento?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim",
            cancelButtonText:"Cancelar",
          }).then(async(result) => {
            if (result.isConfirmed) {
                await API.delete(`/deleteSchedules/${id}`).then(
                    res=>{
                        Alert && Alert(res.data,"success")
                        setAllSchedules((data)=>data.filter((it:any)=>it.id !=id))
                    },error=>{

                        Alert && Alert(error.response.data,"error")
                    }
                 )
            }
          });

    }
    }


    const Handle_QRReaderOpen = ()=>{

        if(!QRReaderOpen){
            setQRReaderOpen(true)
        }else{
            setQRReaderOpen(false)
        }


    }


    
    const Handle_MyQR= (data:object)=>{

        if(!My_QR){
            setMy_My_QR(true)
            setMy_QR_Code(data)
        }else{
            setMy_My_QR(false)
            setMy_QR_Code([])
        }


    }


return(

    <div className="SchedulesContainer">
                        <div style={{display:"flex",alignItems:'center'}}><h1 style={{marginLeft:"140px"}}>Agendamentos</h1><img style={{marginLeft:"10px"}} width="40px" height="40px" src={markshedule}></img></div>

                        <div style={{display:"flex",alignItems:"center"}}>
                        <div className="container_Input_DoctorList"><input placeholder="Nome, CRM ou CRP" onChange={(e)=>setSearch([e.target.value])}></input><img src={lupa}></img></div>
                        <div style={{display:"flex",flexDirection:"column",border:"1px solid black",marginLeft:"5px"}}>
                                                   
                                <img onClick={Handle_QRReaderOpen} style={{height:"50px",width:"50px",cursor:"pointer"}}src={qrCodeIMG}></img>
                                                 
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
        <div className="SchedulesContent">

                {search2[0] ? <table>

                    <thead>

                        <tr>

                            <th>Médico(a)</th>

                            <th>Especialidade</th>

                            <th>CRM/CRP</th>

                            <th>Nome do Paciente</th>

                            <th>Email do Paciente</th>

                            <th>Data</th>

                            <th>Horário</th>

                            <th>Status</th>

                            <th></th>
                            <th></th>

                        </tr>


                    </thead>

                    
                    <tbody>



                        {search2 && search2.map((data:any)=>{
                            return(

                                <tr>

                                 <td>{data.doctor}</td>
                                 <td style={{maxWidth:"60px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{data.specialty}</td>
                                 <td>{data.crm}</td>
                                 <td>{data.patient_Name}</td>
                                 <td>{data.patient_Email}</td>                            
                                 <td>{data.date}</td>
                                 <td>{data.hour}</td>
                                 <td><div className={`statusSchedule ${data.status}`}></div></td>
                                 <td><Link to={`/editschedule/${data.id}`}><button className="tableButton Edit" >Editar</button></Link><button className="tableButton Delete" id={data.id} onClick={handleDelete}>Excluir</button></td>
                                <td><img onClick={()=>Handle_MyQR(data)} style={{height:"30px",width:"30px",cursor:"pointer"}}src={qrCodeIMG}></img></td>
                                </tr>

                            )

                        })}



                    </tbody>


                </table>:<h1 style={{marginLeft:"120px",marginTop:"60px"}}>Não há consultas agendadas...</h1>}

            </div>
           { <QRReader data={AllSchedules}  QRReaderOpen={QRReaderOpen}   setAllSchedules={setAllSchedules}  setQRReaderOpen={setQRReaderOpen}/>}
            {My_QR &&<MyQRCODE My_QR_Code={My_QR_Code} setMy_My_QR={setMy_My_QR}/>}
    </div>
  

)



}

export default Schedules