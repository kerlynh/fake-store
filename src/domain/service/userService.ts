import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/userApi";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
};
