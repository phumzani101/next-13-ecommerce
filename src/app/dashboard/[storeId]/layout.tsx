import DashboardNavbar from "@/components/dashboard/ui/DashboardNavbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard Store",
  description: "Dashboard Store",
};

export default async function DashboardStoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: { id: params.storeId, userId },
  });

  if (!store) {
    redirect("/dashboard");
  }

  return (
    <>
      <DashboardNavbar />
      {JSON.stringify(store, null, 2)}
      {children}
    </>
  );
}
