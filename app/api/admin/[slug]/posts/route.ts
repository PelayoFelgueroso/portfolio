import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const postType = await prisma.postType.findUnique({
    where: { slug },
    include: {
      posts: {
        include: {
          categories: true,
        },
      },
    },
  });

  if (!postType) {
    return NextResponse.json({ error: "PostType not found" }, { status: 404 });
  }

  return NextResponse.json(postType.posts);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await req.json();
  const { title, meta, categoryIds } = body;

  const postType = await prisma.postType.findUnique({
    where: { slug },
  });

  if (!postType) {
    return NextResponse.json({ error: "PostType not found" }, { status: 404 });
  }

  const newPost = await prisma.post.create({
    data: {
      title,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      content: "",
      postType: { connect: { slug } },
      data: meta || {},
      categoryIds: categoryIds || [],
      categories: {
        connect: (categoryIds || []).map((id: string) => ({ id })),
      },
    },
  });

  return NextResponse.json(newPost);
}
