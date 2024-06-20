"use client";

import { signOut } from "next-auth/react";

export default function HeaderLogout({ children }: { children: React.ReactNode }) {
  const logout = async () => {
    // Llama al endpoint de logout de Odoo
    await fetch("/api/auth/logout-odoo", {
      method: "POST",
    });

    // Cierra sesión en NextAuth
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div onClick={logout} onKeyDown={logout} role="button" tabIndex={0}>
      {children}
    </div>
  );
}
