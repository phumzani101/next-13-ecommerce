import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET catefories /api/sizes
export async function GET() {
  try {
    const sizes = await prisma?.size.findMany({});

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("SIZE_POST", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

// CREATE/POST sizes /api/sizes
export async function POST(req: Request) {
  try {
    const { userId } = auth(); // check if authenticated
    const body = await req.json();

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

    const size = await prisma?.size.create({
      data: { name, value },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("SIZE_POST", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
