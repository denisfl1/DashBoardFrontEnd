import React from "react";
import Agendado from '../Icons/agendado.png'
import ConsultasAgendas from '../Icons/adicionar-evento.png'
import addPacient from "../Icons/adicionar-amigo.png"
import addUser from "../Icons/equipe-medica.png"

const Menu = ()=>{



return(
    
       <div className="ConsultsContainerMenu">


            <div className="schedulingContainer">

                  

                    <img height={'180px'} width="180px" src={Agendado}></img>
                    <h1>Consultas Agendadas</h1>

            </div>

            <div className="schedulingContainer">

                <img height={'180px'} width="180px" src={ConsultasAgendas}></img>
                <h1>Agendar Consulta</h1>

            </div>


            <div className="schedulingContainer">
            <img width="180px" src={addPacient}></img>
                <h1>Cadastro de Pacientes</h1>

            </div>



            <div className="schedulingContainer">

            <img width="150px" src={addUser}></img>
                <h1>Cadastro de Funcionários</h1>

            </div>



      
       </div>


)



}
export default Menu
