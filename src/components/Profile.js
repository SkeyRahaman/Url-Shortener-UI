import React from "react";

// --- Sub-Component 1: User Header ---
const ProfileHeader = ({ isDarkMode, glowStyle, textColor, mutedText }) => (
    <div className="p-4 rounded-4 mb-5 d-flex align-items-center flex-column flex-md-row gap-4" style={glowStyle}>
        <img 
            src="https://ui-avatars.com/api/?name=MD+Shakib&background=random&size=128" 
            alt="User Avatar" 
            className="rounded-circle border border-3 border-primary"
            width="100"
        />
        <div className="text-center text-md-start">
            <h2 className={`fw-bold mb-1 ${textColor}`}>MD Shakib</h2>
            <p className="mb-2" style={{ color: mutedText }}>shakib@example.com</p>
            <span className="badge bg-primary px-3 py-2">Pro Plan</span>
        </div>
        <button className="btn btn-outline-primary ms-md-auto fw-bold px-4">Edit Profile</button>
    </div>
);

// --- Sub-Component 2: Security Card ---
const SecuritySettings = ({ isDarkMode, textColor, cardBg, borderColor }) => {
    // FIX: Change button color based on theme
    const btnClass = isDarkMode ? 'btn-secondary' : 'btn-outline-secondary';
    
    return (
        <div className="p-4 rounded-4 h-100" style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
            <h5 className={`fw-bold mb-4 ${textColor}`}>Account Security</h5>
            <div className="mb-3">
                <label className={`small fw-bold mb-1 ${textColor}`}>Password</label>
                <button className={`btn btn-sm d-block w-100 py-2 shadow-none ${btnClass}`}>
                    Change Password
                </button>
            </div>
            <div className="form-check form-switch">
                <input 
                    className="form-check-input shadow-none" 
                    type="checkbox" 
                    id="2fa" 
                    style={{ cursor: 'pointer' }}
                />
                <label className={`form-check-label ${textColor}`} htmlFor="2fa" style={{ cursor: 'pointer' }}>
                    Two-Factor Authentication
                </label>
            </div>
        </div>
    );
};

// --- Sub-Component 3: Notification Card ---
const NotificationSettings = ({ isDarkMode, textColor, cardBg, borderColor }) => (
    <div className="p-4 rounded-4 h-100" style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
        <h5 className={`fw-bold mb-4 ${textColor}`}>Notification Settings</h5>
        {['Email Notifications', 'Weekly Analytics', 'New Login Alerts'].map((item, idx) => (
            <div key={idx} className="form-check form-switch mb-3">
                <input 
                    className="form-check-input shadow-none" 
                    type="checkbox" 
                    id={`notif-${idx}`} 
                    defaultChecked 
                    style={{ cursor: 'pointer' }}
                />
                <label 
                    className={`form-check-label ${textColor}`} 
                    htmlFor={`notif-${idx}`}
                    style={{ cursor: 'pointer' }}
                >
                    {item}
                </label>
            </div>
        ))}
    </div>
);

// --- Main Profile Page ---
const Profile = ({ isDarkMode }) => {
    const textColor = isDarkMode ? 'text-white' : 'text-dark';
    const cardBg = isDarkMode ? '#212530' : '#ffffff';
    const borderColor = isDarkMode ? '#3a3f50' : '#dee2e6';
    const mutedText = isDarkMode ? '#9ca3af' : '#6c757d';

    const glowStyle = {
        backgroundColor: isDarkMode ? '#1a1d24' : '#ffffff',
        border: isDarkMode ? '2px solid #3b82f6' : '1px solid #dee2e6',
        boxShadow: isDarkMode ? '0 0 15px rgba(59, 130, 246, 0.4)' : '0 4px 12px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease'
    };

    return (
        <div className="w-100">
            {/* Global injection for the switch colors to fix toggle appearance */}
            <style>{`
                .form-check-input:checked {
                    background-color: #0d6efd !important;
                    border-color: #0d6efd !important;
                }
                .form-check-input {
                    background-color: ${isDarkMode ? '#3a3f50' : '#e9ecef'};
                    border-color: ${borderColor};
                }
            `}</style>

            <ProfileHeader 
                isDarkMode={isDarkMode} 
                glowStyle={glowStyle} 
                textColor={textColor} 
                mutedText={mutedText} 
            />

            <div className="row g-4">
                <div className="col-12 col-md-6">
                    <SecuritySettings 
                        isDarkMode={isDarkMode}
                        textColor={textColor} 
                        cardBg={cardBg} 
                        borderColor={borderColor} 
                    />
                </div>

                <div className="col-12 col-md-6">
                    <NotificationSettings 
                        isDarkMode={isDarkMode}
                        textColor={textColor} 
                        cardBg={cardBg} 
                        borderColor={borderColor} 
                    />
                </div>
            </div>
        </div>
    );
};

export default Profile;