import type { Metadata } from "next";
import { authConfigured } from "@/lib/admin-auth";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Admin Login", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-5 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-hair bg-paper p-8 shadow-sm">
        <div className="text-center">
          <p className="font-display text-2xl font-semibold text-ink">
            Following <span className="italic text-dawn-deep">the</span> Leader
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            Admin Dashboard
          </p>
        </div>

        <div className="mt-8">
          {authConfigured() ? (
            <LoginForm initialError={error} />
          ) : (
            <p className="text-center text-sm text-body">
              The admin isn&apos;t configured yet. Once the database and login secrets are set, this
              page will let approved admins sign in by email.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
