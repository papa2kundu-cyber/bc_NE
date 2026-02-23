// ─────────────────────────────────────────────────────────────────────────────
//  Central admin credentials store
//  Replace with a real backend / hashed passwords when going to production.
// ─────────────────────────────────────────────────────────────────────────────

export type AdminProfile = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  avatarInitial: string; // derived from name
};

// Single mutable object – lives for the lifetime of the browser session.
export const adminProfile: AdminProfile = {
  name: "Admin User",
  email: "admin@brightocity.com",
  password: "admin123",
  phone: "+1 555-0100",
  role: "Super Administrator",
  avatarInitial: "A",
};

export function updateAdminProfile(patch: Partial<Omit<AdminProfile, "avatarInitial">>) {
  Object.assign(adminProfile, patch);
  if (patch.name) {
    adminProfile.avatarInitial = patch.name.trim().charAt(0).toUpperCase() || "A";
  }
}

/** Generate a random 6-digit OTP string */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
