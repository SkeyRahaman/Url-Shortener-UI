import { useState, useCallback } from 'react';
import { getUserUrls, createUrl, updateUrl, deleteUrl, getUrlDetails } from '../api';

const LIMIT = 10;

export const useUrls = () => {
    const [urls, setUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const fetchUrls = useCallback(async (reset = false) => {
        setIsLoading(true);
        setError(null);
        const currentSkip = reset ? 0 : skip;
        try {
            const data = await getUserUrls(currentSkip, LIMIT);
            if (reset) {
                setUrls(data);
                setSkip(LIMIT);
            } else {
                setUrls(prev => [...prev, ...data]);
                setSkip(s => s + LIMIT);
            }
            setHasMore(data.length === LIMIT);
        } catch (err) {
            setError('Failed to load URLs. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [skip]);

    const addUrl = async (url, description) => {
        const newUrl = await createUrl(url, description);
        // Prepend the new URL to the top of the list
        setUrls(prev => [newUrl, ...prev]);
        return newUrl;
    };

    const editUrl = async (shortUrl, urlData) => {
        const updated = await updateUrl(shortUrl, urlData);
        setUrls(prev => prev.map(u => (u.short_url === shortUrl ? updated : u)));
        return updated;
    };

    const removeUrl = async (shortUrl) => {
        await deleteUrl(shortUrl);
        setUrls(prev => prev.filter(u => u.short_url !== shortUrl));
    };

    const fetchDetails = async (shortUrl) => {
        return await getUrlDetails(shortUrl);
    };

    const loadMore = () => fetchUrls(false);

    return {
        urls,
        isLoading,
        error,
        hasMore,
        fetchUrls,
        addUrl,
        editUrl,
        removeUrl,
        fetchDetails,
        loadMore,
    };
};
