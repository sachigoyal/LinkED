"use server"

import { dbConnect } from "@/lib/db"
import Url from "@/model/Url"
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { TUrl } from "@/types";

export async function createUrl(originalUrl: string) {
  await dbConnect();

  const shortId = nanoid(6);
  await Url.create({ shortId, originalUrl });

  revalidatePath("/")
}

export async function getUrls(): Promise<TUrl[]> {
  await dbConnect();

  const urls = await Url.find();
  return urls.map(url => ({
    _id: url._id.toString(),
    originalUrl: url.originalUrl,
    shortId: url.shortId
  }));
}

export async function getUrl(shortId: string) {
  await dbConnect();

  const url = await Url.findOne({ shortId });
  return url;
}

export async function deleteUrl(urlId: string) {
  await dbConnect();

  await Url.deleteOne({ _id: urlId });
  revalidatePath("/")
}