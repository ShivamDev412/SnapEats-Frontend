import { useState, useEffect } from "react";

const useDebounce = (value: string, delay?: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const DELAY = delay || 500;
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [value, DELAY]);

  return debouncedValue;
};

export default useDebounce;
