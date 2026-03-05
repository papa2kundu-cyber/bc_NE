"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { blogService } from "@/services";
import AdminModal from "@/components/admin/AdminModal";
import { FormField, Input, Textarea, Select, FormActions } from "@/components/admin/FormField";
import { Globe, FileText, Edit2, Search, CheckCircle2 } from "lucide-react";
import {
  PAGE_KEYS,
  SeoSettings,
  defaultSeo,
  getAllPageSeo,
  getPageSeo,
  setPageSeo,
  getAllBlogSeo,
  getBlogSeo,
  setBlogSeo,
  SeoStore,
  BlogSeoStore,
} from "@/lib/seoStore";

const ROBOTS_OPTIONS = [
  { value: "index, follow", label: "index, follow (recommended)" },
  { value: "noindex, follow", label: "noindex, follow" },
  { value: "index, nofollow", label: "index, nofollow" },
  { value: "noindex, nofollow", label: "noindex, nofollow" },
];

const emptyForm: SeoSettings = {
  title: "",
  description: "",
  keywords: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  twitterTitle: "",
  twitterDescription: "",
  robots: "index, follow",
};

type ModalTarget =
  | { type: "page"; key: string; label: string }
  | { type: "blog"; id: number | string; title: string };

export default function SeoPage() {
  const [activeTab, setActiveTab] = useState<"pages" | "blogs">("pages");
  const [modalTarget, setModalTarget] = useState<ModalTarget | null>(null);
  const [form, setForm] = useState<SeoSettings>(emptyForm);
  const [pageSeoMap, setPageSeoMap] = useState<SeoStore>({});
  const [blogSeoMap, setBlogSeoMapState] = useState<BlogSeoStore>({});
  const [toast, setToast] = useState("");

  const refreshMaps = useCallback(() => {
    setPageSeoMap(getAllPageSeo());
    setBlogSeoMapState(getAllBlogSeo());
  }, []);

  useEffect(() => {
    refreshMaps();
  }, [refreshMaps]);

  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAllBlogs,
  });

  const openModal = (target: ModalTarget) => {
    const current =
      target.type === "page"
        ? getPageSeo(target.key)
        : getBlogSeo(target.id);
    setForm({ ...defaultSeo, ...current });
    setModalTarget(target);
  };

  const closeModal = () => setModalTarget(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalTarget) return;

    if (modalTarget.type === "page") {
      setPageSeo(modalTarget.key, form);
    } else {
      setBlogSeo(modalTarget.id, form);
    }

    refreshMaps();
    closeModal();
    setToast("SEO settings saved successfully.");
    setTimeout(() => setToast(""), 3000);
  };

  const modalTitle = modalTarget
    ? modalTarget.type === "page"
      ? `SEO — ${modalTarget.label}`
      : `Blog SEO — ${(modalTarget as { type: "blog"; id: number | string; title: string }).title}`
    : "";

  return (
    <div className="space-y-6 max-w-5xl mx-auto">

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
            SEO Settings
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage meta title, description, Open Graph and Twitter tags for all
            pages and blog posts.
          </p>
        </div>
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 self-start sm:self-auto flex-shrink-0">
          <Globe size={20} className="text-primary" />
        </div>
      </div>

      {/* Success toast */}
      {toast && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
          <CheckCircle2 size={16} />
          {toast}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-border gap-0">
        {(["pages", "blogs"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "pages" ? <Globe size={14} /> : <FileText size={14} />}
            {tab === "pages" ? "Pages" : "Blog Posts"}
          </button>
        ))}
      </div>

      {/* ── Pages tab ─────────────────────────────────────────────────────── */}
      {activeTab === "pages" && (
        <div className="grid grid-cols-1 gap-2">
          {PAGE_KEYS.map(({ key, label, path }) => {
            const seo = pageSeoMap[key];
            const hasCustom = !!(seo?.title && seo.title !== defaultSeo.title);
            return (
              <div
                key={key}
                className="flex items-center gap-4 p-4 bg-background border border-border rounded-xl hover:border-primary/40 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-foreground">
                      {label}
                    </span>
                    <code className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                      {path}
                    </code>
                    {hasCustom && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                        SEO Set
                      </span>
                    )}
                  </div>
                  {seo?.title && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1 font-medium">
                      {seo.title}
                    </p>
                  )}
                  {seo?.description && (
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {seo.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => openModal({ type: "page", key, label })}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex-shrink-0"
                >
                  <Edit2 size={12} />
                  Edit SEO
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Blog posts tab ────────────────────────────────────────────────── */}
      {activeTab === "blogs" && (
        <div className="grid grid-cols-1 gap-2">
          {blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
              <Search size={36} className="mb-3 opacity-30" />
              <p className="text-sm font-medium">No blog posts found.</p>
              <p className="text-xs mt-1">
                Create blog posts in the{" "}
                <strong className="text-foreground">Blocks</strong> section first.
              </p>
            </div>
          ) : (
            blogs.map((blog) => {
              const seo = blogSeoMap[blog.id];
              const hasCustom = !!(seo?.title);
              return (
                <div
                  key={blog.id}
                  className="flex items-center gap-4 p-4 bg-background border border-border rounded-xl hover:border-primary/40 transition-colors"
                >
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-14 h-12 object-cover rounded-lg border border-border flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-foreground line-clamp-1">
                        {blog.title}
                      </span>
                      {hasCustom && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          SEO Set
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {blog.publish_date} · {blog.username}
                    </p>
                    {seo?.description && (
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                        {seo.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      openModal({ type: "blog", id: blog.id, title: blog.title })
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex-shrink-0"
                  >
                    <Edit2 size={12} />
                    Edit SEO
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ── SEO Edit Modal ────────────────────────────────────────────────── */}
      <AdminModal
        title={modalTitle}
        isOpen={modalTarget !== null}
        onClose={closeModal}
        size="lg"
      >
        <form onSubmit={handleSave} className="space-y-5">

          {/* Basic SEO */}
          <section>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Basic SEO
            </h3>
            <div className="space-y-4">
              <FormField label="Meta Title" required hint="Recommended: 50–60 characters">
                <Input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Brightocity Interior — Luxury Home Design"
                  required
                  maxLength={120}
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {form.title.length} / 120
                </p>
              </FormField>

              <FormField label="Meta Description" required hint="Recommended: 150–160 characters">
                <Textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="Brief description shown in search results..."
                  required
                  maxLength={300}
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {form.description.length} / 300
                </p>
              </FormField>

              <FormField label="Keywords" hint="Comma-separated keywords">
                <Input
                  value={form.keywords}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, keywords: e.target.value }))
                  }
                  placeholder="e.g. interior design, luxury decor, home renovation"
                />
              </FormField>

              <FormField label="Robots Directive">
                <Select
                  options={ROBOTS_OPTIONS}
                  value={form.robots}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, robots: e.target.value }))
                  }
                />
              </FormField>
            </div>
          </section>

          {/* Open Graph */}
          <section className="border-t border-border pt-5">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Open Graph (Social Sharing)
            </h3>
            <div className="space-y-4">
              <FormField label="OG Title" hint="Leave blank to use Meta Title">
                <Input
                  value={form.ogTitle}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, ogTitle: e.target.value }))
                  }
                  placeholder="Fallback: uses Meta Title"
                />
              </FormField>

              <FormField
                label="OG Description"
                hint="Leave blank to use Meta Description"
              >
                <Textarea
                  rows={2}
                  value={form.ogDescription}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, ogDescription: e.target.value }))
                  }
                  placeholder="Fallback: uses Meta Description"
                />
              </FormField>

              <FormField
                label="OG Image URL"
                hint="Full URL to share image (1200×630 px recommended)"
              >
                <Input
                  value={form.ogImage}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, ogImage: e.target.value }))
                  }
                  placeholder="https://example.com/og-image.jpg"
                />
              </FormField>
            </div>
          </section>

          {/* Twitter / X */}
          <section className="border-t border-border pt-5">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Twitter / X Card
            </h3>
            <div className="space-y-4">
              <FormField label="Twitter Title" hint="Leave blank to use Meta Title">
                <Input
                  value={form.twitterTitle}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, twitterTitle: e.target.value }))
                  }
                  placeholder="Fallback: uses Meta Title"
                />
              </FormField>

              <FormField
                label="Twitter Description"
                hint="Leave blank to use Meta Description"
              >
                <Textarea
                  rows={2}
                  value={form.twitterDescription}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, twitterDescription: e.target.value }))
                  }
                  placeholder="Fallback: uses Meta Description"
                />
              </FormField>
            </div>
          </section>

          <FormActions onCancel={closeModal} isEdit isLoading={false} />
        </form>
      </AdminModal>
    </div>
  );
}
