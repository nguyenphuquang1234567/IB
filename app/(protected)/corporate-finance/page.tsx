"use client";

import { DomainLanding } from "@/components/domain-landing";
import { DOMAINS } from "@/lib/navigation/domains";

const domain = DOMAINS.find((d) => d.id === "corporate-finance")!;

export default function CorporateFinancePage() {
  return <DomainLanding domain={domain} />;
}
