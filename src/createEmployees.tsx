import React from "react";
import { useState } from "react";
import { API } from "./Api";
import folha from "./Icons/folha.jpg"



function CreateEmplyee(){

    const [email,setEmail]= useState<string>()
    const [name,setName] = useState<string>()
    const [crm,setCRM] = useState<string>()
    const [specialty,setSpecialty] = useState<string>()


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

            await API.post('/newdoctor',{name,email,crm,specialty}).then(
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
        <div style={{display:'flex',alignItems:"center"}}><h1 style={{marginLeft:"50px"}}>Novo Cadastro</h1><img  style={{marginLeft:"10px"}} height={"40px"} src={folha}></img></div>
    <div className="RegisterContent" >
      
        <form>
 
        <label>Nome Completo</label>
        <input required type="text"  name="name" onChange={(e)=>setName(e.target.value)}></input>

        <label>E-mail</label>
        <input required type="email"  name="email" onChange={(e)=>setEmail(e.target.value)}></input>

        <label>CRM</label>
        <input required type="text"  name="crm" onChange={(e)=>setCRM(e.target.value)}></input>

        <label>Especialidade</label>

        <select onChange={(e)=>setSpecialty(e.target.value)}>
            {SPECIALTY.map((it)=>{
                return(
                    <option value={it}>{it}</option>
                )
            })}
        </select>


        <button type={"submit"} style={{marginTop:'20px'}} onClick={SendData}>Registrar</button>


        </form>

    </div>


</div>

)


}

export default CreateEmplyee