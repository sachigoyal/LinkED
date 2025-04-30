"use client"

import { IUrl } from "@/model/Url"
import { deleteUrl } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Loader2, Trash } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"

type UrlCardProps = {
  urlId: string;
}

export function UrlDeleteAction({ urlId }: UrlCardProps) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteUrl(urlId);
      toast.success("URL deleted successfully")
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete URL")
    } finally {
      setDeleting(false);
    }
  }
  
  return (
    <Button
      variant="destructive"
      size="icon"
      disabled={deleting}
      onClick={handleDelete}
      className="h-8 w-8 cursor-pointer"
    >
      {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash className="h-4 w-4" />}
      <span className="sr-only">Delete URL</span>
    </Button>
  )
}
