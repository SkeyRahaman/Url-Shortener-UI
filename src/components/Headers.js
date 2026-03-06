import React from "react";

// --- Sub-Component: Mobile Navbar ---
export const MobileNavbar = ({ isDarkMode, onNavigate }) => {
    const themeBg = isDarkMode ? '#212530' : '#ffffff';
    const textColor = isDarkMode ? 'text-white' : 'text-dark';
    const borderColor = isDarkMode ? 'border-secondary' : 'border-light';

    const handleLinkClick = (e, page) => {
        e.preventDefault();
        onNavigate(page);
    };

    return (
        <nav className={`navbar d-lg-none px-3 py-3 border-bottom ${borderColor}`} style={{ backgroundColor: themeBg }}>
            <div className="container-fluid p-0">
                <button 
                    className={`navbar-toggler border-0 shadow-none ${textColor}`} 
                    type="button" 
                    data-bs-toggle="offcanvas" 
                    data-bs-target="#sidebarMenu" 
                    aria-controls="sidebarMenu"
                >
                    <i className="bi bi-list fs-1"></i>
                </button>
                <button 
                    className={`navbar-brand fw-bold mx-auto border-0 bg-transparent ${textColor}`} 
                    onClick={(e) => handleLinkClick(e, 'dashboard')}
                >
                    <span className="text-primary">URL</span> Shortener
                </button>
                
                <div className="d-flex align-items-center gap-3">
                    <div className="dropdown">
                        <button 
                            className={`d-flex align-items-center border-0 bg-transparent text-decoration-none ${textColor}`} 
                            data-bs-toggle="dropdown" 
                            aria-expanded="false"
                        >
                            <img src="https://ui-avatars.com/api/?name=MD+Shakib&background=random" alt="User" width="35" height="35" className="rounded-circle" />
                        </button>
                        <ul className={`dropdown-menu dropdown-menu-end text-small shadow position-absolute ${isDarkMode ? 'dropdown-menu-dark' : ''}`}>
                            <li>
                                <button className="dropdown-item border-0 bg-transparent" onClick={(e) => handleLinkClick(e, 'profile')}>
                                    Profile
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item border-0 bg-transparent" onClick={(e) => handleLinkClick(e, 'settings')}>
                                    Settings
                                </button>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item border-0 bg-transparent text-danger">Sign out</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

// --- Sub-Component: Desktop Header ---
export const DesktopHeader = ({ toggleSidebar, isDarkMode, toggleTheme, activePage, onNavigate }) => {
    const themeBg = isDarkMode ? '#1a1d24' : '#ffffff';
    const textColor = isDarkMode ? 'text-white' : 'text-dark';
    const borderColor = isDarkMode ? 'border-secondary' : 'border-light';

    const pageTitle = activePage.charAt(0).toUpperCase() + activePage.slice(1);

    const handleLinkClick = (e, page) => {
        e.preventDefault();
        onNavigate(page);
    };

    return (
        <header className={`d-none d-lg-flex justify-content-between align-items-center p-4 border-bottom ${borderColor}`} style={{ backgroundColor: themeBg }}>
            <div className="d-flex align-items-center gap-3">
                <button className={`navbar-toggler border-0 shadow-none p-0 fs-3 d-none d-lg-block ${textColor}`} type="button" onClick={toggleSidebar}>
                    <i className="bi bi-list"></i>
                </button>
                <h4 className={`mb-0 fw-bold ${textColor}`}>{pageTitle}</h4>
            </div>
            
            <div className="d-flex align-items-center gap-4">
                <button onClick={toggleTheme} className={`btn btn-link p-0 shadow-none ${textColor}`} title="Toggle Theme">
                    <i className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon-stars'} fs-5`}></i>
                </button>
                <button className={`btn btn-link p-0 shadow-none ${textColor} fs-5`}><i className="bi bi-bell"></i></button>
                <div className="dropdown">
                    <button 
                        className={`d-flex align-items-center border-0 bg-transparent text-decoration-none dropdown-toggle ${textColor}`} 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                    >
                        <img src="https://ui-avatars.com/api/?name=MD+Shakib&background=random" alt="User" width="32" height="32" className="rounded-circle me-2" />
                        <span className="fs-6">MD Shakib</span>
                    </button>
                    <ul className={`dropdown-menu ${isDarkMode ? 'dropdown-menu-dark' : ''} text-small shadow`}>
                        <li>
                            <button className="dropdown-item border-0 bg-transparent" onClick={(e) => handleLinkClick(e, 'profile')}>
                                Profile
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item border-0 bg-transparent" onClick={(e) => handleLinkClick(e, 'settings')}>
                                Settings
                            </button>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item border-0 bg-transparent text-danger">Sign out</button></li>
                    </ul>
                </div>
            </div>
        </header>
    );
};