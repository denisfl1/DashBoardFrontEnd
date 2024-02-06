import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import Swal from "sweetalert2";
import {API} from "../Api"


function QRReader(props:{data:any,setAllSchedules:React.Dispatch<React.SetStateAction<any>>,QRReaderOpen:boolean,setQRReaderOpen:React.Dispatch<React.SetStateAction<boolean>>}){


  const [result, setResult] = useState<any>(undefined);
    const DATAs = props.data

    const handleScan = (QR_result:any)=>{

    if( QR_result){
        const data = JSON.parse(QR_result)
        console.log(data)
        setResult(data)
      
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
        const verify = result != undefined
       
        if(verify){
            // const search = DATAs.filter((it:any)=>it.id == resul.id)

            // const schedule_List = search[0] && search.map(Object.values)[0]
            // search[0] && schedule_List.splice(9,1)
            // const join_schedule_List = search[0] && schedule_List.join('\n')
            // const schedule_Scanned  = [resul].map(Object.values)[0]
            //  schedule_Scanned.splice(9,1) 
            // const joinB_schedule_Scanned = schedule_Scanned.join('\n')
            
            // if(!search[0])return AlertError("Agendamento não encontrado!")

            // if(join_schedule_List === joinB_schedule_Scanned){
                    const id = result.id
                    console.log(result)
                    API.put("/validateSchedule",{id,result}).then(
                     
                        res=>{
                            console.log(res)
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: `${res.data}`,
                                confirmButtonColor:'#3085d6',
                                // width:"400px",
                                customClass:'swal-wide',
                                confirmButtonText:"Fechar",
                            
                            })
                        
                            props.setAllSchedules((data:any)=>data.map((it:any)=>{return  it.id == result.id ? {...it,status:"Finished"}:it}))
                          
                            return  props.setQRReaderOpen(false)   
                        },error=>{

                            console.log(error)
                            AlertError(error.response.data)
                        }
                    )
                        
            // }
            
            // else{
            //     AlertError("Agendamento já finalizado!")
            // }
           
            
        
        }

    },[result])

  

return(
    <>
    {props.QRReaderOpen &&<div className="QRCodeContainer" onClick={()=>props.setQRReaderOpen(false)}>


        <div className="QRCodeContent">
              
            <QrReader 
             onResult={handleScan}         
             constraints={{ facingMode: 'user' }}
             scanDelay={500}  // Tempo de espera entre as leituras em milissegundos
             containerStyle={{ width: '100%'}}  // Estilo do container
            
          />
         

        


        </div>



    </div>}
    </>

)



}

export default QRReader



