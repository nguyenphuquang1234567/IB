"use client";

import { DomainLanding } from "@/components/domain-landing";
import { DOMAINS } from "@/lib/navigation/domains";

const domain = DOMAINS.find((d) => d.id === "ib")!;

export default function IBPage() {
  return <DomainLanding domain={domain} />;
}
