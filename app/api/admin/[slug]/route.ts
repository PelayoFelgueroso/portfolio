import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const postTypeRecord = await prisma.postType.findUnique({
    where: { slug: slug },
    include: { categories: true },
  });

  if (!postTypeRecord) {
    return NextResponse.json({ error: "PostType not found" }, { status: 404 });
  }

  return NextResponse.json(postTypeRecord);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }>}
) {
  const { slug } = await params;
  const body = await req.json();
  const { meta } = body;

  const postTypeRecord = await prisma.postType.findUnique({
    where: { slug: slug },
  });

  if (!postTypeRecord) {
    return NextResponse.json({ error: "PostType not found" }, { status: 404 });
  }

  const updatedPostType = await prisma.postType.update({
    where: { slug: slug },
    data: {
      meta: meta || null,
    },
  });

  return NextResponse.json(updatedPostType);
}
