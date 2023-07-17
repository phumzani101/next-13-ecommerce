import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET products /api/stores/[storeId]/products
export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string };
  }
) {
  try {
    const storeId = params.storeId;
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const products = await prisma?.product.findMany({
      where: {
        storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("PRODUCT_POST", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

// CREATE/POST products /api/stores/[storeId]/products
export async function POST(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string };
  }
) {
  try {
    const { userId } = auth(); // check if authenticated
    const body = await req.json();
    const storeId = params.storeId;

    const {
      name,
      isFeatured,
      isArchived,
      price,
      categoryId,
      sizeId,
      colorId,
      images,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("categoryId is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("sizeId is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("colorId is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Image is required", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await prisma?.product.create({
      data: {
        name,
        isFeatured,
        isArchived,
        price,
        categoryId,
        sizeId,
        colorId,
        images: {
          createMany: {
            data: [...images.map((img: { url: string }) => img)],
          },
        },
        storeId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("PRODUCT_POST", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
