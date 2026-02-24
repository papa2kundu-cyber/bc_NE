"use client";

import { useState } from "react";
import { seedContacts, type ContactMessage } from "@/lib/adminStore";
import AdminModal from "@/components/admin/AdminModal";
import { Mail, Phone, User, Calendar, Trash2, Eye } from "lucide-react";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactMessage[]>(seedContacts);
  const [viewItem, setViewItem] = useState<ContactMessage | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const confirmDelete = () => {
    if (deleteId) {
      setContacts((prev) => prev.filter((c) => c.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Contact Messages</h1>
        <p className="text-sm text-muted-foreground mt-1">
          View messages submitted through the Contact Us form.
        </p>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-4 p-4 bg-background border border-border rounded-xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail size={15} className="text-primary" />
          <span>Total Messages:</span>
          <span className="font-semibold text-foreground">{contacts.length}</span>
        </div>
      </div>

      {/* Messages List */}
      {contacts.length === 0 ? (
        <div className="border border-border rounded-xl p-12 text-center text-muted-foreground">
          <Mail size={32} className="mx-auto mb-3 opacity-30" />
          <p>No contact messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-background border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                      <User size={14} className="text-primary flex-shrink-0" />
                      {contact.name}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Mail size={13} className="flex-shrink-0" />
                      {contact.email}
                    </div>
                    {contact.phone && (
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Phone size={13} className="flex-shrink-0" />
                        {contact.phone}
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar size={12} className="flex-shrink-0" />
                      {contact.date}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{contact.message}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setViewItem(contact)}
                    className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                    title="View full message"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => setDeleteId(contact.id)}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    title="Delete message"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Message Modal */}
      <AdminModal
        title="Message Details"
        isOpen={!!viewItem}
        onClose={() => setViewItem(null)}
      >
        {viewItem && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide font-semibold text-muted-foreground mb-1">Name</p>
                <p className="text-sm text-foreground font-medium">{viewItem.name}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide font-semibold text-muted-foreground mb-1">Date</p>
                <p className="text-sm text-foreground">{viewItem.date}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide font-semibold text-muted-foreground mb-1">Email</p>
                <a href={`mailto:${viewItem.email}`} className="text-sm text-primary hover:underline">
                  {viewItem.email}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide font-semibold text-muted-foreground mb-1">Phone</p>
                <p className="text-sm text-foreground">{viewItem.phone || "—"}</p>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide font-semibold text-muted-foreground mb-2">Message</p>
              <div className="bg-muted/30 rounded-lg p-4 text-sm text-foreground leading-relaxed">
                {viewItem.message}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setViewItem(null)}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors"
              >
                Close
              </button>
              <a
                href={`mailto:${viewItem.email}?subject=Re: Your inquiry`}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-primary hover:bg-primary/90 text-white transition-colors"
              >
                Reply via Email
              </a>
            </div>
          </div>
        )}
      </AdminModal>

      {/* Delete Confirm */}
      <AdminModal title="Confirm Delete" isOpen={!!deleteId} onClose={() => setDeleteId(null)} size="sm">
        <p className="text-muted-foreground text-sm">
          Are you sure you want to delete this message? This action cannot be undone.
        </p>
        <div className="flex items-center justify-end gap-3 mt-6">
          <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm font-medium rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors">Cancel</button>
          <button onClick={confirmDelete} className="px-4 py-2 text-sm font-medium rounded-lg bg-destructive hover:bg-destructive/90 text-white transition-colors">Delete</button>
        </div>
      </AdminModal>
    </div>
  );
}
