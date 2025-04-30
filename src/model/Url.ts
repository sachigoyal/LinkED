import mongoose, { Document, Schema } from "mongoose";

export interface IUrl extends Document {
  shortId: string;
  originalUrl: string;
}

const UrlSchema = new Schema<IUrl>({
  shortId: { type: String, required: true, unique: true },
  originalUrl: { type: String, required: true },
});

export default mongoose.models.Url || mongoose.model<IUrl>("Url", UrlSchema);

