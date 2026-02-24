"use client";

import { useState } from "react";
import { seedPhotos, type Photo } from "@/lib/adminStore";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable, { Column } from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import { FormField, Input, Textarea, Select, FormActions } from "@/components/admin/FormField";
import { ImageIcon } from "lucide-react";

const CATEGORIES = [
  { value: "Living Room", label: "Living Room" },
  { value: "Bedroom", label: "Bedroom" },
  { value: "Kitchen", label: "Kitchen" },
  { value: "Bathroom", label: "Bathroom" },
  { value: "Office", label: "Office" },
  { value: "Dining Room", label: "Dining Room" },
  { value: "Other", label: "Other" },
];

const emptyForm: Omit<Photo, "id"> = {
  title: "",
  category: "Living Room",
  description: "",
  image: "",
};

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>(seedPhotos);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Photo | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setImagePreview("");
    setModalOpen(true);
  };

  const openEdit = (photo: Photo) => {
    setEditItem(photo);
    setForm({ title: photo.title, category: photo.category, description: photo.description, image: photo.image });
    setImagePreview(photo.image);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setPhotos((prev) => prev.filter((p) => p.id !== deleteId));
      setDeleteId(null);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setForm((f) => ({ ...f, image: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      setPhotos((prev) =>
        prev.map((p) => (p.id === editItem.id ? { ...p, ...form } : p))
      );
    } else {
      setPhotos((prev) => [
        ...prev,
        { ...form, id: Date.now().toString() },
      ]);
    }
    setModalOpen(false);
  };

  const columns: Column<Photo>[] = [
    {
      key: "image",
      label: "Image",
      render: (row) =>
        row.image ? (
          <img src={row.image} alt={row.title} className="w-12 h-10 object-cover rounded-md border border-border" />
        ) : (
          <div className="w-12 h-10 rounded-md border border-border bg-muted flex items-center justify-center">
            <ImageIcon size={16} className="text-muted-foreground" />
          </div>
        ),
    },
    { key: "title", label: "Title" },
    {
      key: "category", label: "Category", render: (row) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {row.category}
        </span>
      )
    },
    {
      key: "description", label: "Description", render: (row) => (
        <span className="line-clamp-1 text-muted-foreground">{row.description.slice(0, 20) + (row.description?.length > 20 ? `...` : ``)}</span>
      )
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <AdminPageHeader
        title="Photos"
        description="Manage your interior design photo gallery."
        onAdd={openAdd}
        addLabel="Add Photo"
      />

      <AdminTable
        columns={columns}
        data={photos}
        onEdit={openEdit}
        onDelete={handleDelete}
        emptyMessage="No photos yet. Click 'Add Photo' to get started."
      />

      {/* Add / Edit Modal */}
      <AdminModal
        title={editItem ? "Edit Photo" : "Add New Photo"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Title" required>
            <Input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Modern Living Room"
              required
            />
          </FormField>

          <FormField label="Category" required>
            <Select
              options={CATEGORIES}
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            />
          </FormField>

          <FormField label="Description">
            <Textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Brief description of this photo..."
            />
          </FormField>

          <FormField label="Image" hint="Upload an image (JPG, PNG, WebP).">
            <div className="space-y-2">
              <Input type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer" />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-lg border border-border"
                />
              )}
            </div>
          </FormField>

          <FormActions onCancel={() => setModalOpen(false)} isEdit={!!editItem} />
        </form>
      </AdminModal>

      {/* Delete Confirm Modal */}
      <AdminModal
        title="Confirm Delete"
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        size="sm"
      >
        <p className="text-muted-foreground text-sm">
          Are you sure you want to delete this photo? This action cannot be undone.
        </p>
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={() => setDeleteId(null)}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-destructive hover:bg-destructive/90 text-white transition-colors"
          >
            Delete
          </button>
        </div>
      </AdminModal>
    </div>
  );
}
