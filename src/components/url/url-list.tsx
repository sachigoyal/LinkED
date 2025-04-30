import { getUrls } from "@/app/actions";
import { ExternalLink, LinkIcon } from "lucide-react";
import { UrlDeleteAction } from "./url-card";

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
        <div className="grid gap-4">
          <div className="relative w-full border rounded-lg shadow-sm bg-card">
            <div className="relative max-h-[70vh] overflow-y-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="bg-muted/50 sticky top-0 backdrop-blur-md">
                  <tr className="border-b">
                    <th className="h-12 px-4 text-left align-middle font-medium">Original URL</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Short URL</th>
                    <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {urls.map((url) => (
                    <tr key={url._id} className="border-b hover:bg-muted/20 transition-colors">
                      <td className="p-4 align-middle">
                        <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline w-fit text-muted-foreground hover:text-primary transition-colors">
                          <span className="truncate max-w-[300px]">{url.originalUrl}</span>
                          <ExternalLink className="h-4 w-4 flex-shrink-0" />
                        </a>
                      </td>
                      <td className="p-4 align-middle">
                        <a href={`${BASE_URL}/${url.shortId}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline w-fit font-medium">
                          {`${BASE_URL}/${url.shortId}`}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </td>
                      <td className="p-4 align-middle text-right">
                        <UrlDeleteAction urlId={url._id.toString()} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
