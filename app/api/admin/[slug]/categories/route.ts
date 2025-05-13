import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const postTypeRecord = await prisma.postType.findUnique({
    where: { slug: slug },
    include: { categories: { include: { posts: true } } },
  });

  if (!postTypeRecord) {
    return NextResponse.json({ error: "PostType not found" }, { status: 404 });
  }

  return NextResponse.json(postTypeRecord.categories);
}

export async function POST(
  req: NextRequest,
  { params }: { params:  Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await req.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json(
      { error: "Category name is required" },
      { status: 400 }
    );
  }

  const postTypeRecord = await prisma.postType.findUnique({
    where: { slug: slug },
  });

  if (!postTypeRecord) {
    return NextResponse.json({ error: "PostType not found" }, { status: 404 });
  }

  const category = await prisma.category.create({
    data: {
      name,
      postTypeId: postTypeRecord.id,
    },
  });

  return NextResponse.json(category);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing Category ID" }, { status: 400 });
  }

  try {
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete Category" },
      { status: 500 }
    );
  }
}
