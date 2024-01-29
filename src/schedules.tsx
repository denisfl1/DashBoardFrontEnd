import React, { useEffect, useState } from "react";
import {API} from './Api'
import lupa from "./Icons/lupa.png"
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import  MyQRCODE from "./components/QRCodePage"

function Schedules(){

    const[AllSchedules,setAllSchudeles] = useState([])
    const [search,setSearch] = useState<string[]>([])
    const key = ["patient_Name","patient_Email","status"]
    const search2 = typeof search !== undefined ? AllSchedules.filter((data:any)=>key.find(keys=>data[keys].toLowerCase().includes(search))): AllSchedules

    useEffect(()=>{


        (async()=>{

            await API.get('/getschedules').then(
            res=>{

                if(res && res.status){
                setAllSchudeles(res.data)
                
            }
            },error=>{
                
                console.log(error)
  
            }
          )


        })()



    },[])

    const Alert2 =(res:string)=>{                
        return Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${res}`,
        confirmButtonColor:'#3085d6',
        // width:"400px",
        customClass:'swal-wide',
        confirmButtonText:"Fechar",
     
      })} 
    


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
                        Alert2(res.data)
                        setAllSchudeles((data)=>data.filter((it:any)=>it.id !=id))
                    },error=>{

                        Alert2(error.response.data)
                    }
                 )
            }
          });

    }
    }


return(

    <div className="SchedulesContainer">
                        <h1 style={{marginLeft:"140px"}}>Agendamentos</h1>
                        <div style={{display:"flex",alignItems:"center"}}>
                        <div className="container_Input_DoctorList"><input placeholder="Nome, CRM ou CRP" onChange={(e)=>setSearch([e.target.value])}></input><img src={lupa}></img></div>
                  
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

                        </tr>


                    </thead>

                    
                    <tbody>



                        {search2 && search2.map((data:any)=>{
                            return(

                                <tr>

                                 <td>{data.doctor}</td>
                                 <td>{data.specialty}</td>
                                 <td>{data.crm}</td>
                                 <td>{data.patient_Name}</td>
                                 <td>{data.patient_Email}</td>                            
                                 <td>{data.date}</td>
                                 <td>{data.hour}</td>
                                 <td><div className={`statusSchedule ${data.status}`}></div></td>
                                 <td><Link to={`/editschedule/${data.id}`}><button className="tableButton Edit" >Editar</button></Link><button className="tableButton Delete" id={data.id} onClick={handleDelete}>Excluir</button></td>
                    
                                </tr>

                            )

                        })}



                    </tbody>


                </table>:<h1 style={{marginLeft:"120px",marginTop:"60px"}}>Não há consultas agendadas...</h1>}

            </div>
            <MyQRCODE/>
    </div>
  

)



}

export default Schedules