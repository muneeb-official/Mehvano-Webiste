import { ZIPS } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { stagger } from "@/lib/utils";

type ZipGridProps = {
  /** Where each card links; the zip slug is appended. Default: home-value. */
  base?: string;
  cta?: string;
};

/** The four target-zip cards driving the seller funnel (report §12). */
export function ZipGrid({ base = "/home-value", cta = "Get my value" }: ZipGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {ZIPS.map((zip, i) => (
        <Reveal key={zip.slug} variant="up" delay={stagger(i)} className="h-full">
          <Card
            href={`${base}/${zip.slug}`}
            padding="none"
            className="group h-full overflow-hidden"
          >
            <ImagePlaceholder
              alt={`${zip.city}, MD ${zip.zip}`}
              label={`${zip.city} ${zip.zip}`}
              variant={(i % 4) as 0 | 1 | 2 | 3}
              rounded="rounded-none"
              className="h-40"
            />
            <div className="flex items-center justify-between p-5">
              <div>
                <p className="font-display text-lg font-bold text-fg">{zip.city}</p>
                <p className="text-sm text-fg-muted">{zip.county}</p>
              </div>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-sand text-fg transition-colors group-hover:bg-ink group-hover:text-fg-inverse">
                <Icon name="arrow-up-right" className="h-4 w-4" />
              </span>
            </div>
            <span className="sr-only">{cta}</span>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
