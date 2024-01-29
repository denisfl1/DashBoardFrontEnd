import { useEffect, useState } from "react";
import {API} from "./Api"
import Swal from "sweetalert2";

function To_schedule(){

    const [specialty,setSpecialty] = useState<string>('ClínicaGeral')
    const [date,setDate] = useState<string>()
    const [timeSchedule,setTimeSchedule] = useState<string>()
    const [search,setSearch] = useState<string>()
    const [doctors,setDoctors] = useState([])
    const [patientList,setPatientList] = useState<object[]>([])
    const [patientName,setPatientName] = useState<any>(undefined)
    const [doctorName,setDoctorName] = useState<any>(undefined)
    const key = ["name","cpf"]
    const search2 = search ? patientList.filter((data:any)=>key.find(keys=>data[keys].toLowerCase().includes(search)||
    data[keys].includes(search))):patientList


    const SPECIALTY = [
        'ClínicaGeral',         
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
        'CirurgiaGeral',
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

    const Alert2 =(res:string)=>{                
    return Swal.fire({
    position: 'center',
    icon: 'error',
    title: `${res}`,
    confirmButtonColor:'#3085d6',
    // width:"400px",
    customClass:'swal-wide',
    confirmButtonText:"Fechar",
 
  })} 

    const sendSchedule= async()=>{

        if(!doctorName)return Alert2("Selecione um Médico!")
        if(!patientName)return Alert2("Selecione um Paciente!")
        if(!specialty.trim()||!date?.trim()||!timeSchedule?.trim()|| timeSchedule == "Selecionar" ||!doctorName||!patientName)return Alert2("Preencha os campos em branco!")
        
        const doctor = doctorName.name
        const crm = doctorName.crm
        const patient_Name = patientName.name
        const patient_Email = patientName.email
   

        console.log(doctor,specialty,date,timeSchedule,doctorName,crm,patient_Name,patient_Email )
        
        await API.post("/newschedule",{doctor,specialty,date,timeSchedule,crm,patient_Name,patient_Email}).then(
            res=>{
                           
            Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${res.data}`,
            confirmButtonColor:'#3085d6',
            // width:"400px",
            customClass:'swal-wide',
            confirmButtonText:"Fechar",
            // showConfirmButton:false,
            // timer:1500  
         
          })
         
            setDoctors((data)=>data.filter((datas:any)=>datas.id != doctorName.id))
            },error=>{
                                
                Alert2(error.response.data)
                
            }
        )


    }

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

    <div style={{width:"100%",display:"flex",marginBottom:"50px",justifyContent:"center"}}>
            
                <div>
           <h1 >Disponibilidade:</h1>
           
          <table style={{width:"400px",marginTop:"0",marginBottom:"auto"}}>
           
               <thead>
                   <tr>
                   <th>Médico</th>
                   <th>{specialty != "Psicologia" ? "CRM" : "CRP"}</th>
                   <th></th>
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


            <div style={{width:"800px"}}>
           <h1 style={{marginLeft:"80px"}}>Selecione um Paciente:</h1>   
                   {patientList && <table style={{margin:"auto"}}>
                  
                       <thead>
                       <tr>
                   <th>Nome</th>
                   <th>CPF</th>
                   <th>Email</th>
                   <th></th>
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

                   </table>}
                   </div>

           </div>

</div>




)

}

export default To_schedule