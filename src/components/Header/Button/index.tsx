"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

import Link from "next/link";

export function AccessButton() {
  const [hover, setHover] = useState(false);

  const accessList = [
    {
      label: "Cadastre-se",
      url: "/sign-up",
    },
    {
      label: "Entrar",
      url: "/login",
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={`w-[86px] h-[48px] rounded-[30px] border border-green-800 pl-[14px] py-2 pr-2 flex items-center justify-center space-x-4 ${
            hover && "drop-shadow-lg"
          }`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <RxHamburgerMenu className="text-[#6A6A6A]" />
          <FaUserCircle className="text-3xl text-[#6A6A6A]" />
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
          </ul>
        </nav>
      </PopoverContent>
    </Popover>
  );
}
