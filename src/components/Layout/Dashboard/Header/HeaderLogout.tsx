'use client'

import { signOut } from 'next-auth/react'

export default function HeaderLogout({ children }: { children: React.ReactNode }) {
  const logout = async () => {

  }

  return (
    <div onClick={logout} onKeyDown={logout} role="button" tabIndex={0}>
      {children}
    </div>
  );
  );
}
