import { useState } from "react";
import QRCode from "react-qr-code";
import { QrReader } from "react-qr-reader";



function MyQRCODE (props:{My_QR_Code:object,setMy_My_QR:React.Dispatch<React.SetStateAction<boolean>>}){

// const data = {
//     "id": 63,
//     "doctor": "Denis",
//     "specialty": "Psicologia",
//     "crm": "3586875",
//     "date": "2024-01-10",
//     "hour": "09:00 às 10:00",
//     "patient_Name": "Denis Ferreira",
//     "patient_Email": "denisfl1@hotmail.com",
//     "created_at": "2024-02-02T17:21:45.215Z",
//     "updated_at": "2024-02-02T17:21:45.215Z",
//     "status": "Active"
// }


  const [resul, setResul] = useState(null);



const handleError = (error:any)=>{

    console.log(error)

}



return(
    <>
    {<div className="QRCodeContainer MyQR " onClick={()=>props.setMy_My_QR(false)}>


        <div className="QRCodeContent MyQRCodeContent">

            <QRCode value={JSON.stringify(props.My_QR_Code)}/>
         

        </div>



    </div>}
    </>

)



}

export default MyQRCODE