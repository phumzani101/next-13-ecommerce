"use client";
import Heading from "@/components/myui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { OrderColumn, columns } from "./OrderColumns";
import { DataTable } from "@/components/myui/DataTable";
import ApiList from "@/components/myui/ApiList";

interface OrderClientProps {
  orders: OrderColumn[];
}
const OrderClient: React.FC<OrderClientProps> = ({ orders }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${orders.length})`}
          description="Manage Orders for your store"
        />
        {/* <Button
          onClick={() => router.push(`/dashboard/${params.storeId}/orders/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button> */}
      </div>
      <Separator />
      <DataTable searchKey="products" columns={columns} data={orders} />
      <Heading title="API" description="API call for orders" />
      <Separator />
      <ApiList entityName="orders" entityIdName="orderId" />
    </>
  );
};

export default OrderClient;
