import { Plus } from "lucide-react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  onAdd: () => void;
  addLabel?: string;
}

export default function AdminPageHeader({
  title,
  description,
  onAdd,
  addLabel = "Add New",
}: AdminPageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
      >
        <Plus size={16} />
        {addLabel}
      </button>
    </div>
  );
}
