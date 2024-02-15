import React, { useEffect ,useContext} from "react";
import { useState } from "react";
import lupa from "./Icons/lupa.png"
import { API } from "./Api";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "./contexts/context";
import list from "./Icons/lista.png"

function PatientList(){

const [patientList,setPatientList] = useState<Object[]>([])
const [search,setSearch] = useState<string[]>([])
const key = ["name","email"]
const search2 = typeof search !== undefined ? patientList.filter((data:any)=>key.find(keys=>data[keys].toLowerCase().includes(search)||data[keys].includes(search))):patientList
const {Alert} = useContext(UserContext)


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
                await API.delete(`http://localhost:5000/deleteuser/${id}`).then(
                    res=>{
                        Alert &&  Alert(res.data,"success")
                        setPatientList((data:any)=>data.filter((it:any)=>it.id != id))
                    },error=>{

                        Alert &&  Alert(error.response.data,"error")
                    }
                 )
            }
          });

    }
    }

    useEffect(()=>{

        (async()=>{

            await API.get("http://localhost:5000/getUsers").then(
                res=>{
                    if(res && res.status == 200){
                        setPatientList(res.data)
                    }
                    
                
                },error=>{

                      Alert &&  Alert(error.response.data,"error")
                }
            )

        })()


    },[])


return(

    <div className="containerTable">
       <div style={{display:'flex',alignItems:"center"}}> <h1 style={{marginLeft:"160px"}}>Lista de Pacientes</h1></div>
        <div className="container_Input_DoctorList"><input placeholder="Nome ou Email" onChange={(e)=>setSearch([e.target.value])}></input><img src={lupa}></img></div>
        <div className="table-Subcontainer">
        <table style={{width:"90%"}}>

            <thead>

                <tr>
                <th>Nome</th>

                <th>Email</th>

                <th>CPF</th>

                <th>Endereço</th>

                <th>Bairro</th>

                <th>CEP</th>

                <th>Contato</th>

            
                <th></th>

                </tr>
            </thead>

            <tbody>
              
            
                {search2 &&  search2.map((data:any)=>{
                    const mycpf = data.cpf
                    const cpf = mycpf.replace(/(\d{3})(\d)/, '$1.$2')
                    const cpf1 = cpf.replace(/(\d{3})(\d)/, '$1.$2')
                    const cpf2 = cpf1.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
                  

                    return(
                        <tr>

                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{cpf2}</td>
                        <td>{data.adress}</td>
                        <td>{data.neighborhood}</td>
                        <td>{data.zipCode}</td>
                        <td>{data.contact_number}</td> 
                        <td><Link to={`/edituser/${data.id}`}><button className="tableButton Edit"   style={{marginRight:"5px"}} >Editar</button></Link><button className="tableButton Delete"  id={data.id} onClick={handleDelete}>Excluir</button></td>
                        </tr>
                    )
                })}

               
            </tbody>



        </table>
        </div>      


    </div>

)


}

export default PatientList