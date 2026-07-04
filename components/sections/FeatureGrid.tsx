import { Card } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/ui/Icon";

export type Feature = {
  icon: IconName;
  title: string;
  text: string;
};

type FeatureGridProps = {
  items: Feature[];
  columns?: 2 | 3 | 4;
};

const cols = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function FeatureGrid({ items, columns = 3 }: FeatureGridProps) {
  return (
    <div className={`grid gap-5 ${cols[columns]}`}>
      {items.map((f) => (
        <Card key={f.title} tone="paper" className="flex flex-col gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-sand text-gold-deep">
            <Icon name={f.icon} className="h-6 w-6" />
          </span>
          <h3 className="font-display text-lg font-bold text-fg">{f.title}</h3>
          <p className="text-sm leading-relaxed text-fg-muted">{f.text}</p>
        </Card>
      ))}
    </div>
  );
}
