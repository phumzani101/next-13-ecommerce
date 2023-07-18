import { ICategory } from "@/lib/types";

export const getCategories = async (): Promise<ICategory[]> => {
  const res = await fetch("/api/categories");
  return res.json();
};
