import React from "react";
import { useState } from "react";
import { API } from "./Api";


function  CreateDoctor(){

    const [email,setEmail]= useState<string>()
    const [name,setName] = useState<string>()
    const [crm,setCRM] = useState<string>()
    const [specialty,setSpecialty] = useState<string>('ClínicaGeral')
    const [number,setNumber] = useState<string>()


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


    const SendData = async(e:React.MouseEvent<HTMLButtonElement>)=>{

        e.preventDefault()
            if(!email?.trim() || !name?.trim() || !crm?.trim() )return alert("Preencha os campos em branco!")

            await API.post('/newdoctor',{name,email,crm,specialty,number}).then(
                res=>{
                    if(res.status == 200){
                        alert("Registrado com sucesso")
                    }
            

                },error=>{
                  alert(error.response.data.error)
                }
            )

    }


return(

    <div className="EmployeeContainer" >
        <div style={{display:'flex',alignItems:"center"}}><h1 style={{marginLeft:"50px"}}>Médicos{">"}Novo Cadastro</h1></div>
    <div className="RegisterContent" >
      
        <form>
 
        <label>Nome Completo</label>
        <input placeholder="Nome Completo" required type="text"  name="name" onChange={(e)=>setName(e.target.value)}></input>

        <label>E-mail</label>
        <input placeholder="Email" required type="email"  name="email" onChange={(e)=>setEmail(e.target.value)}></input>
    
        <label>Especialidade</label>

        <select onChange={(e)=>setSpecialty(e.target.value)} style={{marginBottom:"10px"}}>
            {SPECIALTY.map((it)=>{
                return(
                    <option value={it}>{it}</option>
                )
            })}
        </select>

        <label>{specialty != "Psicologia" ?'CRM' : "CRP"}</label>
        <input placeholder="CRM ou CRP"  required type="text"  name="crm" onChange={(e)=>setCRM(e.target.value)}></input>

        <label>Número de Contato</label>
        <input placeholder="Número de Contato" required type="text"  name="number" onChange={(e)=>setNumber(e.target.value)}></input>




        <button type={"submit"} style={{marginTop:'20px'}} onClick={SendData}>Registrar</button>


        </form>

    </div>


</div>

)


}

export default CreateDoctor