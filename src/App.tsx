import './App.css';
import { ReactNode } from 'react';
import LateralBar from './components/LatateralBar'
import HomePage from './Homepage';
import Login from './components/login'
import {Routes,Route,BrowserRouter,Navigate} from 'react-router-dom'
import Register from './components/register';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './contexts/authContext';
import Header from './components/Header';



function App() {

    interface IPrivate{
      children:ReactNode
    }

    const Private:React.FC<IPrivate>=({children})=>{
      const {Authenticated} = useContext(AuthContext)

      if(!Authenticated){
        return <Navigate to="/login"/>
      }

      return <>{children}</>
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
        <LateralBar></LateralBar>
        <Routes>
        <Route path='/home' element={<Private><HomePage></HomePage></Private>}></Route>
        <Route path='/login' element={<Redirect><Login></Login></Redirect>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        </Routes>
        </AuthProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
