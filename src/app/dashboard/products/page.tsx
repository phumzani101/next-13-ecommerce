import React from "react";
import ProductClient from "./components/ProductClient";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { ProductColumn } from "./components/ProductColumns";
import { currencyFormatter } from "@/lib/utils";

const ProductPage = async () => {
  const products = await prismadb.product.findMany({
    include: { category: true, images: true, size: true, color: true },
    orderBy: { createdAt: "desc" },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: currencyFormatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient products={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductPage;
