"use client";

import { useState } from "react";
import { seedTeam, type TeamMember } from "@/lib/adminStore";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable, { Column } from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import { FormField, Input, Textarea, FormActions } from "@/components/admin/FormField";
import { UserCircle } from "lucide-react";

const emptyForm: Omit<TeamMember, "id"> = {
  name: "",
  designation: "",
  description: "",
  image: "",
};

export default function TeamsPage() {
  const [team, setTeam] = useState<TeamMember[]>(seedTeam);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<TeamMember | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setImagePreview("");
    setModalOpen(true);
  };

  const openEdit = (member: TeamMember) => {
    setEditItem(member);
    setForm({ name: member.name, designation: member.designation, description: member.description, image: member.image });
    setImagePreview(member.image);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setTeam((prev) => prev.filter((m) => m.id !== deleteId));
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
      setTeam((prev) =>
        prev.map((m) => (m.id === editItem.id ? { ...m, ...form } : m))
      );
    } else {
      setTeam((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    }
    setModalOpen(false);
  };

  const columns: Column<TeamMember>[] = [
    {
      key: "image",
      label: "Photo",
      render: (row) =>
        row.image ? (
          <img src={row.image} alt={row.name} className="w-10 h-10 object-cover rounded-full border border-border" />
        ) : (
          <div className="w-10 h-10 rounded-full border border-border bg-muted flex items-center justify-center">
            <UserCircle size={20} className="text-muted-foreground" />
          </div>
        ),
    },
    { key: "name", label: "Name" },
    {
      key: "designation",
      label: "Designation",
      render: (row) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
          {row.designation}
        </span>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (row) => (
        <span className="line-clamp-1 max-w-xs text-muted-foreground">{row.description}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <AdminPageHeader
        title="Team Members"
        description="Manage your interior design team."
        onAdd={openAdd}
        addLabel="Add Member"
      />

      <AdminTable
        columns={columns}
        data={team}
        onEdit={openEdit}
        onDelete={(id) => setDeleteId(id)}
        emptyMessage="No team members yet. Click 'Add Member' to get started."
      />

      {/* Add / Edit Modal */}
      <AdminModal
        title={editItem ? "Edit Team Member" : "Add Team Member"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Full Name" required>
            <Input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Sarah Johnson"
              required
            />
          </FormField>

          <FormField label="Designation" required>
            <Input
              value={form.designation}
              onChange={(e) => setForm((f) => ({ ...f, designation: e.target.value }))}
              placeholder="e.g. Lead Designer"
              required
            />
          </FormField>

          <FormField label="Description">
            <Textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Short bio or description..."
            />
          </FormField>

          <FormField label="Profile Photo" hint="Upload a photo (JPG, PNG, WebP).">
            <div className="space-y-2">
              <Input type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer" />
              {imagePreview && (
                <div className="flex items-center gap-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-full border border-border"
                  />
                  <span className="text-sm text-muted-foreground">Profile photo preview</span>
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
          Are you sure you want to remove this team member? This action cannot be undone.
        </p>
        <div className="flex items-center justify-end gap-3 mt-6">
          <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm font-medium rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors">Cancel</button>
          <button onClick={confirmDelete} className="px-4 py-2 text-sm font-medium rounded-lg bg-destructive hover:bg-destructive/90 text-white transition-colors">Delete</button>
        </div>
      </AdminModal>
    </div>
  );
}
