"use server"

import { dbConnect } from "@/lib/db"
import Url from "@/model/Url"
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { TUrl, TUserMetadata } from "@/types";
import { headers } from "next/headers";
import { mergeUserMetadata } from "@/lib/metadata";

export async function createUrl(originalUrl: string, clientMetadata?: TUserMetadata) {
  await dbConnect();

  const headersList = await headers();
  const serverMetadata: TUserMetadata = {
    ip: headersList.get('x-forwarded-for') || 
        headersList.get('x-real-ip') || 
        headersList.get('cf-connecting-ip') || // Cloudflare
        undefined,
    userAgent: headersList.get('user-agent') || undefined,
    referrer: headersList.get('referer') || undefined,
  };

  const userMetadata = mergeUserMetadata(serverMetadata, clientMetadata);

  const shortId = nanoid(6);
  await Url.create({ 
    shortId, 
    originalUrl,
    userMetadata,
    createdAt: new Date(),
    deletedAt: null
  });

  revalidatePath("/")
}

export async function getUrls(): Promise<TUrl[]> {
  await dbConnect();

  const urls = await Url.find({ deletedAt: null }).sort({ createdAt: -1 });
  return urls.map(url => ({
    _id: url._id.toString(),
    originalUrl: url.originalUrl,
    shortId: url.shortId
  }));
}

export async function getUrl(shortId: string) {
  await dbConnect();

  const url = await Url.findOne({ shortId, deletedAt: null });
  return url;
}

export async function deleteUrl(urlId: string) {
  await dbConnect();
  await Url.updateOne({ _id: urlId }, { deletedAt: new Date() });
  revalidatePath("/")
}

export async function getAllUrls(includeDeleted: boolean = false): Promise<TUrl[]> {
  await dbConnect();

  const filter = includeDeleted ? {} : { deletedAt: null };
  const urls = await Url.find(filter).sort({ createdAt: -1 });
  
  return urls.map(url => ({
    _id: url._id.toString(),
    originalUrl: url.originalUrl,
    shortId: url.shortId
  }));
}

export async function restoreUrl(urlId: string) {
  await dbConnect();

  await Url.updateOne({ _id: urlId }, { deletedAt: null });
  revalidatePath("/")
}