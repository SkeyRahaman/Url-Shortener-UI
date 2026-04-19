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
        </div>
    );
};

export default About;