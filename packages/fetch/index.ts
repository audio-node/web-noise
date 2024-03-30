import { minimatch } from "minimatch";

type Fetch = typeof fetch;

const customFetchers: Array<[string, Fetch]> = [];

type RegisterFetcher = (matcher: string, fetcher: Fetch) => void;

export const registerFetcher: RegisterFetcher = (matcher, fetcher) => {
  customFetchers.push([matcher, fetcher]);
  return () => {
    //delete fetcher
  };
};

const getFetcher = (url: string): Fetch | void => {
  return [...customFetchers].reverse().find(([matcher, fetcher]) => {
    return minimatch(url, matcher);
  })?.[1];
};

const webNoiseFetch: Fetch = (...args) => {
  const request = new Request(...args);
  const fetcher = getFetcher(request.url);
  if (fetcher) {
    return fetcher(...args);
  }
  return fetch(...args);
};

export default webNoiseFetch;
