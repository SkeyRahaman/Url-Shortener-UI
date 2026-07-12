import React, { useRef } from "react";
import { useAuth } from "../features/auth/AuthProvider";
import UrlBlock from "../features/urls/components/UrlBlock";
import UrlList from "../features/urls/components/UrlList";
import LoginPage from "../features/auth/components/Login";
import { createUrl } from "../features/urls/api";

const Dashboard = ({ isDarkMode }) => {
    const { isLogin } = useAuth();
    // Ref to trigger a list refresh after a new URL is created
    const listRef = useRef(null);

    const handleUrlCreated = async (url, description) => {
        return await createUrl(url, description);
    };

    if (isLogin) {
        return (
            <>
                <UrlBlock isDarkMode={isDarkMode} onUrlCreated={handleUrlCreated} />
                <UrlList isDarkMode={isDarkMode} ref={listRef} />
            </>
        );
    }

    return <LoginPage isDarkMode={isDarkMode} />;
};

export default Dashboard;