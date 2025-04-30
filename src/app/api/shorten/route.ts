import { dbConnect } from "@/lib/db";
import Url from "@/model/Url";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { originalUrl }: { originalUrl: string } = await req.json();
  await dbConnect();

  const shortId = nanoid(6);
  await Url.create({ shortId, originalUrl });

  return NextResponse.json({
    shortUrl: `${process.env.BASE_URL}/${shortId}`,
  });
}
