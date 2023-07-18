"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const DashboardMainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/`,
      label: "Store",
      active: pathname === `/`,
    },
    {
      href: `/dashboard`,
      label: "Dashboard",
      active: pathname === `/dashboard`,
    },
    {
      href: `/dashboard/billboards`,
      label: "Billboard",
      active: pathname === `/dashboard/billboards`,
    },
    {
      href: `/dashboard/categories`,
      label: "Categories",
      active: pathname === `/dashboard/categories`,
    },
    {
      href: `/dashboard/sizes`,
      label: "Sizes",
      active: pathname === `/dashboard/sizes`,
    },
    {
      href: `/dashboard/colors`,
      label: "Colors",
      active: pathname === `/dashboard/colors`,
    },
    {
      href: `/dashboard/products`,
      label: "Products",
      active: pathname === `/dashboard/products`,
    },
    {
      href: `/dashboard/orders`,
      label: "Orders",
      active: pathname === `/dashboard/orders`,
    },
    {
      href: `/dashboard/settings`,
      label: "Settings",
      active: pathname === `/dashboard/settings`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
        <span className="font-bold text-xl">Admin</span>
      </Link>
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default DashboardMainNav;
