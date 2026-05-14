import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export async function getHero() {
  return await reader.singletons.hero.read();
}

export async function getAbout() {
  return await reader.singletons.about.read();
}

export async function getServices() {
  return await reader.singletons.services.read();
}

export async function getContact() {
  return await reader.singletons.contact.read();
}

export async function getWorks() {
  const slugs = await reader.collections.works.list();
  const items = await Promise.all(
    slugs.map((slug) => reader.collections.works.read(slug))
  );
  return items.filter(Boolean);
}
