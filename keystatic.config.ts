import { config, singleton, collection, fields } from "@keystatic/core";

export default config({
  storage:
    process.env.KEYSTATIC_GITHUB_CLIENT_ID
      ? {
          kind: "github",
          repo: "nanamita144-hub/luxury-site",
          branchPrefix: "keystatic/",
        }
      : { kind: "local" },

  singletons: {
    hero: singleton({
      label: "Home Page",
      path: "content/hero",
      schema: {
        heading: fields.text({ label: "Studio Name", defaultValue: "Lov Studio" }),
        subheading: fields.text({
          label: "Tagline",
          multiline: true,
          defaultValue: "Strategy, content, and digital presence for brands that need to be seen.",
        }),
        video: fields.text({ label: "Hero Video (filename in /public)", defaultValue: "Instalation.mov" }),
      },
    }),

    about: singleton({
      label: "About Page",
      path: "content/about",
      schema: {
        heading: fields.text({ label: "Page Title", defaultValue: "About" }),
        intro: fields.text({
          label: "Introduction",
          multiline: true,
          defaultValue: "Lov Studio is a small marketing studio. We don't ask for attention. We build the conditions for it.",
        }),
        image: fields.image({
          label: "Team / Studio Photo",
          directory: "public/team",
          publicPath: "/team",
          description: "Optional. Drop a photo here to show it on the About page.",
        }),
        manifesto: fields.array(
          fields.object({
            num: fields.text({ label: "Number (e.g. 01)" }),
            title: fields.text({ label: "Principle Title" }),
            body: fields.text({ label: "Body Text", multiline: true }),
          }),
          { label: "Manifesto Principles", itemLabel: (p) => p.fields.title.value }
        ),
      },
    }),

    services: singleton({
      label: "Services Page",
      path: "content/services",
      schema: {
        heading: fields.text({ label: "Page Title", defaultValue: "Services" }),
        intro: fields.text({
          label: "Introduction",
          multiline: true,
          defaultValue: "Five disciplines. One studio.",
        }),
        list: fields.array(
          fields.object({
            num: fields.text({ label: "Number (e.g. 01)" }),
            name: fields.text({ label: "Service Name" }),
            blurb: fields.text({ label: "Short Description", multiline: true }),
          }),
          { label: "Services", itemLabel: (p) => p.fields.name.value }
        ),
      },
    }),

    contact: singleton({
      label: "Contact Page",
      path: "content/contact",
      schema: {
        heading: fields.text({ label: "Page Title", defaultValue: "Contact" }),
        intro: fields.text({
          label: "Introduction",
          multiline: true,
          defaultValue: "Tell us about your brand.",
        }),
        details: fields.array(
          fields.object({
            k: fields.text({ label: "Label (e.g. Email)" }),
            v: fields.text({ label: "Value", multiline: true }),
          }),
          { label: "Contact Details", itemLabel: (p) => p.fields.k.value }
        ),
      },
    }),

    // ─── Design tokens ──────────────────────────────────────────────────────
    // Edit colors & fonts site-wide from the admin panel.
    // Hex values only (e.g. #b89b5e). Changes go live on next deploy.
    design: singleton({
      label: "Design & Branding",
      path: "content/design",
      schema: {
        // ── Colors ──────────────────────────────────────────────────────────
        colorBackground: fields.text({
          label: "Page Background",
          description: "Main site background. Default: #050505 (near-black).",
          defaultValue: "#050505",
        }),
        colorGold: fields.text({
          label: "Accent Color – Main",
          description: "Primary gold/accent used for borders and highlights. Default: #b89b5e.",
          defaultValue: "#b89b5e",
        }),
        colorGoldLight: fields.text({
          label: "Accent Color – Light",
          description: "Lighter gold for headings. Default: #d8c28a.",
          defaultValue: "#d8c28a",
        }),
        colorGoldSoft: fields.text({
          label: "Accent Color – Soft",
          description: "Muted gold for labels. Default: #c9bda8.",
          defaultValue: "#c9bda8",
        }),
        colorGoldMist: fields.text({
          label: "Accent Color – Mist",
          description: "Faintest accent. Default: #a89678.",
          defaultValue: "#a89678",
        }),
        colorLinen: fields.text({
          label: "Body Text Color",
          description: "Main readable text. Default: #f4f1eb (warm linen).",
          defaultValue: "#f4f1eb",
        }),
        // ── Fonts ────────────────────────────────────────────────────────────
        serifFont: fields.select({
          label: "Heading Font",
          description: "Used for all large display headings.",
          options: [
            { label: "Cormorant Garamond (current)", value: "cormorant" },
            { label: "Playfair Display", value: "playfair" },
            { label: "DM Serif Display", value: "dm-serif" },
            { label: "Libre Baskerville", value: "baskerville" },
            { label: "Lora", value: "lora" },
          ],
          defaultValue: "cormorant",
        }),
        sansFont: fields.select({
          label: "UI / Label Font",
          description: "Used for navigation, labels, and small caps.",
          options: [
            { label: "Raleway (current)", value: "raleway" },
            { label: "Montserrat", value: "montserrat" },
            { label: "Inter", value: "inter" },
            { label: "Jost", value: "jost" },
            { label: "DM Sans", value: "dm-sans" },
          ],
          defaultValue: "raleway",
        }),
      },
    }),
  },

  collections: {
    works: collection({
      label: "Selected Works",
      path: "content/works/*",
      slugField: "name",
      schema: {
        num: fields.text({ label: "Number (e.g. 01)" }),
        cat: fields.text({ label: "Category (e.g. Identity)" }),
        name: fields.slug({ name: { label: "Project Name" } }),
        year: fields.text({ label: "Year (e.g. 2025)" }),
        image: fields.image({
          label: "Project Image",
          directory: "public/works",
          publicPath: "/works",
          description: "Upload a photo for this project card.",
        }),
        video: fields.text({
          label: "Video filename in /public/works (e.g. project.mp4)",
          description: "Leave blank to use the image or gradient fallback.",
        }),
      },
    }),
  },
});
