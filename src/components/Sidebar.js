import React from "react";
import { Link, useLocation } from "react-router-dom";

const LoginLogoutButton = ({isLogin}) => {
    if (isLogin){
        return (
            <Link to="/" className="nav-link rounded-3 text-danger">
                            <i className="bi bi-box-arrow-right me-2"></i> Logout
            </Link>
        )
    } else {
        return (
            <Link to="/Register" className="nav-link rounded-3 text-danger">
                            <i className="bi bi-box-arrow-right me-2"></i> Register
            </Link>
        )
    }
}

const Sidebar = ({ isOpen, isDarkMode, toggleTheme, isLogin }) => {
    const location = useLocation();
    
    // Helper to check if the link is active based on the current URL
    const isActive = (path) => location.pathname === path;

    const textColor = isDarkMode ? 'text-white' : 'text-dark';
    const sidebarBg = isDarkMode ? '#212530' : '#ffffff';
    const sidebarBorder = isDarkMode ? '#495057' : '#dee2e6';

    return (
        <div 
            className={`offcanvas-lg offcanvas-start d-flex flex-column flex-shrink-0 p-3 sidebar-transition custom-mobile-anim ${isOpen ? 'sidebar-visible' : 'sidebar-hidden'}`} 
            tabIndex="-1" 
            id="sidebarMenu"
            data-bs-theme={isDarkMode ? 'dark' : 'light'}
            style={{ 
                backgroundColor: sidebarBg, 
                borderRight: `1px solid ${sidebarBorder}`,
                transition: 'background-color 0.3s ease' 
            }}
        >
            {/* Mobile Header (Hidden on Desktop) */}
            <div className="offcanvas-header d-lg-none">
                <h5 className={`offcanvas-title fw-bold ${textColor}`}>
                    <i className="bi bi-link-45deg text-primary fs-4"></i> URL Shortener
                </h5>
                <button type="button" className="btn-close shadow-none" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body d-flex flex-column h-100 p-0 p-lg-2 mt-lg-0 mt-3">
                {/* Desktop Logo (Hidden on Mobile) */}
                <Link to="/" className={`d-none d-lg-flex align-items-center mb-4 text-decoration-none ${textColor}`}>
                    <i className="bi bi-link-45deg text-primary fs-3 me-2"></i>
                    <span className="fs-5 fw-bold">URL Shortener</span>
                </Link>

                {/* Navigation Links */}
                <ul className="nav nav-pills flex-column mb-auto gap-2">
                    <li className="nav-item">
                        <Link 
                            to="/" 
                            className={`nav-link rounded-3 ${isActive('/dashboard') ? 'active' : ''}`}
                        >
                            <i className="bi bi-house-door me-2"></i> Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            to="/about" 
                            className={`nav-link rounded-3 ${isActive('/about') ? 'active' : ''}`}
                        >
                            <i className="bi bi-info-circle me-2"></i> About
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            to="/profile" 
                            className={`nav-link rounded-3 ${isActive('/profile') ? 'active' : ''}`}
                        >
                            <i className="bi bi-person me-2"></i> Profile
                        </Link>
                    </li>
                    <li>
                        <LoginLogoutButton isLogin={isLogin} />
                    </li>
                </ul>

                {/* Sidebar Footer */}
                <div className="mt-auto">
                    <div className={`form-check form-switch d-lg-none mb-4 ${textColor}`}>
                        <input 
                            className="form-check-input shadow-none" 
                            type="checkbox" 
                            role="switch" 
                            id="mobileThemeSwitch" 
                            checked={isDarkMode} 
                            onChange={toggleTheme} 
                            style={{ cursor: 'pointer' }} 
                        />
                        <label className="form-check-label ms-2 fw-bold" htmlFor="mobileThemeSwitch" style={{ cursor: 'pointer' }}>
                            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                        </label>
                    </div>
                    <button className="btn btn-primary w-100 rounded-3 py-2">
                        <i className="bi bi-plus-lg"></i> Create New URL
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;