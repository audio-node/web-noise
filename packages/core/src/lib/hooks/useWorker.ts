import { useEffect, useState } from "react";

export const useWorker = (url: string | URL) => {
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    const newWorker = new Worker(url);
    setWorker(newWorker);
    return () => {
      newWorker?.terminate();
      setWorker(null);
    };
  }, []);

  return worker;
};

export default useWorker;
