import React, { useEffect ,useContext} from "react";
import { useState } from "react";
import { API } from "./Api";
import { useParams } from "react-router-dom";
import { UserContext } from "./contexts/context";
import editUser from "./Icons/configuracoes.png"

function EditDoctor(){

    const [email,setEmail]= useState<string>()
    const [nameFull,setName] = useState<string>()
    const [crm,setCRM] = useState<string>()
    const [specialty,setSpecialty] = useState<string>('ClínicaGeral')
    const [number,setNumber] = useState<string>()
    const [sex,setSex] = useState<string>('')
    const {Alert} = useContext(UserContext)
    const param = useParams()
    const id = param.id

    const SPECIALTY = [
        'ClínicaGeral',         
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
        'CirurgiaGeral',
        'Hematologia',          
        'Gastroenterologia',
        'Nefrologia',           
        'Reumatologia',
        'Psicologia'
    ]


    const SendData = async(e:React.MouseEvent<HTMLButtonElement>)=>{

        e.preventDefault()
            if(!email?.trim() || !nameFull?.trim() || !crm?.trim() || !sex?.trim() )return Alert && Alert("Preencha os campos em branco!","error")

            let name = ''
            if(sex === "Masculino" && specialty !== "Psicologia"){
            name = "Dr. " + nameFull
            }else if(sex === "Feminino" && specialty !== "Psicologia"){
            name = "Dra. " + nameFull
            }else if(specialty === "Psicologia"){
            name = "Psic. " + nameFull
            }

            await API.put('/editdoctor',{id,name,email,crm,specialty,number,sex}).then(
                res=>{
                    if(res.status == 200){
                      Alert &&  Alert("Registrado com sucesso","success")
                    }
            

                },error=>{
                    Alert &&  Alert(error.response.data,"error")
                }
            )

    }



    useEffect(()=>{

        (async()=>{

            await API.get(`/getdoctor/${id}`).then(
                res=>{
                   
                    const cut = res.data.name.split('')
                    let position = []
                    
                
                    for(let i in cut){
                    cut[i] === "." && position.push(parseInt(i)+2)
                
                    }

                    setName(cut.slice(position).join(''))
                    setEmail(res.data.email)
                    setCRM(res.data.crm)
                    setSpecialty(res.data.specialty)
                    setNumber(res.data.number)
                    setSex(res.data.sex)
                  

                },error=>{
                    Alert &&  Alert(error.response.data,"error")
                }
            )


        })()


    },[])

return(

    <div className="EmployeeContainer" >
        <div style={{display:'flex',alignItems:"center"}}><h1 style={{marginLeft:"50px"}}>Médicos / Editar Dados</h1>
        <img style={{marginLeft:"10px"}} height={"40px"} width={"40px"} src={editUser}></img>

        </div>
    <div className="RegisterContent" >
      
        <form>
 
        <label>Nome Completo</label>
        <input value={nameFull} required type="text"  name="name" onChange={(e)=>setName(e.target.value)}></input>

        <label>E-mail</label>
        <input value={email} required type="email"  name="email" onChange={(e)=>setEmail(e.target.value)}></input>

        
        <label>Especialidade</label>

        <select value={specialty} onChange={(e)=>setSpecialty(e.target.value)} style={{marginBottom:"10px"}}>
            {SPECIALTY.map((it)=>{
                return(
                    <option value={it}>{it}</option>
                )
            })}
        </select>


        <label>{specialty != "Psicologia" ?'CRM' : "CRP"}</label>
        <input value={crm} required type="text"  name="crm" onChange={(e)=>setCRM(e.target.value)}></input>

        <label>Número de Contato</label>
        <input value={number} required type="text"  name="number" onChange={(e)=>setNumber(e.target.value)}></input>

        <div> 
        <legend>Sexo:</legend>  
        <div style={{display:"flex",alignItems:"center"}}>
        
       
        <input checked={sex === "Masculino"} onClick={(e:any)=>setSex(e.target.value)} style={{marginLeft:"10px"}} type="radio"  name="sex" value="Masculino" />
        <label>Masculino</label>

        <input checked={sex === "Feminino"} onClick={(e:any)=>{setSex(e.target.value)}} type="radio"  name="sex" value="Feminino" />
        <label >Feminino</label>
        </div> 
    </div>

        <button type={"submit"} style={{marginTop:'20px'}} onClick={SendData}>Alterar</button>


        </form>

    </div>


</div>

)


}

export default EditDoctor