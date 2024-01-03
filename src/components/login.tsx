import React from "react";
import logo from '../Icons/logo.png'


const Login:React.FC=()=>{





    return( 

        <div className="LoginContainer">

                <div className="LoginContent">
                  
                    <form>
                    <img src={logo}></img>
                    <label>E-mail</label>
                    <input></input>
                    <label>Senha</label>
                    <input></input>

                    <button>LOGIN</button>
                    
                    <div className="HRContainer">
                        <div className="HrLeft"><hr></hr></div><div className="ORDiv">OR</div><div className="HrRight"><hr></hr></div>
                    </div>
                    <button>REGISTRE-SE</button>
                    </form>

                </div>


        </div>



    )



}

export default Login