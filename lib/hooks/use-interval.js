import { useEffect, useState, useRef, useCallback } from 'react';
export const useInterval = (interval) => {
    const [_, setIndex] = useState(0);
    const intervalRef = useRef();
    const removeInterval = useCallback(() => {
        clearInterval(intervalRef.current);
    }, []);
    useEffect(() => {
        intervalRef.current = window.setInterval(() => {
            setIndex((i) => ++i);
        }, interval);
        return () => clearInterval(intervalRef.current);
    }, []);
    return { removeInterval };
};
