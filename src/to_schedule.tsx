import { useState } from "react";


function To_schedule(){

    const [specialty,setSpecialty] = useState<string>('ClínicaGeral')
    const [date,setDate] = useState<string>()

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

            console.log(times)
        


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
            <input onChange={(e)=>setDate(e.target.value)} type="date" id="calendary" name="calendary"></input>
            
            <label>Horário:</label>
            <select>
                {times.map((data)=>{
    
                    return (
                        <option>{data}</option>
                    )
                
                })}
            </select>
                

            
        
            
            </div>

            <div style={{width:"700px"}}>
            <h1>Disponibilidade</h1>
            <table>
              
                <thead>
                    <tr>
                    <th>Médico</th>
                    </tr>
                </thead>


                <tbody>
                    <tr>      
                        <td>Dr.Julio</td>
                    </tr>
                    <tr>      
                        <td>Dr.Julio</td>
                    </tr>
                </tbody>

            </table>
            </div>
    </div>



</div>




)

}

export default To_schedule