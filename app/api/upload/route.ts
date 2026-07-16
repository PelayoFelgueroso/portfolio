import { type NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const folder = body.folder || "uploads";

    const timestamp = Math.round(Date.now() / 1000);

    // Los parámetros firmados aquí deben coincidir EXACTAMENTE
    // con los que se envíen desde el cliente al subir a Cloudinary
    const paramsToSign = {
      timestamp,
      folder,
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!,
    );

    return NextResponse.json({
      signature,
      timestamp,
      folder,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (error) {
    console.error("Sign error:", error);
    return NextResponse.json(
      { error: "Failed to sign upload" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const publicId = body.public_id;

    if (!publicId) {
      return NextResponse.json(
        { error: "No public_id provided" },
        { status: 400 },
      );
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      return NextResponse.json(
        { error: `Failed to delete image: ${result.result}` },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      {
        error: `Server error: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    );
  }
}
