import React from "react";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { SizeColumn } from "./components/SizeColumns";
import SizeClient from "./components/SizeClient";

const SizePage = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  const sizes = await prismadb.size.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient sizes={formattedSizes} />
      </div>
    </div>
  );
};

export default SizePage;
