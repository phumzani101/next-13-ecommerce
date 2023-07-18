"use client";
import Heading from "@/components/myui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ProductColumn, columns } from "./ProductColumns";
import { DataTable } from "@/components/myui/DataTable";
import ApiList from "@/components/myui/ApiList";

interface ProductClientProps {
  products: ProductColumn[];
}
const ProductClient: React.FC<ProductClientProps> = ({ products }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${products.length})`}
          description="Manage Products for your store"
        />
        <Button
          onClick={() =>
            router.push(`/dashboard/${params.storeId}/products/new`)
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={products} />
      <Heading title="API" description="API call for products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};

export default ProductClient;
