"use client";
import type React from 'react'
import { SessionProvider } from "next-auth/react"

function GoogleProvider({children}: {children: React.ReactNode}) {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}
export default GoogleProvider