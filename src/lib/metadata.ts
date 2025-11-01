import { NextRequest } from "next/server";
import { TUserMetadata } from "@/types";

export function extractUserMetadata(req: NextRequest): TUserMetadata {
  return {
    ip: req.headers.get('x-forwarded-for') || 
        req.headers.get('x-real-ip') || 
        req.headers.get('cf-connecting-ip') || // Cloudflare
        undefined,
    userAgent: req.headers.get('user-agent') || undefined,
    language: req.headers.get('accept-language')?.split(',')[0] || undefined,
    referrer: req.headers.get('referer') || undefined,
  };
}

export function mergeUserMetadata(
  serverMetadata: TUserMetadata,
  clientMetadata?: TUserMetadata
): TUserMetadata {
  return {
    ...serverMetadata,
    ...clientMetadata,
  };
}

