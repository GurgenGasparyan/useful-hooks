import { __awaiter } from "tslib";
import { useState, useEffect, useCallback } from 'react';
export const useFetch = (initialUrl, initialParams = {}, skip = false) => {
    const [url, updateUrl] = useState(initialUrl);
    const [params, updateParams] = useState(initialParams);
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [refetchIndex, setRefetchIndex] = useState(0);
    const queryString = Object.keys(params)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');
    const refetch = useCallback(() => setRefetchIndex((prevRefetchIndex) => prevRefetchIndex + 1), []);
    useEffect(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            if (skip)
                return;
            setIsLoading(true);
            try {
                const response = yield fetch(`${url}${queryString}`);
                const result = yield response.json();
                if (response.ok) {
                    setData(result);
                }
                else {
                    setHasError(true);
                    setErrorMessage(result);
                }
            }
            catch (err) {
                setHasError(true);
                setErrorMessage(err.message);
            }
            finally {
                setIsLoading(false);
            }
        });
        fetchData();
    }, [url, params, refetchIndex]);
    return { data, isLoading, hasError, errorMessage, updateUrl, updateParams, refetch };
};
