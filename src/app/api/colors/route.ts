import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET catefories /api/colors
export async function GET() {
  try {
    const colors = await prisma?.color.findMany({});

    return NextResponse.json(colors);
  } catch (error) {
    console.log("SIZE_POST", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

// CREATE/POST colors /api/colors
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

    const color = await prisma?.color.create({
      data: { name, value },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("SIZE_POST", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
