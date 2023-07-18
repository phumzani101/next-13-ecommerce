"use client";
import { Category, Image, Product, Size } from "@prisma/client";
import React, { FC } from "react";
import NoResults from "@/components/client/ui/NoResults";
import ProductCard from "./ProductCard";

interface CK extends Product {
  images: Image[];
  category: Category;
  size: Size;
}

interface ProductContainerProps {
  title: string;
  products: CK[];
}

const ProductContainer: FC<ProductContainerProps> = ({
  products = [],
  title,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {products.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductContainer;
