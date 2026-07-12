import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthProvider';
import { updateCurrentUser, deleteCurrentUser } from '../features/users/api';

// ─── Change Password Card ──────────────────────────────────────────────────────
const ChangePasswordCard = ({ isDarkMode, textColor, cardBg, borderColor, mutedText }) => {
    const [currentPw, setCurrentPw] = useState('');
    const [newPw, setNewPw]         = useState('');
    const [confirmPw, setConfirm]   = useState('');
    const [showPw, setShowPw]       = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]         = useState('');

    const inputStyle = {
        backgroundColor: isDarkMode ? '#0f1116' : '#ffffff',
        border: `1px solid ${borderColor}`,
        color: isDarkMode ? '#fff' : '#212529',
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setError('');
        if (newPw !== confirmPw) {
            setError('New passwords do not match.');
            return;
        }
        if (!newPw) {
            setError('Please enter a new password.');
            return;
        }
        setIsLoading(true);
        try {
            await updateCurrentUser(undefined, newPw);
            toast.success('Password changed successfully!');
            setCurrentPw(''); setNewPw(''); setConfirm('');
        } catch (err) {
            setError(err?.response?.data?.detail || 'Failed to change password.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 rounded-4 mb-4" style={{ backgroundColor: cardBg, border: `1px solid ${borderColor}` }}>
            <h5 className={`fw-bold mb-4 ${textColor}`}>Change Password</h5>

            {error && (
                <div className="alert py-2 small fw-bold border-0 rounded-3 mb-3"
                     style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                    <i className="bi bi-exclamation-triangle me-2"></i>{error}
                </div>
            )}

            <form onSubmit={handleSave}>
                <div className="mb-3">
                    <label className={`small fw-bold mb-1 ${textColor}`}>New Password</label>
                    <div className="input-group">
                        <input type={showPw ? "text" : "password"}
                               className="form-control shadow-none border-end-0"
                               value={newPw} onChange={e => setNewPw(e.target.value)}
                               style={inputStyle} placeholder="Enter new password" />
                        <button type="button" className="input-group-text bg-transparent"
                                style={{ borderColor, cursor: 'pointer' }}
                                onClick={() => setShowPw(!showPw)}>
                            <i className={`bi ${showPw ? 'bi-eye-slash' : 'bi-eye'} text-muted`}></i>
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <label className={`small fw-bold mb-1 ${textColor}`}>Confirm New Password</label>
                    <input type="password" className="form-control shadow-none"
                           value={confirmPw} onChange={e => setConfirm(e.target.value)}
                           style={inputStyle} placeholder="Confirm new password" />
                </div>
                <button type="submit" disabled={isLoading}
                        className="btn btn-primary px-4 py-2 fw-bold rounded-3">
                    {isLoading
                        ? <span className="spinner-border spinner-border-sm" role="status"></span>
                        : <><i className="bi bi-check-lg me-1"></i>Update Password</>}
                </button>
            </form>
        </div>
    );
};

// ─── Delete Account Modal ──────────────────────────────────────────────────────
const DeleteAccountModal = ({ isDarkMode, onClose, onConfirmed }) => {
    const [typed, setTyped]     = useState('');
    const [isLoading, setLoading] = useState(false);

    const cardBg    = isDarkMode ? '#212530' : '#ffffff';
    const textColor = isDarkMode ? '#ffffff' : '#212529';
    const borderColor = isDarkMode ? '#3a3f50' : '#dee2e6';
    const inputBg   = isDarkMode ? '#0f1116' : '#ffffff';
    const canDelete = typed === 'DELETE';

    const handleDelete = async () => {
        setLoading(true);
        try {
            await onConfirmed();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1050, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div onClick={e => e.stopPropagation()}
                 style={{ backgroundColor: cardBg, border: '1px solid #dc3545', borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: '440px', boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}>
                <div className="text-center mb-4">
                    <div className="d-inline-flex align-items-center justify-content-center mb-3"
                         style={{ width: '64px', height: '64px', backgroundColor: 'rgba(220,53,69,0.15)', borderRadius: '50%' }}>
                        <i className="bi bi-exclamation-triangle-fill text-danger fs-2"></i>
                    </div>
                    <h5 className="fw-bold mb-2" style={{ color: textColor }}>Delete Account</h5>
                    <p className="small mb-3" style={{ color: isDarkMode ? '#9ca3af' : '#6c757d' }}>
                        This will <strong>permanently delete</strong> your account and all your URLs. This action cannot be undone.
                    </p>
                    <p className="small fw-bold mb-2" style={{ color: textColor }}>Type <code style={{ color: '#ef4444' }}>DELETE</code> to confirm:</p>
                    <input type="text" className="form-control shadow-none text-center fw-bold"
                           value={typed} onChange={e => setTyped(e.target.value)}
                           style={{ backgroundColor: inputBg, color: textColor, borderColor: typed ? (canDelete ? '#22c55e' : '#ef4444') : borderColor }}
                           placeholder="DELETE" />
                </div>
                <div className="d-flex gap-2">
                    <button onClick={onClose} className="btn btn-secondary flex-grow-1 py-2 fw-bold rounded-3">Cancel</button>
                    <button onClick={handleDelete} disabled={!canDelete || isLoading}
                            className="btn btn-danger flex-grow-1 py-2 fw-bold rounded-3">
                        {isLoading ? <span className="spinner-border spinner-border-sm" role="status"></span> : <><i className="bi bi-trash3 me-1"></i>Delete Account</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

// ─── Danger Zone ───────────────────────────────────────────────────────────────
const DangerZone = ({ isDarkMode, cardBg, onDeleteAccount }) => (
    <div className="p-4 rounded-4" style={{ backgroundColor: cardBg, border: '1px solid #dc3545' }}>
        <h5 className="fw-bold mb-2 text-danger">Danger Zone</h5>
        <p className="small mb-4" style={{ color: isDarkMode ? '#9ca3af' : '#6c757d' }}>
            Once you delete your account, all your data and short URLs will be permanently removed.
        </p>
        <button className="btn btn-danger px-4 fw-bold rounded-3" onClick={onDeleteAccount}>
            <i className="bi bi-trash3 me-2"></i>Delete My Account
        </button>
    </div>
);

// ─── Main Settings Page ────────────────────────────────────────────────────────
const Settings = ({ isDarkMode }) => {
    const { logout } = useAuth();
    const navigate   = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const textColor   = isDarkMode ? 'text-white' : 'text-dark';
    const cardBg      = isDarkMode ? '#212530' : '#ffffff';
    const borderColor = isDarkMode ? '#3a3f50' : '#dee2e6';
    const mutedText   = isDarkMode ? '#9ca3af' : '#6c757d';

    const handleDeleteAccount = async () => {
        try {
            await deleteCurrentUser();
            toast.success('Account deleted. Goodbye!');
            logout();
            navigate('/');
        } catch (err) {
            toast.error(err?.response?.data?.detail || 'Failed to delete account.');
            throw err;
        }
    };

    return (
        <div className="w-100">
            <div className="row">
                <div className="col-12 col-xl-8 mx-auto">
                    <h2 className={`fw-bold mb-4 ${textColor}`}>Settings</h2>

                    <ChangePasswordCard
                        isDarkMode={isDarkMode}
                        textColor={textColor}
                        cardBg={cardBg}
                        borderColor={borderColor}
                        mutedText={mutedText}
                    />

                    <DangerZone
                        isDarkMode={isDarkMode}
                        cardBg={cardBg}
                        onDeleteAccount={() => setShowDeleteModal(true)}
                    />
                </div>
            </div>

            {showDeleteModal && (
                <DeleteAccountModal
                    isDarkMode={isDarkMode}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirmed={handleDeleteAccount}
                />
            )}
        </div>
    );
};

export default Settings;