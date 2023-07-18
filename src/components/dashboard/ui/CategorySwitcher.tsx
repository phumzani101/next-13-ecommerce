"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "@prisma/client";

import { ChevronsUpDown, List as CategoryIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface CategorySwitcherProps {
  items?: Category[];
}

const CategorySwitcher = ({ items = [] }: CategorySwitcherProps) => {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formattedItems = items.map((item) => ({
    name: item.name,
    id: item.id,
  }));

  const onCategorySelect = (category: { name: string; id: string }) => {
    setOpen(false);
    router.push(`/category/${category.id}`);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            aria-expanded={open}
            className="justify-between"
          >
            <CategoryIcon className="mr-2 h-4 w-4" />
            Categories
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>All Categories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {formattedItems.map((category) => (
            <DropdownMenuItem
              onClick={() => onCategorySelect(category)}
              key={category.id}
              className="text-sm"
            >
              <CategoryIcon className="mr-2 h-4 w-4" />
              {category.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CategorySwitcher;
