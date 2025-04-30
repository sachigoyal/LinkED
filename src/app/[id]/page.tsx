import { dbConnect } from "@/lib/db";
import Url from "@/model/Url";
import { redirect } from "next/navigation";


export default async function Redirect({ params } : { params: Promise<{id : string}> }){
    const { id } = await params;

    await dbConnect();
    const urlDoc = await Url.findOne({ shortId: id });
  
    if (urlDoc) {
      redirect(urlDoc.originalUrl);
    }
  
    return <h1>404 - URL not found</h1>;
}
