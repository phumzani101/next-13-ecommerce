import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET catefories /api/stores/[storeId]/orders
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

    const orders = await prisma?.order.findMany({
      where: { storeId },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.log("SIZE_POST", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

// CREATE/POST orders /api/stores/[storeId]/orders
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

    const { isPaid, phone, address } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!phone) {
      return new NextResponse("Phone is required", { status: 400 });
    }

    if (!address) {
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

    const order = await prisma?.order.create({
      data: { storeId, isPaid, phone, address },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("SIZE_POST", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
