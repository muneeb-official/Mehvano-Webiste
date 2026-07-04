import { LeadForm } from "./LeadForm";

type HomeValueFormProps = {
  /** Zip slug context, e.g. "pasadena-21122". */
  context?: string;
  className?: string;
};

/** "What's My Home Worth?" capture (report §12 seller funnel). */
export function HomeValueForm({ context, className }: HomeValueFormProps) {
  return (
    <LeadForm
      source={context ? "home-value-zip" : "home-value"}
      context={context}
      fields={["phone", "address"]}
      submitLabel="Get my home value"
      successTitle="Request received!"
      successText="I'll prepare a real, human-reviewed valuation for your home and send it over shortly — no automated guesswork."
      className={className}
    />
  );
}
