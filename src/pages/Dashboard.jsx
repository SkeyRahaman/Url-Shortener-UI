import React from "react";

// Updated paths pointing to the URLs feature
import UrlBlock from "../features/urls/components/UrlBlock";
import UrlList from "../features/urls/components/UrlList";

// Updated paths pointing to the Auth feature
import LoginPage from "../features/auth/components/Login";

// 1. Added setIsLogin to the component props
const Dashboard = ({ isDarkMode, isLogin, setIsLogin }) => {
    if (isLogin) {
        return (
            <>
                <UrlBlock isDarkMode={isDarkMode} />
                <UrlList isDarkMode={isDarkMode} />
                
                <div className={`mt-4 ${isDarkMode ? 'text-muted' : 'text-secondary'}`}>
                    <h5>Welcome to your Dashboard</h5>
                    <p>Manage your links and view analytics at a glance.</p>
                </div>
            </>
        );
    } else {
        return (
            <>
                {/* 2. Pass setIsLogin down to LoginPage */}
                <LoginPage isDarkMode={isDarkMode} setIsLogin={setIsLogin} />
            </>
        );
    }
};

export default Dashboard;