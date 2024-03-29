import { useEffect, useState,useContext } from "react";
import {API} from "./Api"
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./contexts/context"
import editUser from "./Icons/configuracoes.png"

function Edit_schedule(){

    const [specialty,setSpecialty] = useState<string>('ClínicaGeral')
    const [date,setDate] = useState<string>()
    const [timeSchedule,setTimeSchedule] = useState<string>()
    const [schedule,setSchedule] = useState<any>([])
    const [search,setSearch] = useState<string>()
    const [doctors,setDoctors] = useState<object[]>([])
    const [patientList,setPatientList] = useState<object[]>([])
    const [patientName,setPatientName] = useState<any>(undefined)
    const [doctorName,setDoctorName] = useState<any>(undefined)
    const key = ["name","cpf"]
    const search2 = search ? patientList.filter((data:any)=>key.find(keys=>data[keys].toLowerCase().includes(search)||
    data[keys].includes(search))):patientList
  

    const param = useParams()
    const id = param.id
    const navigate = useNavigate()
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

        const [promise1,promise2] = await Promise.allSettled(
            [
                API.get(`/findschedules/${id}`),
                API.get("/getUsers"),

            ]
        )

        
            if(promise1.status === 'fulfilled'){
                const name = promise1.value.data.doctor
                const crm = promise1.value.data.crm
                
                setSearch(promise1.value.data.patient_Name)
                setSchedule(promise1.value.data)
                setDoctorName({name,crm})
                setSpecialty(promise1.value.data.specialty)
                setDate(promise1.value.data.date)
                setTimeSchedule(promise1.value.data.hour)
    
            }else{
                console.log(promise1.reason.response.data)
                navigate('/schedules')
            }


            if(promise2.status === 'fulfilled'){

                setPatientList(promise2.value.data)

            }else{
                console.log(promise2.reason.response.data)
             
            }


            if(promise1.status === 'fulfilled' && promise2.status === 'fulfilled'){
                const name = promise1.value.data.patient_Name
                const email = promise1.value.data.patient_Email
                const findUser = promise2.value.data.find((data:any)=>data.email == email && data.name == name)
            
                setPatientName(findUser)
            }
        

        })() 


       },[])
       

       const handleSpeciality =(e:any)=>{

        const event = e.target.value

        setSpecialty(event)
        setDoctorName('')

       }

    useEffect(()=>{


        (async()=>{
        await API.post('/findschedules',{specialty:specialty,date:date,timeSchedule:timeSchedule}).then(
            res=>{
           
         
               setDoctors(res.data)
            

            },error=>{

                  if(error.response.data)return setDoctors([])
            }  
        )
        })() 


       },[timeSchedule,date,specialty])
     
   
    const selectDoctor = (data:any,e:any)=>{
 
        const list:any = {}

        list.name = schedule.doctor
        list.crm = schedule.crm
        list.specialty = schedule.specialty

        const verify = typeof doctorName === 'undefined'    

        if(verify){
            setDoctorName(data)
            
        }
        else if(!verify && doctorName.id != e.target.id){
            setDoctorName(data)
        }else{
            setDoctorName(list)
        }   
      
  
    }

    const selectPatient = (data:any,e:any)=>{
        const name = schedule.patient_Name
        const email = schedule.patient_Email
        const findUser = patientList.find((data:any)=>data.email == email && data.name == name)


        const verify = typeof patientName === 'undefined'
       
      
        if(verify){
    
            setPatientName(data)
    
        }
        else if(!verify && patientName.id != e.target.id){

            setPatientName(data)
           
        }
        else{

            setPatientName(findUser)
           
        } 
     
    }


  const AlertQuestion =(data:any)=>{

    Swal.fire({
        title: "Deseja mesmo alterar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText:"Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          
            if(data.status == 200){
                Alert && Alert(data.data,"success")
                console.log(data)
            }else{
                Alert && Alert(data.response.data,"error")
                console.log(data.response.data)
            }
           
        }
      });

}

    const sendSchedule= async()=>{

        if(!doctorName)return  Alert && Alert("Selecione um Médico!","error")
        if(!patientName)return Alert && Alert("Selecione um Paciente!","error")
        if(!specialty.trim()||!date?.trim()||!timeSchedule?.trim()|| timeSchedule == "Selecionar" ||!doctorName||!patientName)return Alert && Alert("Preencha os campos em branco!","error")
     
        const doctor = doctorName.name
        const crm = doctorName.crm
        const patient_Name = patientName.name
        const patient_Email = patientName.email
   

        try {
            const resp = await API.put("/editscheduling",{id,doctor,specialty,date,timeSchedule,crm,patient_Name,patient_Email})
            AlertQuestion(resp)
            
          
        } catch (error) {
            AlertQuestion(error)
           
        }
            

    }

return(

<div className="To_scheduleContainer">
       <div style={{display:"flex",marginLeft:"100px",alignItems:"center"}}><h1 >Editar Consulta</h1>
       <img style={{marginLeft:"10px"}} height={"40px"} width={"40px"} src={editUser}></img>
       </div>
       <div style={{width:"80%",borderBottom:"0.5px solid #D3D3D3",margin:"auto"}}></div>

    <div className="To_scheduleContent" style={{display:"flex"}}>


            <div className="InputsContent">
            <label>Especialidade</label>   
            <select value={specialty} onChange={(e)=>handleSpeciality(e)} style={{marginBottom:"10px"}}>
            {SPECIALTY.map((it)=>{
                return(
                    <option value={it}>{it}</option>
                )
            })}
            </select>


            <label>Data de Agendamento:</label>
            <input value={date}  onChange={(e)=>setDate(e.target.value)} type="date" id="calendary" name="calendary"></input>
            
            <label>Horário:</label>
            <select value={timeSchedule} onChange={(e)=>setTimeSchedule(e.target.value)}>
                {times.map((data:any)=>{
                     
                    return (
                        <option value={data}>{data}</option>
                    )
                
                })}
            </select>

            <label>Paciente</label>        
            <input value={search} placeholder="Digite o Nome ou CPF" onChange={(e)=>setSearch(e.target.value)}></input>
             
               
            <div style={{position:"relative",display:"flex",justifyContent:"right",marginTop:"15px",alignItems:"center"}}><button onClick={sendSchedule}>Prosseguir</button></div>
            </div>

           
    </div>
    <div style={{width:"60%",height:"1px",borderBottom:"0.5px solid #D3D3D3",margin:"auto"}}></div>

    <div style={{width:"100%",display:"flex",marginBottom:"50px",justifyContent:"center"}}>
            
                <div>
           <h1>Disponibilidade:</h1>
           <div className="scheduling_doctor" style={{maxHeight:"195px",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"}}>     
          <table style={{width:"400px",marginTop:"0",marginBottom:"auto"}}>
           
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

export default Edit_schedule