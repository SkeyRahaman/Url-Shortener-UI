import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // 1. Import the Router hook
import { MobileNavbar, DesktopHeader } from "./Headers";
import Sidebar from "./Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from './Dashboard';
import About from './About';
import Profile from "./Profile"
import Register from './Register';
import Settings from './Settings';

function NavBar({ children }) {
    // 2. Replace class state with functional useState hooks
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isLogin, setIsLogin] = useState(true);

    // 3. Ask the Router what the current URL is to find the active page
    const location = useLocation();
    
    // If the URL is "/about", this removes the "/" to just give us "about"
    // If the URL is just "/", it defaults to "dashboard"
    const activePage = location.pathname === "/" ? "dashboard" : location.pathname.substring(1);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    // Theme Variables (Unchanged)
    const mainBg = isDarkMode ? '#1a1d24' : '#f4f6f9';
    const activeItemBg = isDarkMode ? '#323644' : '#e9ecef';
    const activeItemColor = isDarkMode ? '#fff' : '#000';
    const linkColor = isDarkMode ? '#a0a5b1' : '#6c757d';
    const linkHoverColor = isDarkMode ? '#fff' : '#000';
    const globalTextColor = isDarkMode ? 'text-light' : 'text-dark';

    return (
        <div className={`d-flex ${globalTextColor}`} style={{ minHeight: '100vh', backgroundColor: mainBg, transition: 'background-color 0.3s ease' }}>
            {/* Dynamic Global Styles (Unchanged) */}
            <style>{`
                /* ... Your exact same CSS logic goes here ... */
                body { background-color: ${mainBg}; margin: 0; transition: background-color 0.3s ease; }
                .nav-pills .nav-link.active { background-color: ${activeItemBg}; color: ${activeItemColor}; }
                .nav-link { color: ${linkColor}; }
                .nav-link:hover { color: ${linkHoverColor}; }
            `}</style>

            {/* Sidebar Component */}
            <Sidebar 
                isOpen={isSidebarOpen} 
                isDarkMode={isDarkMode} 
                toggleTheme={toggleTheme}
                activePage={activePage}
                isLogin={isLogin}
                // NOTICE: We deleted onNavigate!
            />

            {/* Main Content Area */}
            <div className="flex-grow-1 d-flex flex-column h-100" style={{ backgroundColor: mainBg, overflowX: 'hidden', transition: 'background-color 0.3s ease' }}>
                
                <MobileNavbar 
                    isDarkMode={isDarkMode} 
                    // NOTICE: We deleted onNavigate!
                />
                
                <DesktopHeader 
                    toggleSidebar={toggleSidebar} 
                    isDarkMode={isDarkMode} 
                    toggleTheme={toggleTheme} 
                    activePage={activePage} 
                    // NOTICE: We deleted onNavigate!
                />

                <main className="p-4">
                    <Routes>
                        <Route path="/" element={<Dashboard isDarkMode={isDarkMode} isLogin={isLogin}/>} />
                        <Route path="/about" element={<About isDarkMode={isDarkMode} isLogin={isLogin}/>} />
                        <Route path="/profile" element={<Profile isDarkMode={isDarkMode} isLogin={isLogin}/>} />
                        <Route path="/settings" element={<Settings isDarkMode={isDarkMode} isLogin={isLogin}/>} />
                        <Route path="/register" element={<Register isDarkMode={isDarkMode} isLogin={isLogin}/>} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default NavBar;