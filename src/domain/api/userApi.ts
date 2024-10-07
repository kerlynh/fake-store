import { api } from "./api";
import { adaptUserResponse } from "../adapter/userAdapter";

export async function fetchUser() {
  const userId = localStorage.getItem("token");
  if (userId) {
    const { data } = await api.get(`/users/${userId}`);
    return adaptUserResponse(data);
  }
}
