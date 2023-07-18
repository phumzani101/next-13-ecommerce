import DashboardNavbar from "@/components/dashboard/ui/DashboardNavbar";
import { auth } from "@clerk/nextjs";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard Store",
  description: "Dashboard Store",
};

export default async function DashboardStoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <>
      <DashboardNavbar />
      {children}
    </>
  );
}
