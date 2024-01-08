import React, { useEffect, useState } from "react";
import { createContext } from "react";


interface IAuthContext{
children:React.ReactNode;
Authenticated?:boolean;
Logged?:(data:any)=>void;
Logout?:()=>void;
UserName?:string
}


export const AuthContext = createContext<IAuthContext>(

{} as IAuthContext)

export const AuthProvider:React.FC<IAuthContext> = ({children})=>{

const [user,setUser] = useState(null)
const UserDATA:any = localStorage.getItem('user')
const UserNAME:any = localStorage.getItem('userName')
const [UserName,setUserName] = useState()


useEffect(()=>{

    if(UserDATA){

    setUser(JSON.parse(UserDATA))
    setUserName(JSON.parse(UserNAME))

    }

},[])


const Logged = (data:any)=>{

    const LoggedDATA = data.user
    localStorage.setItem('user',JSON.stringify(LoggedDATA))
    localStorage.setItem('userName',JSON.stringify(data.user.name))
    setUser(data.user)
    setUserName(data.user.name)

}

const Logout = ()=>{

setUser(null)

}

return(

    <AuthContext.Provider value={{Authenticated:!!user,Logged,Logout,children,UserName}}>
          
    {children}

    </AuthContext.Provider>



)


}

