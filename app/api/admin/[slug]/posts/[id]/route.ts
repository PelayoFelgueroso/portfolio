import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  const { slug, id } = await params;

  const postType = await prisma.postType.findUnique({
    where: { slug },
  });

  if (!postType) {
    return NextResponse.json({ error: "PostType not found" }, { status: 404 });
  }

  const post = await prisma.post.findFirst({
    where: {
      id,
    },
    include: {
      categories: true,
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  const { slug, id } = await params;
  const body = await req.json();
  const { title, data, categoryIds, postSlug } = body;

  const postType = await prisma.postType.findUnique({
    where: { slug },
  });

  if (!postType) {
    return NextResponse.json({ error: "PostType not found" }, { status: 404 });
  }

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post || post.postTypeId !== postType.id) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const updated = await prisma.post.update({
    where: { id },
    data: {
      slug: postSlug,
      title,
      categoryIds: categoryIds || [],
      categories: {
        set: [],
        connect: (categoryIds || []).map((id: string) => ({ id })),
      },
      data,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  const { slug, id } = await params;

  const postType = await prisma.postType.findUnique({
    where: { slug },
  });

  if (!postType) {
    return NextResponse.json({ error: "PostType not found" }, { status: 404 });
  }

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post || post.postTypeId !== postType.id) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  await prisma.post.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Post deleted" });
}
