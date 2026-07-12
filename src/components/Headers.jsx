import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthProvider";

// ─── Mobile Navbar ─────────────────────────────────────────────────────────────
export const MobileNavbar = ({ isDarkMode }) => {
    const { isLogin, user, logout } = useAuth();
    const navigate = useNavigate();
    const themeBg  = isDarkMode ? '#212530' : '#ffffff';
    const textColor = isDarkMode ? 'text-white' : 'text-dark';
    const borderColor = isDarkMode ? 'border-secondary' : 'border-light';

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.username || 'U')}&background=3b82f6&color=fff`;

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

                <Link to="/" className={`navbar-brand fw-bold mx-auto border-0 bg-transparent text-decoration-none ${textColor}`}>
                    <span className="text-primary">URL</span> Shortener
                </Link>

                <div className="d-flex align-items-center gap-3">
                    {isLogin ? (
                        <div className="dropdown">
                            <button
                                className={`d-flex align-items-center border-0 bg-transparent text-decoration-none ${textColor}`}
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img src={avatarUrl} alt={user?.username || 'User'} width="35" height="35" className="rounded-circle" />
                            </button>
                            <ul className={`dropdown-menu dropdown-menu-end text-small shadow position-absolute ${isDarkMode ? 'dropdown-menu-dark' : ''}`}>
                                <li><Link to="/profile" className="dropdown-item bg-transparent">Profile</Link></li>
                                <li><Link to="/settings" className="dropdown-item bg-transparent">Settings</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button onClick={handleLogout} className="dropdown-item bg-transparent text-danger border-0 w-100 text-start">
                                        Sign out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/" className="btn btn-primary btn-sm rounded-pill px-3">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

// ─── Desktop Header ─────────────────────────────────────────────────────────────
export const DesktopHeader = ({ toggleSidebar, isDarkMode, toggleTheme }) => {
    const { isLogin, user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const path      = location.pathname.replace('/', '') || 'dashboard';
    const pageTitle = path.charAt(0).toUpperCase() + path.slice(1);

    const themeBg   = isDarkMode ? '#1a1d24' : '#ffffff';
    const textColor = isDarkMode ? 'text-white' : 'text-dark';
    const borderColor = isDarkMode ? 'border-secondary' : 'border-light';

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.username || 'U')}&background=3b82f6&color=fff`;

    return (
        <header className={`d-none d-lg-flex justify-content-between align-items-center p-4 border-bottom ${borderColor}`}
                style={{ backgroundColor: themeBg }}>
            <div className="d-flex align-items-center gap-3">
                <button className={`navbar-toggler border-0 shadow-none p-0 fs-3 d-none d-lg-block ${textColor}`}
                        type="button" onClick={toggleSidebar}>
                    <i className="bi bi-list"></i>
                </button>
                <h4 className={`mb-0 fw-bold ${textColor}`}>{pageTitle}</h4>
            </div>

            <div className="d-flex align-items-center gap-4">
                <button onClick={toggleTheme} className={`btn btn-link p-0 shadow-none ${textColor}`} title="Toggle Theme">
                    <i className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon-stars'} fs-5`}></i>
                </button>

                {isLogin ? (
                    <>
                        <button className={`btn btn-link p-0 shadow-none ${textColor} fs-5`}>
                            <i className="bi bi-bell"></i>
                        </button>
                        <div className="dropdown">
                            <button
                                className={`d-flex align-items-center border-0 bg-transparent text-decoration-none dropdown-toggle ${textColor}`}
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img src={avatarUrl} alt={user?.username || 'User'} width="32" height="32" className="rounded-circle me-2" />
                                <span className="fs-6">{user?.username || 'Account'}</span>
                            </button>
                            <ul className={`dropdown-menu ${isDarkMode ? 'dropdown-menu-dark' : ''} text-small shadow`}>
                                <li><Link to="/profile" className="dropdown-item bg-transparent">Profile</Link></li>
                                <li><Link to="/settings" className="dropdown-item bg-transparent">Settings</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button onClick={handleLogout} className="dropdown-item bg-transparent text-danger border-0 w-100 text-start">
                                        Sign out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <Link to="/" className="btn btn-primary rounded-pill px-4">Sign In</Link>
                )}
            </div>
        </header>
    );
};