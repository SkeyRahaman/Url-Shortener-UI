import React, { useState } from 'react';

const DeleteConfirmModal = ({ isDarkMode, urlItem, onConfirm, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);

    const cardBg    = isDarkMode ? '#212530' : '#ffffff';
    const textColor = isDarkMode ? '#ffffff' : '#212529';
    const borderColor = isDarkMode ? '#3a3f50' : '#dee2e6';
    const mutedText = isDarkMode ? '#9ca3af' : '#6c757d';

    if (!urlItem) return null;

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            await onConfirm(urlItem.short_url);
            onClose();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0, zIndex: 1050,
                backgroundColor: 'rgba(0,0,0,0.65)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '1rem',
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    backgroundColor: cardBg,
                    border: '1px solid #dc3545',
                    borderRadius: '20px',
                    padding: '2rem',
                    width: '100%',
                    maxWidth: '440px',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                }}
            >
                <div className="text-center mb-4">
                    <div className="d-inline-flex align-items-center justify-content-center mb-3"
                         style={{ width: '60px', height: '60px', backgroundColor: 'rgba(220,53,69,0.1)', borderRadius: '50%' }}>
                        <i className="bi bi-trash3 text-danger fs-3"></i>
                    </div>
                    <h5 className="fw-bold mb-2" style={{ color: textColor }}>Delete Short URL?</h5>
                    <p className="small mb-1" style={{ color: mutedText }}>
                        This will permanently delete:
                    </p>
                    <code className="small d-block px-3 py-2 rounded-3 mb-1"
                          style={{ backgroundColor: isDarkMode ? '#0f1116' : '#f8f9fa', color: '#3b82f6', wordBreak: 'break-all' }}>
                        {urlItem.short_url}
                    </code>
                    <p className="small mb-0" style={{ color: mutedText }}>This action cannot be undone.</p>
                </div>

                <div className="d-flex gap-2">
                    <button onClick={onClose}
                            className="btn btn-secondary flex-grow-1 py-2 fw-bold rounded-3">
                        Cancel
                    </button>
                    <button onClick={handleConfirm} disabled={isLoading}
                            className="btn btn-danger flex-grow-1 py-2 fw-bold rounded-3">
                        {isLoading
                            ? <span className="spinner-border spinner-border-sm" role="status"></span>
                            : <><i className="bi bi-trash3 me-1"></i>Delete</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
