import React from "react";
import { useState,useContext } from "react";
import { API } from "./Api";
import { UserContext } from "./contexts/context";
import addUser from "./Icons/addUser.png"

function  CreateDoctor(){

    const [email,setEmail]= useState<string>()
    const [nameFull,setName] = useState<string>()
    const [crm,setCRM] = useState<string>()
    const [specialty,setSpecialty] = useState<string>('ClínicaGeral')
    const [number,setNumber] = useState<string>()
    const [sex,setSex] = useState<string>('')
    const {Alert} = useContext(UserContext)

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


    const SendData = async(e:React.MouseEvent<HTMLButtonElement>)=>{

        e.preventDefault()
            if(!email?.trim() || !nameFull?.trim() || !crm?.trim() ||!sex.trim())return  Alert && Alert("Preencha os campos em branco!","error")
            let name = ''
            if(sex === "Masculino" && specialty !== "Psicologia"){
            name = "Dr. " + nameFull
            }else if(sex === "Feminino" && specialty !== "Psicologia"){
            name = "Dra. " + nameFull
            }else if(specialty === "Psicologia"){
            name = "Psic. " + nameFull
            }

            await API.post('/newdoctor',{name,email,crm,specialty,number}).then(
                res=>{
                    if(res.status == 200){
                        Alert && Alert("Registrado com sucesso","success")
                    }
            

                },error=>{
                    Alert && Alert(error.response.data.error,"error")
                }
            )

    }


    console.log(sex)

return(

    <div className="EmployeeContainer" >
        <div style={{display:'flex',alignItems:"center"}}><h1 style={{marginLeft:"50px"}}>Médicos / Novo Cadastro</h1><img style={{marginLeft:"10px"}} height={"40px"} width={"40px"} src={addUser}></img></div>
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
        
        <div> 
        <legend>Sexo:</legend>  
        <div style={{display:"flex",alignItems:"center"}}>
        
       
        <input onClick={(e:any)=>setSex(e.target.value)} style={{marginLeft:"10px"}} type="radio"  name="sex" value="Masculino" />
        <label>Masculino</label>

        <input onClick={(e:any)=>{setSex(e.target.value)}} type="radio"  name="sex" value="Feminino" />
        <label >Feminino</label>
        </div> 
    </div>


        <button type={"submit"} style={{marginTop:'20px'}} onClick={SendData}>Registrar</button>


        </form>

    </div>


</div>

)


}

export default CreateDoctor