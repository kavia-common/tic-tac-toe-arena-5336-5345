"use client";

import React from "react";

/** Client wrapper in case we need future client context providers. */
// PUBLIC_INTERFACE
export default function LayoutWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
