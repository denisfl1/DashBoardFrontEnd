import { useState } from "react";


function To_schedule(){

    const [specialty,setSpecialty] = useState<string>('ClínicaGeral')
    const [date,setDate] = useState<any>()
    const [time,setTime] = useState<any>()

    console.log(date)

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


        for(let i=7;i<=18;i++){
  
            if(i <10){
                
                times.push( `0${i}:00 às 0${i+1}:00`)
 
            }   
          
            else{
                times.push( `${i}:00 às ${i+1}:00`)
            }
         
             
        }

            console.log(times)
        
    

return(

<div className="To_scheduleContainer">
       <div style={{display:"flex",marginLeft:"100px"}}><h1 >Agendar Consulta</h1></div>
    <div className="To_scheduleContent">


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
            <input onChange={(e)=>setDate(e.target.value)} type="date" id="birthday" name="birthday"></input>
            
            <label>Horário:</label>
            <select>
                {times.map((data)=>{
                    if(data == "09:00 às 010:00"){
                        data = "09:00 às 10:00"
                    }
                    return (
                        <option>{data}</option>
                    )
                
                })}
            </select>
            
            </div>


            
        
    </div>



</div>




)

}

export default To_schedule