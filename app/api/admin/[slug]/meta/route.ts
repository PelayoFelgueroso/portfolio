import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const postType = await prisma.postType.findUnique({
    where: { slug },
    select: { meta: true },
  });

  if (!postType) {
    return NextResponse.json({ error: "PostType not found" }, { status: 404 });
  }

  return NextResponse.json(postType.meta || []);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await req.json();
  const { meta } = body;

  // Verifica si el PostType existe
  const postType = await prisma.postType.findUnique({
    where: { slug },
  });

  if (!postType) {
    return NextResponse.json({ error: "PostType not found" }, { status: 404 });
  }

  // Actualiza los metacampos en el PostType
  const updatedPostType = await prisma.postType.update({
    where: { slug },
    data: {
      meta: meta || null, // Aquí se guarda el objeto JSON de los metacampos
    },
  });

  return NextResponse.json(updatedPostType);
}
