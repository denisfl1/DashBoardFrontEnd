import React, { useContext } from "react";
import Agendado from '../Icons/agendado.png'
import ConsultasAgendas from '../Icons/adicionar-evento.png'
import addPacient from "../Icons/adicionar-amigo.png"
import addUser from "../Icons/equipe-medica.png"
import UserList from "../Icons/lista-de-usuarios.png"
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const Menu = ()=>{

    const {admin} = useContext(AuthContext)
    const {user} = useContext(AuthContext)

    const id = user.id

return(
    
       <div className="ConsultsContainerMenu">


         

            {admin ?
                <>

            <div className="schedulingContainer">

                            
            <Link to="/schedules">
            <img height={'180px'} width="180px" src={Agendado}></img>
            <h1>Consultas Agendadas</h1>
            </Link>   
            </div>


                <div className="schedulingContainer">
            <Link to="/to_schedule">
                <img height={'180px'} width="180px" src={ConsultasAgendas}></img>
                <h1>Agendar Consulta</h1>
            </Link>
            </div>


            <div className="schedulingContainer">
            <Link to='/createPatient' style={{textDecoration:"none",color:"black"}}>
            <img width="180px" src={addPacient}></img>
                <h1>Cadastro de Pacientes</h1>
            </Link>
            </div>



            <div className="schedulingContainer" >
            <Link to='/createDoctor' >
            <img width="150px" src={addUser}></img>
                <h1>Cadastro de Médicos</h1>
            </Link>
            </div>


            
            <div className="schedulingContainer">
            <Link to='/patientlist'>    
            <img width="180px" src={UserList}></img>
                <h1>Lista de Pacientes</h1>
                </Link>  
            </div>



            <div className="schedulingContainer" > 
            <Link to='/doctorlist'>    
            <img width="150px" src={UserList}></img>
                <h1>Lista de Médicos</h1>
            </Link>  
            </div>
            </>
            :
                
            <>
            <div className="schedulingContainer">
                       
            <Link to="/schedulesUser">
            <img height={'180px'} width="180px" src={Agendado}></img>
            <h1>Consultas Agendadas</h1>
            </Link>   
            </div>

            
            <div className="schedulingContainer">
            <Link to={`/edituser/${id}`}>    
            <img width="180px" src={UserList}></img>
                <h1>Minha Conta</h1>
                </Link>  
            </div>
            </>
            }
            

                
       </div>


)



}
export default Menu
