import React, { useEffect ,useContext} from "react";
import { useState } from "react";
import lupa from "./Icons/lupa.png"
import { API } from "./Api";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "./contexts/context";

function DoctorsList(){

const [doctorList,setDoctorList] = useState<any>([])
const [search,setSearch] = useState<string[]>([])
const key = ["name","crm","specialty"]
const search2 = typeof search !== undefined ? doctorList.filter((data:any)=>key.some(keys=>data[keys].toLowerCase().includes(search)||data[keys].includes(search))):doctorList

const {Alert} = useContext(UserContext)

const SPECIALTY = [
    'Clínica Geral',         
    'Cardiologia',
    'Ortopedia',            
    'Dermatologia',
    'Neurologia',           
    'Ginecologia Obstetricia',
    'Oftalmologia',         
    'Pediatria',
    'Psiquiatria',          
    'Endocrinologia',
    'Otorrinolaringologia', 
    'Radiologia',
    'Urologia',             
    'Cirurgia Geral',
    'Hematologia',          
    'Gastroenterologia',
    'Nefrologia',           
    'Reumatologia',
    'Psicologia'
]


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
                        Alert && Alert(res.data,"success")
                        setDoctorList((prev:any)=>prev.filter((data:any)=>data.id != id))
                    },error=>{
        
                        Alert && Alert(error.response.data,"error")
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
        <div style={{display:"flex"}}>
        <div className="container_Input_DoctorList"><input placeholder="Nome, CRM ou CRP" onChange={(e)=>setSearch([e.target.value])}></input><img src={lupa}></img></div>         
         <select onChange={(e:any)=>setSearch(e.target.value)
                        
                    } style={{width:"125px",fontSize:"20px",marginLeft:"10px"}}>
                     <option selected value={[]}>Todos</option>
                    {SPECIALTY.map((datas)=>{
                    return (
                          <option >{datas}</option>
                        )
                    })}

                    </select>
        </div>
        <div className="table-Subcontainer">
        <table style={{width:"85%"}}>

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