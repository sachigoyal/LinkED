import { dbConnect } from "@/lib/db";
import Url from "@/model/Url";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { extractUserMetadata } from "@/lib/metadata";

export async function POST(req: NextRequest) {
  const { originalUrl }: { originalUrl: string } = await req.json();
  await dbConnect();

  // Extract user metadata from request headers
  const userMetadata = extractUserMetadata(req);

  const shortId = nanoid(6);
  await Url.create({ 
    shortId, 
    originalUrl,
    userMetadata,
    createdAt: new Date(),
    deletedAt: null
  });

  return NextResponse.json({
    shortUrl: `${process.env.BASE_URL}/${shortId}`,
  });
}
