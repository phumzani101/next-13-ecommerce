import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET color /api/stores/[storeId]/colors/[colorId]
export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      colorId: string;
    };
  }
) {
  try {
    const colorId = params.colorId;

    if (!colorId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const color = await prismadb.color.findUnique({
      where: { id: colorId },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("COLOR_GET", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

// Update/PATCH color /api/stores/[storeId]/colors/[colorId]
export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      colorId: string;
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

    if (!params.colorId) {
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

    const color = await prismadb.color.updateMany({
      where: { id: params.colorId },
      data: { name, value },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("COLOR_PATCH", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

// DELETE color /api/stores/[storeId]/colors/[colorId]
export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      colorId: string;
      storeId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const storeId = params.storeId;
    const colorId = params.colorId;

    if (!userId) {
      return new NextResponse("Unauthenicated", { status: 401 });
    }

    if (!params.colorId) {
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

    const color = await prismadb.color.deleteMany({
      where: { id: colorId },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("COLOR_DELETE", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
