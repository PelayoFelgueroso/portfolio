import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const generateSlug = (input: string) =>
  input.toLowerCase().trim().replace(/\s+/g, "-");

export async function GET() {
  const postTypes = await prisma.postType.findMany();
  return NextResponse.json(postTypes);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json(
      { error: "PostType name is required" },
      { status: 400 }
    );
  }

  const slug = generateSlug(name);

  try {
    const postType = await prisma.postType.create({
      data: {
        name,
        slug,
      },
    });

    return NextResponse.json(postType);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to create PostType", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing PostType ID" }, { status: 400 });
  }

  try {
    await prisma.post.deleteMany({ where: { postTypeId: id } });
    await prisma.category.deleteMany({ where: { postTypeId: id } });
    await prisma.postType.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete PostType" },
      { status: 500 }
    );
  }
}
