import { useProductsStore } from "@/domain/store/productStore";
import { Separator } from "@radix-ui/themes";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { BsTrash3 } from "react-icons/bs";
import { useCartStore } from "@/domain/store/cartStore";

export function OpenCart() {
  const products = useProductsStore((state) => state.products);
  const [total, setTotal] = useState(0);
  const { cart, setCart, setOpenCart } = useCartStore((state) => state);

  const cartItems = useMemo(() => {
    if (products && cart) {
      const findCartProducts = cart?.[0]?.products.map((cartProduct) => {
        const productDetails = products?.find(
          (product) => product.id === cartProduct.productId
        );

        return {
          ...productDetails,
          quantity: cartProduct.quantity,
          price: Number(productDetails?.price) * cartProduct.quantity,
        };
      });

      return findCartProducts;
    }
  }, [products, cart]);

  useEffect(() => {
    if (cartItems) {
      const totalPrice = cartItems?.reduce((acc, product) => {
        return acc + product.price;
      }, 0);

      setTotal(totalPrice);
    }
  }, [cartItems]);

  const plusOrMinus = useCallback(
    (type: string, id: string) => {
      const addItem = cart?.map((products) => {
        products.products.map((item) => {
          if (item.productId === id) {
            if (type === "plus") item.quantity += 1;
            else {
              if (item.quantity === 0) item.quantity = 0;
              else item.quantity -= 1;
            }
            return item;
          }
        });
        const product = products.products.filter((item) => item.quantity !== 0);
        products.products = product;
        return products;
      });

      setCart(addItem!);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart]
  );

  const onDelete = useCallback(
    (id: string) => {
      const removedItem = cart?.map((products) => {
        const product = products.products.filter(
          (item) => item.productId !== id
        );
        products.products = product;
        return products;
      });

      setCart(removedItem!);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart]
  );

  return (
    <div
      className={`w-full sm:w-1/3 h-screen bg-white border-l-[1px] border-gray-400 absolute top-0 right-0 p-8 space-y-5`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Meu carrinho</h3>
        <button onClick={() => setOpenCart(false)}>
          <IoMdClose className="text-2xl " />
        </button>
      </div>
      <Separator orientation="horizontal" size="4" />
      <div className="space-y-3  h-[75%] w-full overflow-auto">
        {cartItems?.map((item) => (
          <div
            className="w-full h-auto border border-green-800/80 rounded-lg p-2 flex space-x-2"
            key={item.id}
          >
            <div className="flex items-stretch justify-start w-full space-x-2">
              <div className="relative h-20 max-w-20 w-full flex items-center">
                <Image
                  className=""
                  src={item.image!}
                  alt={item.description!}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
              <div className="flex flex-col justify-between">
                <p className="text-sm">{item.title}</p>
                <p className="text-sm font-bold">$ {item.price}</p>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end">
              <button onClick={() => onDelete(item.id!)}>
                <BsTrash3 className="text-red-600 font-bold text-xl" />
              </button>
              <div className="flex items-center">
                <button
                  className="w-6 h-6 bg-green-700 text-white rounded-sm flex items-center justify-center"
                  onClick={() => plusOrMinus("minus", item.id!)}
                >
                  <FaMinus className="text-sm" />
                </button>
                <input
                  type="number"
                  className="w-7 h-6 px-1 border-t border-b outline-none text-xs text-center"
                  value={item.quantity}
                  onChange={() => {}}
                  disabled={true}
                />
                <button
                  className="w-6 h-6 bg-green-700 text-white rounded-sm flex items-center justify-center"
                  onClick={() => plusOrMinus("plus", item.id!)}
                >
                  <FaPlus className="text-xs" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full h-auto space-y-5">
        <Separator orientation="horizontal" size="4" />
        <div className="flex justify-between items-center">
          <p>Total</p>
          <p>$ {total.toFixed(2)}</p>
        </div>
        <button
          className="rounded-lg w-full h-10 bg-green-800/70 text-white font-bold"
          onClick={() => {}}
        >
          Finalizar compra
        </button>
      </div>
    </div>
  );
}
