import React from "react";
import BillBoardClient from "./components/BillBoardClient";
import prismadb from "@/lib/prismadb";
import { BillboardColumn } from "./components/BillboardColumns";
import { format } from "date-fns";

const BillboardPage = async () => {
  const billboards = await prismadb.billboard.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardClient billboards={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardPage;
