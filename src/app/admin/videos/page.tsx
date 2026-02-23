"use client";

import { useState } from "react";
import { seedVideos, type Video } from "@/lib/adminStore";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable, { Column } from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import { FormField, Input, Textarea, FormActions } from "@/components/admin/FormField";
import { Video as VideoIcon } from "lucide-react";

const emptyForm: Omit<Video, "id"> = {
  title: "",
  description: "",
  videoUrl: "",
};

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>(seedVideos);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Video | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (video: Video) => {
    setEditItem(video);
    setForm({ title: video.title, description: video.description, videoUrl: video.videoUrl });
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setVideos((prev) => prev.filter((v) => v.id !== deleteId));
      setDeleteId(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      setVideos((prev) =>
        prev.map((v) => (v.id === editItem.id ? { ...v, ...form } : v))
      );
    } else {
      setVideos((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    }
    setModalOpen(false);
  };

  const columns: Column<Video>[] = [
    {
      key: "videoUrl",
      label: "Preview",
      render: (row) => (
        <div className="w-16 h-10 rounded-md border border-border bg-muted flex items-center justify-center">
          {row.videoUrl ? (
            <VideoIcon size={16} className="text-primary" />
          ) : (
            <VideoIcon size={16} className="text-muted-foreground" />
          )}
        </div>
      ),
    },
    { key: "title", label: "Title" },
    {
      key: "description",
      label: "Description",
      render: (row) => (
        <span className="line-clamp-1 max-w-xs text-muted-foreground">{row.description}</span>
      ),
    },
    {
      key: "videoUrl",
      label: "Video URL",
      render: (row) => (
        <span className="text-xs text-muted-foreground truncate max-w-[180px] block">{row.videoUrl}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <AdminPageHeader
        title="Videos"
        description="Manage your interior design video gallery."
        onAdd={openAdd}
        addLabel="Add Video"
      />

      <AdminTable
        columns={columns}
        data={videos}
        onEdit={openEdit}
        onDelete={(id) => setDeleteId(id)}
        emptyMessage="No videos yet. Click 'Add Video' to get started."
      />

      {/* Add / Edit Modal */}
      <AdminModal
        title={editItem ? "Edit Video" : "Add New Video"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Title" required>
            <Input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Interior Showcase 2025"
              required
            />
          </FormField>

          <FormField label="Description">
            <Textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Brief description of this video..."
            />
          </FormField>

          <FormField
            label="Video URL"
            required
            hint="Paste a YouTube embed URL, Vimeo URL, or a direct .mp4 link."
          >
            <Input
              value={form.videoUrl}
              onChange={(e) => setForm((f) => ({ ...f, videoUrl: e.target.value }))}
              placeholder="https://www.youtube.com/embed/..."
              required
            />
          </FormField>

          {form.videoUrl && (
            <div className="rounded-lg overflow-hidden border border-border aspect-video w-full">
              <iframe
                src={form.videoUrl}
                className="w-full h-full"
                allowFullScreen
                title="Video preview"
              />
            </div>
          )}

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
          Are you sure you want to delete this video? This action cannot be undone.
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
