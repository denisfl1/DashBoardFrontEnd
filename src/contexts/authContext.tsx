import React, { useEffect, useState } from "react";
import { createContext } from "react";
import {API} from "../Api"

interface IAuthContext{
children:React.ReactNode;
Authenticated?:boolean;
Logged?:(data:any)=>void;
Logout?:()=>void;
UserName?:string;
firstTime?:boolean;
user?:any
Loading?:boolean
}


export const AuthContext = createContext<IAuthContext>(

{} as IAuthContext)

export const AuthProvider:React.FC<IAuthContext> = ({children})=>{

const [user,setUser] = useState(null)
const UserDATA = localStorage.getItem('user')
const UserNAME = localStorage.getItem('userName')
const token = localStorage.getItem('token')
const [UserName,setUserName] = useState()
const [firstTime,setFirstTime] = useState()
const [Loading,setLoading] = useState(true)

useEffect(()=>{
    
    
    if(UserDATA && UserNAME){

    setUser(JSON.parse(UserDATA))
    setUserName(JSON.parse(UserNAME))
    setLoading(false)
    }else{
        setLoading(false)
    }
    

},[])

API.defaults.headers.Authorization = token


const Logged = (data:any)=>{

    setUser(data.user)
    localStorage.setItem('user',JSON.stringify(data.user))
    localStorage.setItem('userName',JSON.stringify(data.user.name))
    localStorage.setItem('firstTime',JSON.stringify(data.user.firstTime))
    localStorage.setItem('token',data.token)
    setUserName(data.user.name)
    setFirstTime(data.user.firstTime)
    setLoading(false)
}

const Logout = ()=>{

setUser(null)
localStorage.removeItem('user')
localStorage.removeItem('token')
localStorage.removeItem('userName')
localStorage.removeItem('firstTime')


}


return(

    <AuthContext.Provider value={{Authenticated:!!user,user,Logged,Logout,children,UserName,firstTime,Loading}}>
          
    {children}

    </AuthContext.Provider>



)


}

