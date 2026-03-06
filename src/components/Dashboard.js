import React from "react";
import UrlBlock from "./UrlBlock";
import UrlList from "./UrlList";

const Dashboard = ({ isDarkMode }) => {
    return (
        <>
            <UrlBlock isDarkMode={isDarkMode} />
            <UrlList isDarkMode={isDarkMode} />
            
            {/* You can add dashboard-specific stats cards here later */}
            <div className={`mt-4 ${isDarkMode ? 'text-muted' : 'text-secondary'}`}>
                <h5>Welcome to your Dashboard</h5>
                <p>Manage your links and view analytics at a glance.</p>
            </div>
        </>
    );
};

export default Dashboard;