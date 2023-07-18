import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET catefories /api/orders
export async function GET() {
  try {
    const orders = await prisma?.order.findMany({});

    return NextResponse.json(orders);
  } catch (error) {
    console.log("SIZE_POST", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

// CREATE/POST orders /api/orders
export async function POST(req: Request) {
  try {
    const { userId } = auth(); // check if authenticated
    const body = await req.json();

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

    const order = await prisma?.order.create({
      data: { isPaid, phone, address },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("SIZE_POST", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
