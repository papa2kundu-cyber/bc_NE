"use client";

import { useState } from "react";
import { seedFAQs, type FAQ } from "@/lib/adminStore";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable, { Column } from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import { FormField, Input, Textarea, FormActions } from "@/components/admin/FormField";

const emptyForm: Omit<FAQ, "id"> = {
  question: "",
  answer: "",
};

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(seedFAQs);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<FAQ | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (faq: FAQ) => {
    setEditItem(faq);
    setForm({ question: faq.question, answer: faq.answer });
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setFaqs((prev) => prev.filter((f) => f.id !== deleteId));
      setDeleteId(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      setFaqs((prev) =>
        prev.map((f) => (f.id === editItem.id ? { ...f, ...form } : f))
      );
    } else {
      setFaqs((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    }
    setModalOpen(false);
  };

  const columns: Column<FAQ>[] = [
    {
      key: "question",
      label: "Question",
      render: (row) => (
        <span className="font-medium text-foreground line-clamp-1 max-w-sm">{row.question}</span>
      ),
    },
    {
      key: "answer",
      label: "Answer",
      render: (row) => (
        <span className="line-clamp-2 max-w-md text-muted-foreground text-sm">{row.answer}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <AdminPageHeader
        title="FAQs"
        description="Manage frequently asked questions and their answers."
        onAdd={openAdd}
        addLabel="Add FAQ"
      />

      <AdminTable
        columns={columns}
        data={faqs}
        onEdit={openEdit}
        onDelete={(id) => setDeleteId(id)}
        emptyMessage="No FAQs yet. Click 'Add FAQ' to get started."
      />

      {/* Add / Edit Modal */}
      <AdminModal
        title={editItem ? "Edit FAQ" : "Add New FAQ"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Question" required>
            <Input
              value={form.question}
              onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
              placeholder="e.g. How long does a typical project take?"
              required
            />
          </FormField>

          <FormField label="Answer" required>
            <Textarea
              rows={5}
              value={form.answer}
              onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
              placeholder="Provide a clear and helpful answer..."
              required
            />
          </FormField>

          <FormActions onCancel={() => setModalOpen(false)} isEdit={!!editItem} />
        </form>
      </AdminModal>

      {/* Delete Confirm */}
      <AdminModal title="Confirm Delete" isOpen={!!deleteId} onClose={() => setDeleteId(null)} size="sm">
        <p className="text-muted-foreground text-sm">
          Are you sure you want to delete this FAQ? This action cannot be undone.
        </p>
        <div className="flex items-center justify-end gap-3 mt-6">
          <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm font-medium rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors">Cancel</button>
          <button onClick={confirmDelete} className="px-4 py-2 text-sm font-medium rounded-lg bg-destructive hover:bg-destructive/90 text-white transition-colors">Delete</button>
        </div>
      </AdminModal>
    </div>
  );
}
