import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export const useWhitelistFilter = (filter) => {
  const { data, error } = useSWR(
    `/api/admin/filterWhitelist/` + filter,
    fetcher
  );
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
