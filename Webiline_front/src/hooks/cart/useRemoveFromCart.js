import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/api-client";

const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) =>
      apiClient.patch(`/cart/remove/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};

export default useRemoveFromCart;
