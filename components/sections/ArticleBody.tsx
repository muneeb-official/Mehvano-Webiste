import type { ContentBlock } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="flex flex-col divide-y divide-line rounded-2xl border border-line bg-paper">
      {items.map((f) => (
        <details key={f.question} className="group px-6 py-5 [&_summary]:list-none">
          <summary className="flex cursor-pointer items-center justify-between gap-4">
            <span className="font-display text-base font-bold text-fg">{f.question}</span>
            <Icon
              name="chevron-down"
              className="h-5 w-5 shrink-0 text-fg-subtle transition-transform group-open:rotate-180"
            />
          </summary>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-muted">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="mt-10 font-display text-2xl font-bold text-fg first:mt-0 sm:text-[1.7rem]">
          {block.text}
        </h2>
      );
    case "paragraph":
      return <p className="text-[1.05rem] leading-relaxed text-fg-muted">{block.text}</p>;
    case "list":
      return (
        <ul className="flex flex-col gap-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[1.02rem] leading-relaxed text-fg-muted">
              <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-gold-deep" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "stats":
      return (
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-line bg-cream p-6 sm:grid-cols-4">
          {block.items.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span className="font-display text-2xl font-extrabold text-fg">{s.value}</span>
              <span className="text-xs leading-snug text-fg-muted">{s.label}</span>
            </div>
          ))}
        </div>
      );
    case "callout":
      return (
        <div
          className={cn(
            "rounded-2xl border-l-4 p-5",
            block.tone === "note"
              ? "border-gold bg-gold-bright/10"
              : "border-ink bg-sand"
          )}
        >
          {block.title ? (
            <p className="mb-1.5 font-display text-base font-bold text-fg">{block.title}</p>
          ) : null}
          <p className="text-[0.98rem] leading-relaxed text-fg-muted">{block.text}</p>
        </div>
      );
    case "faq":
      return <FaqList items={block.items} />;
    default:
      return null;
  }
}

export function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

export { FaqList };
