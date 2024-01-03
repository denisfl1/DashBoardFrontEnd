import React, { useState } from "react";
import logo from '../Icons/logo.png'
import{ useParams} from 'react-router-dom'



const Login:React.FC=()=>{
    const {param} = useParams()
    const [RorL ,setRorL] = useState(false)
    

    const HandleRegister:React.MouseEventHandler<HTMLButtonElement> = (e)=>{
        e.preventDefault()
        console.log(param)
        setRorL(true)

    }


    return( 

        <div className="LoginContainer">

                {!RorL ?<div className="LoginContent">
                  
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

                </div>:
                <>
                <div className="RegisterIMG"> <img style={{width:'400px',height:'400px'}} src={logo}></img></div>
                <div className="RegisterContent">
                  
                    <form>
             
                    <label>Nome</label>
                    <input type="text" name="name"></input>
                    <label>Sobrenome</label>
                    <input type="text" name="surname"></input>
                    <label>E-mail</label>
                    <input type="email" name="email"></input>
                 
                    <label>Senha</label>
                    <input type="password" name="password"></input>

                    <label>Repita sua Senha</label>
                    <input  type="password" name="password"></input>

                    <button style={{marginTop:'20px'}}>Registrar</button>
    
    
                    </form>

                </div>
                </>
                }


        </div>



    )



}

export default Login