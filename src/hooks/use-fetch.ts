import { useState, useEffect, useCallback } from 'react';
type InitialParams = { [key: string]: any };

export const useFetch = <T>(initialUrl: string, initialParams: InitialParams = {}, skip = false) => {
  const [url, updateUrl] = useState(initialUrl);
  const [params, updateParams] = useState<InitialParams>(initialParams);
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [refetchIndex, setRefetchIndex] = useState(0);

  const queryString = Object.keys(params)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&');

  const refetch = useCallback(() => setRefetchIndex((prevRefetchIndex) => prevRefetchIndex + 1), []);
  useEffect(() => {
    const fetchData = async () => {
      if (skip) return;
      setIsLoading(true);
      try {
        const response = await fetch(`${url}${queryString}`);
        const result = await response.json();
        if (response.ok) {
          setData(result);
        } else {
          setHasError(true);
          setErrorMessage(result);
        }
      } catch (err) {
        setHasError(true);
        setErrorMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url, params, refetchIndex]);
  return { data, isLoading, hasError, errorMessage, updateUrl, updateParams, refetch };
};
