import { useState, useEffect, useCallback } from 'react';
import { GenericError } from '../api/api-client';

type FetchDataResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | GenericError | null;
  reload: () => void;
};

export default function useFetchData<T>(fetchFunction: () => Promise<T>): FetchDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | GenericError | null>(null);
  const [reloadCount, setReloadCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        if (err instanceof GenericError || err instanceof Error) {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction, reloadCount]);

  const reload = useCallback(() => {
    setReloadCount((prevCount) => prevCount + 1);
  }, []);

  return { data, isLoading, error, reload };
}