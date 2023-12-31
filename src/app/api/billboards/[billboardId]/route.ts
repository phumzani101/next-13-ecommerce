import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET billboard /api/billboards/[billboardId]
export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      billboardId: string;
    };
  }
) {
  try {
    const billboardId = params.billboardId;

    if (!billboardId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const billboard = await prismadb.billboard.findUnique({
      where: { id: billboardId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("BILLBOARD_GET", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

// Update/PATCH billboard /api/billboards/[billboardId]
export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      billboardId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const { label, imageUrl } = await req.json();

    const billboardId = params.billboardId;

    if (!userId) {
      return new NextResponse("Unauthenicated", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse(" Image is required", { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const billboard = await prismadb.billboard.updateMany({
      where: { id: params.billboardId },
      data: { label, imageUrl },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("BILLBOARD_PATCH", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

// DELETE billboard /api/billboards/[billboardId]
export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      billboardId: string;
    };
  }
) {
  try {
    const { userId } = auth();

    const billboardId = params.billboardId;

    if (!userId) {
      return new NextResponse("Unauthenicated", { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const billboard = await prismadb.billboard.deleteMany({
      where: { id: billboardId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("BILLBOARD_DELETE", error);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
