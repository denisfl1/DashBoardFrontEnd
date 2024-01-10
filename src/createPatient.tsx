import React, { useEffect } from "react";
import { useState } from "react";
import folha from "./Icons/folha.jpg"
import axios from "axios";



function CreatePatient(){


    const [email,setEmail]= useState<string>()
    const [name,setName] = useState<string>()
    const [crm,setCRM] = useState<string>()
    const [contact_number,setContactNumber] = useState<string>()
    const [number,setNumber] = useState<string>()
    const [cep,setCEP] = useState<string>()
    const [adress,setAdress] = useState<string>()
    const [neighborhood,setNeighborhood] = useState<string>()


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
  
        if(cep?.length === 8){

      
        (async()=>{

           await axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(
                res=>{
                    if(res && res.status == 200){
                    setAdress(res.data.logradouro)
                    setNeighborhood(res.data.bairro)
                    setContactNumber(`(${res.data.ddd})`)
                    console.log(res.data)
     
                }
                },error=>{
        
                }
               )

        })()
    }

    
    },[cep])


return(

    <div className="EmployeeContainer" >
    <div style={{display:'flex',alignItems:"center"}}><h1 style={{marginLeft:"50px"}}>Paciente{"> "}Novo Cadastro</h1><img  style={{marginLeft:"10px"}} height={"40px"} src={folha}></img></div>
<div className="RegisterContent" style={{width:"90%",marginTop:"50px"}}>
  
    <form>

    <label>Nome Completo</label>
    <input required type="text"  name="name" onChange={(e)=>setName(e.target.value)}></input>

    <label>E-mail</label>
    <input required type="email"  name="email" onChange={(e)=>setEmail(e.target.value)}></input>

    <label>CEP</label>
    <input required type="text"  name="adress" onChange={(e)=>setCEP(e.target.value)}></input>

    <label>Número de Contato</label>
    <input value={contact_number} required type="text"  name="number" onChange={(e)=>setContactNumber(e.target.value)}></input>


    </form>

    <form style={{marginLeft:"40px"}}>

        
    <label>Endereço Residencial</label>
    <input value={adress} required type="text"  name="adress" onChange={(e)=>setAdress(e.target.value)}></input>

    <label>Bairro</label>
    <input value={neighborhood} required type="text"  name="adress" onChange={(e)=>setNeighborhood(e.target.value)}></input>

    
    <label>Número</label>
    <input required type="text" onChange={(e)=>setNumber(e.target.value)}  name="adress" ></input>

          
    <button type={"submit"} style={{marginTop:'26px'}} onClick={SendData}>Registrar</button>


    </form>
  
</div>


</div>



)





}

export default CreatePatient