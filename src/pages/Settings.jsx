import React from "react";

// --- Sub-Component 1: General Settings ---
const GeneralSettings = ({ textColor, cardBg, borderColor, mutedText }) => (
    <div className="p-4 rounded-4 mb-4" style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
        <h5 className={`fw-bold mb-4 ${textColor}`}>General Preferences</h5>
        <div className="mb-3">
            <label className={`small fw-bold mb-2 ${textColor}`}>Default Domain</label>
            <select className="form-select shadow-none bg-transparent" style={{ color: textColor, borderColor: borderColor }}>
                <option>rel.ink/</option>
                <option>short.ly/</option>
                <option>my-brand.co/</option>
            </select>
        </div>
        <div className="mb-3">
            <label className={`small fw-bold mb-2 ${textColor}`}>Language</label>
            <select className="form-select shadow-none bg-transparent" style={{ color: textColor, borderColor: borderColor }}>
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
            </select>
        </div>
    </div>
);

// --- Sub-Component 2: Developer / API Settings ---
const ApiSettings = ({ textColor, cardBg, borderColor, mutedText }) => (
    <div className="p-4 rounded-4 mb-4" style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
        <h5 className={`fw-bold mb-3 ${textColor}`}>Developer Settings</h5>
        <p className="small mb-4" style={{ color: mutedText }}>Use this key to integrate our URL shortener into your own applications.</p>
        <div className="mb-3">
            <label className={`small fw-bold mb-1 ${textColor}`}>Your API Key</label>
            <div className="input-group">
                <input 
                    type="password" 
                    className="form-control bg-transparent shadow-none" 
                    value="sk_test_51MzXfHSD0987654321" 
                    readOnly 
                    style={{ color: textColor, borderColor: borderColor }} 
                />
                <button className="btn btn-outline-primary" type="button">Copy</button>
            </div>
        </div>
        <button className="btn btn-link p-0 text-decoration-none small">Regenerate Key</button>
    </div>
);

// --- Sub-Component 3: Danger Zone ---
const DangerZone = ({ cardBg }) => (
    <div className="p-4 rounded-4" style={{ backgroundColor: cardBg, border: '1px solid #dc3545' }}>
        <h5 className="fw-bold mb-3 text-danger">Danger Zone</h5>
        <p className="small text-muted mb-4">Once you delete your account or data, there is no going back. Please be certain.</p>
        <div className="d-flex gap-2 flex-wrap">
            <button className="btn btn-outline-danger px-4">Clear All History</button>
            <button className="btn btn-danger px-4">Delete Account</button>
        </div>
    </div>
);

// --- Main Settings Page ---
const Settings = ({ isDarkMode }) => {
    const textColor = isDarkMode ? 'text-white' : 'text-dark';
    const cardBg = isDarkMode ? '#212530' : '#ffffff';
    const borderColor = isDarkMode ? '#3a3f50' : '#dee2e6';
    const mutedText = isDarkMode ? '#9ca3af' : '#6c757d';

    return (
        <div className="w-100">
            <div className="row">
                <div className="col-12 col-xl-8 mx-auto">
                    <h2 className={`fw-bold mb-4 ${textColor}`}>Settings</h2>
                    
                    <GeneralSettings 
                        textColor={textColor} 
                        cardBg={cardBg} 
                        borderColor={borderColor} 
                        mutedText={mutedText} 
                    />

                    <ApiSettings 
                        textColor={textColor} 
                        cardBg={cardBg} 
                        borderColor={borderColor} 
                        mutedText={mutedText} 
                    />

                    <DangerZone cardBg={cardBg} />
                    
                    <div className="mt-5 d-flex justify-content-end">
                        <button className="btn btn-primary px-5 py-2 fw-bold rounded-3 shadow">Save All Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;