import prismadb from "@/lib/prismadb";
import React from "react";
import SizeForm from "./components/SizeForm";

const SizePage = async ({
  params,
}: {
  params: {
    sizeId: string;
    storeId: string;
  };
}) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm size={size} />
      </div>
    </div>
  );
};

export default SizePage;
