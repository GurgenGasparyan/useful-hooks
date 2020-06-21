import { useEffect, useState } from 'react';

export const useTimeout = (miliSeconds: number) => {
  const [timedOut, setTimedOut] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setTimedOut(true);
    }, miliSeconds);
  }, [miliSeconds]);

  return timedOut;
};
