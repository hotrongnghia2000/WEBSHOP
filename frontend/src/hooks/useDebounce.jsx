import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
  // useState(value) only initial value 1 time
  // When re-render, debounceValue still the old value
  const [debounceValue, setDebounceValue] = useState(value);

  // value change will make useEffect run again
  // After the delay time is over, re-render and debounceValue is changed
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    // Avoid memory leaks
    // When component unmouted, setTimeOut will be cleared
    return () => clearTimeout(timeOutId);
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
