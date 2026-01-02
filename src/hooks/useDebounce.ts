import { useEffect, useState } from "react";

export const useDebounce = (value: string, delayMs: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => clearTimeout(timeoutId);
  }, [value, delayMs]);

  return debouncedValue;
};
