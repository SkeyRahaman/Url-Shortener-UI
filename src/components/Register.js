import React, { useState } from "react";

// --- Sub-Component 1: Social Registration Button ---
const SocialButton = ({ icon, text, providerColor, isDarkMode, borderColor }) => {
    const [isHovered, setIsHovered] = useState(false);

    const btnStyle = {
        border: `1px solid ${borderColor}`,
        backgroundColor: isDarkMode 
            ? (isHovered ? '#2d333f' : '#1a1d24') 
            : (isHovered ? '#f8f9fa' : '#ffffff'),
        color: isDarkMode ? '#ffffff' : '#212529',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
    };

    return (
        <button 
            className="btn d-flex align-items-center justify-content-center gap-3 py-2 px-4 shadow-none w-100 mb-3"
            style={btnStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <i className={`bi ${icon}`} style={{ color: providerColor, fontSize: '1.2rem' }}></i>
            <span className="fw-semibold small">{text}</span>
        </button>
    );
};

// --- Sub-Component 2: Modern Divider ---
const Divider = ({ mutedText, isDarkMode }) => (
    <div className="h-100 d-flex flex-row flex-md-column align-items-center justify-content-center my-4 my-md-0 position-relative">
        <div className="d-none d-md-block h-100" style={{ width: '1px', background: `linear-gradient(transparent, ${isDarkMode ? '#3a3f50' : '#dee2e6'}, transparent)` }}></div>
        <div className="d-md-none w-100" style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${isDarkMode ? '#3a3f50' : '#dee2e6'}, transparent)` }}></div>
        <span className="px-3 py-2 fw-bold small text-uppercase z-1 position-absolute" 
              style={{ 
                  color: mutedText, 
                  backgroundColor: isDarkMode ? '#1a1d24' : '#ffffff',
                  letterSpacing: '1px',
                  fontSize: '0.7rem'
              }}>
            OR
        </span>
    </div>
);

// --- Sub-Component 3: Registration Form ---
const RegisterForm = ({ isDarkMode, textColor, borderColor, mutedText }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000); // Simulate API call
    };

    const inputStyle = {
        backgroundColor: isDarkMode ? '#0f1116' : '#ffffff',
        border: `1px solid ${borderColor}`,
        color: textColor,
        fontSize: '0.95rem'
    };

    return (
        <form onSubmit={handleSignUp}>
            <div className="mb-3">
                <label className={`small fw-bold mb-2 opacity-75 ${textColor}`}>Full Name</label>
                <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: borderColor }}>
                        <i className="bi bi-person text-primary"></i>
                    </span>
                    <input 
                        type="text" 
                        required
                        className="form-control py-2 shadow-none border-start-0" 
                        placeholder="John Doe" 
                        style={inputStyle}
                    />
                </div>
            </div>

            <div className="mb-3">
                <label className={`small fw-bold mb-2 opacity-75 ${textColor}`}>Email Address</label>
                <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: borderColor }}>
                        <i className="bi bi-envelope text-primary"></i>
                    </span>
                    <input 
                        type="email" 
                        required
                        className="form-control py-2 shadow-none border-start-0" 
                        placeholder="shakib@example.com" 
                        style={inputStyle}
                    />
                </div>
            </div>

            <div className="mb-3">
                <label className={`small fw-bold mb-2 opacity-75 ${textColor}`}>Password</label>
                <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: borderColor }}>
                        <i className="bi bi-shield-lock text-primary"></i>
                    </span>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        required
                        className="form-control py-2 shadow-none border-start-0 border-end-0" 
                        placeholder="••••••••" 
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

            <div className="mb-4">
                <label className={`small fw-bold mb-2 opacity-75 ${textColor}`}>Confirm Password</label>
                <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0" style={{ borderColor: borderColor }}>
                        <i className="bi bi-shield-check text-primary"></i>
                    </span>
                    <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        required
                        className="form-control py-2 shadow-none border-start-0 border-end-0" 
                        placeholder="••••••••" 
                        style={inputStyle}
                    />
                    <button 
                        type="button"
                        className="input-group-text bg-transparent border-start-0" 
                        style={{ borderColor: borderColor, cursor: 'pointer' }}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'} text-muted`}></i>
                    </button>
                </div>
                <div className="mt-2 small" style={{ color: mutedText, fontSize: '0.75rem' }}>
                    Must match the password entered above.
                </div>
            </div>

            <div className="mb-4 form-check">
                <input type="checkbox" className="form-check-input shadow-none" id="terms" required />
                <label className="form-check-label small" htmlFor="terms" style={{ color: mutedText }}>
                    I agree to the <button type="button" className="btn btn-link p-0 small text-decoration-none">Terms of Service</button> and <button type="button" className="btn btn-link p-0 small text-decoration-none">Privacy Policy</button>.
                </label>
            </div>

            <button 
                type="submit" 
                disabled={isLoading}
                className="btn btn-primary w-100 py-2 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
                style={{ height: '45px' }}
            >
                {isLoading ? (
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                ) : (
                    <>Create Account <i className="bi bi-person-plus"></i></>
                )}
            </button>
        </form>
    );
};

// --- Main Registration Component ---
const Register = ({ isDarkMode = true }) => {
    const textColor = isDarkMode ? '#ffffff' : '#212529';
    const cardBg = isDarkMode ? '#1a1d24' : '#ffffff';
    const borderColor = isDarkMode ? '#2d333f' : '#e9ecef';
    const mutedText = isDarkMode ? '#9ca3af' : '#6c757d';

    const registerBoxStyle = {
        backgroundColor: cardBg,
        border: `1px solid ${borderColor}`,
        maxWidth: '950px',
        width: '100%',
        boxShadow: isDarkMode 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.7)' 
            : '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
        borderRadius: '24px',
        overflow: 'hidden'
    };

    return (
        <div className="d-flex align-items-center justify-content-center py-5 px-3 min-vh-100" 
             style={{ backgroundColor: isDarkMode ? '#0f1116' : '#f4f7fa' }}>
            <div className="p-4 p-md-5" style={registerBoxStyle}>
                
                {/* Branding Section */}
                <div className="text-center mb-5">
                    <div className="d-inline-flex align-items-center justify-content-center mb-4" 
                         style={{ 
                             width: '64px', 
                             height: '64px', 
                             background: 'linear-gradient(135deg, #0d6efd 0%, #00d2ff 100%)',
                             borderRadius: '16px',
                             boxShadow: '0 8px 16px rgba(13, 110, 253, 0.25)'
                         }}>
                        <i className="bi bi-person-plus-fill text-white fs-2"></i>
                    </div>
                    <h2 className={`fw-bold mb-2 ${textColor}`} style={{ letterSpacing: '-0.5px' }}>Join us today</h2>
                    <p className="small px-4" style={{ color: mutedText }}>Start shortening and tracking your links in seconds</p>
                </div>

                <div className="row g-0 align-items-stretch">
                    {/* Social Section */}
                    <div className="col-12 col-md-5 d-flex flex-column justify-content-center p-md-3">
                        <SocialButton 
                            icon="bi-google" 
                            text="Sign up with Google" 
                            providerColor="#ea4335" 
                            isDarkMode={isDarkMode}
                            borderColor={borderColor}
                        />
                        <SocialButton 
                            icon="bi-facebook" 
                            text="Sign up with Facebook" 
                            providerColor="#1877f2" 
                            isDarkMode={isDarkMode}
                            borderColor={borderColor}
                        />
                        <SocialButton 
                            icon="bi-apple" 
                            text="Sign up with Apple" 
                            providerColor={isDarkMode ? "#fff" : "#000"} 
                            isDarkMode={isDarkMode}
                            borderColor={borderColor}
                        />
                    </div>

                    {/* Divider Section */}
                    <div className="col-12 col-md-2 position-relative py-3 py-md-0">
                        <Divider isDarkMode={isDarkMode} mutedText={mutedText} />
                    </div>

                    {/* Form Section */}
                    <div className="col-12 col-md-5 d-flex flex-column justify-content-center p-md-3">
                        <RegisterForm 
                            isDarkMode={isDarkMode} 
                            textColor={textColor} 
                            borderColor={borderColor} 
                            mutedText={mutedText}
                        />
                    </div>
                </div>

                {/* Footer Link */}
                <div className="text-center mt-5 pt-3 border-top" style={{ borderColor: borderColor }}>
                    <p className="small mb-0" style={{ color: mutedText }}>
                        Already have an account? <button className="btn btn-link p-0 fw-bold text-decoration-none small ms-1">Sign in instead</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;