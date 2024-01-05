import React from "react";
import { createContext } from "react";


interface IAuthContext{
children:React.ReactNode;


}


export const AuthContext = createContext<IAuthContext>(

{} as IAuthContext)

export const AuthProvider:React.FC<IAuthContext> = ({children})=>{

return(

    <AuthContext.Provider value={{children}}>
          
    {children}

    </AuthContext.Provider>



)


}

