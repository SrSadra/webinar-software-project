import apiClient from "../utils/api-client";
import { useQuery } from "@tanstack/react-query";

const useData = (
  endpoint,
  customConfig = {},
  queryKey,
  staleTime = 300_000
) => {
  const fetchFunction = () =>
    apiClient.get(endpoint, customConfig).then((res) => res.data);

  return useQuery({
    queryKey: queryKey,
    queryFn: fetchFunction,
    staleTime: staleTime,
  });
};

export default useData;
