"use client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavLink = () => {
  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Link
        href="/cart"
        className="flex items-center w-auto rounded-full bg-black border-transparent px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-white font-semibold hover:opacity-75 transition"
      >
        <ShoppingCart /> 0
      </Link>
    </div>
  );
};

export default NavLink;
