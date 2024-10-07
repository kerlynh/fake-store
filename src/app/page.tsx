"use client";

import Image from "next/image";
import { AccessButton } from "@/components/Header/Button";
import { useAllProducts } from "@/domain/service/productService";
import { StarRating } from "@/components/Stars";
import { Logo2 } from "@/components/Logo/index2";
import { useEffect, useState } from "react";
import { Product } from "@/types/productType";
import { useRouter } from "next/navigation";
import { LoggedButton } from "@/components/Header/Button/logged";
import { useAddCart } from "@/domain/service/cartService";
import { formatDate } from "@/helpers/date";
import { useProductsStore } from "@/domain/store/productStore";

export default function Home() {
  const { data, isLoading } = useAllProducts();
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [itemsToShow, setItemsToShow] = useState(5);
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const addToCart = useAddCart();
  const setProducts = useProductsStore((state) => state.setProducts);

  useEffect(() => {
    const storageToken = localStorage.getItem("token");
    if (storageToken) setUserId(storageToken);
  }, []);

  useEffect(() => {
    if (data) {
      setVisibleProducts(data.slice(0, itemsToShow));
      setProducts(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, itemsToShow]);

  const onScroll = () => {
    if (
      data &&
      window.innerHeight + document.documentElement.scrollTop + 50 >=
        document.documentElement.offsetHeight
    ) {
      setItemsToShow((prev) => Math.min(prev + 5, data.length));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function onShopping(id: string) {
    if (!userId) router.push("/login");

    addToCart.mutate({
      userId,
      date: formatDate(),
      products: [
        {
          productId: id,
          quantity: 1,
        },
      ],
    });
  }

  if (isLoading) return <div className="text-[10px]">Carregando...</div>;

  return (
    <>
      <header className="w-full h-20 flex py-2 px-4 sm:px-8 fixed items-center justify-between bg-green-50 z-10">
        <Logo2 />
        {userId ? <LoggedButton /> : <AccessButton />}
      </header>
      <main className="flex flex-col items-center justify-center space-y-4 relative pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center gap-3 p-5">
          {visibleProducts?.map((item) => (
            <div
              key={item.id}
              className="rounded-lg w-full lg:w-3/5 h-auto min-h-[478px] border border-green-900 overflow-hidden flex flex-col p-4 space-y-4 transition-all duration-300 ease-in-out justify-between"
            >
              <div className="relative h-60 max-w-full flex items-center justify-items-center">
                <Image
                  className=""
                  src={item.image}
                  alt={item.description}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
              <p className="text-base font-semibold">{item.title}</p>
              <div className="flex items-center space-x-2">
                <p>{item.rating.rate}</p>
                <StarRating rating={item.rating.rate} />
                <p>({item.rating.count})</p>
              </div>
              <p className="text-xl font-bold">$ {item.price}</p>
              <button
                className="rounded-3xl w-full h-10 bg-green-800/70 text-white font-bold"
                onClick={() => onShopping(item.id)}
              >
                Comprar
              </button>
            </div>
          ))}
        </div>
        {visibleProducts.length < data!.length && (
          <div className="loading-spinner">Carregando mais...</div>
        )}
      </main>
      <footer className="bg-green-50 w-full h-auto py-8 px-4 text-center">
        <p className="text-[10px]">
          Fake Store - Avenida Fake Limer, 789 - Cidade Fake - FK - CEP:
          00000-000 - CNPJ: 00.000.000/0000-00
        </p>
      </footer>
    </>
  );
}
