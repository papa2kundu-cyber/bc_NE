"use client";

import { useState } from "react";
import { seedReviews, type Review } from "@/lib/adminStore";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable, { Column } from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import { FormField, Input, Textarea, FormActions } from "@/components/admin/FormField";
import { Star, X, ImageIcon } from "lucide-react";

const emptyForm: Omit<Review, "id"> = {
  name: "",
  email: "",
  phone: "",
  rating: 5,
  description: "",
  images: [],
};

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`transition-colors ${star <= value ? "text-yellow-400" : "text-muted hover:text-yellow-300"}`}
        >
          <Star size={22} fill={star <= value ? "currentColor" : "none"} />
        </button>
      ))}
      <span className="ml-2 text-sm text-muted-foreground">{value} / 5</span>
    </div>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(seedReviews);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Review | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

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
              className={s <= row.rating ? "text-yellow-400" : "text-muted"}
              fill={s <= row.rating ? "currentColor" : "none"}
            />
          ))}
        </div>
      ),
    },
    {
      key: "description",
      label: "Review",
      render: (row) => (
        <span className="line-clamp-1 max-w-xs text-muted-foreground text-sm">{row.description}</span>
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
      <AdminPageHeader
        title="Reviews"
        description="Manage customer reviews and testimonials."
        onAdd={openAdd}
        addLabel="Add Review"
      />

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
          <div className="grid grid-cols-2 gap-4">
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
