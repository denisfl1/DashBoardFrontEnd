import React, { useEffect } from "react";
import { useState } from "react";
import lupa from "./Icons/lupa.png"
import { API } from "./Api";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

function DoctorsList(){

const [doctorList,setDoctorList] = useState<any>([])
const [search,setSearch] = useState<string[]>([])
const key = ["name","crm"]
const search2 = typeof search !== undefined ? doctorList.filter((data:any)=>key.some(keys=>data[keys].toLowerCase().includes(search)||data[keys].includes(search))):doctorList


    
  const Alert2 =(res:string)=>{                
    return Swal.fire({
    position: 'center',
    icon: 'success',
    title: `${res}`,
    confirmButtonColor:'#3085d6',
    // width:"400px",
    customClass:'swal-wide',
    confirmButtonText:"Fechar",

})} 


    const handleDelete:React.MouseEventHandler<HTMLButtonElement> =(e)=>{
        if(e.target instanceof HTMLButtonElement){
        const id = e.target.id 
      
            
        Swal.fire({
            title: "Deseja excluir este usuário?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim",
            cancelButtonText:"Cancelar",
          }).then(async(result) => {
            if (result.isConfirmed) {
                await API.delete(`http://localhost:5000/deletedoctor/${id}`).then(
                    res=>{
                        Alert2(res.data)
                        setDoctorList((prev:any)=>prev.filter((data:any)=>data.id != id))
                    },error=>{
        
                        Alert2(error.response.data)
                    }
                 )
            }
          });

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
        <div className="container_Input_DoctorList"><input placeholder="Nome, CRM ou CRP" onChange={(e)=>setSearch([e.target.value])}></input><img src={lupa}></img></div>
        <div className="table-Subcontainer">
        <table>

            <thead>

                <tr>
                <th>Nome</th>

                <th>Especialidade</th>

                <th>CRM/CRP</th>

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
                        <td><Link to={`/editdoctor/${data.id}`}><button className="tableButton Edit"  >Editar</button></Link><button className="tableButton Delete" id={data.id} onClick={handleDelete}>Excluir</button></td>
                        </tr>
                    )
                })}

               
            </tbody>



        </table>

        </div>

    </div>

)


}

export default DoctorsList