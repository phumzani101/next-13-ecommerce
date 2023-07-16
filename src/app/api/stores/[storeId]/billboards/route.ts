import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET billboards /api/stores/[storeId]/billboards
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

    const billboards = await prisma?.billboard.findMany({
      where: { storeId },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("BILLBOARD_POST", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

// CREATE/POST billboards /api/stores/[storeId]/billboards
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

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image Url is required", { status: 400 });
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

    const billboard = await prisma?.billboard.create({
      data: { label, imageUrl, storeId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("BILLBOARD_POST", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
