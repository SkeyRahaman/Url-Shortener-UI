import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../../users/api";

// ─── Social Button ─────────────────────────────────────────────────────────────
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

// ─── Divider ────────────────────────────────────────────────────────────────────
const Divider = ({ mutedText, isDarkMode }) => (
    <div className="h-100 d-flex flex-row flex-md-column align-items-center justify-content-center my-4 my-md-0 position-relative">
        <div className="d-none d-md-block h-100" style={{ width: '1px', background: `linear-gradient(transparent, ${isDarkMode ? '#3a3f50' : '#dee2e6'}, transparent)` }}></div>
        <div className="d-md-none w-100" style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${isDarkMode ? '#3a3f50' : '#dee2e6'}, transparent)` }}></div>
        <span className="px-3 py-2 fw-bold small text-uppercase z-1 position-absolute"
              style={{ color: mutedText, backgroundColor: isDarkMode ? '#1a1d24' : '#ffffff', letterSpacing: '1px', fontSize: '0.7rem' }}>
            OR
        </span>
    </div>
);

// ─── Registration Form ──────────────────────────────────────────────────────────
const RegisterForm = ({ isDarkMode, textColor, borderColor, mutedText }) => {
    const [username, setUsername]         = useState('');
    const [email, setEmail]               = useState('');
    const [password, setPassword]         = useState('');
    const [confirmPassword, setConfirm]   = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm]   = useState(false);
    const [isLoading, setIsLoading]       = useState(false);
    const [error, setError]               = useState('');
    const navigate = useNavigate();

    const inputStyle = {
        backgroundColor: isDarkMode ? '#0f1116' : '#ffffff',
        border: `1px solid ${borderColor}`,
        color: textColor,
        fontSize: '0.95rem',
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsLoading(true);
        try {
            await registerUser({ user_name: username, email, password });
            toast.success('Account created! Please sign in.');
            navigate('/');
        } catch (err) {
            const detail = err?.response?.data?.detail;
            if (err?.response?.status === 409) {
                setError('Username or email is already taken.');
            } else if (typeof detail === 'string') {
                setError(detail);
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSignUp}>
            {error && (
                <div className="alert py-2 small fw-bold text-center border-0 rounded-3 mb-3"
                     style={{ backgroundColor: 'rgba(220,53,69,0.1)', color: '#dc3545' }}>
                    <i className="bi bi-exclamation-triangle me-2"></i>{error}
                </div>
            )}

            {/* Username */}
            <div className="mb-3">
                <label className={`small fw-bold mb-2 opacity-75`} style={{ color: textColor }}>Username</label>
                <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0" style={{ borderColor }}>
                        <i className="bi bi-person text-primary"></i>
                    </span>
                    <input type="text" required id="register-username"
                           value={username} onChange={e => setUsername(e.target.value)}
                           className="form-control py-2 shadow-none border-start-0"
                           placeholder="shakib123" style={inputStyle} />
                </div>
            </div>

            {/* Email */}
            <div className="mb-3">
                <label className={`small fw-bold mb-2 opacity-75`} style={{ color: textColor }}>Email Address</label>
                <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0" style={{ borderColor }}>
                        <i className="bi bi-envelope text-primary"></i>
                    </span>
                    <input type="email" required id="register-email"
                           value={email} onChange={e => setEmail(e.target.value)}
                           className="form-control py-2 shadow-none border-start-0"
                           placeholder="you@example.com" style={inputStyle} />
                </div>
            </div>

            {/* Password */}
            <div className="mb-3">
                <label className={`small fw-bold mb-2 opacity-75`} style={{ color: textColor }}>Password</label>
                <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0" style={{ borderColor }}>
                        <i className="bi bi-shield-lock text-primary"></i>
                    </span>
                    <input type={showPassword ? "text" : "password"} required id="register-password"
                           value={password} onChange={e => setPassword(e.target.value)}
                           className="form-control py-2 shadow-none border-start-0 border-end-0"
                           placeholder="••••••••" style={inputStyle} />
                    <button type="button" className="input-group-text bg-transparent border-start-0"
                            style={{ borderColor, cursor: 'pointer' }}
                            onClick={() => setShowPassword(!showPassword)}>
                        <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} text-muted`}></i>
                    </button>
                </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
                <label className={`small fw-bold mb-2 opacity-75`} style={{ color: textColor }}>Confirm Password</label>
                <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0" style={{ borderColor }}>
                        <i className="bi bi-shield-check text-primary"></i>
                    </span>
                    <input type={showConfirm ? "text" : "password"} required id="register-confirm-password"
                           value={confirmPassword} onChange={e => setConfirm(e.target.value)}
                           className="form-control py-2 shadow-none border-start-0 border-end-0"
                           placeholder="••••••••" style={inputStyle} />
                    <button type="button" className="input-group-text bg-transparent border-start-0"
                            style={{ borderColor, cursor: 'pointer' }}
                            onClick={() => setShowConfirm(!showConfirm)}>
                        <i className={`bi ${showConfirm ? 'bi-eye-slash' : 'bi-eye'} text-muted`}></i>
                    </button>
                </div>
                <div className="mt-1 small" style={{ color: mutedText, fontSize: '0.75rem' }}>
                    Must match the password entered above.
                </div>
            </div>

            <button type="submit" id="register-submit" disabled={isLoading}
                    className="btn btn-primary w-100 py-2 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
                    style={{ height: '45px' }}>
                {isLoading
                    ? <span className="spinner-border spinner-border-sm" role="status"></span>
                    : <>Create Account <i className="bi bi-person-plus"></i></>}
            </button>
        </form>
    );
};

// ─── Main Register Component ────────────────────────────────────────────────────
const Register = ({ isDarkMode = true }) => {
    const textColor   = isDarkMode ? '#ffffff' : '#212529';
    const cardBg      = isDarkMode ? '#1a1d24' : '#ffffff';
    const borderColor = isDarkMode ? '#2d333f' : '#e9ecef';
    const mutedText   = isDarkMode ? '#9ca3af' : '#6c757d';

    const registerBoxStyle = {
        backgroundColor: cardBg,
        border: `1px solid ${borderColor}`,
        maxWidth: '950px',
        width: '100%',
        boxShadow: isDarkMode ? '0 25px 50px -12px rgba(0,0,0,0.7)' : '0 25px 50px -12px rgba(0,0,0,0.08)',
        borderRadius: '24px',
        overflow: 'hidden',
    };

    return (
        <div className="d-flex align-items-center justify-content-center py-5 px-3 min-vh-100"
             style={{ backgroundColor: isDarkMode ? '#0f1116' : '#f4f7fa' }}>
            <div className="p-4 p-md-5" style={registerBoxStyle}>
                {/* Branding */}
                <div className="text-center mb-5">
                    <div className="d-inline-flex align-items-center justify-content-center mb-4"
                         style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #0d6efd 0%, #00d2ff 100%)', borderRadius: '16px', boxShadow: '0 8px 16px rgba(13,110,253,0.25)' }}>
                        <i className="bi bi-person-plus-fill text-white fs-2"></i>
                    </div>
                    <h2 className="fw-bold mb-2" style={{ color: textColor, letterSpacing: '-0.5px' }}>Join us today</h2>
                    <p className="small px-4" style={{ color: mutedText }}>Start shortening and tracking your links in seconds</p>
                </div>

                <div className="row g-0 align-items-stretch">
                    <div className="col-12 col-md-5 d-flex flex-column justify-content-center p-md-3 order-1 order-md-1">
                        <RegisterForm isDarkMode={isDarkMode} textColor={textColor} borderColor={borderColor} mutedText={mutedText} />
                    </div>
                    <div className="col-12 col-md-2 position-relative py-3 py-md-0 order-2 order-md-2">
                        <Divider isDarkMode={isDarkMode} mutedText={mutedText} />
                    </div>
                    <div className="col-12 col-md-5 d-flex flex-column justify-content-center p-md-3 order-3 order-md-3">
                        <SocialButton icon="bi-google" text="Sign up with Google" providerColor="#ea4335" isDarkMode={isDarkMode} borderColor={borderColor} />
                        <SocialButton icon="bi-facebook" text="Sign up with Facebook" providerColor="#1877f2" isDarkMode={isDarkMode} borderColor={borderColor} />
                        <SocialButton icon="bi-apple" text="Sign up with Apple" providerColor={isDarkMode ? "#fff" : "#000"} isDarkMode={isDarkMode} borderColor={borderColor} />
                    </div>
                </div>

                <div className="text-center mt-5 pt-3 border-top" style={{ borderColor }}>
                    <p className="small mb-0" style={{ color: mutedText }}>
                        Already have an account?{' '}
                        <Link to="/" className="btn btn-link p-0 fw-bold text-decoration-none small ms-1" style={{ verticalAlign: 'baseline' }}>
                            Sign in instead
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;