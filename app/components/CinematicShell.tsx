"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const MENU_ITEMS = [
  { href: "/", label: "Home", index: "01" },
  { href: "/about", label: "About", index: "02" },
  { href: "/services", label: "Services", index: "03" },
  { href: "/selected-works", label: "Selected Works", index: "04" },
  { href: "/contact", label: "Contact", index: "05" },
];

export default function CinematicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function openMenu() {
    setMenuOpen(true);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main style={{ position: "relative", background: "#050505", color: "#f4f1eb" }}>

      {/* TOP NAV */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px",
          pointerEvents: "auto",
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: "1.5rem",
            fontWeight: 300,
            letterSpacing: "0.2em",
            color: "#d8c28a",
            textDecoration: "none",
            pointerEvents: "auto",
          }}
        >
          LS
        </Link>

        {/* MENU BUTTON — div instead of button, Safari proof */}
        <div
          onTouchEnd={(e) => { e.preventDefault(); openMenu(); }}
          onClick={openMenu}
          role="button"
          aria-label="Open menu"
          style={{
            cursor: "pointer",
            padding: "14px 18px",
            fontSize: "11px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#d8c28a",
            pointerEvents: "auto",
            WebkitTapHighlightColor: "transparent",
            userSelect: "none",
            zIndex: 500,
          }}
        >
          Menu
        </div>
      </div>

      {/* FULLSCREEN OVERLAY */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            background: "#0a0a0a",
            display: "flex",
            flexDirection: "column",
            pointerEvents: "auto",
          }}
        >
          {/* Overlay top bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 24px",
            }}
          >
            <span style={{ fontSize: "1.5rem", fontWeight: 300, letterSpacing: "0.2em", color: "#d8c28a" }}>
              LS
            </span>

            {/* CLOSE BUTTON */}
            <div
              onTouchEnd={(e) => { e.preventDefault(); closeMenu(); }}
              onClick={closeMenu}
              role="button"
              aria-label="Close menu"
              style={{
                cursor: "pointer",
                padding: "14px 18px",
                fontSize: "11px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#d8c28a",
                pointerEvents: "auto",
                WebkitTapHighlightColor: "transparent",
                userSelect: "none",
              }}
            >
              Close
            </div>
          </div>

          {/* NAV LINKS */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 32px",
            }}
          >
            {MENU_ITEMS.map((item) => (
              <div
                key={item.href}
                style={{ borderBottom: "1px solid rgba(184,155,94,0.15)" }}
              >
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "22px 0",
                    textDecoration: "none",
                    color: pathname === item.href ? "#d8c28a" : "rgba(244,241,235,0.75)",
                    WebkitTapHighlightColor: "transparent",
                    pointerEvents: "auto",
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(2rem, 8vw, 4.5rem)",
                      fontWeight: 300,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {item.label}
                  </span>
                  <span style={{ fontSize: "11px", letterSpacing: "0.3em", color: "rgba(184,155,94,0.45)" }}>
                    /{item.index}
                  </span>
                </Link>
              </div>
            ))}
          </div>

          <p
            style={{
              padding: "24px 32px",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.4em",
              color: "rgba(184,155,94,0.35)",
            }}
          >
            Marketing Studio
          </p>
        </div>
      )}

      {/* PAGE CONTENT */}
      <div key={pathname}>
        {children}
      </div>
    </main>
  );
}
