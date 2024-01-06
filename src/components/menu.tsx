import React from "react";
import Agenda from '../Icons/calendario.png'
import Agendado from '../Icons/agendado.png'
import ConsultasAgendas from '../Icons/adicionar-evento.png'


const Menu = ()=>{



return(
    
       <div className="ConsultsContainerMenu">


            <div className="schedulingContainer">

                  

                    <img height={'180px'} width="180px" src={Agendado}></img>
                    <h1>Consultas Agendadas</h1>

            </div>

            <div className="schedulingContainer">

                <img height={'180px'} width="180px" src={ConsultasAgendas}></img>
                <h1>Agendamento</h1>

            </div>


            <div className="schedulingContainer">
            <img width="180px" src={Agenda}></img>
                <h1>Cadastro de Pacientes</h1>

            </div>



            <div className="schedulingContainer">

                <h1>Cadastro de Funcionários</h1>

            </div>



      
       </div>


)



}
export default Menu
