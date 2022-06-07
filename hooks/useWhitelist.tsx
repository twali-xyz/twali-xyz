import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export const useWhitelist = () => {
  const { data, error } = useSWR(`/api/admin/retrieveWhitelist`, fetcher);
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
