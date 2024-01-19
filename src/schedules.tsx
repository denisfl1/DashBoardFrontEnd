import React, { useEffect, useState } from "react";
import {API} from './Api'


function Schedules(){

    const[AllSchedules,setAllSchudeles] = useState([])


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




return(

    <div className="SchedulesContainer">

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



                        {AllSchedules && AllSchedules.map((data:any)=>{
                            return(

                                <tr>

                                 <td>{data.doctor}</td>
                                 <td>{data.specialty}</td>
                                 <td>{data.crm}</td>
                                 <td>{data.patient_Name}</td>
                                 <td>{data.patient_Email}</td>
                                 <td>{data.date}</td>
                                 <td>{data.hour}</td>
                    
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