import prismadb from "@/lib/prismadb";
import React from "react";
import OrderForm from "./components/OrderForm";

const OrderPage = async ({
  params,
}: {
  params: {
    orderId: string;
    storeId: string;
  };
}) => {
  const order = await prismadb.order.findUnique({
    where: {
      id: params.orderId,
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
        <OrderForm order={order} />
      </div>
    </div>
  );
};

export default OrderPage;
