import Billboard from "@/components/client/billboard/Billboard";
import Container from "@/components/client/ui/Container";
import ProductContainer from "@/components/products/ProductContainer";
import prismadb from "@/lib/prismadb";
import axios from "axios";

export default async function Home() {
  const billboard = await prismadb.billboard.findFirst();

  const products = await prismadb.product.findMany({
    where: { isFeatured: true },
    include: { category: true, images: true, size: true, color: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Container>
      <div className="space-y-10 bp-10">
        <Billboard data={billboard} />
      </div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductContainer products={products} title="Featured Products" />
      </div>
    </Container>
  );
}
