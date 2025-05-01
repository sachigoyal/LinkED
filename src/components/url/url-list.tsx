import { getUrls } from "@/app/actions";
import { LinkIcon } from "lucide-react";
import { UrlListClient } from "./url-list-client";

export async function UrlList() {
  const urls = await getUrls();
  const BASE_URL = process.env.BASE_URL;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <LinkIcon className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold">Shortened URLs</h2>
      </div>

      {urls.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">No URLs have been shortened yet</p>
        </div>
      ) : (
        <UrlListClient urls={urls} baseUrl={BASE_URL || ""} />
      )}
    </div>
  )
}
