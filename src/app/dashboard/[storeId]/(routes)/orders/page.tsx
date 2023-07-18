import React from "react";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { OrderColumn } from "./components/OrderColumns";
import OrderClient from "./components/OrderClient";
import { currencyFormatter } from "@/lib/utils";

const OrderPage = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  const orders = await prismadb.order.findMany({
    where: { storeId: params.storeId },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    isPaid: item.isPaid,
    phone: item.phone,
    products: item.orderItems.map((item) => item.product.name).join(", "),
    totalPrice: currencyFormatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.name);
      }, 0)
    ),
    address: item.address,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient orders={formattedOrders} />
      </div>
    </div>
  );
};

export default OrderPage;
