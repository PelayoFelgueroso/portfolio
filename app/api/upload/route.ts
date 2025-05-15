import { type NextRequest, NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"
import type { UploadApiResponse } from "cloudinary"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get("file") as File

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  try {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ resource_type: "auto", secure: true }, (error, result) => {
        if (error) return reject(error)
        resolve(result as UploadApiResponse)
      })
      stream.end(buffer)
    })

    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    const publicId = body.public_id

    if (!publicId) {
      return NextResponse.json({ error: "No public_id provided" }, { status: 400 })
    }

    const result = await cloudinary.uploader.destroy(publicId)

    if (result.result !== "ok") {
      return NextResponse.json({ error: `Failed to delete image: ${result.result}` }, { status: 500 })
    }

    return NextResponse.json({ message: "Image deleted successfully" })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json(
      { error: `Server error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 },
    )
  }
}
