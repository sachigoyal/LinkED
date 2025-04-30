import { dbConnect } from "@/lib/db";
import Url from "@/model/Url";
import { redirect } from "next/navigation";


export default async function Redirect({params} : {params: {id : string}}){
    await dbConnect();
    const urlDoc = await Url.findOne({ shortId: params.id });
  
    if (urlDoc) {
      redirect(urlDoc.originalUrl);
    }
  
    return <h1>404 - URL not found</h1>;
  
}