import React from "react";

// --- Sub-Component 1: Hero Header ---
const AboutHero = ({ glowStyle, textColor, mutedText }) => (
    <div className="p-4 p-md-5 rounded-4 mb-5" style={glowStyle}>
        <h2 className={`fw-bold mb-3 ${textColor}`}>About URL Shortener</h2>
        <p className="fs-5 m-0" style={{ color: mutedText }}>
            A powerful, lightweight tool designed to make your long links manageable and trackable in seconds.
        </p>
    </div>
);

// --- Sub-Component 2: Feature Card ---
const FeatureCard = ({ icon, title, description, cardBg, borderColor, textColor, mutedText, isFullWidth = false }) => (
    <div className={isFullWidth ? "col-12" : "col-12 col-md-6"}>
        <div className="p-4 h-100 rounded-4" style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
            {icon && <i className={`bi ${icon} text-primary fs-2 mb-3 d-block`}></i>}
            <h5 className={`fw-bold ${textColor} ${isFullWidth ? 'mb-3' : ''}`}>{title}</h5>
            <p className="mb-0" style={{ color: mutedText }}>{description}</p>
        </div>
    </div>
);

// --- Main About Page ---
const About = ({ isDarkMode }) => {
    const textColor = isDarkMode ? 'text-white' : 'text-dark';
    const cardBg = isDarkMode ? '#212530' : '#ffffff';
    const borderColor = isDarkMode ? '#3a3f50' : '#dee2e6';
    const mutedText = isDarkMode ? '#9ca3af' : '#6c757d';

    const glowStyle = {
        backgroundColor: isDarkMode ? '#1a1d24' : '#ffffff',
        border: '2px solid #3b82f6',
        boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)',
    };

    return (
        <div className="w-100">
            <style>{`
                .hover-link { color: ${mutedText} !important; transition: color 0.2s ease, padding-left 0.2s ease; }
                .hover-link:hover { color: #3b82f6 !important; padding-left: 4px; }
            `}</style>

            <AboutHero 
                glowStyle={glowStyle} 
                textColor={textColor} 
                mutedText={mutedText} 
            />

            <div className="row g-4">
                <FeatureCard 
                    icon="bi-lightning-charge-fill"
                    title="Fast & Reliable"
                    description="Our infrastructure ensures that your redirected links load instantly for users worldwide."
                    cardBg={cardBg}
                    borderColor={borderColor}
                    textColor={textColor}
                    mutedText={mutedText}
                />

                <FeatureCard 
                    icon="bi-shield-lock-fill"
                    title="Secure Links"
                    description="We scan all URLs to protect our users from malicious sites and phishing attempts."
                    cardBg={cardBg}
                    borderColor={borderColor}
                    textColor={textColor}
                    mutedText={mutedText}
                />

                <FeatureCard 
                    title="Our Mission"
                    description="Built for developers and marketers alike, we aim to provide the most intuitive dashboard for managing digital assets. Whether you're sharing on social media or tracking a marketing campaign, we've got you covered."
                    cardBg={cardBg}
                    borderColor={borderColor}
                    textColor={textColor}
                    mutedText={mutedText}
                    isFullWidth={true}
                />
            </div>

            {/* Developer links */}
            <div className="mt-5 pt-4 border-top" style={{ borderColor: borderColor }}>
                <h4 className={`fw-bold mb-4 ${textColor}`}>
                    <i className="bi bi-terminal me-2 text-primary"></i>For Developers
                </h4>
                <div className="row g-3">
                    <div className="col-12 col-md-4">
                        <div className="p-3 rounded-3 h-100" style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
                            <div className="fw-bold mb-2 small text-uppercase text-primary" style={{ letterSpacing: '0.5px' }}>Team & Contact</div>
                            <div className="d-flex flex-column gap-2">
                                <a href="https://github.com/SkeyRahaman" target="_blank" rel="noopener noreferrer" className="text-decoration-none d-flex align-items-center gap-2 text-reset hover-link">
                                    <i className="bi bi-github"></i> <span>GitHub Profile</span>
                                </a>
                                <a href="https://www.linkedin.com/in/shakib-mondal/" target="_blank" rel="noopener noreferrer" className="text-decoration-none d-flex align-items-center gap-2 text-reset hover-link">
                                    <i className="bi bi-linkedin"></i> <span>LinkedIn Profile</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="p-3 rounded-3 h-100" style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
                            <div className="fw-bold mb-2 small text-uppercase text-primary" style={{ letterSpacing: '0.5px' }}>Source Code</div>
                            <div className="d-flex flex-column gap-2">
                                <a href="https://github.com/SkeyRahaman/Url-Shortener-UI" target="_blank" rel="noopener noreferrer" className="text-decoration-none d-flex align-items-center gap-2 text-reset hover-link">
                                    <i className="bi bi-git"></i> <span>Frontend Repository</span>
                                </a>
                                <a href="https://github.com/SkeyRahaman/URL_Shortner" target="_blank" rel="noopener noreferrer" className="text-decoration-none d-flex align-items-center gap-2 text-reset hover-link">
                                    <i className="bi bi-git"></i> <span>Backend Repository</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="p-3 rounded-3 h-100" style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
                            <div className="fw-bold mb-2 small text-uppercase text-primary" style={{ letterSpacing: '0.5px' }}>Documentation</div>
                            <div className="d-flex flex-column gap-2">
                                <a href="https://url-shortner-ergb.onrender.com/docs" target="_blank" rel="noopener noreferrer" className="text-decoration-none d-flex align-items-center gap-2 text-reset hover-link">
                                    <i className="bi bi-file-earmark-code"></i> <span>Backend Swagger API Docs</span>
                                </a>
                                <a href="https://github.com/SkeyRahaman/Url-Shortener-UI#readme" target="_blank" rel="noopener noreferrer" className="text-decoration-none d-flex align-items-center gap-2 text-reset hover-link">
                                    <i className="bi bi-book"></i> <span>Frontend README Docs</span>
                                </a>
                                <a href="https://github.com/SkeyRahaman/URL_Shortner#readme" target="_blank" rel="noopener noreferrer" className="text-decoration-none d-flex align-items-center gap-2 text-reset hover-link">
                                    <i className="bi bi-book"></i> <span>Backend README Docs</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;