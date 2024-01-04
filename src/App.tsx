import './App.css';
import LateralBar from './components/LatateralBar'
import HomePage from './Homepage';
import Login from './components/login'
import {Routes,Route,BrowserRouter} from 'react-router-dom'


function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <LateralBar></LateralBar>
        <Routes>     
        <Route path='/home' element={<HomePage></HomePage>}></Route>
        <Route path='/:type' element={<Login></Login>}></Route>
        <Route path='/authenticate' element={<Login></Login>}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
