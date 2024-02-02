import { useState } from "react";
import QRCode from "react-qr-code";
import { QrReader } from "react-qr-reader";



function MyQRCODE (){

const data = {
    "id": 63,
    "doctor": "Psic. Ana Silva",
    "specialty": "Psicologia",
    "crm": "3586875",
    "date": "2024-01-10",
    "hour": "09:00 às 10:00",
    "patient_Name": "Denis Ferreira",
    "patient_Email": "denisfl1@hotmail.com",
    "created_at": "2024-02-02T17:21:45.215Z",
    "updated_at": "2024-02-02T17:21:45.215Z",
    "status": "Active"
}


  const [resul, setResul] = useState(null);



const handleError = (error:any)=>{

    console.log(error)

}

const handleScan = (result:any)=>{

    if(result){
        setResul(result)
        alert(result)
    }

    
} 



return(

    <div className="QRCodeContainer">


        <div className="QRCodeContent">

            <QRCode value={JSON.stringify(data)}/>
            {/* <QrReader 
             onResult={handleScan}
             
             constraints={{ facingMode: 'user' }}
             scanDelay={300}  // Tempo de espera entre as leituras em milissegundos
             containerStyle={{ width: '100%' }}  // Estilo do container
          /> */}
         

        


        </div>



    </div>


)



}

export default MyQRCODE