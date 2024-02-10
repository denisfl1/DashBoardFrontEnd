import { useContext, useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import { UserContext } from "../contexts/context"
import {API} from "../Api"


function QRReader(props:{data:any,setAllSchedules:React.Dispatch<React.SetStateAction<any>>,QRReaderOpen:boolean,setQRReaderOpen:React.Dispatch<React.SetStateAction<boolean>>}){

    const {Alert} = useContext(UserContext)

  const [result, setResult] = useState<any>(undefined);
    const DATAs = props.data

    const handleScan = (QR_result:any)=>{

    if( QR_result){
        const data = JSON.parse(QR_result)
        console.log(data)
        setResult(data)
      
    }

} 


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

                            Alert && Alert(res.data,"success")
                                     
                            props.setAllSchedules((data:any)=>data.map((it:any)=>{return  it.id == result.id ? {...it,status:"Finished"}:it}))
                          
                            return  props.setQRReaderOpen(false)   
                        },error=>{
                            console.log(error)
                            Alert && Alert(error.response.data,"error")
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



