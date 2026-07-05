import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";

export type Step = {
  title: string;
  text: string;
};

type StepsProps = {
  steps: Step[];
};

/** Numbered process list — used for the buyer/seller "loop" (report §3). */
export function Steps({ steps }: StepsProps) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <Reveal as="li" key={step.title} variant="up" delay={stagger(i)} className="relative flex flex-col gap-3">
          <span className="font-display text-3xl font-black text-gold">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="absolute left-12 top-3 hidden h-px w-[calc(100%-3rem)] bg-line lg:block" aria-hidden />
          <h3 className="font-display text-lg font-bold text-fg">{step.title}</h3>
          <p className="text-sm leading-relaxed text-fg-muted">{step.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}
