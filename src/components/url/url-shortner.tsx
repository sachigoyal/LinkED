"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"
import { Loader2 } from "lucide-react";
import { createUrl } from "@/app/actions";

export function UrlShortner() {
  const [submitting, setSubmitting] = useState(false);
  const [url, setUrl] = useState("");

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      await createUrl(url);
      toast.success("URL shortened successfully")
      setUrl("")
    } catch (error) {
      console.error(error)
      toast.error("Failed to shorten URL")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <Input type="text" placeholder="Enter URL" className="w-full" value={url} onChange={(e) => setUrl(e.target.value)} />
      <Button onClick={handleSubmit} disabled={submitting} className="gap-2 cursor-pointer">
        {submitting && <Loader2 className="animate-spin" />}
        Submit
      </Button>
    </div>
  )
}
