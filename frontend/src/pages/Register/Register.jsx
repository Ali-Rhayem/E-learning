import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                username,
                email,
                password
            });
            if (response.status === 201) {
                navigate("/login");
            }
        } catch (err) {
            setError("Registration failed. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className="auth-page">
            <div className="form-box register">
                <form onSubmit={handleRegister}>
                    <h1>Register</h1>
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
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <FaEnvelope className="icon" />
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
                    <button type="submit">Register</button>
                    <div className="register-link">
                        <p>
                            Already have an account?
                            <button type="button" onClick={() => navigate("/login")} className="link-button">
                                Login
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
