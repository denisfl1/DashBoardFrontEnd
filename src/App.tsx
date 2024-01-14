import './App.css';
import { ReactNode,useContext } from 'react';
import LateralBar from './components/LatateralBar'
import HomePage from './Homepage';
import Login from './components/login'
import {Routes,Route,BrowserRouter,Navigate} from 'react-router-dom'
import Register from './components/register';
import { AuthContext, AuthProvider } from './contexts/authContext';
import CreateDoctor from './createDoctor';
import CreatePatient from './createPatient';
import FirtTimePage from './components/firstTimePage';
import DoctorsList from './doctorsList';
import PatientList from './patientList';
import EditPatient from './editPatient';


function App() {

    interface IPrivate{
      children?:ReactNode
    }

    const Private:React.FC<IPrivate>=({children})=>{
      const {Authenticated,firstTime,Loading} = useContext(AuthContext)

      if(Loading){
        return <div className='loading'>
          
          <h1>Carregando...</h1>

        </div>
      }

        if(!Authenticated){
      
          return <Navigate to="/login"/>

        }

        else if(Authenticated){
     
        return <div style={{display:'flex',width:"100%"}}>
          <LateralBar></LateralBar>
          {children}
          </div>
        }
        
        else if(Authenticated && firstTime){

          return <div style={{display:'flex',width:"100%"}}>
          <LateralBar></LateralBar>
          <FirtTimePage/>
      
          </div> 

        }

       return null

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
        <Route path="*" element={<Private><HomePage></HomePage></Private>}></Route>
        <Route path="/home" element={<Private><HomePage></HomePage></Private>}></Route>
        <Route path="/login" element={<Redirect><Login></Login></Redirect>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/createDoctor" element={<Private><CreateDoctor></CreateDoctor></Private>}></Route>
        <Route path="/createPatient" element={<Private><CreatePatient></CreatePatient></Private>}></Route>
        <Route path="/firstTimePage" element={<FirtTimePage/>}></Route>
        <Route path="/patientlist" element={<Private><PatientList></PatientList></Private>}></Route>
        <Route path="/edituser/:id" element={<Private><EditPatient/></Private>}></Route>
        <Route path="/doctorlist" element={<Private><DoctorsList></DoctorsList></Private>}></Route>
        </Routes>
        </AuthProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
