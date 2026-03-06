import React, { Component } from "react";

export class NavBar extends Component {
    componentDidMount() {
        // Dynamically inject Bootstrap CSS and JS for the component to work in a plain React environment
        if (!document.getElementById('bootstrap-css')) {
            const link = document.createElement('link');
            link.id = 'bootstrap-css';
            link.rel = 'stylesheet';
            link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
            document.head.appendChild(link);
        }

        if (!document.getElementById('bootstrap-icons')) {
            const linkIcons = document.createElement('link');
            linkIcons.id = 'bootstrap-icons';
            linkIcons.rel = 'stylesheet';
            linkIcons.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css';
            document.head.appendChild(linkIcons);
        }

        if (!document.getElementById('bootstrap-js')) {
            const script = document.createElement('script');
            script.id = 'bootstrap-js';
            script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
            document.body.appendChild(script);
        }

        // Set Bootstrap dark mode on the root HTML element
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    }

    render() {
        return (
            <div className="d-flex text-light" style={{ minHeight: '100vh', backgroundColor: '#1a1d24' }}>
                {/* Embedded styles to match the dark aesthetic */}
                <style>{`
                    body { background-color: #1a1d24; margin: 0; }
                    .sidebar { width: 260px; background-color: #212530 !important; }
                    .nav-pills .nav-link.active { background-color: #323644; color: #fff; }
                    .nav-link { color: #a0a5b1; }
                    .nav-link:hover { color: #fff; }
                `}</style>

                {/* SIDEBAR (Desktop fixed, Mobile Offcanvas) */}
                <div className="offcanvas-lg offcanvas-start sidebar border-end border-secondary d-flex flex-column flex-shrink-0 p-3" tabIndex="-1" id="sidebarMenu">
                    
                    {/* Mobile Offcanvas Header */}
                    <div className="offcanvas-header d-lg-none">
                        <h5 className="offcanvas-title fw-bold">
                            <i className="bi bi-link-45deg text-primary fs-4"></i> URL Shortener
                        </h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
                    </div>

                    <div className="offcanvas-body d-flex flex-column h-100 p-0 p-lg-2 mt-lg-0 mt-3">
                        {/* Desktop Logo */}
                        <a href="/" className="d-none d-lg-flex align-items-center mb-4 text-white text-decoration-none">
                            <i className="bi bi-link-45deg text-primary fs-3 me-2"></i>
                            <span className="fs-5 fw-bold">URL Shortener</span>
                        </a>

                        {/* Navigation Links */}
                        <ul className="nav nav-pills flex-column mb-auto gap-2">
                            <li className="nav-item">
                                <a href="/" className="nav-link active rounded-3" aria-current="page">
                                    <i className="bi bi-house-door me-2"></i> Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="/" className="nav-link rounded-3">
                                    <i className="bi bi-folder2 me-2"></i> My URLs
                                </a>
                            </li>
                            <li>
                                <a href="/" className="nav-link rounded-3">
                                    <i className="bi bi-person me-2"></i> Profile
                                </a>
                            </li>
                            <li>
                                <a href="/" className="nav-link rounded-3">
                                    <i className="bi bi-box-arrow-right me-2"></i> Logout
                                </a>
                            </li>
                            {/* Create Button */}
                            <li className="mt-4">
                                <button className="btn btn-primary w-100 rounded-3 py-2">
                                    <i className="bi bi-plus-lg"></i> Create New URL
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* MAIN CONTENT AREA */}
                <div className="flex-grow-1 d-flex flex-column h-100" style={{ backgroundColor: '#1a1d24' }}>
                    
                    {/* MOBILE TOP NAVBAR */}
                    <nav className="navbar d-lg-none px-3 py-3 border-bottom border-secondary" style={{ backgroundColor: '#212530' }}>
                        <div className="container-fluid p-0">
                            <button className="navbar-toggler border-0 text-white shadow-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu">
                                <i className="bi bi-list fs-1"></i>
                            </button>
                            <a className="navbar-brand text-white fw-bold mx-auto" href="/">
                                <span className="text-primary">URL</span> Shortener
                            </a>
                            <img src="https://ui-avatars.com/api/?name=MD+Shakib&background=random" alt="User" width="35" height="35" className="rounded-circle" />
                        </div>
                    </nav>

                    {/* DESKTOP TOP HEADER */}
                    <header className="d-none d-lg-flex justify-content-between align-items-center p-4 border-bottom border-secondary" style={{ backgroundColor: '#1a1d24' }}>
                        <h4 className="mb-0 fw-bold">Dashboard</h4>
                        
                        <div className="d-flex align-items-center gap-4">
                            <a href="/" className="text-light fs-5"><i className="bi bi-bell"></i></a>
                            
                            {/* User Profile Dropdown */}
                            <div className="dropdown">
                                <a href="/" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://ui-avatars.com/api/?name=MD+Shakib&background=random" alt="User" width="32" height="32" className="rounded-circle me-2" />
                                    <span className="fs-6">MD Shakib</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                    <li><a className="dropdown-item" href="/">Profile</a></li>
                                    <li><a className="dropdown-item" href="/">Settings</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="/">Sign out</a></li>
                                </ul>
                            </div>
                        </div>
                    </header>

                    {/* MAIN PAGE CONTENT */}
                    <main className="p-4">
                        {/* The rest of the URL shortener dashboard content goes here */}
                    </main>
                </div>
            </div>
        );
    }
}

// Default export required for the interactive preview to mount
export default function App() {
    return <NavBar />;
}