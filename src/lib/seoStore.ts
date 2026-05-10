// SEO settings are persisted in localStorage so the admin can manage them
// without requiring backend API changes.

const SEO_KEY = "brightocity_seo_settings";
const BLOG_SEO_KEY = "brightocity_blog_seo_settings";

export interface SeoSettings {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  featureImage: string;
  robots: string;
  twitterTitle: string;
  twitterDescription: string;
}

export type SeoStore = Record<string, SeoSettings>;
export type BlogSeoStore = Record<string | number, SeoSettings>;

export const PAGE_KEYS: { key: string; label: string; path: string }[] = [
  { key: "home", label: "Home", path: "/" },
  { key: "about", label: "About", path: "/about" },
  { key: "blog", label: "Blog", path: "/blog" },
  { key: "contact", label: "Contact", path: "/contact" },
  { key: "faq", label: "FAQ", path: "/faq" },
  { key: "teams", label: "Teams", path: "/teams" },
  { key: "works", label: "Works", path: "/works" },
  { key: "interior", label: "Interior", path: "/interior" },
  { key: "video-gallery", label: "Video Gallery", path: "/video-gallery" },
  { key: "rate", label: "Rate / Reviews", path: "/rate" },
];

export const defaultSeo: any = {
  title: "Brightocity Interior",
  description:
    "We craft timeless interiors that tell your story. Every space deserves to be extraordinary.",
  keywords: "interior design, home decor, luxury interiors, Brightocity",
  canonicalUrl: "",
  ogTitle: "Brightocity Interior",
  ogDescription:
    "We craft timeless interiors that tell your story. Every space deserves to be extraordinary.",
  ogImage: "",
  featureImage: "",
  robots: "index, follow",
};

export const defaultSeoMap: Record<string, SeoSettings> = {
  home: {
    title:
      "Best Interior Designers in Kolkata | Premium & Affordable Design Solutions",
    description:
      "Looking for the best Interior Designers in Kolkata? We create premium, personalised spaces with comfort and style. Trusted among top interior decorators in Kolkata for quality design.",
    keywords:
      "interior designers Kolkata, home interior Kolkata, luxury interiors Kolkata",
    canonicalUrl: "/",
    ogTitle:
      "Best Interior Designers in Kolkata | Premium & Affordable Design Solutions",
    ogDescription:
      "Looking for the best Interior Designers in Kolkata? We create premium, personalised spaces with comfort and style.",
    ogImage: "",
    featureImage: "",
    robots: "index, follow",
    twitterTitle:
      "Best Interior Designers in Kolkata | Premium & Affordable Design Solutions",
    twitterDescription:
      "Premium & affordable interior design solutions in Kolkata.",
  },

  service: {
    title:
      "Top Luxury Interior Designers in Kolkata | Elegant & Modern Interiors",
    description:
      "Bring luxury to life with luxury interior designers in Kolkata. From contemporary to classic, we design exquisite interiors that combine elegance with functionality.",
    keywords: "luxury interior Kolkata, modern interiors, interior services",
    canonicalUrl: "/services",
    ogTitle:
      "Top Luxury Interior Designers in Kolkata | Elegant & Modern Interiors",
    ogDescription:
      "Elegant and modern luxury interiors crafted for your lifestyle.",
    ogImage: "",
    featureImage: "",
    robots: "index, follow",
    twitterTitle:
      "Top Luxury Interior Designers in Kolkata | Elegant & Modern Interiors",
    twitterDescription:
      "Elegant interiors combining luxury and functionality.",
  },

  interior: {
    title:
      "Home Interior Designers in Kolkata | Stylish & Personalised Interiors",
    description:
      "Transform your home with expert home interior designers in Kolkata. We create beautiful, functional, and personalised interiors to reflect your lifestyle.",
    keywords: "home interiors Kolkata, personalised interiors, home decor",
    canonicalUrl: "/interior",
    ogTitle:
      "Home Interior Designers in Kolkata | Stylish & Personalised Interiors",
    ogDescription:
      "Beautiful and personalised home interiors designed for your lifestyle.",
    ogImage: "",
    featureImage: "",
    robots: "index, follow",
    twitterTitle:
      "Home Interior Designers in Kolkata | Stylish & Personalised Interiors",
    twitterDescription:
      "Transform your home with expert interior designers.",
  },

  flatInterior: {
    title:
      "Flat Interior Designer in Kolkata – Stylish & Functional Interiors",
    description:
      "Revamp your flat with the top flat interior designer in Kolkata. We deliver stylish and functional interiors that make every corner shine.",
    keywords: "flat interior Kolkata, apartment design, small space design",
    canonicalUrl: "/interior/flat",
    ogTitle:
      "Flat Interior Designer in Kolkata – Stylish & Functional Interiors",
    ogDescription:
      "Stylish and functional interiors for flats and apartments.",
    ogImage: "",
    featureImage: "",
    robots: "index, follow",
    twitterTitle:
      "Flat Interior Designer in Kolkata – Stylish & Functional Interiors",
    twitterDescription:
      "Make every corner of your flat shine with smart design.",
  },

  kitchenInterior: {
    title:
      "Explore the top Kitchen Interior Design Kolkata has for your Modern Kitchens",
    description:
      "Upgrade your kitchen with the kitchen interior design Kolkata has to offer. Our modern, technical, and smart kitchen space solutions will blow your mind.",
    keywords: "kitchen design Kolkata, modular kitchen, modern kitchen",
    canonicalUrl: "/interior/kitchen",
    ogTitle:
      "Top Kitchen Interior Design in Kolkata | Modern Kitchens",
    ogDescription:
      "Smart and modern kitchen design solutions in Kolkata.",
    ogImage: "",
    featureImage: "",
    robots: "index, follow",
    twitterTitle:
      "Modern Kitchen Interior Design in Kolkata",
    twitterDescription:
      "Upgrade your kitchen with smart and stylish designs.",
  },

  bathroomInterior: {
    title: "Top Modern Bathroom Interior Design | Sleek & Contemporary",
    description:
      "Bring elegance to your bathroom with modern bathroom interior design. Our designers craft beautiful, luxurious bathrooms that inspire.",
    keywords: "bathroom design, modern bathroom, luxury bathroom",
    canonicalUrl: "/interior/bathroom",
    ogTitle: "Modern Bathroom Interior Design | Sleek & Contemporary",
    ogDescription:
      "Luxurious and elegant bathroom interiors that inspire.",
    ogImage: "",
    featureImage: "",
    robots: "index, follow",
    twitterTitle: "Modern Bathroom Interior Design",
    twitterDescription:
      "Elegant and contemporary bathroom interiors.",
  },

  officeInterior: {
    title:
      "Get productive workspaces done with office interior designers in Kolkata",
    description:
      "Enhance your workspace with renowned office interior designers in Kolkata. They create such inspiring office interiors that undoubtedly boost productivity and brand image.",
    keywords: "office interiors Kolkata, workspace design, corporate interiors",
    canonicalUrl: "/interior/office",
    ogTitle:
      "Office Interior Designers in Kolkata | Productive Workspaces",
    ogDescription:
      "Designing inspiring office interiors to boost productivity.",
    ogImage: "",
    featureImage: "",
    robots: "index, follow",
    twitterTitle:
      "Office Interior Designers in Kolkata",
    twitterDescription:
      "Boost productivity with inspiring workspace design.",
  },
};

function readStore<T extends object>(key: string): T {
  if (typeof window === "undefined") return {} as T;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : ({} as T);
  } catch {
    return {} as T;
  }
}

function writeStore<T extends object>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

// ── Page SEO ────────────────────────────────────────────────────────────────

export function getAllPageSeo(): SeoStore {
  return readStore<SeoStore>(SEO_KEY);
}

export function getPageSeo(pageKey: string): SeoSettings {
  const store = getAllPageSeo();

  return store[pageKey]
    ? { ...defaultSeoMap[pageKey], ...store[pageKey] }
    : defaultSeoMap[pageKey] || defaultSeo;
}

export function setPageSeo(pageKey: string, settings: SeoSettings): void {
  const store = getAllPageSeo();
  store[pageKey] = settings;
  writeStore(SEO_KEY, store);
}

// ── Blog SEO ────────────────────────────────────────────────────────────────

export function getAllBlogSeo(): BlogSeoStore {
  return readStore<BlogSeoStore>(BLOG_SEO_KEY);
}

export function getBlogSeo(blogId: string | number): SeoSettings {
  const store = getAllBlogSeo();
  return store[blogId] ? { ...defaultSeo, ...store[blogId] } : { ...defaultSeo };
}

export function setBlogSeo(blogId: string | number, settings: SeoSettings): void {
  const store = getAllBlogSeo();
  store[blogId] = settings;
  writeStore(BLOG_SEO_KEY, store);
}
