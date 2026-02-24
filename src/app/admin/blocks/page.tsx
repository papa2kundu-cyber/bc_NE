"use client";

import { useState } from "react";
import { seedBlocks, type Block } from "@/lib/adminStore";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable, { Column } from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import { FormField, Input, Textarea, Select, FormActions } from "@/components/admin/FormField";
import { FileText } from "lucide-react";

const CATEGORIES = [
  { value: "Design Trends", label: "Design Trends" },
  { value: "Lifestyle", label: "Lifestyle" },
  { value: "Tips & Tricks", label: "Tips & Tricks" },
  { value: "Project Showcase", label: "Project Showcase" },
  { value: "News", label: "News" },
  { value: "Other", label: "Other" },
];

const emptyForm: Omit<Block, "id"> = {
  title: "",
  category: "Design Trends",
  description: "",
  username: "",
  publishDate: new Date().toISOString().split("T")[0],
  image: "",
};

export default function BlocksPage() {
  const [blocks, setBlocks] = useState<Block[]>(seedBlocks);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Block | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setImagePreview("");
    setModalOpen(true);
  };

  const openEdit = (block: Block) => {
    setEditItem(block);
    setForm({
      title: block.title,
      category: block.category,
      description: block.description,
      username: block.username,
      publishDate: block.publishDate,
      image: block.image,
    });
    setImagePreview(block.image);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setBlocks((prev) => prev.filter((b) => b.id !== deleteId));
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
      setBlocks((prev) =>
        prev.map((b) => (b.id === editItem.id ? { ...b, ...form } : b))
      );
    } else {
      setBlocks((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    }
    setModalOpen(false);
  };

  const columns: Column<Block>[] = [
    {
      key: "image",
      label: "Image",
      render: (row) =>
        row.image ? (
          <img src={row.image} alt={row.title} className="w-12 h-10 object-cover rounded-md border border-border" />
        ) : (
          <div className="w-12 h-10 rounded-md border border-border bg-muted flex items-center justify-center">
            <FileText size={14} className="text-muted-foreground" />
          </div>
        ),
    },
    { key: "title", label: "Title" },
    {
      key: "category",
      label: "Category",
      render: (row) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
          {row.category}
        </span>
      ),
    },
    { key: "username", label: "Author" },
    { key: "publishDate", label: "Published" },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <AdminPageHeader
        title="Blocks (Blog Posts)"
        description="Create and manage blog content blocks."
        onAdd={openAdd}
        addLabel="Add Block"
      />

      <AdminTable
        columns={columns}
        data={blocks}
        onEdit={openEdit}
        onDelete={(id) => setDeleteId(id)}
        emptyMessage="No blocks yet. Click 'Add Block' to get started."
      />

      {/* Add / Edit Modal */}
      <AdminModal
        title={editItem ? "Edit Block" : "Add New Block"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Title" required>
            <Input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Top Interior Trends 2025"
              required
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Category" required>
              <Select
                options={CATEGORIES}
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              />
            </FormField>

            <FormField label="Author / Username" required>
              <Input
                value={form.username}
                onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                placeholder="e.g. Admin"
                required
              />
            </FormField>
          </div>

          <FormField label="Publish Date" required>
            <Input
              type="date"
              value={form.publishDate}
              onChange={(e) => setForm((f) => ({ ...f, publishDate: e.target.value }))}
              required
            />
          </FormField>

          <FormField label="Description" required>
            <Textarea
              rows={5}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Write the block content here..."
              required
            />
          </FormField>

          <FormField label="Cover Image" hint="Upload a cover image (JPG, PNG, WebP).">
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

      {/* Delete Confirm */}
      <AdminModal
        title="Confirm Delete"
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        size="sm"
      >
        <p className="text-muted-foreground text-sm">
          Are you sure you want to delete this block? This action cannot be undone.
        </p>
        <div className="flex items-center justify-end gap-3 mt-6">
          <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm font-medium rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors">Cancel</button>
          <button onClick={confirmDelete} className="px-4 py-2 text-sm font-medium rounded-lg bg-destructive hover:bg-destructive/90 text-white transition-colors">Delete</button>
        </div>
      </AdminModal>
    </div>
  );
}
