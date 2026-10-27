export type Category =
  | "llm-prompt"
  | "visual-prompt"
  | "custom-ai"
  | "resource"
  | "tutorial"
  | "founder-space"
  | "course";

export type AccessLevel = "free" | "paid";

export type Resource = {
  id: string;
  title: string;
  description: string;
  category: Category;
  access_level: AccessLevel;
  teaser: string;
  tools: string[];
  topics: string[];
  thumbnail?: string;
  prompt_preview?: string;
  steps?: string[];
  tips?: string[];
  body?: string;
  modules?: { title: string; sequence: number; video_url?: string; notes?: string }[];
};

export type PublicResource = {
  id: string;
  title: string;
  description: string;
  category: Category;
  access_level: AccessLevel;
  teaser: string;
  tools: string[];
  topics: string[];
  thumbnail?: string;
  moduleCount?: number;
};

export type Product = {
  slug: string;
  title: string;
  description: string;
  price: number;
  currency: "IDR";
  includes: string[];
  visibility: "public";
  thumbnail?: string;
  features?: string[];
  originalPrice?: number;
  badge?: string;
};

export type Bundle = Product;

export type User = {
  id: string;
  name: string;
  email: string;
};

export type OrderStatus = "paid" | "pending" | "failed";

export type Order = {
  id: string;
  date: string;
  productSlug: string;
  productTitle: string;
  amount: number;
  currency: "IDR";
  status: OrderStatus;
};

export type Grant = string;
