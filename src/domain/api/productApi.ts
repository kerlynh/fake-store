import { api } from "./api";
import { adaptProductResponse } from "../adapter/productAdapter";

export async function fetchAllProducts() {
  const { data } = await api.get(`/products`);
  return adaptProductResponse(data);
}
