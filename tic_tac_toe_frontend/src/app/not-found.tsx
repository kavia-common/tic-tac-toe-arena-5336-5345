import React from "react";

/**
 * PUBLIC_INTERFACE
 * not-found page for unknown routes.
 * Provides a minimal light-themed UI consistent with the app.
 */
export default function NotFound() {
  return (
    <main
      className="min-h-screen w-full flex items-center justify-center px-6"
      style={{ background: "#f7f9fc", color: "#1a1a1a" }}
    >
      <div
        className="max-w-md w-full text-center rounded-2xl p-8"
        style={{
          background: "#ffffff",
          border: "1px solid #e6eaf0",
          boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
        }}
      >
        <div
          aria-hidden
          className="mx-auto mb-4"
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "linear-gradient(135deg, #0070f3, #1db954)",
          }}
        />
        <h1 className="text-2xl font-semibold mb-2">Page not found</h1>
        <p className="opacity-80 mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block px-4 py-2 rounded-lg text-sm font-medium"
          style={{ background: "#0070f3", color: "#ffffff" }}
        >
          Go to Home
        </a>
      </div>
    </main>
  );
}
