import React, { Component } from "react";
import { MobileNavbar, DesktopHeader } from "./Headers";
import Sidebar from "./Sidebar";

export class NavBar extends Component {
    state = {
        isSidebarOpen: true,
        isDarkMode: true
    };

    toggleSidebar = () => {
        this.setState(prevState => ({ isSidebarOpen: !prevState.isSidebarOpen }));
    };

    toggleTheme = () => {
        this.setState(prevState => ({ isDarkMode: !prevState.isDarkMode }));
    };

    render() {
        const { isDarkMode, isSidebarOpen } = this.state;
        const { onNavigate, activePage, children } = this.props;

        const mainBg = isDarkMode ? '#1a1d24' : '#f4f6f9';
        const activeItemBg = isDarkMode ? '#323644' : '#e9ecef';
        const activeItemColor = isDarkMode ? '#fff' : '#000';
        const linkColor = isDarkMode ? '#a0a5b1' : '#6c757d';
        const linkHoverColor = isDarkMode ? '#fff' : '#000';
        const globalTextColor = isDarkMode ? 'text-light' : 'text-dark';

        return (
            <div className={`d-flex ${globalTextColor}`} style={{ minHeight: '100vh', backgroundColor: mainBg, transition: 'background-color 0.3s ease' }}>
                {/* Dynamic Global Styles */}
                <style>{`
                    body { background-color: ${mainBg}; margin: 0; transition: background-color 0.3s ease; }
                    
                    @media (max-width: 991px) {
                        #sidebarMenu { --bs-offcanvas-width: 75vw; }
                        .custom-mobile-anim.offcanvas.show {
                            animation: slideDownMobile 0.25s ease-out;
                        }
                        @keyframes slideDownMobile {
                            from { transform: translateY(-20px); opacity: 0; }
                            to { transform: translateY(0); opacity: 1; }
                        }
                    }

                    @media (min-width: 992px) {
                        .sidebar-transition {
                            transition: transform 0.25s ease, opacity 0.25s ease, width 0.25s ease, margin 0.25s ease, padding 0.25s ease !important;
                            overflow: hidden;
                            width: 260px;
                        }
                        .sidebar-hidden {
                            transform: translateY(-20px);
                            opacity: 0;
                            width: 0 !important;
                            padding: 0 !important;
                            margin: 0 !important;
                            border: none !important;
                            pointer-events: none;
                        }
                        .sidebar-visible { transform: translateY(0); opacity: 1; }
                    }

                    .nav-pills .nav-link.active { background-color: ${activeItemBg}; color: ${activeItemColor}; }
                    .nav-link { color: ${linkColor}; }
                    .nav-link:hover { color: ${linkHoverColor}; }
                `}</style>

                {/* Sidebar Component */}
                <Sidebar 
                    isOpen={isSidebarOpen} 
                    isDarkMode={isDarkMode} 
                    toggleTheme={this.toggleTheme}
                    onNavigate={onNavigate}
                    activePage={activePage}
                />

                {/* Main Content Area */}
                <div className="flex-grow-1 d-flex flex-column h-100" style={{ backgroundColor: mainBg, overflowX: 'hidden', transition: 'background-color 0.3s ease' }}>
                    
                    {/* ADDED onNavigate here to fix the Mobile error */}
                    <MobileNavbar 
                        isDarkMode={isDarkMode} 
                        onNavigate={onNavigate} 
                    />
                    
                    <DesktopHeader 
                        toggleSidebar={this.toggleSidebar} 
                        isDarkMode={isDarkMode} 
                        toggleTheme={this.toggleTheme} 
                        activePage={activePage} 
                        onNavigate={onNavigate}
                    />

                    <main className="p-4">
                        {children && React.isValidElement(children) ? 
                            React.cloneElement(children, { isDarkMode: isDarkMode }) : 
                            children
                        }
                    </main>
                </div>
            </div>
        );
    }
}

export default NavBar;