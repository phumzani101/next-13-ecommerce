import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET category /api/stores/[storeId]/categories/[categoryId]
export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      categoryId: string;
    };
  }
) {
  try {
    const categoryId = params.categoryId;

    if (!categoryId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const category = await prismadb.category.findUnique({
      where: { id: categoryId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("CATEGORY_GET", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

// Update/PATCH category /api/stores/[storeId]/categories/[categoryId]
export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      categoryId: string;
      storeId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const { name, billboardId } = await req.json();
    const storeId = params.storeId;

    if (!userId) {
      return new NextResponse("Unauthenicated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("billboardId is required", { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse("Store ID is required", { status: 400 });
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

    const category = await prismadb.category.updateMany({
      where: { id: params.categoryId },
      data: { name, billboardId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("CATEGORY_PATCH", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

// DELETE category /api/stores/[storeId]/categories/[categoryId]
export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      categoryId: string;
      storeId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const storeId = params.storeId;
    const categoryId = params.categoryId;

    if (!userId) {
      return new NextResponse("Unauthenicated", { status: 401 });
    }

    if (!params.categoryId) {
      return new NextResponse("Store ID is required", { status: 400 });
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

    const category = await prismadb.category.deleteMany({
      where: { id: categoryId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("CATEGORY_DELETE", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
