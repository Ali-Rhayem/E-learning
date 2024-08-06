import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register/Register.jsx';
import Login from './pages/Login/Login.jsx'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/Login" element={<Login/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
