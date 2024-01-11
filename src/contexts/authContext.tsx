import React, { useEffect, useState } from "react";
import { createContext } from "react";
import {API} from "../Api"

interface IAuthContext{
children:React.ReactNode;
Authenticated?:boolean;
Logged?:(data:any)=>void;
Logout?:()=>void;
user?:any;
UserName?:string;
firstTime?:boolean;
}


export const AuthContext = createContext<IAuthContext>(

{} as IAuthContext)

export const AuthProvider:React.FC<IAuthContext> = ({children})=>{

const [user,setUser] = useState(null)
const UserDATA:any = localStorage.getItem('user')
const UserNAME:any = localStorage.getItem('userName')
const token = localStorage.getItem('token')
const [UserName,setUserName] = useState()
const [firstTime,setFirstTime] = useState()


useEffect(()=>{

    if(UserDATA){

    setUser(JSON.parse(UserDATA))
    setUserName(JSON.parse(UserNAME))

    }
    

},[])

API.defaults.headers.Authorization = token


const Logged = (data:any)=>{

    const LoggedDATA = data.user
    localStorage.setItem('user',JSON.stringify(LoggedDATA))
    localStorage.setItem('userName',JSON.stringify(data.user.name))
    localStorage.setItem('firstTime',JSON.stringify(data.user.firstTime))
    localStorage.setItem('token',data.token)
    setUser(data.user)
    setUserName(data.user.name)
    setFirstTime(data.user.firstTime)
}

const Logout = ()=>{

setUser(null)
localStorage.removeItem('user')
localStorage.removeItem('token')
localStorage.removeItem('userName')
localStorage.removeItem('firstTime')


}

return(

    <AuthContext.Provider value={{Authenticated:!!user,Logged,Logout,children,UserName,firstTime}}>
          
    {children}

    </AuthContext.Provider>



)


}

