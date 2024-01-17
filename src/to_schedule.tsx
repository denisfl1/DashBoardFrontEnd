import { useEffect, useState } from "react";
import {API} from "./Api"

function To_schedule(){

    const [specialty,setSpecialty] = useState<string>('ClínicaGeral')
    const [date,setDate] = useState<string>()
    const [timeSchedule,setTimeSchedule] = useState<string>()
    const [search,setSearch] = useState<string>()
    const [doctors,setDoctors] = useState([])
    const [patientList,setPatientList] = useState<any>([])
    const key = ["name","cpf"]
    const search2 = search ? patientList.filter((data:any)=>key.find(keys=>data[keys].toLowerCase().includes(search)||
    data[keys].includes(search))):""

    const SPECIALTY = [
        'ClínicaGeral',         
        'Cardiologia',
        'Ortopedia',            
        'Dermatologia',
        'Neurologia',           
        'GinecologiaObstetricia',
        'Oftalmologia',         
        'Pediatria',
        'Psiquiatria',          
        'Endocrinologia',
        'Otorrinolaringologia', 
        'Radiologia',
        'Urologia',             
        'CirurgiaGeral',
        'Hematologia',          
        'Gastroenterologia',
        'Nefrologia',           
        'Reumatologia',
        'Psicologia'
    ]

        let times = []

        for (let i = 7; i <= 18; i++) {
            if (i < 9) {
                times.push(`0${i}:00 às 0${i + 1}:00`);
            } else if (i === 9) {
                times.push(`0${i}:00 às ${i + 1}:00`);
            } else {
                times.push(`${i}:00 às ${i + 1}:00`);
            }
        }

       useEffect(()=>{

        (async()=>{
        await API.post('/getschedules',{specialty:specialty,date:date,timeSchedule:timeSchedule}).then(
            res=>{
                console.log(res.data)
                setDoctors(res.data)
            }  
        )
        })()    

       },[timeSchedule,date,specialty])


       useEffect(()=>{

        (async()=>{

            await API.get("http://localhost:5000/getUsers").then(
                res=>{

                    setPatientList(res.data)
                
                },error=>{

                    console.log(error.response)
                }
            )

        })()


    },[])
     

return(

<div className="To_scheduleContainer">
       <div style={{display:"flex",marginLeft:"100px"}}><h1 >Agendar Consulta</h1></div>
    <div className="To_scheduleContent" style={{display:"flex"}}>


            <div className="InputsContent">
            <label>Especialidade</label>   
            <select onChange={(e)=>setSpecialty(e.target.value)} style={{marginBottom:"10px"}}>
            {SPECIALTY.map((it)=>{
                return(
                    <option value={it}>{it}</option>
                )
            })}
            </select>


            <label>Data de Agendamento:</label>
            <input  onChange={(e)=>setDate(e.target.value)} type="date" id="calendary" name="calendary"></input>
            
            <label>Horário:</label>
            <select onChange={(e)=>setTimeSchedule(e.target.value)}>
                {times.map((data)=>{
    
                    return (
                        <option>{data}</option>
                    )
                
                })}
            </select>

            <label>Paciente</label>        
            <input placeholder="Digite o Nome ou CPF" onChange={(e)=>setSearch(e.target.value)}></input>
             {search && <ul>
               {search2.map((data:any)=>{
                return(
                    <li>{data.name}</li>
                )
               })}

            </ul> }  
            </div>

            <div style={{width:"500px"}}>
            {/* <h1 style={{marginLeft:"50px"}}>Disponibilidade:</h1> */}
            <table>
              
                <thead>
                    <tr>
                    <th>Médico</th>
                    <th>{specialty != "Psicologia" ? "CRM" : "CRP"}</th>
                    <th></th>
                    </tr>
                    
                </thead>


                <tbody>
                    
                    
                    {doctors && doctors.map((data:any)=>{
                        return(
                            <tr>      
                            <td>{data.name}</td>
                             
                            <td>{data.crm}</td>
    
                            <td style={{textAlign:"center"}}><button style={{margin:"auto",backgroundColor:"white",border:"1px solid black",borderRadius:"5px"}}>Selecionar</button></td>
    
                    
                        </tr>
                        )

                    })}
                   
                  
                  
                </tbody>

            </table>
            </div>
    </div>



</div>




)

}

export default To_schedule