import { useMutation, useQuery } from "@tanstack/react-query";
import { addCart, fetchUserCart } from "../api/cartApi";
import { ProductCart } from "@/types/cartType";
import toast from "react-hot-toast";
import { useCartStore } from "../store/cartStore";

export const useUserCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: fetchUserCart,
  });
};

export const useAddCart = () => {
  const { quantity, setQuantity, cart, setCart } = useCartStore(
    (state) => state
  );

  return useMutation({
    mutationFn: (cartItem: ProductCart) => addCart(cartItem),
    onSuccess: (data) => {
      const newData = [];
      if (data && data?.products.length > 0) {
        const totalQuantity = data.products.reduce((productAcc, product) => {
          return productAcc + product.quantity;
        }, 0);

        const total = totalQuantity + quantity;
        setQuantity(total);

        if (cart.length > 0) {
          const updateCart = cart?.map((product) => {
            const productExists = product.products.some(
              (item) => item.productId === data.products[0].productId
            );
            if (productExists) return product;

            product.products.push(data.products[0]);
            return product;
          });
          setCart(updateCart!);
        } else {
          newData.push(data!);
          setCart(newData);
        }
      }
    },
    onError: () => {
      toast.error("Desculpe, ocorreu um erro ao adicionar o produto", {
        position: "top-right",
      });
    },
  });
};
