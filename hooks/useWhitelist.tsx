import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export const useWhitelist = (userId) => {
  const { data, error } = useSWR(
    userId && `/api/admin/retrieveWhitelist/${userId}`,
    fetcher
  );
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
