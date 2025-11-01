"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"
import { Loader2 } from "lucide-react";
import { createUrl } from "@/app/actions";
import { validateUrl } from "@/lib/utils";
import { TUserMetadata } from "@/types";

export function UrlShortner() {
  const [submitting, setSubmitting] = useState(false);
  const [url, setUrl] = useState("");

  const getClientMetadata = (): TUserMetadata => {
    if (typeof window === 'undefined') return {};
    
    return {
      language: navigator?.language || undefined,
      screenResolution: window.screen ? `${window.screen.width}x${window.screen.height}` : undefined,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || undefined,
      userAgent: navigator?.userAgent || undefined,
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formattedUrl = validateUrl(url);
      if (!formattedUrl) {
        toast.error("Invalid URL")
        return
      }
      
      const userMetadata = getClientMetadata();
      
      await createUrl(formattedUrl, userMetadata);
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
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <Input type="text" placeholder="Enter URL" className="w-full" value={url} onChange={(e) => setUrl(e.target.value)} />
      <Button type="submit" disabled={submitting} className="gap-2 cursor-pointer">
        {submitting && <Loader2 className="animate-spin" />}
        Submit
      </Button>
    </form>
  )
}
