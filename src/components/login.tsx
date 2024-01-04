import React, { useState } from "react";
import logo from '../Icons/logo.png'
import { useNavigate } from "react-router-dom";
import { API } from "../Api";


const Login:React.FC=()=>{

    const navigate = useNavigate()
    const [email,setEmail]= useState<string>()
    const [password,setPassword]= useState<string>()


    const HandleRegister:React.MouseEventHandler<HTMLButtonElement> = (e)=>{
        e.preventDefault()
        navigate('/register')

    }

    const SendLogin= async(e:React.MouseEvent<HTMLButtonElement>)=>{

        e.preventDefault()

        await API.post('/login',{email,password}).then(
            res=>{
                if(res.status == 200){
                 
                    alert("Logado com sucesso")
                }
                console.log(res.data)
                console.log(email,password)
            },error=>{
                alert(error.response.data.error)
            }
        )


    }

    return( 

        <div className="LoginContainer">

               <div className="LoginContent">
                  
                    <form>
                    <img src={logo}></img>
                    <label>E-mail</label>
                    <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)}></input>
                    <label>Senha</label>
                    <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)}></input>

                    <button onClick={SendLogin}>Login</button>
                    
                    <div className="HRContainer">
                        <div className="HrLeft"><hr></hr></div><div className="OR_Div">OU</div><div className="HrRight"><hr></hr></div>
                    </div>
                    <button onClick={HandleRegister}>Registre-se</button>
                    </form>

                </div>
             


        </div>



    )



}

export default Login