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
Loading?:boolean;
admin?:boolean
}


export const AuthContext = createContext<IAuthContext>(

{} as IAuthContext)

export const AuthProvider:React.FC<IAuthContext> = ({children})=>{

const [user,setUser] = useState<any>(null)
const UserDATA = localStorage.getItem('user')
const UserNAME = localStorage.getItem('userName')
const token = localStorage.getItem('token')
const [UserName,setUserName] = useState()
const [firstTime,setFirstTime] = useState()
const [Loading,setLoading] = useState(true)
const [admin,setAdmin] = useState<boolean>(false)

useEffect(()=>{
    
    
    if(UserDATA && UserNAME){

    const my_Data = JSON.parse(UserDATA)
    setUser(my_Data)
    setUserName(my_Data.name)
    setLoading(false)
    setAdmin(my_Data.admin)

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

    setAdmin(data.user.admin)
}

const Logout = ()=>{

setUser(null)
localStorage.removeItem('user')
localStorage.removeItem('token')
localStorage.removeItem('userName')
localStorage.removeItem('firstTime')


}


return(

    <AuthContext.Provider value={{Authenticated:!!user,user,Logged,Logout,children,UserName,firstTime,Loading,admin}}>
          
    {children}

    </AuthContext.Provider>



)


}

