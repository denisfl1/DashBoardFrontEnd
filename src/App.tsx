import './App.css';
import { ReactNode } from 'react';
import LateralBar from './components/LatateralBar'
import HomePage from './Homepage';
import Login from './components/login'
import {Routes,Route,BrowserRouter,Navigate} from 'react-router-dom'
import Register from './components/register';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './contexts/authContext';
import CreateEmplyee from './createDoctor';
import CreatePatient from './createPatient';
import FirtTimePage from './components/firstTimePage';



function App() {

    interface IPrivate{
      children:ReactNode
    }

    const Private:React.FC<IPrivate>=({children})=>{
      const {Authenticated,firstTime} = useContext(AuthContext)

      if(!Authenticated)return <Navigate to="/login"/>
      

      if(Authenticated && firstTime){
          return <div style={{display:'flex',width:"100%"}}>
          <LateralBar></LateralBar>
          <FirtTimePage/>
      
          </div> 
              
      }

      return <div style={{display:'flex',width:"100%"}}>
      <LateralBar></LateralBar>

      {children}</div>
    }

    const Redirect:React.FC<IPrivate>= ({children})=>{
      const {Authenticated} = useContext(AuthContext)

      if(Authenticated){
        return <Navigate to="/home"/>
      }

      return <>{children}</>

    }

  return (
    
    <div className="App">

        <BrowserRouter>
        <AuthProvider>
     
        <Routes>
        <Route path='/home' element={<Private><HomePage></HomePage></Private>}></Route>
        <Route path='/login' element={<Redirect><Login></Login></Redirect>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/createEmployee' element={<Private><CreateEmplyee/></Private>}></Route>
        <Route path='/createPatient' element={<Private><CreatePatient/></Private>}></Route>
        <Route path='/firstTimePage' element={<FirtTimePage/>}></Route>
        </Routes>
        </AuthProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
