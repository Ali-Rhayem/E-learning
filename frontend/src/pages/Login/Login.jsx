import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; 
import { useDispatch } from 'react-redux';
import { setUser, setEnrolledClasses } from '../../redux/userSlice';

const Login = () => {
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                username, 
                password
            });
            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem("token", token); 
                const decoded = jwtDecode(token); 
                console.log('Token decoded:', decoded);
                dispatch(setUser({ id: decoded.userId, username: decoded.username }));

                const classResponse = await axios.get(`http://localhost:5000/api/classes/student/${decoded.userId}/classes`);
                console.log('Classes fetched:', classResponse.data);
                dispatch(setEnrolledClasses(classResponse.data));

                navigate("/my-classes"); 
            }
        } catch (err) {
            setError("Login failed. Please try again.");
            console.error('Login error:', err);
        }
    };

    return (
        <div className="auth-page">
            <div className="form-box login">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    {error && <p className="error-message">{error}</p>}
                    <div className="input-box">
                        <input
                            type="text" 
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <FaLock className="icon" />
                    </div>
                    <button type="submit">Login</button>
                    <div className="register-link">
                        <p>
                            Don't have an account?
                            <button type="button" onClick={() => navigate("/register")} className="link-button">
                                Register
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
