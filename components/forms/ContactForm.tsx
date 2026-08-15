import { LeadForm } from "./LeadForm";

export function ContactForm({ className }: { className?: string }) {
  return (
    <LeadForm
      source="contact"
      fields={["message"]}
      submitLabel="Send message"
      successTitle="Message sent!"
      successText="Thanks for reaching out — a member of our team will reply personally, usually within minutes during the day."
      className={className}
    />
  );
}
