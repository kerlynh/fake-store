import { adaptLoginResponse } from "../adapter/loginAdapter";
import { api } from "./api";
import { Login } from "@/types/loginType";

export async function login(user: Login) {
  const { data } = await api.post("/auth/login", user);
  return adaptLoginResponse(data);
}
