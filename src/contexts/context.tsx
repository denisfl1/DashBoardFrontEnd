import{ createContext }from "react";


interface IContext{
children:React.ReactNode;

}


export const UserContext = createContext <IContext>(

{} as IContext);

export const UserProvider:React.FC<IContext> = ({children})=>{




return (

    <UserContext.Provider value={{children}}>

    {children}


    </UserContext.Provider>



)



}




