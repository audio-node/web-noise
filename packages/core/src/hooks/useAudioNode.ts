import { useEffect, useState } from "react";
import useModule from './useModule';
import type { WNAudioNode } from '../types';

interface NodeLoadingState {
  loading: true;
  error: null;
  node: null;
}

interface NodeErrorState {
  loading: false;
  error: Error;
  node: null;
}

interface NodeLoadedState<T> {
  loading: false;
  error: null;
  node: T;
}

type UseAudioNode<T> = NodeLoadingState | NodeErrorState | NodeLoadedState<T>;

const useAudioNode = <T extends WNAudioNode>(id: string): UseAudioNode<T> => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [node, setNode] = useState<T | null>(null);

  const { getNode } = useModule();

  useEffect(() => {
    const nodePromise = getNode<T | Promise<T>>(id);
    if (!nodePromise) {
      setLoading(false);
      setError(new Error(`could not find node with id: ${id}`));
      return;
    }

    Promise.resolve(nodePromise)
      .then((result) => {
        setNode(result);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [getNode, id, setNode, setLoading, setError]);

  if (loading === true) {
    return {
      node: null,
      error: null,
      loading: true,
    };
  }

  if (error) {
    return {
      node: null,
      loading: false,
      error,
    };
  }

  return { node: node as T, loading: false, error: null };
};

export default useAudioNode;
