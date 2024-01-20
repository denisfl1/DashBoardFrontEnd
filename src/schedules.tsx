import React, { useEffect, useState } from "react";
import {API} from './Api'
import lupa from "./Icons/lupa.png"
import Swal from "sweetalert2";


function Schedules(){

    const[AllSchedules,setAllSchudeles] = useState([])
    const [search,setSearch] = useState<string[]>([])

    const key = ["patient_Name","patient_Email"]
    const search2 = typeof search !== undefined ? AllSchedules.filter((data:any)=>key.find(keys=>data[keys].toLowerCase().includes(search))): AllSchedules

    useEffect(()=>{


        (async()=>{

            await API.get('/getsc').then(
            res=>{
                console.log(res.data)
                setAllSchudeles(res.data)
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
            title: "Deseja excluir este usuário?",
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
                        <div className="container_Input_DoctorList"><input placeholder="Nome, CRM ou CRP" onChange={(e)=>setSearch([e.target.value])}></input><img src={lupa}></img></div>

        <div className="SchedulesContent">

                <table>

                    <thead>

                        <tr>

                            <th>Médico(a)</th>

                            <th>Especialidade</th>

                            <th>CRM</th>

                            <th>Nome do Paciente</th>

                            <th>Email do Paciente</th>

                            <th>Data de Agendamento</th>

                            <th>Horários</th>

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
                                 <td><button>Editar</button><button id={data.id} onClick={handleDelete}>Excluir</button></td>
                    
                                </tr>

                            )

                        })}



                    </tbody>


                </table>

            </div>

    </div>


)



}

export default Schedules