"use client";

import { useState } from "react";
import CinematicShell from "../components/CinematicShell";
import StagePage from "../components/StagePage";

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("sending");
    const form = e.currentTarget;
    const data = {
      name:    (form.elements.namedItem("c-name")  as HTMLInputElement).value,
      email:   (form.elements.namedItem("c-email") as HTMLInputElement).value,
      message: (form.elements.namedItem("c-msg")   as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setFormStatus(res.ok ? "sent" : "error");
    } catch {
      setFormStatus("error");
    }
  }

  const sent = formStatus === "sent";

  return (
    <CinematicShell>
      <StagePage>
        <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-[#c9bda8]">
          Speak with us · 05
        </p>
        <h1 className="mt-5 text-5xl font-light uppercase tracking-[0.16em] text-[#d8c28a] sm:text-7xl md:text-8xl">
          Contact
        </h1>
        <p className="mt-9 max-w-[38rem] font-serif text-lg font-light leading-snug text-[#f4f1eb] sm:text-xl md:text-2xl">
          Tell us about your brand. We respond to every note within two working days.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-16">
          {/* Studio details */}
          <div>
            <div className="mb-1 flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.4em] text-[#a89678]">
              <span>Studio</span>
              <span className="h-px flex-1 bg-[#b89b5e]/40" />
            </div>
            <div className="border-t border-[#b89b5e]/25">
              {[
                { k: "Email",   v: "marketing@lovstudio.ca" },
                { k: "Hours",   v: "Mon — Fri · 9:00 — 18:00" },
              ].map((r) => (
                <div key={r.k} className="border-b border-[#b89b5e]/25 py-5">
                  <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-[#a89678]">
                    {r.k}
                  </p>
                  <p className="mt-2 whitespace-pre-line font-serif text-lg font-light uppercase tracking-[0.1em] text-[#d8c28a] sm:text-xl">
                    {r.v}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="mb-1 flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.4em] text-[#a89678]">
              <span>Write to us</span>
              <span className="h-px flex-1 bg-[#b89b5e]/40" />
            </div>
            <form onSubmit={onSubmit} className="flex flex-col gap-7 pt-2">
              <Field id="c-name"  label="Name"  type="text"  placeholder="Your name" required />
              <Field id="c-brand" label="Brand" type="text"  placeholder="The brand you represent" />
              <Field id="c-email" label="Email" type="email" placeholder="you@brand.com" required />
              <TextArea id="c-msg" label="Note" placeholder="A few sentences on what you're building" />
              {sent ? (
                <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#d8c28a]">
                  Sent · We&rsquo;ll reply within two working days.
                </p>
              ) : (
                <>
                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="mt-2 self-start border border-[#b89b5e] bg-transparent px-8 py-4 font-sans text-[11px] uppercase tracking-[0.45em] text-[#d8c28a] transition-colors hover:bg-[#b89b5e] hover:text-black active:opacity-70 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {formStatus === "sending" ? "Sending..." : "Send"}
                  </button>
                  {formStatus === "error" && (
                    <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-red-400/70">
                      Something went wrong · Try emailing marketing@lovstudio.ca directly.
                    </p>
                  )}
                </>
              )}
            </form>
          </div>
        </div>
      </StagePage>
    </CinematicShell>
  );
}

function Field({
  id, label, type, placeholder, required,
}: {
  id: string; label: string; type: string; placeholder: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-sans text-[10px] uppercase tracking-[0.45em] text-[#a89678]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="border-0 border-b border-[#b89b5e]/40 bg-transparent py-2 font-serif text-lg font-light tracking-[0.05em] text-[#f4f1eb] outline-none transition-colors placeholder:text-[#d8d0c3]/35 focus:border-[#d8c28a]"
      />
    </div>
  );
}

function TextArea({
  id, label, placeholder,
}: {
  id: string; label: string; placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-sans text-[10px] uppercase tracking-[0.45em] text-[#a89678]">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        rows={3}
        className="min-h-[80px] resize-y border-0 border-b border-[#b89b5e]/40 bg-transparent py-2 font-serif text-lg font-light tracking-[0.05em] text-[#f4f1eb] outline-none transition-colors placeholder:text-[#d8d0c3]/35 focus:border-[#d8c28a]"
      />
    </div>
  );
}
