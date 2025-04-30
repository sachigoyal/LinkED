import { Header } from "@/components/header";
import { UrlList } from "@/components/url-list";
import { UrlShortner } from "@/components/url-shortner";
import { UrlListSkeleton } from "@/components/url-skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <Header />
      <UrlShortner />
      <Suspense fallback={<UrlListSkeleton />}>
        <UrlList />
      </Suspense>
    </div>
  );
}
