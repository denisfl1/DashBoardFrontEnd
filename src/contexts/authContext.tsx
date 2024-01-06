import React, { useEffect, useState } from "react";
import { createContext } from "react";


interface IAuthContext{
children:React.ReactNode;
Authenticated?:boolean;
Logged?:(data:any)=>void;
Logout?:()=>void;

}


export const AuthContext = createContext<IAuthContext>(

{} as IAuthContext)

export const AuthProvider:React.FC<IAuthContext> = ({children})=>{

const [user,setUser] = useState(null)
const UserDATA = localStorage.getItem('user')


useEffect(()=>{

    if(UserDATA){

    setUser(JSON.parse(UserDATA))
    
    }

},[])


const Logged = (data:any)=>{

    const LoggedDATA = data.user
    localStorage.setItem('user',JSON.stringify(LoggedDATA))
    setUser(data.user)

}

const Logout = ()=>{

setUser(null)

}

return(

    <AuthContext.Provider value={{Authenticated:!!user,Logged,Logout,children}}>
          
    {children}

    </AuthContext.Provider>



)


}

