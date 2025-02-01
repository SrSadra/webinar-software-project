import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/api-client";

const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updatedData }) =>
      apiClient.patch(`/products/${id}`, updatedData).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]); // Refresh product list
    },
  });
};

export default useUpdateProduct;
