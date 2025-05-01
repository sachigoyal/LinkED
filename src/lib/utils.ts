import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateUrl(url: string) {
  try {
    const formattedUrl = formatUrl(url);
    new URL(formattedUrl);
    return formattedUrl;
  } catch (error) {
    return null;
  }
}

export function formatUrl(url: string) {
  if (!url.startsWith("https://")) {
    url = "https://" + url;
  }
  return url;
}