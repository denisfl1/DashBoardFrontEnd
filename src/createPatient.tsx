import React, { useEffect } from "react";
import { useState } from "react";
import folha from "./Icons/folha.jpg"
import axios from "axios";
import {API} from "./Api"


function CreatePatient(){

    const [email,setEmail]= useState<string>()
    const [name,setName] = useState<string>()
    const [contact_number,setContactNumber] = useState<string>()
    const [number_adress,setNumber] = useState<string>()
    const [zipCode,setZipCode] = useState<string>()
    const [adress,setAdress] = useState<string>()
    const [neighborhood,setNeighborhood] = useState<string>()
    const [cpf,setCPF] = useState<string>()

    const SendData = async(e:React.MouseEvent<HTMLButtonElement>)=>{

        e.preventDefault()
        console.log(name,email,contact_number,number_adress,zipCode,adress,neighborhood)
            if(!email?.trim() || !name?.trim() || !contact_number?.trim() || !number_adress?.trim() || !zipCode?.trim() || !adress?.trim() || !neighborhood?.trim())return alert("Preencha os campos em branco!")

            await API.post('/registerAdmin',{name,email,contact_number,number_adress,zipCode,adress,neighborhood,cpf}).then(
                res=>{
                    if(res.status == 200){
                        alert("Registrado com sucesso")
                    }
            

                },error=>{
                    alert(error.response.data.message)
                }
            )

    }


    useEffect(()=>{
  
        if(zipCode?.length === 8){

      
        (async()=>{

           await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`).then(
                res=>{
                    if(res && res.status == 200){
                    setAdress(res.data.logradouro)
                    setNeighborhood(res.data.bairro)
                    setContactNumber(`(${res.data.ddd}) `)
     
                }
                },error=>{
                    
                   
                }
               )

        })()
    }

    
    },[zipCode])


return(

    <div className="EmployeeContainer" >
    <div style={{display:'flex',alignItems:"center"}}><h1 style={{marginLeft:"50px"}}>Paciente{"> "}Novo Cadastro</h1></div>
<div className="RegisterContent" style={{width:"90%",marginTop:"50px"}}>
  
    <form>

    <label>Nome Completo</label>
    <input placeholder="Nome Completo" required type="text"  name="name" onChange={(e)=>setName(e.target.value)}></input>

    <label>E-mail</label>
    <input placeholder="E-mail" required type="email"  name="email" onChange={(e)=>setEmail(e.target.value)}></input>

    <label>CEP</label>
    <input placeholder="CEP"  required type="text"  name="adress" onChange={(e)=>setZipCode(e.target.value)}></input>

    <label>Número de Contato</label>
    <input placeholder="Número de Contato"  value={contact_number} required type="text"  name="number" onChange={(e)=>setContactNumber(e.target.value)}></input>

      
    <label>CPF</label>
    <input placeholder="CPF" type="text" onChange={(e)=>setCPF(e.target.value)}  name="cpf" ></input>


    </form>

    <form style={{marginLeft:"40px"}}>

        
    <label>Endereço Residencial</label>
    <input placeholder="Endereço Residencial"  value={adress} required type="text"  name="adress" onChange={(e)=>setAdress(e.target.value)}></input>


    <label>Bairro</label>
    <input placeholder="Bairro" value={neighborhood} required type="text"  name="adress" onChange={(e)=>setNeighborhood(e.target.value)}></input>

    
    <label>Número</label>
    <input placeholder="Número" value={number_adress} required type="text" onChange={(e)=>setNumber(e.target.value)}  name="adress" ></input>

          
    <button type={"submit"} style={{marginTop:'26px'}} onClick={SendData}>Registrar</button>


    </form>
  
</div>


</div>



)





}

export default CreatePatient