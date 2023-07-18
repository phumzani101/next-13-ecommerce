"use client";
import Heading from "@/components/myui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ColorColumn, columns } from "./ColorColumns";
import { DataTable } from "@/components/myui/DataTable";
import ApiList from "@/components/myui/ApiList";

interface ColorClientProps {
  colors: ColorColumn[];
}
const ColorClient: React.FC<ColorClientProps> = ({ colors }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${colors.length})`}
          description="Manage Colors for your store"
        />
        <Button onClick={() => router.push(`/dashboard/colors/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={colors} />
      <Heading title="API" description="API call for colors" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
};

export default ColorClient;
