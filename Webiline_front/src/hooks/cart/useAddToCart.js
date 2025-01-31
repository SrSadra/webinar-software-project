import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/api-client";

const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, quantity }) =>
      apiClient.post(`/cart/${id}`, { quantity }).then((res) => res.data),
    onSuccess: () => {
      // 1 Invalidate current data
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};

export default useAddToCart;
