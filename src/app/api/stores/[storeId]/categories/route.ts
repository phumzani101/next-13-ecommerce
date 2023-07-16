import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET catefories /api/stores/[storeId]/categories
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

    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const categories = await prisma?.category.findMany({
      where: { storeId },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("CATEGORY_POST", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

// CREATE/POST categories /api/stores/[storeId]/categories
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

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 });
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

    const category = await prisma?.category.create({
      data: { name, storeId, billboardId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("CATEGORY_POST", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
