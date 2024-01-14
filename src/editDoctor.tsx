import React, { useEffect } from "react";
import { useState } from "react";
import { API } from "./Api";
import { useParams } from "react-router-dom";


function EditDoctor(){

    const [email,setEmail]= useState<string>()
    const [name,setName] = useState<string>()
    const [crm,setCRM] = useState<string>()
    const [specialty,setSpecialty] = useState<string>('ClínicaGeral')
    const [number,setNumber] = useState<string>()

    const param = useParams()
    const id = param.id

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

            // await API.post('/newdoctor',{name,email,crm,specialty,number}).then(
            //     res=>{
            //         if(res.status == 200){
            //             alert("Registrado com sucesso")
            //         }
            

            //     },error=>{
            //       alert(error.response.data.error)
            //     }
            // )

    }

    useEffect(()=>{

        (async()=>{

            await API.get(`/getdoctor/${id}`).then(
                res=>{
                    
                    console.log(res.data)
                    setName(res.data.crm)
                    setEmail(res.data.email)
                    setCRM(res.data.crm)
                    setSpecialty(res.data.specialty)
                    setNumber(res.data.number)

                },error=>{
                    alert(error.response.data)
                }
            )


        })()


    },[])


return(

    <div className="EmployeeContainer" >
        <div style={{display:'flex',alignItems:"center"}}><h1 style={{marginLeft:"50px"}}>Médicos{">"}Novo Cadastro</h1></div>
    <div className="RegisterContent" >
      
        <form>
 
        <label>Nome Completo</label>
        <input value={name} required type="text"  name="name" onChange={(e)=>setName(e.target.value)}></input>

        <label>E-mail</label>
        <input value={email} required type="email"  name="email" onChange={(e)=>setEmail(e.target.value)}></input>

        <label>CRM</label>
        <input value={crm} required type="text"  name="crm" onChange={(e)=>setCRM(e.target.value)}></input>

        <label>Número de Contato</label>
        <input value={number} required type="text"  name="number" onChange={(e)=>setNumber(e.target.value)}></input>


        <label>Especialidade</label>

        <select value={specialty} onChange={(e)=>setSpecialty(e.target.value)}>
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

export default EditDoctor