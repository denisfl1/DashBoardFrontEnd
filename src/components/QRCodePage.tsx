import { useState } from "react";
import QRCode from "react-qr-code";
import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";



function MyQRCODE (){

const data = { nome: 'Denis Ferreira',
idade:'30',
cidade: 'ExemploCity'}


  const [resultado, setResultado] = useState(null);

  const handleScan = (data:any) => {
    if (data) {
      setResultado(data);
    }
  };

  const handleError = (err:any) => {
    console.error(err);
  };





return(

    <div className="QRCodeContainer">


        <div className="QRCodeContent">

            <QRCode value={JSON.stringify(data)}/>
        


        </div>



    </div>


)



}

export default MyQRCODE