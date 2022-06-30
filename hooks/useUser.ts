import useSWR from "swr"

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());


export const useUser =(userWallet) =>{
   const { data, error } = useSWR(
        `/api/users/${userWallet}`,
        fetcher
      );
    return {
      user: data,
      isLoading: !error && !data,
      isError: error
    }
  }