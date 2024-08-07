import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Register from './pages/Register/Register.jsx';
import Login from './pages/Login/Login.jsx';
import Home from './pages/home/home.jsx';
import AllClasses from './pages/AllClasses/AllClasses.jsx';
import MyClasses from './pages/MyClasses/MyClasses.jsx';
import ClassFiles from './pages/ClassFiles';
import Navbar from './components/Navbar/Navbar.jsx';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/all-classes" element={<AllClasses />} />
            <Route path="/my-classes" element={<MyClasses />} />
            <Route path="/class-files/:classId" element={<ClassFiles />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
