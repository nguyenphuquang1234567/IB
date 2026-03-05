"use client";

import { DomainLanding } from "@/components/domain-landing";
import { DOMAINS } from "@/lib/navigation/domains";

const domain = DOMAINS.find((d) => d.id === "accounting")!;

export default function AccountingHubPage() {
  return <DomainLanding domain={domain} />;
}
