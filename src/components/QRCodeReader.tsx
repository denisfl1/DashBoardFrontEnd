import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import Swal from "sweetalert2";
import {API} from "../Api"


function QRReader(props:{data:any,setAllSchudeles:React.Dispatch<React.SetStateAction<any>>,QRReaderOpen:boolean,setQRReaderOpen:React.Dispatch<React.SetStateAction<boolean>>}){


  const [resul, setResul] = useState<any>(undefined);
    const DATAs = props.data

    const handleScan = (result:any)=>{

    if(result){
        const data = JSON.parse(result)
  
        setResul(data)
      
    
    }

} 

    const AlertError = ((data:string)=>{

        Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${data}`,
            confirmButtonColor:'#3085d6',
            // width:"400px",
            customClass:'swal-wide',
            confirmButtonText:"Fechar",
         
          })


    })

    useEffect(()=>{
        const verify = resul != undefined
        console.log(verify)
        if(verify){
            const search = DATAs.filter((it:any)=>it.id == resul.id)

            const x = search[0] && search.map(Object.values)[0]
            search[0] && x.splice(9,1)
            let joinX = search[0] && x.join('\n')
            const z  = [resul].map(Object.values)[0]
             z.splice(9,1) 
           let joinY:any = z.join('\n')
            
            if(!search[0])return AlertError("Agendamento não existe")

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
                          
                            return   props.setQRReaderOpen(false)   
                        },error=>{
                            console.log(error.reponse.data)
                        }
                    )
  
            }
           
    
        
        }

    },[resul])

  

return(

    <div className="QRCodeContainer">


        <div className="QRCodeContent">

                
            {props.QRReaderOpen &&<QrReader 
             onResult={handleScan}
            
             constraints={{ facingMode: 'user' }}
             scanDelay={1000}  // Tempo de espera entre as leituras em milissegundos
             containerStyle={{ width: '100%' }}  // Estilo do container
            
          />}
         

        


        </div>



    </div>


)



}

export default QRReader



