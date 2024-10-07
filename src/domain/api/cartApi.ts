import { api } from "./api";
import {
  adaptAddCartResponse,
  adaptUserCartResponse,
} from "../adapter/cartAdapter";
import { ProductCart } from "@/types/cartType";

export async function fetchUserCart() {
  const userId = localStorage.getItem("token");
  if (userId) {
    const { data } = await api.get(`/carts/user/${userId}`);
    return adaptUserCartResponse(data);
  }
}

export async function addCart(cart: ProductCart) {
  const { data } = await api.post("/carts", cart);
  return adaptAddCartResponse(data);
}

export async function changeCart(id: string, cart: ProductCart) {
  const { data } = await api.patch(`/carts/${id}`, cart);
  return adaptAddCartResponse(data);
}
