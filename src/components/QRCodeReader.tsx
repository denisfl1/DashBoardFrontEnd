import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import Swal from "sweetalert2";
import {API} from "../Api"


function QRReader(props:{data:any,setAllSchudeles:React.Dispatch<React.SetStateAction<any>>,QRReaderOpen:boolean,setQRReaderOpen:React.Dispatch<React.SetStateAction<boolean>>}){
      const [delayScan,setDelayScan]= useState(false)


  const [resul, setResul] = useState<any>();
    const DATAs = props.data


const handleScan = (result:any)=>{

    if(result){
        const data = JSON.parse(result)
        setResul(data)
      
     return setDelayScan(false)
    }

    
} 


    useEffect(()=>{

        if(resul){
            const search = DATAs.filter((it:any)=>it.id == resul.id)

            const x =  search.map(Object.values)[0]
            x.splice(9,1)
            const joinX = x.join('\n')
            const z  = [resul].map(Object.values)[0]
            z.splice(9,1)
            const joinY = z.join('\n')
            

            if(joinX === joinY){
                     const id = resul.id
                    API.put("/validateSchedule",{id}).then(
                        res=>{
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: `${res.data}`,
                                confirmButtonColor:'#3085d6',
                                // width:"400px",
                                customClass:'swal-wide',
                                confirmButtonText:"Fechar",
                            
                            })
                          
                            props.setAllSchudeles((data:any)=>data.map((it:any)=>{return  it.id == resul.id ? {...it,status:"Finished"}:it}))
                         
                        },error=>{
                            console.log(error.reponse.data)
                        }
                    )
                    return   props.setQRReaderOpen(false)          
                 
            }else if(joinX !== joinY){
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "Cadastro não existe!",
                    confirmButtonColor:'#3085d6',
                    // width:"400px",
                    customClass:'swal-wide',
                    confirmButtonText:"Fechar",
                 
                  })
              
            }
            
            
        }

    },[resul])

 
   

return(

    <div className="QRCodeContainer">


        <div className="QRCodeContent">

                
            {props.QRReaderOpen &&<QrReader 
             onResult={handleScan}
                  
             constraints={{ facingMode: 'user' }}
             scanDelay={500}  // Tempo de espera entre as leituras em milissegundos
             containerStyle={{ width: '100%' }}  // Estilo do container
            
          />}
         

        


        </div>



    </div>


)



}

export default QRReader



