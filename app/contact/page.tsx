import { getContact } from "@/lib/content";
import ContactClient from "./ContactClient";

export default async function ContactPage() {
  const contact = await getContact();
  if (!contact) return null;
  return <ContactClient heading={contact.heading} intro={contact.intro} details={[...contact.details]} />;
}
