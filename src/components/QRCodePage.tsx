import { useState } from "react";

import ReactDOM from "react-dom";
import QRCode from "react-qr-code";



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