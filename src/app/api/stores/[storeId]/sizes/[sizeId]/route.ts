import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET size /api/stores/[storeId]/sizes/[sizeId]
export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      sizeId: string;
    };
  }
) {
  try {
    const sizeId = params.sizeId;

    if (!sizeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const size = await prismadb.size.findUnique({
      where: { id: sizeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("SIZE_GET", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

// Update/PATCH size /api/stores/[storeId]/sizes/[sizeId]
export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      sizeId: string;
      storeId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const { name, value } = await req.json();
    const storeId = params.storeId;

    if (!userId) {
      return new NextResponse("Unauthenicated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("value is required", { status: 400 });
    }

    if (!params.sizeId) {
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

    const size = await prismadb.size.updateMany({
      where: { id: params.sizeId },
      data: { name, value },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("SIZE_PATCH", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

// DELETE size /api/stores/[storeId]/sizes/[sizeId]
export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      sizeId: string;
      storeId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const storeId = params.storeId;
    const sizeId = params.sizeId;

    if (!userId) {
      return new NextResponse("Unauthenicated", { status: 401 });
    }

    if (!params.sizeId) {
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

    const size = await prismadb.size.deleteMany({
      where: { id: sizeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("SIZE_DELETE", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
