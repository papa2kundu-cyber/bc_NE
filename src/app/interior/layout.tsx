import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Luxury Interior Designers in Kolkata | Elegant & Modern Interiors",
  description:
    "Bring luxury to life with luxury interior designers in Kolkata. From contemporary to classic, we design exquisite interiors that combine elegance with functionality.",
};

export default function InteriorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
