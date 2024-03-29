import { useEffect, useState ,useContext} from "react";
import {API} from "./Api"
import { UserContext } from "./contexts/context";
import markshedule from "./Icons/list.png"
function To_schedule(){

    const [specialty,setSpecialty] = useState<string>('Clínica Geral')
    const [date,setDate] = useState<string>()
    const [timeSchedule,setTimeSchedule] = useState<string>()
    const [search,setSearch] = useState<string>()
    const [doctors,setDoctors] = useState<object[]>([])
    const [patientList,setPatientList] = useState<object[]>([])
    const [patientName,setPatientName] = useState<any>(undefined)
    const [doctorName,setDoctorName] = useState<any>(undefined)
    const key = ["name","cpf"]
    const search2 = search ? patientList.filter((data:any)=>key.find(keys=>data[keys].toLowerCase().includes(search)||
    data[keys].includes(search))):patientList
    const {Alert} = useContext(UserContext)

    const SPECIALTY = [
        'Clínica Geral',         
        'Cardiologia',
        'Ortopedia',            
        'Dermatologia',
        'Neurologia',           
        'Ginecologia Obstetricia',
        'Oftalmologia',         
        'Pediatria',
        'Psiquiatria',          
        'Endocrinologia',
        'Otorrinolaringologia', 
        'Radiologia',
        'Urologia',             
        'Cirurgia Geral',
        'Hematologia',          
        'Gastroenterologia',
        'Nefrologia',           
        'Reumatologia',
        'Psicologia'
    ]

        let times = []

        for (let i = 7; i <= 18; i++) {
            if(i == 7){
                times.push("Selecionar")
            }
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
        await API.post('/findschedules',{specialty:specialty,date:date,timeSchedule:timeSchedule}).then(
            res=>{
              
                setDoctors(res.data)
                setDoctorName(undefined)
                
            },error=>{

                  if(error.response.data)return setDoctors([])
            }  
        )
        })() 


       },[timeSchedule,date,specialty])


       useEffect(()=>{


        (async()=>{

            await API.get("http://localhost:5000/getUsers").then(
                res=>{
                    
                    if(res && res.status == 200){
                    setPatientList(res.data)
                        
                    }
                },error=>{
                    
                    console.log(error.response)
                }
            )

        })()


    },[])
     
   
    const selectDoctor = (data:any,e:any)=>{


        const verify = typeof doctorName === 'undefined'    

        if(verify){
            setDoctorName(data)
            
        }
        else if(!verify && doctorName.id != e.target.id){
            setDoctorName(data)
        }else{
            setDoctorName(undefined)
        }   
      
        
    }

    const selectPatient = (data:any,e:any)=>{


        const verify = typeof patientName === 'undefined'
       
      
        if(verify){
    
            setPatientName(data)
    
        }
        else if(!verify && patientName.id != e.target.id){

            setPatientName(data)
           
        }
        else{

            setPatientName(undefined)
           
        } 
     
    }


    const sendSchedule= async()=>{

        if(!doctorName)return   Alert && Alert("Selecione um Médico!","error")
        if(!patientName)return   Alert && Alert("Selecione um Paciente!","error")
        if(!specialty.trim()||!date?.trim()||!timeSchedule?.trim()|| timeSchedule == "Selecionar" ||!doctorName||!patientName)return Alert && Alert("Preencha os campos em branco!","Error")
        
        const doctor = doctorName.name
        const crm = doctorName.crm
        const patient_Name = patientName.name
        const patient_Email = patientName.email
   

        console.log(doctor,specialty,date,timeSchedule,doctorName,crm,patient_Name,patient_Email )
        
        await API.post("/newschedule",{doctor,specialty,date,timeSchedule,crm,patient_Name,patient_Email}).then(
            res=>{
                           
                Alert && Alert(res.data,"success")
         
            setDoctors((data)=>data.filter((datas:any)=>datas.id != doctorName.id))
            },error=>{
             
                Alert && Alert(error.response.data,"error")
                
            }
        )


    }

return(

<div className="To_scheduleContainer">
       <div style={{display:"flex",marginLeft:"100px",alignItems:"center"}}><h1 >Agendar Consulta</h1><img style={{marginLeft:"10px"}} width="40px" height="40px" src={markshedule}></img></div>
    
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
                {times.map((data:any)=>{
                     
                    return (
                        <option value={data}>{data}</option>
                    )
                
                })}
            </select>

            <label>Paciente</label>        
            <input placeholder="Digite o Nome ou CPF" onChange={(e)=>setSearch(e.target.value)}></input>
             
               
            <div style={{position:"relative",display:"flex",justifyContent:"right",marginTop:"15px",alignItems:"center"}}><button onClick={sendSchedule}>Prosseguir</button></div>
            </div>

           
    </div>
                    <div style={{width:"60%",height:"1px",borderBottom:"0.5px solid #D3D3D3",margin:"auto"}}></div>
    <div style={{width:"100%",display:"flex",justifyContent:"center",marginBottom:"100px"}}>
            
            <div>
           <h1 >Disponibilidade:</h1>
           <div className="scheduling_doctor" style={{boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"}}>
          <table style={{width:"400px",marginTop:"0"}}>
        
               <thead>
                   <tr>
                   <th>Médico</th>
                   <th>{specialty != "Psicologia" ? "CRM" : "CRP"}</th>
                   <th style={{borderTopRightRadius:'0'}}></th>
                   </tr>
                   
               </thead>


               <tbody>
                   
                   
                   {doctors[0] ? doctors.map((data:any)=>{
                       const SorD = typeof doctorName !== "undefined" && doctorName.id == data.id 
                       return(
                           <tr style={{backgroundColor:SorD ?"#eeeeee":""}}>      
                           <td>{data.name}</td>
                            
                           <td>{data.crm}</td>
   
                           <td style={{textAlign:"center"}}><button style={SorD ?{backgroundColor: "black",color:"white"}:{}} onClick={(e)=>selectDoctor(data,e)} className="TableScheduleButton" id={data.id}>{typeof doctorName !== 'undefined' &&  data.id == doctorName.id ? "Desfazer" :"Selecionar"}</button></td>
   
                   
                       </tr>
                       )

                   }): <tr><td>Não há disponibilidade</td></tr>}
                  
                 
                 
               </tbody>
                  
           </table>
           </div>
           </div>  

            <div style={{width:"800px"}}>
           <h1 style={{marginLeft:"80px"}}>Selecione um Paciente:</h1>   
                   {patientList && <table style={{margin:"auto",width:"0"}}>
                   <div className="schedulingTbody" style={{}}>
                       <thead>
                       <tr>
                   <th>Nome</th>
                   <th>CPF</th>
                   <th>Email</th>
                   <th style={{borderTopRightRadius:'0'}}></th>
                   </tr>
                       </thead>
                   
                       <tbody>
                           {patientList && search2.map((data:any)=>{
                               const SorD = typeof patientName !== 'undefined' &&  data.id == patientName.id 

                               return(
                                 <tr style={{backgroundColor:SorD ?"#eeeeee": ""}}>
                                 <td>{data.name}</td>
                                 <td>{data.cpf}</td>
                                 <td>{data.email}</td>
                                 <td style={{textAlign:"center"}}><button style={SorD ?{backgroundColor: "black",color:"white"}:{}}  className="TableScheduleButton" id={data.id} onClick={(e)=>selectPatient(data,e)}>{SorD ?"Desfazer" :"Selecionar"}</button></td>
                             </tr>
                             )
                           })}
                                               
                       </tbody>
                       </div>
                   </table>}
                   </div>

           </div>

</div>




)

}

export default To_schedule