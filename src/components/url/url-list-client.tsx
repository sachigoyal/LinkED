"use client"

import { useState } from "react"
import { ExternalLink, Loader2, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deleteUrl } from "@/app/actions"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Url = {
  _id: string;
  originalUrl: string
  shortId: string
}

type UrlListClientProps = {
  urls: Url[]
  baseUrl: string
}

export function UrlListClient({ urls, baseUrl }: UrlListClientProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedUrlId, setSelectedUrlId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteClick = (urlId: string) => {
    setSelectedUrlId(urlId)
    setIsOpen(true)
  }

  const handleDelete = async () => {
    if (!selectedUrlId) return

    try {
      setIsDeleting(true)
      await deleteUrl(selectedUrlId)
      toast.success("URL deleted successfully")
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete URL")
    } finally {
      setIsDeleting(false)
      setIsOpen(false)
      setSelectedUrlId(null)
    }
  }

  return (
    <>
      <div className="relative w-full border rounded-lg shadow-sm bg-card overflow-hidden">
        <div className="relative max-h-[65vh] overflow-y-auto">
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
                <tr key={url._id.toString()} className="border-b hover:bg-muted/20 transition-colors">
                  <td className="p-4 align-middle">
                    <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline w-fit text-muted-foreground hover:text-primary transition-colors">
                      <span className="truncate max-w-[300px]">{url.originalUrl}</span>
                      <ExternalLink className="h-4 w-4 flex-shrink-0" />
                    </a>
                  </td>
                  <td className="p-4 align-middle">
                    <a href={`${baseUrl}/${url.shortId}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline w-fit font-medium">
                      {`${baseUrl}/${url.shortId}`}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </td>
                  <td className="p-4 align-middle text-right">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8 cursor-pointer"
                      onClick={() => handleDeleteClick(url._id.toString())}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete URL</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the shortened URL.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
} 