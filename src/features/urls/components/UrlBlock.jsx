import React, { useState } from 'react';
import toast from 'react-hot-toast';

const UrlBlock = ({ isDarkMode, onUrlCreated }) => {
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);   // holds { short_url, long_url } on success

    const containerBg = isDarkMode ? '#1a1d24' : '#ffffff';
    const inputBg     = isDarkMode ? '#212530' : '#f4f6f9';
    const textColor   = isDarkMode ? 'text-white' : 'text-dark';
    const placeholderColor = isDarkMode ? '#9ca3af' : '#6c757d';
    const borderColor = isDarkMode ? '#3a3f50' : '#dee2e6';

    const glowStyle = {
        backgroundColor: containerBg,
        border: '2px solid #3b82f6',
        boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)',
    };

    const inputStyle = {
        backgroundColor: inputBg,
        borderRadius: '8px',
        border: `1px solid ${borderColor}`,
        color: isDarkMode ? '#fff' : '#212529',
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url.trim()) return;
        setIsLoading(true);
        setResult(null);
        try {
            const data = await onUrlCreated(url.trim(), description.trim());
            setResult(data);
            setUrl('');
            setDescription('');
            toast.success('URL shortened successfully!');
        } catch (err) {
            const msg = err?.response?.data?.detail || 'Failed to shorten URL.';
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
        navigator.clipboard.writeText(`${baseUrl}/${result.short_url}`);
        toast.success('Copied to clipboard!');
    };

    return (
        <div className="w-100 p-3 p-md-4 rounded-4 mb-5" style={glowStyle}>
            <style>{`
                .url-input::placeholder { color: ${placeholderColor} !important; opacity: 1; }
                .desc-input::placeholder { color: ${placeholderColor} !important; opacity: 1; }
            `}</style>

            {/* ── Result Banner ── */}
            {result && (
                <div className="d-flex align-items-center justify-content-between gap-3 mb-3 px-3 py-2 rounded-3"
                     style={{ backgroundColor: isDarkMode ? '#0d1117' : '#f0fdf4', border: '1px solid #22c55e' }}>
                    <div style={{ minWidth: 0 }}>
                        <div className="small fw-bold mb-1" style={{ color: '#22c55e' }}>
                            <i className="bi bi-check-circle me-1"></i>Short URL ready!
                        </div>
                        <span className="fw-bold" style={{ color: '#3b82f6', fontSize: '0.95rem', wordBreak: 'break-all' }}>
                            {import.meta.env.VITE_API_BASE_URL}/{result.short_url}
                        </span>
                    </div>
                    <button onClick={handleCopy}
                            className="btn btn-outline-success btn-sm fw-bold rounded-3 flex-shrink-0"
                            title="Copy to clipboard">
                        <i className="bi bi-clipboard me-1"></i>Copy
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <div className="d-flex flex-column flex-md-row gap-3 align-items-center">
                    <input
                        type="url"
                        id="url-input"
                        required
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        className={`form-control flex-grow-1 border-0 shadow-none fs-5 px-3 url-input ${textColor}`}
                        placeholder="Enter long URL to shorten..."
                        style={{ minHeight: '50px', ...inputStyle }}
                    />
                    <button
                        type="submit"
                        id="shorten-btn"
                        disabled={isLoading}
                        className="btn btn-primary fw-bold rounded-3 px-4 py-3 py-md-2 w-100 w-md-auto d-flex align-items-center justify-content-center gap-2"
                        style={{ backgroundColor: '#3b82f6', border: 'none', minWidth: '130px' }}
                    >
                        {isLoading
                            ? <span className="spinner-border spinner-border-sm" role="status"></span>
                            : <><i className="bi bi-scissors me-1"></i>Shorten</>}
                    </button>
                </div>

                <input
                    type="text"
                    id="description-input"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className={`form-control border-0 shadow-none px-3 desc-input ${textColor}`}
                    placeholder="Description (optional)..."
                    style={{ ...inputStyle, fontSize: '0.9rem' }}
                />
            </form>
        </div>
    );
};

export default UrlBlock;