import { getUrl } from "@/app/actions";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";


export default async function Redirect({ params } : { params: Promise<{id : string}> }){
    const { id } = await params;

    const urlDoc = await getUrl(id);
  
    if (urlDoc) {
      redirect(urlDoc.originalUrl);
    }

    return notFound();
}
