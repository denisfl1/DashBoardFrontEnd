import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";



function QRReader(props:{data:any}){



  const [resul, setResul] = useState<any>();
    const DATAs = props.data


const handleScan = (result:any)=>{

    if(result){
        const data = JSON.parse(result)
        setResul(data)
      
     
    }

    
} 

    useEffect(()=>{

        if(resul){
            const search = DATAs.filter((it:any)=>it.id == 60)

            const x =  search.map(Object.values)[0].join('\n')
            const z  = [resul].map(Object.values)[0].join('\n')
            
            if(x === z){
              
                alert("Validado")
            }else{
                alert("Dados diferentes")
            }
            
            
        }

    },[resul])

 
   

return(

    <div className="QRCodeContainer">


        <div className="QRCodeContent">

                
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

export default QRReader



