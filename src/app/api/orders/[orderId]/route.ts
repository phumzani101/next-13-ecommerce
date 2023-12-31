import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET order /api/orders/[orderId]
export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      orderId: string;
    };
  }
) {
  try {
    const orderId = params.orderId;

    if (!orderId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const order = await prismadb.order.findUnique({
      where: { id: orderId },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("SIZE_GET", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

// Update/PATCH order /api/orders/[orderId]
export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      orderId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const { isPaid, phone, address } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!phone) {
      return new NextResponse("Phone is required", { status: 400 });
    }

    if (!address) {
      return new NextResponse("Billboard Id is required", { status: 400 });
    }

    if (!params.orderId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const order = await prismadb.order.updateMany({
      where: { id: params.orderId },
      data: { isPaid, phone, address },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("SIZE_PATCH", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

// DELETE order /api/orders/[orderId]
export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      orderId: string;
    };
  }
) {
  try {
    const { userId } = auth();

    const orderId = params.orderId;

    if (!userId) {
      return new NextResponse("Unauthenicated", { status: 401 });
    }

    if (!params.orderId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const order = await prismadb.order.deleteMany({
      where: { id: orderId },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("SIZE_DELETE", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
