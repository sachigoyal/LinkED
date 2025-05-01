export function UrlListSkeleton() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Shortened URLs</h2>

      <div className="relative w-full overflow-auto border rounded-lg">
        <table className="w-full caption-bottom text-sm">
          <thead className="bg-muted">
            <tr className="border-b">
              <th className="h-12 px-4 text-left align-middle">Original URL</th>
              <th className="h-12 px-4 text-left align-middle">Short URL</th>
              <th className="h-12 px-4 text-right align-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="border-b">
                <td className="p-4 align-middle">
                  <div className="w-full h-4 bg-muted rounded-md animate-pulse"></div>
                </td>
                <td className="p-4 align-middle">
                  <div className="w-full h-4 bg-muted rounded-md animate-pulse"></div>
                </td>
                <td className="p-4 align-right">
                  <div className="ml-auto w-4 h-4 bg-muted rounded-md animate-pulse"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
