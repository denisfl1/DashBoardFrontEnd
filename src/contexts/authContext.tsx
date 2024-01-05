import React, { useState } from "react";
import { createContext } from "react";


interface IAuthContext{
children:React.ReactNode;
Authenticated?:boolean;
Logged?:(data:any)=>void;

}


export const AuthContext = createContext<IAuthContext>(

{} as IAuthContext)

export const AuthProvider:React.FC<IAuthContext> = ({children})=>{

const [user,setUser] = useState(null)


const Logged = (data:any)=>{

    const LoggedDATA = data.user
    // const token = data.token
    setUser(data.user)

}

return(

    <AuthContext.Provider value={{Authenticated:!!user,Logged,children}}>
          
    {children}

    </AuthContext.Provider>



)


}

