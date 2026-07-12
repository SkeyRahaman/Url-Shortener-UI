import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { loginUser } from '../api';

const SocialButton = ({ icon, text, providerColor, isDarkMode, borderColor }) => {
    const btnStyle = {
        border: `1px solid ${borderColor}`,
        backgroundColor: isDarkMode ? '#1a1d24' : '#ffffff',
        color: isDarkMode ? '#a0a5b1' : '#6c757d',
        opacity: 0.5,
        filter: 'grayscale(1)',
        cursor: 'not-allowed',
        position: 'relative'
    };
    return (
        <button className="btn d-flex align-items-center gap-2 py-2 px-3 shadow-none w-100 mb-3" style={btnStyle} disabled>
            <i className={`bi ${icon}`} style={{ fontSize: '1.2rem' }}></i>
            <span className="fw-semibold small">{text}</span>
            <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle ms-auto text-uppercase fw-bold" style={{ fontSize: '0.6rem' }}>
                Coming Soon
            </span>
        </button>
    );
};

const Divider = ({ mutedText, isDarkMode }) => (
    <div className="h-100 d-flex flex-row flex-md-column align-items-center justify-content-center my-4 my-md-0 position-relative">
        <div className="d-none d-md-block h-100" style={{ width: '1px', background: `linear-gradient(transparent, ${isDarkMode ? '#3a3f50' : '#dee2e6'}, transparent)` }}></div>
        <div className="d-md-none w-100" style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${isDarkMode ? '#3a3f50' : '#dee2e6'}, transparent)` }}></div>
        <span className="px-3 py-2 fw-bold small text-uppercase z-1 position-absolute bg-inherit" style={{ color: mutedText, backgroundColor: 'inherit', letterSpacing: '1px', fontSize: '0.7rem' }}>OR</span>
    </div>
);


const LoginForm = ({ isDarkMode, textColor, borderColor }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    // NEW: Add an error state to show login failures
    const [error, setError] = useState(""); 
    
    const { login } = useAuth(); 
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(""); // Clear any old errors

        try {
            const responseData = await loginUser(username, password);
            const token = responseData.access_token;
            const serverUserName = responseData.user_name;
            login(token, { username: serverUserName });
            toast.success(`Welcome back, ${serverUserName}!`);
            navigate("/");
            
        } catch (err) {
            console.error("Login failed:", err);
            if (err.response && err.response.data && err.response.data.detail) {
                setError(err.response.data.detail);
            } else {
                setError("Invalid username or password. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const inputStyle = {
        backgroundColor: isDarkMode ? '#0f1116' : '#ffffff',
        border: `1px solid ${borderColor}`,
        color: textColor,
        fontSize: '0.95rem'
    };

    return (
        <form onSubmit={handleSignIn}>
            {/* NEW: Display the error message if one exists */}
            {error && (
                <div className="alert alert-danger py-2 small fw-bold text-center border-0 rounded-3 mb-3" style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)', color: '#dc3545' }}>
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                </div>
            )}

            <div className="mb-3">
                <label className={`small fw-bold mb-2 opacity-75 ${textColor}`}>Username</label>
                <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: borderColor }}>
                        <i className="bi bi-person text-primary"></i> 
                    </span>
                    <input 
                        type="text"
                        required 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control py-2 shadow-none border-start-0" 
                        placeholder="Enter username" 
                        style={inputStyle} 
                    />
                </div>
            </div>
            <div className="mb-4">
                <div className="d-flex justify-content-between">
                    <label className={`small fw-bold mb-2 opacity-75 ${textColor}`}>Password</label>
                    <button type="button" className="btn btn-link p-0 small text-decoration-none text-primary fw-semibold" style={{ fontSize: '0.75rem' }}>Forgot password?</button>
                </div>
                <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: borderColor }}>
                        <i className="bi bi-shield-lock text-primary"></i>
                    </span>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control py-2 shadow-none border-start-0 border-end-0" 
                        placeholder="Enter password" 
                        style={inputStyle} 
                    />
                    <button 
                        type="button"
                        className="input-group-text bg-transparent border-start-0" 
                        style={{ borderColor: borderColor, cursor: 'pointer' }}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} text-muted`}></i>
                    </button>
                </div>
            </div>
            <button type="submit" disabled={isLoading} className="btn btn-primary w-100 py-2 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2" style={{ height: '45px' }}>
                {isLoading ? <span className="spinner-border spinner-border-sm" role="status"></span> : <>Sign In <i className="bi bi-arrow-right"></i></>}
            </button>
        </form>
    );
};

const LoginPage = ({ isDarkMode = true }) => {
    const textColor = isDarkMode ? '#ffffff' : '#212529';
    const cardBg = isDarkMode ? '#1a1d24' : '#ffffff';
    const borderColor = isDarkMode ? '#2d333f' : '#e9ecef';
    const mutedText = isDarkMode ? '#9ca3af' : '#6c757d';

    const loginBoxStyle = {
        backgroundColor: cardBg,
        border: `1px solid ${borderColor}`,
        maxWidth: '900px',
        width: '100%',
        boxShadow: isDarkMode ? '0 25px 50px -12px rgba(0, 0, 0, 0.7)' : '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
        borderRadius: '24px',
        overflow: 'hidden'
    };

    return (
        <div className="d-flex align-items-center justify-content-center py-5 px-3 min-vh-100" style={{ backgroundColor: isDarkMode ? '#0f1116' : '#f4f7fa' }}>
            <div className="p-4 p-md-5" style={loginBoxStyle}>
                <div className="text-center mb-5">
                    <div className="d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #0d6efd 0%, #00d2ff 100%)', borderRadius: '16px', boxShadow: '0 8px 16px rgba(13, 110, 253, 0.25)' }}>
                        <i className="bi bi-link-45deg text-white fs-1"></i>
                    </div>
                    <h2 className={`fw-bold mb-2 ${textColor}`} style={{ letterSpacing: '-0.5px' }}>Welcome back</h2>
                    <p className="small px-4" style={{ color: mutedText }}>Enter your credentials to access your dashboard</p>
                </div>
                <div className="row g-0 align-items-stretch">
                    <div className="col-12 col-md-5 d-flex flex-column justify-content-center p-md-3 order-1 order-md-1">
                        <LoginForm isDarkMode={isDarkMode} textColor={textColor} borderColor={borderColor} />
                    </div>
                    <div className="col-12 col-md-2 position-relative py-3 py-md-0 order-2 order-md-2">
                        <Divider isDarkMode={isDarkMode} mutedText={mutedText} />
                    </div>
                    <div className="col-12 col-md-5 d-flex flex-column justify-content-center p-md-3 order-3 order-md-3">
                        <SocialButton icon="bi-google" text="Continue with Google" providerColor="#ea4335" isDarkMode={isDarkMode} borderColor={borderColor} />
                        <SocialButton icon="bi-facebook" text="Continue with Facebook" providerColor="#1877f2" isDarkMode={isDarkMode} borderColor={borderColor} />
                        <SocialButton icon="bi-apple" text="Continue with Apple" providerColor={isDarkMode ? "#fff" : "#000"} isDarkMode={isDarkMode} borderColor={borderColor} />
                    </div>
                </div>
                <div className="text-center mt-5 pt-3 border-top" style={{ borderColor: borderColor }}>
                    <p className="small mb-0" style={{ color: mutedText }}>
                        Don't have an account? 
                        <Link to="/register" className="btn btn-link p-0 fw-bold text-decoration-none small ms-1" style={{ verticalAlign: 'baseline' }}>
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;