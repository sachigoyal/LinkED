"use server"

import { dbConnect } from "@/lib/db"
import Url from "@/model/Url"
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

export async function createUrl(originalUrl: string) {
  await dbConnect();

  const shortId = nanoid(6);
  await Url.create({ shortId, originalUrl });

  revalidatePath("/")
}

export async function getUrls() {
  await dbConnect();

  const urls = await Url.find();
  return urls;
}

export async function deleteUrl(urlId: string) {
  await dbConnect();

  await Url.deleteOne({ _id: urlId });
  revalidatePath("/")
}