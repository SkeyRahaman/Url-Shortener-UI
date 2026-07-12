import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../features/auth/AuthProvider";
import { updateCurrentUser } from "../features/users/api";

// ─── Profile Header ────────────────────────────────────────────────────────────
const ProfileHeader = ({ user, isDarkMode, glowStyle, textColor, mutedText, onEdit }) => (
    <div className="p-4 rounded-4 mb-5 d-flex align-items-center flex-column flex-md-row gap-4" style={glowStyle}>
        <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.username || 'U')}&background=3b82f6&color=fff&size=128`}
            alt="User Avatar"
            className="rounded-circle border border-3"
            style={{ borderColor: '#3b82f6' }}
            width="100"
        />
        <div className="text-center text-md-start">
            <h2 className={`fw-bold mb-1 ${textColor}`}>{user?.username || '—'}</h2>
            <p className="mb-2" style={{ color: mutedText }}>{user?.email || '—'}</p>
        </div>
        <button className="btn btn-outline-primary ms-md-auto fw-bold px-4" onClick={onEdit}>
            <i className="bi bi-pencil me-2"></i>Edit Profile
        </button>
    </div>
);

// ─── Edit Profile Modal ────────────────────────────────────────────────────────
const EditProfileModal = ({ isDarkMode, user, onClose, onSaved }) => {
    const [email, setEmail]       = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm]   = useState('');
    const [showPw, setShowPw]     = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]       = useState('');

    const cardBg    = isDarkMode ? '#212530' : '#ffffff';
    const textColor = isDarkMode ? '#ffffff' : '#212529';
    const borderColor = isDarkMode ? '#3a3f50' : '#dee2e6';
    const inputBg   = isDarkMode ? '#0f1116' : '#ffffff';
    const inputStyle = { backgroundColor: inputBg, color: textColor, borderColor, fontSize: '0.95rem' };

    const handleSave = async (e) => {
        e.preventDefault();
        setError('');
        if (password && password !== confirm) {
            setError('Passwords do not match.');
            return;
        }
        if (!email && !password) {
            setError('Provide at least an email or a new password.');
            return;
        }
        setIsLoading(true);
        try {
            await updateCurrentUser(email || undefined, password || undefined);
            toast.success('Profile updated!');
            onSaved({ email });
            onClose();
        } catch (err) {
            setError(err?.response?.data?.detail || 'Update failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1050, backgroundColor: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div onClick={e => e.stopPropagation()}
                 style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: '480px', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0" style={{ color: textColor }}>
                        <i className="bi bi-person-gear me-2 text-primary"></i>Edit Profile
                    </h5>
                    <button onClick={onClose} className="btn btn-link p-0 shadow-none" style={{ color: textColor }}>
                        <i className="bi bi-x-lg fs-5"></i>
                    </button>
                </div>

                {error && (
                    <div className="alert py-2 small fw-bold border-0 rounded-3 mb-3"
                         style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                        <i className="bi bi-exclamation-triangle me-2"></i>{error}
                    </div>
                )}

                <form onSubmit={handleSave}>
                    <div className="mb-3">
                        <label className="small fw-bold mb-1" style={{ color: textColor }}>Email Address</label>
                        <input type="email" className="form-control shadow-none" value={email}
                               onChange={e => setEmail(e.target.value)} style={inputStyle}
                               placeholder="new@email.com" />
                    </div>
                    <div className="mb-3">
                        <label className="small fw-bold mb-1" style={{ color: textColor }}>New Password <span style={{ color: '#9ca3af', fontWeight: 400 }}>(leave blank to keep current)</span></label>
                        <div className="input-group">
                            <input type={showPw ? "text" : "password"} className="form-control shadow-none border-end-0"
                                   value={password} onChange={e => setPassword(e.target.value)}
                                   style={inputStyle} placeholder="••••••••" />
                            <button type="button" className="input-group-text bg-transparent" style={{ borderColor, cursor: 'pointer' }} onClick={() => setShowPw(!showPw)}>
                                <i className={`bi ${showPw ? 'bi-eye-slash' : 'bi-eye'} text-muted`}></i>
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="small fw-bold mb-1" style={{ color: textColor }}>Confirm New Password</label>
                        <input type="password" className="form-control shadow-none"
                               value={confirm} onChange={e => setConfirm(e.target.value)}
                               style={inputStyle} placeholder="••••••••" />
                    </div>

                    <div className="d-flex gap-2">
                        <button type="button" onClick={onClose} className="btn btn-secondary flex-grow-1 py-2 fw-bold rounded-3">Cancel</button>
                        <button type="submit" disabled={isLoading} className="btn btn-primary flex-grow-1 py-2 fw-bold rounded-3">
                            {isLoading ? <span className="spinner-border spinner-border-sm" role="status"></span> : <><i className="bi bi-check-lg me-1"></i>Save</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// ─── Security Card ─────────────────────────────────────────────────────────────
const SecurityCard = ({ isDarkMode, textColor, cardBg, borderColor, onChangePassword }) => {
    const btnClass = isDarkMode ? 'btn-secondary' : 'btn-outline-secondary';
    return (
        <div className="p-4 rounded-4 h-100" style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
            <h5 className={`fw-bold mb-4 ${textColor}`}>Account Security</h5>
            <div className="mb-3">
                <label className={`small fw-bold mb-1 ${textColor}`}>Password</label>
                <button className={`btn btn-sm d-block w-100 py-2 shadow-none ${btnClass}`} onClick={onChangePassword}>
                    Change Password
                </button>
            </div>
            <p className="small mb-0" style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}>
                <i className="bi bi-info-circle me-1"></i>Two-Factor Authentication — coming soon
            </p>
        </div>
    );
};

// ─── Main Profile Page ─────────────────────────────────────────────────────────
const Profile = ({ isDarkMode }) => {
    const { user, updateUser } = useAuth();
    const [showEdit, setShowEdit] = useState(false);

    const textColor   = isDarkMode ? 'text-white' : 'text-dark';
    const cardBg      = isDarkMode ? '#212530' : '#ffffff';
    const borderColor = isDarkMode ? '#3a3f50' : '#dee2e6';
    const mutedText   = isDarkMode ? '#9ca3af' : '#6c757d';

    const glowStyle = {
        backgroundColor: isDarkMode ? '#1a1d24' : '#ffffff',
        border: isDarkMode ? '2px solid #3b82f6' : '1px solid #dee2e6',
        boxShadow: isDarkMode ? '0 0 15px rgba(59,130,246,0.4)' : '0 4px 12px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
    };

    const handleSaved = (updates) => {
        updateUser(updates);
    };

    return (
        <div className="w-100">
            <ProfileHeader
                user={user}
                isDarkMode={isDarkMode}
                glowStyle={glowStyle}
                textColor={textColor}
                mutedText={mutedText}
                onEdit={() => setShowEdit(true)}
            />

            <div className="row g-4">
                <div className="col-12 col-md-6">
                    <SecurityCard
                        isDarkMode={isDarkMode}
                        textColor={textColor}
                        cardBg={cardBg}
                        borderColor={borderColor}
                        onChangePassword={() => setShowEdit(true)}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <div className="p-4 rounded-4 h-100" style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
                        <h5 className={`fw-bold mb-4 ${textColor}`}>Account Info</h5>
                        {[
                            { label: 'Username', value: user?.username, icon: 'bi-person' },
                            { label: 'Email',    value: user?.email,    icon: 'bi-envelope' },
                            { label: 'User ID',  value: user?.id,       icon: 'bi-fingerprint' },
                        ].map(row => (
                            <div key={row.label} className="d-flex align-items-center gap-3 mb-3">
                                <i className={`bi ${row.icon} text-primary`}></i>
                                <div>
                                    <div className="small fw-bold" style={{ color: mutedText }}>{row.label}</div>
                                    <div className={`small ${textColor}`}>{row.value || '—'}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showEdit && (
                <EditProfileModal
                    isDarkMode={isDarkMode}
                    user={user}
                    onClose={() => setShowEdit(false)}
                    onSaved={handleSaved}
                />
            )}
        </div>
    );
};

export default Profile;