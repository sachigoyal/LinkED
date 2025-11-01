import mongoose, { Document, Schema } from "mongoose";

export interface IUserMetadata {
  ip?: string;
  userAgent?: string;
  language?: string;
  screenResolution?: string;
  timezone?: string;
  referrer?: string;
}

export interface IUrl extends Document {
  shortId: string;
  originalUrl: string;
  createdAt: Date;
  deletedAt?: Date | null;
  userMetadata?: IUserMetadata;
}

const UserMetadataSchema = new Schema<IUserMetadata>({
  ip: { type: String },
  userAgent: { type: String },
  language: { type: String },
  screenResolution: { type: String },
  timezone: { type: String },
  referrer: { type: String },
}, { _id: false });

const UrlSchema = new Schema<IUrl>({
  shortId: { type: String, required: true, unique: true },
  originalUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  deletedAt: { type: Date, default: null },
  userMetadata: { type: UserMetadataSchema },
}, {
  timestamps: true // This adds createdAt and updatedAt automatically
});

// Index for efficient querying of non-deleted URLs
UrlSchema.index({ deletedAt: 1 });

export default mongoose.models.Url || mongoose.model<IUrl>("Url", UrlSchema);
