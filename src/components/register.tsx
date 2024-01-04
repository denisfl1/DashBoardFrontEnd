import React, { useState } from "react";
import logo from '../Icons/logo.png'

import { API } from "../Api";

const Register:React.FC=()=>{

    const [email,setEmail]= useState<string>()
    const [name,setName] = useState<string>()
    const [surname,setSurname] = useState<string>()
    const [password,setPassword]= useState<string>()
    const [ConfirmPassword,setConfirmPassword]= useState<string>()


    const SendLogin = async(e:React.MouseEvent<HTMLButtonElement>)=>{

        e.preventDefault()
            if(!email?.trim() || !name?.trim() || !surname?.trim() || !password?.trim() || !ConfirmPassword?.trim())return alert("Preencha os campos em branco!")

            if(password !== ConfirmPassword)return alert("Senhas Diferentes")

            await API.post('/register',{name,email,password}).then(
                res=>{
                    if(res.status == 200){
                        alert("Registrado com sucesso")
                    }
                    console.log(res.data)

                },error=>{
                  alert(error.response.data.error)
                }
            )

    }

    return( 

        <div className="LoginContainer">

                
                <div className="RegisterIMG"> <img style={{width:'500px',height:'500px'}} src={logo}></img></div>
                <div className="RegisterContent">
                  
                    <form>
             
                    <label>Nome</label>
                    <input required type="text"  name="name" onChange={(e)=>setName(e.target.value)}></input>

                    <label>Sobrenome</label>
                    <input required type="text" name="surname" onChange={(e)=>setSurname(e.target.value)}></input>

                    <label>E-mail</label>
                    <input required type="email"  name="email" onChange={(e)=>setEmail(e.target.value)}></input>
                 
                    <label>Senha</label>
                    <input required type="password"  name="password" onChange={(e)=>setPassword(e.target.value)}></input>

                    <label>Repita sua Senha</label>
                    <input required type="password"  name="password" onChange={(e)=>setConfirmPassword(e.target.value)}></input>

                    <button type={"submit"} style={{marginTop:'20px'}} onClick={SendLogin}>Registrar</button>
    
    
                    </form>

                </div>
            

        </div>



    )



}

export default Register