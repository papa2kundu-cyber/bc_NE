"use client";

import { useState, useEffect } from "react";
import { type Review } from "@/lib/adminStore";
import { getReviews, persistReviews } from "@/lib/reviewStore";
import AdminTable, { Column } from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import { FormField, Input, Textarea, FormActions } from "@/components/admin/FormField";
import { Star, X, ImageIcon, Send } from "lucide-react";

const emptyForm: Omit<Review, "id"> = {
  name: "",
  email: "",
  phone: "",
  rating: 5,
  description: "",
  images: [],
  allowed: true,
};

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="transition-colors"
          style={{ color: star <= value ? "#dd7139" : "#e5e7eb" }} // #e5e7eb is text-muted / gray-200
        >
          <Star size={22} fill={star <= value ? "#dd7139" : "none"} />
        </button>
      ))}
      <span className="ml-2 text-sm text-muted-foreground">{value} / 5</span>
    </div>
  );
}

function buildRatingLink(name: string, email: string): string {
  const base = typeof window !== "undefined" ? window.location.origin : "";
  const params = new URLSearchParams({ name, email });
  return `${base}/rate?${params.toString()}`;
}

function dispatchRatingEmail(name: string, email: string) {
  const link = buildRatingLink(name, email);
  const subject = encodeURIComponent("We'd love your feedback — Rate Your Experience");
  const body = encodeURIComponent(
    `Hi ${name},\n\nThank you for choosing us! We hope you had a wonderful experience.\n\nWe'd love to hear your thoughts. Please take a moment to share your rating using the link below:\n\n${link}\n\nYour feedback means a lot to us.\n\nWarm regards,\nBrightocity Interior`
  );
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}

const emptySendForm = { name: "", email: "" };

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Review | null>(null);
  const [form, setForm]: any = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Send rating link modal
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [sendForm, setSendForm] = useState(emptySendForm);

  const toggleAllowed = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, allowed: !r.allowed } : r))
    );
  };

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    dispatchRatingEmail(sendForm.name, sendForm.email);
    setSendModalOpen(false);
    setSendForm(emptySendForm);
  };

  // Load from localStorage on mount (includes customer-submitted reviews)
  useEffect(() => {
    setReviews(getReviews());
  }, []);

  // Sync to localStorage whenever reviews change
  useEffect(() => {
    if (reviews.length > 0) persistReviews(reviews);
  }, [reviews]);

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (review: Review) => {
    setEditItem(review);
    setForm({
      name: review.name,
      email: review.email,
      phone: review.phone,
      rating: review.rating,
      description: review.description,
      images: [...review.images],
    });
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setReviews((prev) => prev.filter((r) => r.id !== deleteId));
      setDeleteId(null);
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remaining = 5 - form.images.length;
    const toProcess = files.slice(0, remaining);
    toProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((f) => ({
          ...f,
          images: [...f.images, reader.result as string].slice(0, 5),
        }));
      };
      reader.readAsDataURL(file);
    });
    // Reset input so same files can be re-selected if needed
    e.target.value = "";
  };

  const removeImage = (idx: number) => {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      setReviews((prev) =>
        prev.map((r) => (r.id === editItem.id ? { ...r, ...form } : r))
      );
    } else {
      setReviews((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    }
    setModalOpen(false);
  };

  const columns: Column<Review>[] = [
    {
      key: "allowed",
      label: "Status",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            role="switch"
            aria-checked={row.allowed}
            onClick={() => toggleAllowed(row.id)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${row.allowed ? "bg-green-500" : "bg-gray-300"
              }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 ${row.allowed ? "translate-x-4" : "translate-x-0"
                }`}
            />
          </button>
          <span className={`text-xs font-medium ${row.allowed ? "text-green-600" : "text-gray-400"}`}>
            {row.allowed ? "Allowed" : "Hidden"}
          </span>
        </div>
      ),
    },
    {
      key: "name",
      label: "Reviewer",
      render: (row) => (
        <div>
          <p className="font-medium text-foreground">{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
        </div>
      ),
    },
    {
      key: "rating",
      label: "Rating",
      render: (row) => (
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={13}
              style={{ color: s <= row.rating ? "#dd7139" : "#e5e7eb" }}
              fill={s <= row.rating ? "#dd7139" : "none"}
            />
          ))}
        </div>
      ),
    },
    {
      key: "description",
      label: "Review",
      render: (row) => (
        <span className="line-clamp-1 max-w-xs text-muted-foreground text-sm">{row.description.slice(0, 20) + (row.description?.length > 20 ? `...` : ``)}</span>
      ),
    },
    {
      key: "images",
      label: "Images",
      render: (row) => (
        <div className="flex items-center gap-1">
          {row.images.length === 0 ? (
            <span className="text-xs text-muted-foreground">None</span>
          ) : (
            <>
              {row.images.slice(0, 3).map((img, i) => (
                <img key={i} src={img} alt="" className="w-8 h-8 rounded object-cover border border-border" />
              ))}
              {row.images.length > 3 && (
                <span className="text-xs text-muted-foreground ml-1">+{row.images.length - 3}</span>
              )}
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-foreground">Reviews</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage customer reviews and testimonials.</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => { setSendForm(emptySendForm); setSendModalOpen(true); }}
            className="flex items-center gap-2 border border-border hover:bg-muted text-foreground px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            <Send size={15} />
            Send Review Link
          </button>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            + Add Review
          </button>
        </div>
      </div>

      <AdminTable
        columns={columns}
        data={reviews}
        onEdit={openEdit}
        onDelete={(id) => setDeleteId(id)}
        emptyMessage="No reviews yet. Click 'Add Review' to get started."
      />

      {/* Add / Edit Modal */}
      <AdminModal
        title={editItem ? "Edit Review" : "Add Review"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Name" required>
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Emily Ross"
                required
              />
            </FormField>
            <FormField label="Phone">
              <Input
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="e.g. 555-0101"
              />
            </FormField>
          </div>

          <FormField label="Email">
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="e.g. emily@example.com"
            />
          </FormField>

          <FormField label="Rating" required>
            <StarRating value={form.rating} onChange={(v) => setForm((f) => ({ ...f, rating: v }))} />
          </FormField>

          <FormField label="Review Text" required>
            <Textarea
              rows={4}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Write the customer review here..."
              required
            />
          </FormField>

          <FormField
            label={`Images (${form.images.length}/5)`}
            hint="Upload up to 5 images for this review."
          >
            <div className="space-y-3">
              {form.images.length < 5 && (
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                  className="cursor-pointer"
                />
              )}
              {form.images.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.images.map((img, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={img}
                        alt={`img-${i}`}
                        className="w-20 h-20 object-cover rounded-lg border border-border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={11} />
                      </button>
                    </div>
                  ))}
                  {form.images.length < 5 &&
                    Array.from({ length: 5 - form.images.length }).map((_, i) => (
                      <div
                        key={`empty-${i}`}
                        className="w-20 h-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center"
                      >
                        <ImageIcon size={16} className="text-muted-foreground" />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </FormField>

          <FormActions onCancel={() => setModalOpen(false)} isEdit={!!editItem} />
        </form>
      </AdminModal>

      {/* Send Review Link Modal */}
      <AdminModal
        title="Send Review Link"
        isOpen={sendModalOpen}
        onClose={() => setSendModalOpen(false)}
        size="sm"
      >
        <p className="text-sm text-muted-foreground mb-4">
          Enter the customer's name and email. They'll receive a personalised link to submit their review.
        </p>
        <form onSubmit={handleSendLink} className="space-y-4">
          <FormField label="Customer Name" required>
            <Input
              value={sendForm.name}
              onChange={(e) => setSendForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. John Smith"
              required
            />
          </FormField>
          <FormField label="Customer Email" required>
            <Input
              type="email"
              value={sendForm.email}
              onChange={(e) => setSendForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="e.g. john@example.com"
              required
            />
          </FormField>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setSendModalOpen(false)}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary hover:bg-primary/90 text-white transition-colors"
            >
              <Send size={14} />
              Send Link
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirm */}
      <AdminModal title="Confirm Delete" isOpen={!!deleteId} onClose={() => setDeleteId(null)} size="sm">
        <p className="text-muted-foreground text-sm">
          Are you sure you want to delete this review? This action cannot be undone.
        </p>
        <div className="flex items-center justify-end gap-3 mt-6">
          <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm font-medium rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors">Cancel</button>
          <button onClick={confirmDelete} className="px-4 py-2 text-sm font-medium rounded-lg bg-destructive hover:bg-destructive/90 text-white transition-colors">Delete</button>
        </div>
      </AdminModal>
    </div>
  );
}
