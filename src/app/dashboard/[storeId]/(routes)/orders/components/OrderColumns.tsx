"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import OrderCellActions from "./OrderCellActions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
  id: string;
  products: string;
  isPaid: boolean;
  phone: string;
  address: string;
  totalPrice: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },

  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <OrderCellActions data={row.original} />,
  // },
];
