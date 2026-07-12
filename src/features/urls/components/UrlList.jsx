import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useUrls } from '../hooks/useUrls';
import EditUrlModal from './EditUrlModal';
import UrlDetailsModal from './UrlDetailsModal';
import DeleteConfirmModal from './DeleteConfirmModal';

// ─── Skeleton Row ─────────────────────────────────────────────────────────────
const SkeletonRow = ({ isDarkMode }) => {
    const pulse = isDarkMode ? '#2c303b' : '#e9ecef';
    return (
        <div className="d-flex flex-column flex-md-row align-items-md-center py-3 px-3 url-row">
            {[5, 3, 4].map((col, i) => (
                <div key={i} className={`col-12 col-md-${col} pe-md-4 mb-2 mb-md-0`}>
                    <div style={{ height: '16px', borderRadius: '6px', backgroundColor: pulse, animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                </div>
            ))}
        </div>
    );
};

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = ({ textColor, mutedText }) => (
    <div className="text-center py-5">
        <i className="bi bi-link-45deg" style={{ fontSize: '3rem', color: '#3b82f6', opacity: 0.5 }}></i>
        <h6 className={`fw-bold mt-3 mb-1 ${textColor}`}>No URLs yet</h6>
        <p className="small mb-0" style={{ color: mutedText }}>
            Paste a long URL above and click <strong>Shorten</strong> to get started.
        </p>
    </div>
);

// ─── Error State ──────────────────────────────────────────────────────────────
const ErrorState = ({ message, onRetry, textColor }) => (
    <div className="text-center py-5">
        <i className="bi bi-wifi-off" style={{ fontSize: '2.5rem', color: '#ef4444', opacity: 0.6 }}></i>
        <p className={`small mt-3 mb-3 ${textColor}`}>{message}</p>
        <button onClick={onRetry} className="btn btn-outline-primary btn-sm rounded-3 fw-bold">
            <i className="bi bi-arrow-clockwise me-1"></i>Retry
        </button>
    </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const UrlList = ({ isDarkMode }) => {
    const textColor   = isDarkMode ? 'text-white' : 'text-dark';
    const cardBg      = isDarkMode ? '#212530' : '#ffffff';
    const headerBg    = isDarkMode ? '#2c303b' : '#e9ecef';
    const borderColor = isDarkMode ? '#3a3f50' : '#dee2e6';
    const hoverBg     = isDarkMode ? '#2a2e3a' : '#f8f9fa';
    const mutedText   = isDarkMode ? '#9ca3af' : '#6c757d';

    const { urls, isLoading, error, hasMore, fetchUrls, editUrl, removeUrl, fetchDetails, loadMore } = useUrls();

    const [editTarget,   setEditTarget]   = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [detailsData,  setDetailsData]  = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(false);

    useEffect(() => {
        fetchUrls(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = async (shortUrl, data) => {
        try {
            await editUrl(shortUrl, data);
            toast.success('URL updated!');
        } catch (err) {
            const msg = err?.response?.data?.detail || 'Failed to update URL.';
            toast.error(msg);
            throw err;
        }
    };

    const handleDelete = async (shortUrl) => {
        try {
            await removeUrl(shortUrl);
            toast.success('URL deleted.');
        } catch (err) {
            toast.error('Failed to delete URL.');
            throw err;
        }
    };

    const handleDetails = async (shortUrl) => {
        setDetailsLoading(true);
        try {
            const data = await fetchDetails(shortUrl);
            setDetailsData(data);
        } catch {
            toast.error('Could not load URL details.');
        } finally {
            setDetailsLoading(false);
        }
    };

    const handleCopy = (shortUrl) => {
        const base = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
        navigator.clipboard.writeText(`${base}/urls/${shortUrl}`);
        toast.success('Copied to clipboard!');
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        return new Date(dateStr).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <>
            <style>{`
                @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
                .short-link-text { color: #3b82f6; }
                .action-icon { cursor: pointer; transition: color 0.2s ease, transform 0.15s ease; }
                .action-icon:hover { color: #3b82f6 !important; transform: scale(1.2); }
                @media (min-width: 768px) {
                    .truncate-md { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                    .desktop-header { border: 1px solid ${borderColor}; border-radius: 12px 12px 0 0; background-color: ${headerBg}; }
                    .url-list-container { border: 1px solid ${borderColor}; border-top: none; border-radius: 0 0 12px 12px; background-color: ${cardBg}; }
                    .url-row { border-bottom: 1px solid ${borderColor}; transition: background-color 0.2s ease; }
                    .url-row:last-child { border-bottom: none; }
                    .url-row:hover { background-color: ${hoverBg}; }
                    .mobile-action-separator { border-top: none !important; }
                }
                @media (max-width: 767px) {
                    .desktop-header { display: none !important; }
                    .url-row { background-color: ${cardBg}; border: 1px solid ${borderColor} !important; border-radius: 12px; margin-bottom: 16px; padding: 16px !important; }
                    .short-link-text { color: ${isDarkMode ? '#ffffff' : '#000000'}; font-size: 1.1rem; }
                    .original-link-text { font-size: 0.85rem; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
                    .mobile-action-separator { border-top: 1px solid ${borderColor}; margin-top: 1rem; padding-top: 1rem; }
                }
            `}</style>

            <div className="w-100">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h5 className={`fw-bold mb-0 ${textColor}`}>
                        <span className="d-none d-md-inline">My Shortened URLs</span>
                        <span className="d-md-none">My URLs</span>
                    </h5>
                    {!isLoading && (
                        <button onClick={() => fetchUrls(true)}
                                className="btn btn-link btn-sm p-0 shadow-none"
                                style={{ color: mutedText }} title="Refresh">
                            <i className="bi bi-arrow-clockwise"></i>
                        </button>
                    )}
                </div>

                <div className="desktop-header d-flex align-items-center p-3">
                    <div className={`col-5 fw-bold small ${textColor}`}>Original URL</div>
                    <div className={`col-3 fw-bold small ${textColor}`}>Short URL</div>
                    <div className={`col-2 fw-bold small ${textColor}`}>Created</div>
                    <div className={`col-2 fw-bold small text-center ${textColor}`}>Actions</div>
                </div>

                <div className="url-list-container">
                    {/* Loading skeletons */}
                    {isLoading && urls.length === 0 && (
                        [1, 2, 3].map(i => <SkeletonRow key={i} isDarkMode={isDarkMode} />)
                    )}

                    {/* Error state */}
                    {error && !isLoading && (
                        <ErrorState message={error} onRetry={() => fetchUrls(true)} textColor={textColor} />
                    )}

                    {/* Empty state */}
                    {!isLoading && !error && urls.length === 0 && (
                        <EmptyState textColor={textColor} mutedText={mutedText} />
                    )}

                    {/* URL rows */}
                    {urls.map((item) => (
                        <div key={item.short_url}
                             className={`d-flex flex-column flex-md-row align-items-md-center py-3 px-2 px-md-3 url-row ${textColor}`}>

                            <div className="col-12 col-md-5 order-2 order-md-1 pe-md-4">
                                <div className="text-truncate original-link-text" style={{ color: isDarkMode ? '#ffffff' : '#212529', fontWeight: '500' }}>
                                    {item.long_url}
                                </div>
                                {item.description && (
                                    <div className="small text-truncate mt-1 text-muted" style={{ fontSize: '0.78rem' }} title={item.description}>
                                        {item.description}
                                    </div>
                                )}
                            </div>

                            <div className="col-12 col-md-3 order-1 order-md-2 mb-1 mb-md-0 d-flex align-items-center gap-2">
                                <a 
                                    href={`${(import.meta.env.VITE_API_BASE_URL || 'https://url-shortner-ergb.onrender.com').replace(/\/+$/, '')}/urls/${item.short_url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="fw-bold short-link-text text-decoration-none"
                                >
                                    {item.short_url}
                                </a>
                                <i className="bi bi-copy action-icon text-muted"
                                   style={{ fontSize: '0.85rem', cursor: 'pointer' }}
                                   title="Copy short URL"
                                   onClick={() => handleCopy(item.short_url)}></i>
                            </div>

                            <div className="col-12 col-md-4 order-3 mobile-action-separator">
                                <div className="row align-items-center m-0">
                                    <div className="col-6 p-0 small" style={{ color: mutedText }}>
                                        {formatDate(item.created_at)}
                                    </div>
                                    <div className="col-6 p-0 text-end text-md-center fs-6 d-flex align-items-center justify-content-end justify-content-md-center gap-2"
                                         style={{ color: mutedText }}>
                                        <i className="bi bi-clipboard action-icon"
                                           title="Copy link"
                                           onClick={() => handleCopy(item.short_url)}></i>
                                        <i className="bi bi-pencil action-icon"
                                           title="Edit"
                                           onClick={() => setEditTarget(item)}></i>
                                        <i className="bi bi-trash action-icon"
                                           title="Delete"
                                           onClick={() => setDeleteTarget(item)}></i>
                                        <i className={`bi ${detailsLoading ? 'bi-arrow-repeat' : 'bi-info-circle'} action-icon`}
                                           title="Details"
                                           onClick={() => handleDetails(item.short_url)}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Load more */}
                    {hasMore && !isLoading && urls.length > 0 && (
                        <div className="text-center py-3">
                            <button onClick={loadMore}
                                    className="btn btn-outline-primary btn-sm rounded-3 fw-bold px-4">
                                <i className="bi bi-chevron-down me-1"></i>Load More
                            </button>
                        </div>
                    )}

                    {/* Loading more spinner */}
                    {isLoading && urls.length > 0 && (
                        <div className="text-center py-3">
                            <span className="spinner-border spinner-border-sm text-primary" role="status"></span>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Modals ── */}
            <EditUrlModal
                isDarkMode={isDarkMode}
                urlItem={editTarget}
                onSave={handleEdit}
                onClose={() => setEditTarget(null)}
            />
            <DeleteConfirmModal
                isDarkMode={isDarkMode}
                urlItem={deleteTarget}
                onConfirm={handleDelete}
                onClose={() => setDeleteTarget(null)}
            />
            <UrlDetailsModal
                isDarkMode={isDarkMode}
                details={detailsData}
                onClose={() => setDetailsData(null)}
            />
        </>
    );
};

export default UrlList;