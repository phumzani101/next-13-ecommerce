"use client";
import Heading from "@/components/myui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { SizeColumn, columns } from "./SizeColumns";
import { DataTable } from "@/components/myui/DataTable";
import ApiList from "@/components/myui/ApiList";

interface SizeClientProps {
  sizes: SizeColumn[];
}
const SizeClient: React.FC<SizeClientProps> = ({ sizes }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${sizes.length})`}
          description="Manage Sizes for your store"
        />
        <Button
          onClick={() => router.push(`/dashboard/${params.storeId}/sizes/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={sizes} />
      <Heading title="API" description="API call for sizes" />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};

export default SizeClient;
