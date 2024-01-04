import React, { useEffect, useState } from "react";
import logo from '../Icons/logo.png'
import{ useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom";


const Login:React.FC=()=>{
    const url = useParams ()
    const navigate = useNavigate()

    const HandleRegister:React.MouseEventHandler<HTMLButtonElement> = (e)=>{
        e.preventDefault()
        navigate('/register')

    }

    return( 

        <div className="LoginContainer">

                {url.type == "login" && <div className="LoginContent">
                  
                    <form>
                    <img src={logo}></img>
                    <label>E-mail</label>
                    <input></input>
                    <label>Senha</label>
                    <input></input>

                    <button>Login</button>
                    
                    <div className="HRContainer">
                        <div className="HrLeft"><hr></hr></div><div className="OR_Div">OU</div><div className="HrRight"><hr></hr></div>
                    </div>
                    <button onClick={HandleRegister}>Registre-se</button>
                    </form>

                </div>}
                {
                    url.type === 'register' &&
                <>
                
                <div className="RegisterIMG"> <img style={{width:'500px',height:'500px'}} src={logo}></img></div>
                <div className="RegisterContent">
                  
                    <form>
             
                    <label>Nome</label>
                    <input required type="text" name="name"></input>

                    <label>Sobrenome</label>
                    <input required type="text" name="surname"></input>

                    <label>E-mail</label>
                    <input required type="email" name="email"></input>
                 
                    <label>Senha</label>
                    <input required type="password" name="password"></input>

                    <label>Repita sua Senha</label>
                    <input required type="password" name="password"></input>

                    <button style={{marginTop:'20px'}}>Registrar</button>
    
    
                    </form>

                </div>
                </>
                }


        </div>



    )



}

export default Login