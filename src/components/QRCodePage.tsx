import { useState } from "react";
import QRCode from "react-qr-code";
import { QrReader } from "react-qr-reader";



function MyQRCODE (){

const data = {
    id: 54,
    doctor: "Dra. Mariana Lima",
    specialty: "Psiquiatria",
    crm: "3550807",
    date: "2024-01-10",
    hour: "09:00 às 10:00",
    patient_Name: "Denis Ferreira",
    patient_Email: "denisfl1@hotmail.com",
    created_at: "2024-01-28T00:00:50.757Z",
    updated_at: "2024-01-29T00:10:28.238Z",
    status: "Active"
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