import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    return (
        <div className="auth-page">
            <div className="form-box login">
                <form>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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