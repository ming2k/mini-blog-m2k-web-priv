import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:8080/api';

export function useData(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({
          page: options.page || 1,
          per_page: options.per_page || 5
        });
        
        const response = await fetch(`${API_BASE_URL}/${endpoint}?${queryParams}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, options.page, options.per_page]);

  const mutate = (newData) => {
    if (typeof newData === 'function') {
      setData(prev => newData(prev));
    } else {
      setData(newData);
    }
  };

  return {
    data,
    isLoading,
    isError: !!error,
    error,
    mutate
  };
} 