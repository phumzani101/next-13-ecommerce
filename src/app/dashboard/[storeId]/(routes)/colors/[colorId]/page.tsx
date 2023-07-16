import prismadb from "@/lib/prismadb";
import React from "react";
import ColorForm from "./components/ColorForm";

const ColorPage = async ({
  params,
}: {
  params: {
    colorId: string;
    storeId: string;
  };
}) => {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
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
        <ColorForm color={color} />
      </div>
    </div>
  );
};

export default ColorPage;
