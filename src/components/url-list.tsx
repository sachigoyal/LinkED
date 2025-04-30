import { getUrls } from "@/app/actions";
import { ExternalLink } from "lucide-react";

export async function UrlList() {
  const urls = await getUrls();
  const BASE_URL = process.env.BASE_URL;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Shortened URLs</h2>

      <div className="relative w-full overflow-auto border rounded-lg">
        <table className="w-full caption-bottom text-sm">
          <thead className="bg-muted">
            <tr className="border-b">
              <th className="h-12 px-4 text-left align-middle">Original URL</th>
              <th className="h-12 px-4 text-left align-middle">Short URL</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url._id} className="border-b">
                <td className="p-4 align-middle">
                  <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline w-fit">
                    {url.originalUrl}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </td>
                <td className="p-4 align-middle">
                  <a href={`${BASE_URL}/${url.shortId}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline w-fit">
                    {`${BASE_URL}/${url.shortId}`}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
