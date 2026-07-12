import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthProvider";

const Sidebar = ({ isOpen, isDarkMode, toggleTheme }) => {
    const { isLogin, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const handleNav = (path) => {
        navigate(path);
        const sidebarElement = document.getElementById('sidebarMenu');
        if (sidebarElement) {
            const closeBtn = sidebarElement.querySelector('.btn-close');
            if (closeBtn && window.getComputedStyle(sidebarElement).visibility !== 'hidden') {
                closeBtn.click();
            }
        }
    };

    const handleLogout = () => {
        logout();
        handleNav('/');
    };

    const textColor   = isDarkMode ? 'text-white' : 'text-dark';
    const sidebarBg   = isDarkMode ? '#212530' : '#ffffff';
    const sidebarBorder = isDarkMode ? '#495057' : '#dee2e6';

    return (
        <div
            className={`offcanvas-lg offcanvas-start d-flex flex-column flex-shrink-0 p-3 sidebar-transition custom-mobile-anim ${isOpen ? 'sidebar-visible' : 'sidebar-hidden'}`}
            tabIndex="-1"
            id="sidebarMenu"
            data-bs-theme={isDarkMode ? 'dark' : 'light'}
            style={{ backgroundColor: sidebarBg, borderRight: `1px solid ${sidebarBorder}`, transition: 'background-color 0.3s ease' }}
        >
            <div className="offcanvas-header d-lg-none">
                <h5 className={`offcanvas-title fw-bold ${textColor}`}>
                    <i className="bi bi-link-45deg text-primary fs-4"></i> URL Shortener
                </h5>
                <button type="button" className="btn-close shadow-none" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body d-flex flex-column h-100 p-0 p-lg-2 mt-lg-0 mt-3">
                <div onClick={() => handleNav('/')} style={{ cursor: 'pointer' }}
                     className={`d-none d-lg-flex align-items-center mb-4 text-decoration-none ${textColor}`}>
                    <i className="bi bi-link-45deg text-primary fs-3 me-2"></i>
                    <span className="fs-5 fw-bold">URL Shortener</span>
                </div>

                <ul className="nav nav-pills flex-column mb-auto gap-2">
                    <li className="nav-item">
                        <button onClick={() => handleNav('/')}
                                className={`nav-link w-100 text-start rounded-3 border-0 bg-transparent ${isActive('/') ? 'active' : ''}`}>
                            <i className="bi bi-house-door me-2"></i>Dashboard
                        </button>
                    </li>
                    <li className="nav-item">
                        <button onClick={() => handleNav('/about')}
                                className={`nav-link w-100 text-start rounded-3 border-0 bg-transparent ${isActive('/about') ? 'active' : ''}`}>
                            <i className="bi bi-info-circle me-2"></i>About
                        </button>
                    </li>

                    {isLogin && (
                        <>
                            <li className="nav-item">
                                <button onClick={() => handleNav('/profile')}
                                        className={`nav-link w-100 text-start rounded-3 border-0 bg-transparent ${isActive('/profile') ? 'active' : ''}`}>
                                    <i className="bi bi-person me-2"></i>Profile
                                </button>
                            </li>
                            <li className="nav-item">
                                <button onClick={() => handleNav('/settings')}
                                        className={`nav-link w-100 text-start rounded-3 border-0 bg-transparent ${isActive('/settings') ? 'active' : ''}`}>
                                    <i className="bi bi-gear me-2"></i>Settings
                                </button>
                            </li>
                        </>
                    )}

                    <li>
                        {isLogin ? (
                            <button onClick={handleLogout}
                                    className="nav-link rounded-3 text-danger border-0 bg-transparent w-100 text-start shadow-none">
                                <i className="bi bi-box-arrow-right me-2"></i>Logout
                            </button>
                        ) : (
                            <button onClick={() => handleNav('/register')}
                                    className="nav-link rounded-3 text-primary border-0 bg-transparent w-100 text-start">
                                <i className="bi bi-person-plus me-2"></i>Register
                            </button>
                        )}
                    </li>
                </ul>

                <div className="mt-auto">
                    <div className={`form-check form-switch d-lg-none mb-4 ${textColor}`}>
                        <input className="form-check-input shadow-none" type="checkbox" role="switch"
                               id="mobileThemeSwitch" checked={isDarkMode} onChange={toggleTheme}
                               style={{ cursor: 'pointer' }} />
                        <label className="form-check-label ms-2 fw-bold" htmlFor="mobileThemeSwitch" style={{ cursor: 'pointer' }}>
                            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                        </label>
                    </div>

                    {isLogin && (
                        <button className="btn btn-primary w-100 rounded-3 py-2"
                                onClick={() => handleNav('/')}>
                            <i className="bi bi-plus-lg me-1"></i>Create New URL
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;