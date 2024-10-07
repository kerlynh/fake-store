import { useMutation } from "@tanstack/react-query";
import { useLoginStore } from "../store/loginStore";
import { Login } from "@/types/loginType";
import { login } from "../api/loginApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useLogin = () => {
  const setToken = useLoginStore((state) => state.setToken);
  const router = useRouter();

  return useMutation({
    mutationFn: (loginData: Login) => login(loginData),
    onSuccess: (data) => {
      if (data) {
        setToken(data);
        router.replace("/");
      }
    },
    onError: () => {
      toast.error("Usuário ou senha inválidos", {
        position: "top-right",
      });
    },
  });
};
