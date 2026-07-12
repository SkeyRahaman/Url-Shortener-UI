import React, { useState } from "react";
import { useLocation, Routes, Route } from "react-router-dom";

import { useAuth } from "./features/auth/AuthProvider";
import { MobileNavbar, DesktopHeader } from "./components/Headers";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Profile from "./pages/Profile";
import Settings from './pages/Settings';
import Register from './features/auth/components/Register';
import BackendLoader from "./components/BackendLoader";

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isBackendHealthy, setIsBackendHealthy] = useState(false);

    // Auth state now comes from global context — no more prop drilling
    const { isLogin, logout } = useAuth();

    const location = useLocation();
    const activePage = location.pathname === "/" ? "dashboard" : location.pathname.substring(1);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const mainBg = isDarkMode ? '#1a1d24' : '#f4f6f9';
    const activeItemBg = isDarkMode ? '#323644' : '#e9ecef';
    const activeItemColor = isDarkMode ? '#fff' : '#000';
    const linkColor = isDarkMode ? '#a0a5b1' : '#6c757d';
    const linkHoverColor = isDarkMode ? '#fff' : '#000';
    const globalTextColor = isDarkMode ? 'text-light' : 'text-dark';

    if (!isBackendHealthy) {
        return <BackendLoader onReady={() => setIsBackendHealthy(true)} />;
    }

    return (
        <div className={`d-flex ${globalTextColor}`} style={{ minHeight: '100vh', backgroundColor: mainBg, transition: 'background-color 0.3s ease' }}>
            <style>{`
                body { background-color: ${mainBg}; margin: 0; transition: background-color 0.3s ease; }
                .nav-pills .nav-link.active { background-color: ${activeItemBg}; color: ${activeItemColor}; }
                .nav-link { color: ${linkColor}; }
                .nav-link:hover { color: ${linkHoverColor}; }
            `}</style>

            <Sidebar
                isOpen={isSidebarOpen}
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                activePage={activePage}
            />

            <div className="flex-grow-1 d-flex flex-column h-100" style={{ backgroundColor: mainBg, overflowX: 'hidden', transition: 'background-color 0.3s ease' }}>

                <MobileNavbar isDarkMode={isDarkMode} />

                <DesktopHeader
                    toggleSidebar={toggleSidebar}
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                    activePage={activePage}
                />

                <main className="p-4">
                    <Routes>
                        <Route path="/" element={<Dashboard isDarkMode={isDarkMode} />} />
                        <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
                        <Route path="/register" element={<Register isDarkMode={isDarkMode} />} />
                        <Route path="/profile" element={
                            <ProtectedRoute>
                                <Profile isDarkMode={isDarkMode} />
                            </ProtectedRoute>
                        } />
                        <Route path="/settings" element={
                            <ProtectedRoute>
                                <Settings isDarkMode={isDarkMode} />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default App;