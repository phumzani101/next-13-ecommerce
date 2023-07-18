"use client";
import Heading from "@/components/myui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { BillboardColumn, columns } from "./BillboardColumns";
import { DataTable } from "@/components/myui/DataTable";
import ApiList from "@/components/myui/ApiList";

interface BillBoardClientProps {
  billboards: BillboardColumn[];
}
const BillBoardClient: React.FC<BillBoardClientProps> = ({ billboards }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${billboards.length})`}
          description="Manage Billboards for your store"
        />
        <Button onClick={() => router.push(`/dashboard/billboards/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={billboards} />
      <Heading title="API" description="API call for billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};

export default BillBoardClient;
