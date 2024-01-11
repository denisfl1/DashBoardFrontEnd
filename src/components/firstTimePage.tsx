import React, { useContext } from "react";
import folha from "../Icons/folha.jpg"
import { useState } from "react";
import {API} from "../Api"
import { AuthContext } from "../contexts/authContext";



function FirtTimePage(){

    const [password,setPassword]= useState<string>()
    const [password_Confirm,setPasswordConfirm]= useState<string>()
    const {Logged,user}= useContext(AuthContext)


    const SendLogin= async(e:React.MouseEvent<HTMLButtonElement>)=>{

        e.preventDefault()

        if(password !== password_Confirm)return alert("Senhas Diferentes")
        
        const email =  "denisfl3@hotmail.com"

        await API.put('/createPassword',{email,password}).then(
            res=>{
                if(res && res.status == 200){
                    Logged && Logged(res.data)
                    console.log(res.data)
                }
            
            },error=>{
                alert(error.response.data.error)
            }
        )


    }


return(

    // <div className="FirstTimePageContainer">

    //     <div className="FirstTimeContent">

                

                


    //     </div>



    // </div>
    <div className="LoginContainer" style={{fontFamily:"Poppins"}}>

    <div className="LoginContent" >
       
         <form>
         <img src={folha}></img>
         <h1>Bem vindo...</h1>
         <label>Crie uma senha</label>
         <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)}></input>

               
         <label>Repita a senha</label>
         <input type="password" name="password" onChange={(e)=>setPasswordConfirm(e.target.value)}></input>


         <button onClick={SendLogin}>Salvar</button>
         

         </form>

     </div>
  


</div>


)

}

export default FirtTimePage