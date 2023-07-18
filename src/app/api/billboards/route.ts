import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET billboards /api/billboards
export async function GET() {
  try {
    const billboards = await prisma?.billboard.findMany({});

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("BILLBOARD_POST", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

// CREATE/POST billboards /api/billboards
export async function POST(req: Request) {
  try {
    const { userId } = auth(); // check if authenticated
    const body = await req.json();

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

    const billboard = await prisma?.billboard.create({
      data: { label, imageUrl },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("BILLBOARD_POST", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
