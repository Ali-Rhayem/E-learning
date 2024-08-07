import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './redux/store';
import Register from './pages/Register/Register.jsx';
import Login from './pages/Login/Login.jsx';
import Home from './pages/home/home.jsx';
import AllClasses from './pages/AllClasses/AllClasses.jsx';
import MyClasses from './pages/MyClasses/MyClasses.jsx';
import ClassFiles from './pages/ClassFiles/ClassFiles.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import { setUser } from './redux/userSlice';
import {jwtDecode} from 'jwt-decode';

const AppWrapper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      dispatch(setUser({ id: decoded.userId, username: decoded.username, role: decoded.role }));
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate]);

  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/all-classes" element={<AllClasses />} />
          <Route path="/my-classes" element={<MyClasses />} />
          <Route path="/class-files/:classId" element={<ClassFiles />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <Router>
      <AppWrapper />
    </Router>
  </Provider>
);

export default App;
