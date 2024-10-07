import { useUser } from "@/domain/service/userService";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { useUserCart } from "@/domain/service/cartService";
import { useCartStore } from "@/domain/store/cartStore";
import { OpenCart } from "./Cart";

export function LoggedButton() {
  const { data: user } = useUser();
  const { data: userCart } = useUserCart();
  const [hover, setHover] = useState(false);
  const { quantity, setQuantity, openCart, setOpenCart, cart, setCart } =
    useCartStore((state) => state);

  const accessList = [
    {
      label: "Minha Conta",
      url: "",
    },
    {
      label: "Meus Pedidos",
      url: "",
    },
  ];

  useEffect(() => {
    if (userCart) setCart(userCart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCart]);

  useEffect(() => {
    if (cart?.length > 0) {
      const totalQuantity = cart?.reduce((acc, order) => {
        const orderTotal = order.products.reduce((productAcc, product) => {
          return productAcc + product.quantity;
        }, 0);
        return acc + orderTotal;
      }, 0);
      setQuantity(totalQuantity!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  function onLogout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <div className="flex items-center space-x-5">
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={`w-auto h-[48px] rounded-[30px] border border-green-800 px-[14px] py-2 flex items-center justify-center space-x-4 ${
              hover && "drop-shadow-lg"
            }`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <IoIosArrowDown className="text-[#6A6A6A]" />
            <span>{user?.name.firstname.toUpperCase()}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="bg-white mt-3 shadow-md flex w-auto flex-col p-4 rounded-xl border border-[#F2F4F4]"
        >
          <nav className="flex flex-col w-32">
            <ul className="space-y-4">
              {accessList.map((item, idx: number) => (
                <li key={idx}>
                  <Link className="text-black" href={item.url}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button onClick={onLogout}>Sair</button>
              </li>
            </ul>
          </nav>
        </PopoverContent>
      </Popover>
      <button className="relative" onClick={() => setOpenCart(true)}>
        {quantity! > 0 && (
          <div className="absolute w-4 h-4 bg-red-600 rounded-full text-white text-xs flex items-center justify-center font-semibold top-[-3px] right-[-5px]">
            {quantity}
          </div>
        )}
        <IoCartOutline className="text-3xl text-green-700" />
      </button>
      {openCart && <OpenCart />}
    </div>
  );
}
