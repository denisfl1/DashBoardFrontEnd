import React, { useEffect } from "react";
import { useState } from "react";
import lupa from "./Icons/lupa.png"
import { API } from "./Api";


function DoctorsList(){

const [doctorList,setDoctorList] = useState([])
const [search,setSearch] = useState<string[]>([])
const search2 = typeof search !== undefined ? doctorList.filter((data:any)=>data.name.toLowerCase().includes(search)|| data.name.includes(search) ||data.crm.includes(search)):doctorList


    const handleDelete:React.MouseEventHandler<HTMLButtonElement> =(e)=>{
        if(e.target instanceof HTMLButtonElement){
        const id = e.target.id 
        const question = window.confirm("Você deseja excluir este médico?")
            
            if(question){
                API.delete(`http://localhost:5000/deletedoctor/${id}`).then(
                    res=>{
                    
                        alert(res.data)
                    },error=>{
                        alert(error.response.data)
                    }
                )
            }

    }
    }

useEffect(()=>{

    (async()=>{

        await API.get("http://localhost:5000/getDoctors").then(
            res=>{

                setDoctorList(res.data)
 
            },error=>{

                console.log(error.response)
            }
        )

    })()


},[])


return(

    <div className="containerTable">
        <h1 style={{marginLeft:"160px"}}>Lista de Médicos</h1>
        <div className="container_Input_DoctorList"><input placeholder="Nome ou CRM" onChange={(e)=>setSearch([e.target.value])}></input><img src={lupa}></img></div>
        <table className="table-Subcontainer">

            <thead>

                <tr>
                <th>Nome</th>

                <th>Especialidade</th>

                <th>CRM</th>

                <th>Número</th>

                <th>Email</th>

                <th></th>

                </tr>
            </thead>

            <tbody>
              
            
                {search2 &&  search2.map((data:any)=>{
                    return(
                        <tr>

                        <td>{data.name}</td>
                        <td>{data.specialty}</td>
                        <td>{data.crm}</td>
                        <td>{" (11) " + data.number}</td>
                        <td>{data.email}</td>
                        <td><button style={{marginRight:"5px"}} >Editar</button><button id={data.id} onClick={handleDelete}>Excluir</button></td>
                        </tr>
                    )
                })}

               
            </tbody>



        </table>



    </div>

)


}

export default DoctorsList