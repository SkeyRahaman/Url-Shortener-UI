import React, { useState, useEffect } from 'react';

const EditUrlModal = ({ isDarkMode, urlItem, onSave, onClose }) => {
    const [longUrl, setLongUrl] = useState('');
    const [description, setDescription] = useState('');
    const [customShort, setCustomShort] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const cardBg   = isDarkMode ? '#212530' : '#ffffff';
    const textColor = isDarkMode ? '#ffffff' : '#212529';
    const borderColor = isDarkMode ? '#3a3f50' : '#dee2e6';
    const inputBg  = isDarkMode ? '#0f1116' : '#ffffff';
    const overlayBg = 'rgba(0,0,0,0.65)';

    useEffect(() => {
        if (urlItem) {
            setLongUrl(urlItem.long_url || '');
            setDescription(urlItem.description || '');
            setCustomShort(urlItem.short_url || '');
            setError('');
        }
    }, [urlItem]);

    if (!urlItem) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await onSave(urlItem.short_url, {
                long_url: longUrl,
                description,
                short_url: customShort,
            });
            onClose();
        } catch (err) {
            setError(err?.response?.data?.detail || 'Failed to update URL.');
        } finally {
            setIsLoading(false);
        }
    };

    const inputStyle = {
        backgroundColor: inputBg,
        color: textColor,
        borderColor,
        fontSize: '0.93rem',
    };

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0, zIndex: 1050,
                backgroundColor: overlayBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '1rem',
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    backgroundColor: cardBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '20px',
                    padding: '2rem',
                    width: '100%',
                    maxWidth: '520px',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                }}
            >
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0" style={{ color: textColor }}>
                        <i className="bi bi-pencil-square me-2 text-primary"></i>Edit Short URL
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

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="small fw-bold mb-1" style={{ color: textColor }}>Original URL</label>
                        <input
                            type="url" required
                            className="form-control shadow-none"
                            value={longUrl}
                            onChange={e => setLongUrl(e.target.value)}
                            style={inputStyle}
                            placeholder="https://example.com/long/url"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="small fw-bold mb-1" style={{ color: textColor }}>Description</label>
                        <input
                            type="text"
                            className="form-control shadow-none"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            style={inputStyle}
                            placeholder="Optional description"
                        />
                    </div>
                    <div className="mb-4">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <label className="small fw-bold mb-0" style={{ color: textColor }}>Custom Short Code</label>
                            <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle text-uppercase fw-bold" style={{ fontSize: '0.6rem' }}>
                                Coming Soon
                            </span>
                        </div>
                        <input
                            type="text"
                            className="form-control shadow-none"
                            value={customShort}
                            disabled
                            style={{ ...inputStyle, opacity: 0.6, cursor: 'not-allowed' }}
                            placeholder="Coming Soon"
                        />
                    </div>

                    <div className="d-flex gap-2">
                        <button type="button" onClick={onClose}
                                className="btn btn-secondary flex-grow-1 py-2 fw-bold rounded-3">
                            Cancel
                        </button>
                        <button type="submit" disabled={isLoading}
                                className="btn btn-primary flex-grow-1 py-2 fw-bold rounded-3">
                            {isLoading
                                ? <span className="spinner-border spinner-border-sm" role="status"></span>
                                : <><i className="bi bi-check-lg me-1"></i>Save Changes</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUrlModal;
