import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET product /api/products/[productId]
export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      productId: string;
    };
  }
) {
  try {
    const productId = params.productId;

    if (!productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: { id: productId },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("PRODUCT_GET", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

// Update/PATCH product /api/products/[productId]
export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      productId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const {
      name,
      isFeatured,
      isArchived,
      price,
      categoryId,
      sizeId,
      colorId,
      images,
    } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenicated", { status: 401 });
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

    if (!params.productId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    await prismadb.product.update({
      where: { id: params.productId },
      data: {
        name,
        isFeatured,
        isArchived,
        price,
        categoryId,
        sizeId,
        colorId,
        images: {
          deleteMany: {},
        },
      },
    });

    const product = await prismadb.product.update({
      where: { id: params.productId },
      data: {
        images: {
          createMany: {
            data: [...images.map((img: { url: string }) => img)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("PRODUCT_PATCH", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

// DELETE product /api/products/[productId]
export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      productId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const productId = params.productId;

    if (!userId) {
      return new NextResponse("Unauthenicated", { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const product = await prismadb.product.deleteMany({
      where: { id: productId },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("PRODUCT_DELETE", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
