import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import DashboardMainNav from "@/components/dashboard/ui/DashboardMainNav";
import StoreSwitcher from "@/components/dashboard/ui/StoreSwitcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const DashboardNavbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({ where: { userId } });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />

        <DashboardMainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
