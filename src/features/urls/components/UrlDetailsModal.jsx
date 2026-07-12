import React from 'react';

const UrlDetailsModal = ({ isDarkMode, details, onClose }) => {
    const cardBg    = isDarkMode ? '#212530' : '#ffffff';
    const textColor = isDarkMode ? '#ffffff' : '#212529';
    const borderColor = isDarkMode ? '#3a3f50' : '#dee2e6';
    const mutedText = isDarkMode ? '#9ca3af' : '#6c757d';
    const rowBg     = isDarkMode ? '#1a1d24' : '#f8f9fa';

    if (!details) return null;

    const rows = [
        { label: 'Short URL',     value: details.short_url,             icon: 'bi-link-45deg' },
        { label: 'Original URL',  value: details.long_url,              icon: 'bi-box-arrow-up-right', link: true },
        { label: 'Description',   value: details.description || '—',    icon: 'bi-card-text' },
        { label: 'ID',            value: details.id ?? '—',             icon: 'bi-fingerprint' },
    ];

    const copyToClipboard = () => {
        const base = import.meta.env.VITE_API_BASE_URL || '';
        navigator.clipboard.writeText(`${base}/${details.short_url}`);
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
                    border: `1px solid ${borderColor}`,
                    borderRadius: '20px',
                    padding: '2rem',
                    width: '100%',
                    maxWidth: '540px',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                }}
            >
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0" style={{ color: textColor }}>
                        <i className="bi bi-bar-chart-line me-2 text-primary"></i>URL Details
                    </h5>
                    <button onClick={onClose} className="btn btn-link p-0 shadow-none" style={{ color: textColor }}>
                        <i className="bi bi-x-lg fs-5"></i>
                    </button>
                </div>

                <div className="d-flex flex-column gap-2 mb-4">
                    {rows.map(row => (
                        <div key={row.label}
                             className="d-flex align-items-start gap-3 p-3 rounded-3"
                             style={{ backgroundColor: rowBg, border: `1px solid ${borderColor}` }}>
                            <i className={`bi ${row.icon} text-primary mt-1`} style={{ minWidth: '16px' }}></i>
                            <div style={{ minWidth: 0 }}>
                                <div className="small fw-bold mb-1" style={{ color: mutedText }}>{row.label}</div>
                                {row.link
                                    ? <a href={row.value} target="_blank" rel="noopener noreferrer"
                                         className="small text-primary text-break"
                                         style={{ wordBreak: 'break-all' }}>{row.value}</a>
                                    : <div className="small text-break" style={{ color: textColor, wordBreak: 'break-all' }}>{String(row.value)}</div>
                                }
                            </div>
                        </div>
                    ))}
                </div>

                <div className="d-flex gap-2">
                    <button onClick={copyToClipboard}
                            className="btn btn-outline-primary flex-grow-1 py-2 fw-bold rounded-3">
                        <i className="bi bi-clipboard me-1"></i>Copy Short Link
                    </button>
                    <button onClick={onClose}
                            className="btn btn-primary flex-grow-1 py-2 fw-bold rounded-3">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UrlDetailsModal;
