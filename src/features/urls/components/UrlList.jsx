import React from "react";

const UrlList = ({ isDarkMode }) => {
    // Dynamic theme colors
    const textColor = isDarkMode ? 'text-white' : 'text-dark';
    const cardBg = isDarkMode ? '#212530' : '#ffffff';
    const headerBg = isDarkMode ? '#2c303b' : '#e9ecef';
    const borderColor = isDarkMode ? '#3a3f50' : '#dee2e6';
    const hoverBg = isDarkMode ? '#2a2e3a' : '#f8f9fa';
    const mutedText = isDarkMode ? '#9ca3af' : '#6c757d';

    const dummyUrls = [
        { id: 1, short: 'short.ly/xyz123', original: 'https://www.example.com/very/long/path/to/resource', created: '12 hours ago', mobileCreated: 'Dec 2021' },
        { id: 2, short: 'short.ly/abc987', original: 'https://www.google.com/search?q=url+shortener+design+inspiration', created: '2 days ago', mobileCreated: 'Jan 2022' },
        { id: 3, short: 'short.ly/qwe456', original: 'https://github.com/mdshakib/url-shortener-app/commits/main', created: '1 week ago', mobileCreated: 'Feb 2022' },
    ];

    return (
        <div className="w-100">
            <style>{`
                .short-link-text { color: #3b82f6; }
                .action-icon { cursor: pointer; transition: color 0.2s ease; }
                .action-icon:hover { color: #3b82f6 !important; }

                /* Desktop Only */
                @media (min-width: 768px) {
                    .truncate-md { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                    .desktop-header { border: 1px solid ${borderColor}; border-radius: 12px 12px 0 0; background-color: ${headerBg}; }
                    .url-list-container { border: 1px solid ${borderColor}; border-top: none; border-radius: 0 0 12px 12px; background-color: ${cardBg}; }
                    .url-row { border-bottom: 1px solid ${borderColor}; transition: background-color 0.2s ease; }
                    .url-row:last-child { border-bottom: none; }
                    .url-row:hover { background-color: ${hoverBg}; }
                    
                    /* This strictly forces the line to hide on desktop */
                    .mobile-action-separator { border-top: none !important; } 
                }

                /* Mobile Only */
                @media (max-width: 767px) {
                    .desktop-header { display: none !important; }
                    .url-row { background-color: ${cardBg}; border: 1px solid ${borderColor} !important; border-radius: 12px; margin-bottom: 16px; padding: 16px !important; }
                    .short-link-text { color: ${isDarkMode ? '#ffffff' : '#000000'}; font-size: 1.1rem; }
                    .original-link-text { font-size: 0.85rem; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
                    
                    /* This adds the line back on mobile */
                    .mobile-action-separator { border-top: 1px solid ${borderColor}; margin-top: 1rem; padding-top: 1rem; }
                }
            `}</style>

            <h5 className={`fw-bold mb-4 ${textColor}`}>
                <span className="d-none d-md-inline">My Shortened URLs</span>
                <span className="d-md-none">My URLs</span>
            </h5>

            <div className={`desktop-header d-flex align-items-center p-3 ${textColor}`}>
                <div className="col-5 fw-bold small">Original URL</div>
                <div className="col-3 fw-bold small">Short URL</div>
                <div className="col-2 fw-bold small">Created</div>
                <div className="col-2 fw-bold small text-center">Actions</div>
            </div>

            <div className="url-list-container">
                {dummyUrls.map((item) => (
                    <div key={item.id} className={`d-flex flex-column flex-md-row align-items-md-center py-3 px-2 px-md-3 url-row ${textColor}`}>
                        
                        <div className="col-12 col-md-5 order-2 order-md-1 pe-md-4 original-link-text truncate-md" style={{ color: mutedText }}>
                            {item.original}
                        </div>

                        <div className="col-12 col-md-3 order-1 order-md-2 mb-1 mb-md-0">
                            <span className="fw-bold short-link-text">{item.short}</span>
                        </div>

                        {/* Updated this div to use the new mobile-action-separator class */}
                        <div className="col-12 col-md-4 order-3 mobile-action-separator">
                            <div className="row align-items-center m-0">
                                
                                <div className="col-6 col-md-6 p-0 small" style={{ color: mutedText }}>
                                    <span className="d-md-none">Created {item.mobileCreated}</span>
                                    <span className="d-none d-md-inline">{item.created}</span>
                                </div>
                                
                                <div className="col-6 col-md-6 p-0 text-end text-md-center fs-6" style={{ color: mutedText }}>
                                    <i className="bi bi-pencil action-icon ms-0"></i>
                                    <i className="bi bi-trash action-icon ms-3"></i>
                                    <i className="bi bi-info-circle action-icon ms-3"></i>
                                </div>

                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default UrlList;