import apiClient from "../utils/api-client";
import { useQuery } from "@tanstack/react-query";

const useData = (endpoint, customConfig = {}, queryKey, staleTime = 300_000) => {
  const fetchFunction = async () => {
    console.log("Fetching:", endpoint);

    if (endpoint.includes("/webinar")) {
      console.log("Fetching using fetch 1");
      const response = await fetch(`http://localhost:3001${endpoint}`, customConfig);
      const data = await response.json(); //  Convert response to JSON
      console.log(data);
      return data;
    }
    else if (endpoint.includes("/category")) {
      console.log("Fetching using fetch 2");
      const response = await fetch(`http://localhost:3002${endpoint}`, customConfig);
      const data = await response.json(); //  Convert response to JSON
      console.log(data);
      return data;
    }
    

    console.log("Fetching using apiClient");
    const response = await apiClient.get(endpoint, customConfig);
    return response.data; //  Return data properly
  };

  return useQuery({
    queryKey: queryKey,
    queryFn: fetchFunction,
    staleTime: staleTime,
  });
};

export default useData;
