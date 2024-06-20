import { useState, useEffect } from "react";

const useDebounce = (value: string): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const DELAY = 500;
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
