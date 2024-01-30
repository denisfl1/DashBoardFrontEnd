import { useState } from "react";
import QRCode from "react-qr-code";
import { QrReader } from "react-qr-reader";



function MyQRCODE (){

const data = { nome: 'Denis Ferreira',
idade:'30',
cidade: 'ExemploCity'}



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
            <QrReader 
             onResult={handleScan}
             
             constraints={{ facingMode: 'user' }}
             scanDelay={300}  // Tempo de espera entre as leituras em milissegundos
             containerStyle={{ width: '100%' }}  // Estilo do container
          />
         

        


        </div>



    </div>


)



}

export default MyQRCODE