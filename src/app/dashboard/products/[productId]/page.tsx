import prismadb from "@/lib/prismadb";
import React from "react";
import ProductForm from "./components/ProductForm";

const ProductPage = async ({
  params,
}: {
  params: {
    productId: string;
  };
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: { images: true },
  });

  const sizes = await prismadb.size.findMany({});

  const categories = await prismadb.category.findMany({});

  const colors = await prismadb.color.findMany({});

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          product={product}
          sizes={sizes}
          categories={categories}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default ProductPage;
