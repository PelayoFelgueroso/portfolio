import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  const { slug, id } = await params;

  try {
    const postType = await prisma.postType.findUnique({
      where: { slug },
    });

    if (!postType) {
      return NextResponse.json(
        { error: "PostType not found" },
        { status: 404 }
      );
    }

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post || post.postTypeId !== postType.id) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (!post.content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return new NextResponse(post.content, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Error fetching post content:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  const { slug, id } = await params;

  try {
    const content = await req.text();

    const postType = await prisma.postType.findUnique({
      where: { slug },
    });

    if (!postType) {
      return NextResponse.json(
        { error: "PostType not found" },
        { status: 404 }
      );
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
        content: content,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      updated,
      message: "Content saved successfully",
    });
  } catch (error) {
    console.error("Error saving post content:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
