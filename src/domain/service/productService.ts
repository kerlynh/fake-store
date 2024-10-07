import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "../api/productApi";

export const useAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });
};
