"use client";
import { Category, Image as PImage, Product, Size } from "@prisma/client";
import Image from "next/image";
import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import { Expand, ShoppingCart } from "lucide-react";
import { currencyFormatter } from "@/lib/utils";

interface ProductCardProps {
  product: Product & {
    images: PImage[];
    category: Category;
    size: Size;
  };
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={product?.images?.[0].url}
          fill
          alt="Images"
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <Button variant="outline">
              <Expand size={20} className="text-gray-600" />
            </Button>
            <Button variant="outline">
              <ShoppingCart size={20} className="text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      <div>
        <p className="font-semibold text-lg">{product.name}</p>
        <p className="text-sm text-gray-500">{product.category.name}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="font-semibold">
          {currencyFormatter.format(Number(product.price))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
