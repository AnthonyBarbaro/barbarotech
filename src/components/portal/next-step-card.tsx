import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export function NextStepCard({
  title,
  description,
  href,
  action,
}: {
  title: string;
  description: string;
  href: string;
  action: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-950 px-5 py-4 text-white shadow-sm">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-300">{description}</p>
      <ButtonLink href={href} className="mt-4" variant="secondary">
        {action}
        <ArrowRight className="h-4 w-4" />
      </ButtonLink>
    </div>
  );
}
