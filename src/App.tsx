import './App.css';
import LateralBar from './components/LatateralBar'
import HomePage from './Homepage';
import Login from './components/login'
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Register from './components/register';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Routes>     
        <Route path='/home' element={<HomePage></HomePage>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
