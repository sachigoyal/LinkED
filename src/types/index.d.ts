export type TUserMetadata = {
  ip?: string;
  userAgent?: string;
  language?: string;
  screenResolution?: string;
  timezone?: string;
  referrer?: string;
}

export type TUrl = {
  _id: string;
  originalUrl: string;
  shortId: string;
}

export type SiteConfig = {
  name: string;
  title: string;
  description: string;
  origin: string;
  og: string;
  keywords: string[];
  creator: {
    name: string;
    url: string;
  }
  socials: {
    github: string;
    x: string;
  }
}