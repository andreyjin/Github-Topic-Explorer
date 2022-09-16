import { useEffect, useRef, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const timer = useRef<NodeJS.Timeout>();
  const [result, setResult] = useState<T>(value);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => setResult(value), delay);

    return () => clearTimeout(timer.current);
  }, [value, delay]);

  return result;
}
