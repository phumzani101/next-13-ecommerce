"use client";
import React from "react";
import ApiAlert from "@/components/myui/ApiAlert";
import { useParams, useRouter } from "next/navigation";
import useOrigin from "@/hooks/useOrigin";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

const ApiList: React.FC<ApiListProps> = ({
  entityName = "",
  entityIdName = "",
}) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/stores/${params.storeId}`;
  return (
    <>
      <ApiAlert
        title="GET (list)"
        description={`${baseUrl}/${entityName}`}
        variant="public"
      />

      <ApiAlert
        title="GET (read)"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant="public"
      />

      <ApiAlert
        title="POST (create)"
        description={`${baseUrl}/${entityName}`}
        variant="admin"
      />

      <ApiAlert
        title="PATCH (update)"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant="admin"
      />

      <ApiAlert
        title="DELETE (delete)"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant="admin"
      />
    </>
  );
};

export default ApiList;
