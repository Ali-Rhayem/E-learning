import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register/Register';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/Register" element={<Register/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
