import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export const useWhitelistStatus = (userWallet) => {
  const { data, error } = useSWR(
    userWallet && `/api/users/whitelist/${userWallet}`,
    fetcher
  );
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
