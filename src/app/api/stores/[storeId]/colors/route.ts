import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET catefories /api/stores/[storeId]/colors
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

    const colors = await prisma?.color.findMany({
      where: { storeId },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("SIZE_POST", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

// CREATE/POST colors /api/stores/[storeId]/colors
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

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!value) {
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

    const color = await prisma?.color.create({
      data: { name, storeId, value },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("SIZE_POST", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
