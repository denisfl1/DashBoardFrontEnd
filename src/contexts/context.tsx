import{ createContext }from "react";
import Swal from "sweetalert2";

interface IContext{
children:React.ReactNode;
Alert?:(data:string,type:any)=>void

}


export const UserContext = createContext <IContext>(

{} as IContext);

export const UserProvider:React.FC<IContext> = ({children})=>{


    const Alert= ((data:string,type:any)=>{

        Swal.fire({
            position: 'center',
            icon: type,
            title: `${data}`,
            confirmButtonColor:'#3085d6',
            // width:"400px",
            customClass:'swal-wide',
            confirmButtonText:"Fechar",
         
          })


    })


return (

    <UserContext.Provider value={{children,Alert}}>

    {children}


    </UserContext.Provider>



)



}




