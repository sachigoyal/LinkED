"use server"

import { dbConnect } from "@/lib/db"
import Url from "@/model/Url"
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { TUrl, TUserMetadata } from "@/types";

export async function createUrl(originalUrl: string, userMetadata?: TUserMetadata) {
  await dbConnect();

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

  // Only fetch non-deleted URLs
  const urls = await Url.find({ deletedAt: null }).sort({ createdAt: -1 });
  return urls.map(url => ({
    _id: url._id.toString(),
    originalUrl: url.originalUrl,
    shortId: url.shortId,
    createdAt: url.createdAt,
    deletedAt: url.deletedAt,
    userMetadata: url.userMetadata
  }));
}

export async function getUrl(shortId: string) {
  await dbConnect();

  // Only return non-deleted URLs
  const url = await Url.findOne({ shortId, deletedAt: null });
  return url;
}

export async function deleteUrl(urlId: string) {
  await dbConnect();

  // Soft delete: set deletedAt timestamp instead of actually deleting
  await Url.updateOne({ _id: urlId }, { deletedAt: new Date() });
  revalidatePath("/")
}

/**
 * Admin function to get all URLs including deleted ones
 * This can be used for admin dashboards or analytics
 */
export async function getAllUrls(includeDeleted: boolean = false): Promise<TUrl[]> {
  await dbConnect();

  const filter = includeDeleted ? {} : { deletedAt: null };
  const urls = await Url.find(filter).sort({ createdAt: -1 });
  
  return urls.map(url => ({
    _id: url._id.toString(),
    originalUrl: url.originalUrl,
    shortId: url.shortId,
    createdAt: url.createdAt,
    deletedAt: url.deletedAt,
    userMetadata: url.userMetadata
  }));
}

/**
 * Restore a soft-deleted URL
 */
export async function restoreUrl(urlId: string) {
  await dbConnect();

  await Url.updateOne({ _id: urlId }, { deletedAt: null });
  revalidatePath("/")
}