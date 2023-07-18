import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET catefories /api/categories
export async function GET() {
  try {
    const categories = await prisma?.category.findMany({});

    return NextResponse.json(categories);
  } catch (error) {
    console.log("CATEGORY_POST", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

// CREATE/POST categories /api/categories
export async function POST(req: Request) {
  try {
    const { userId } = auth(); // check if authenticated
    const body = await req.json();

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

    const category = await prisma?.category.create({
      data: { name, billboardId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("CATEGORY_POST", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
