import React from "react";
import Container from "@/components/client/ui/Container";
import Link from "next/link";
import NavLink from "@/components/client/ui/NavLink";
import CategorySwitcher from "@/components/dashboard/ui/CategorySwitcher";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
  const categories = await prismadb.category.findMany({});

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 mr-4 flex lg:ml-0 gap-x-2">
            <span className="font-bold text-xl">Store</span>
          </Link>
          <CategorySwitcher items={categories} />
          <NavLink />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
