import { useState, useCallback } from "react";

export const useHttp = () => {

    const [error, setError] = useState(null),
          [loading, setLoading] = useState(false);

    const request = useCallback(async (url, {method = "GET", body = null, headers = {"Content-Type" : "application/json"}} = {}) => {
        setLoading(true);

        try {
            const response = await fetch(url, {body, method, headers});
            if (!response.ok) {
                throw new Error(`Could not fetch with ${url}. Status: ${response.status} `);
            }

            const data = await response.json();
            setLoading(false);
            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return {loading, error, request, clearError};
}
