"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { COMPANIES } from "@/lib/equity-research/companies";
import { FileText, CheckCircle2 } from "lucide-react";

type Recommendation = "buy" | "hold" | "sell";

const SECTIONS = [
  { id: "overview", label: "Company Overview", placeholder: "Brief description of the company, business model, and key segments..." },
  { id: "industry", label: "Industry Outlook", placeholder: "TAM/SAM, competitive dynamics, growth trends, regulatory environment..." },
  { id: "growth", label: "Growth Drivers", placeholder: "Key catalysts: new products, geographic expansion, market share gains..." },
  { id: "risks", label: "Risk Factors", placeholder: "Competition, execution, macro, valuation, key man..." },
  { id: "valuation", label: "Valuation", placeholder: "DCF/Comps summary, implied upside/downside, key assumptions..." },
];

export default function ThesisBuilderPage() {
  const [companyId, setCompanyId] = useState("nvidia");
  const [sections, setSections] = useState<Record<string, string>>({});
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const company = COMPANIES.find((c) => c.id === companyId) ?? COMPANIES[0];

  const handleSectionChange = (id: string, value: string) => {
    setSections((s) => ({ ...s, [id]: value }));
  };

  const handleSubmit = () => {
    if (recommendation) setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-varela font-bold text-finstep-brown dark:text-foreground">
          Investment Thesis Builder
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Build a structured thesis: overview, industry, growth, risks, valuation, and recommendation.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Covering: {company.name} ({company.ticker})
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            You are an equity research analyst. Write an investment thesis explaining whether the stock should be rated Buy, Hold, or Sell.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {COMPANIES.map((c) => (
              <Button
                key={c.id}
                variant={companyId === c.id ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setCompanyId(c.id);
                  setSections({});
                  setRecommendation(null);
                  setSubmitted(false);
                }}
              >
                {c.ticker}
              </Button>
            ))}
          </div>

          <div className="space-y-6">
            {SECTIONS.map((s) => (
              <div key={s.id}>
                <label className="text-sm font-medium">{s.label}</label>
                <textarea
                  className="mt-2 w-full min-h-[100px] rounded-md border bg-background px-3 py-2 text-sm"
                  placeholder={s.placeholder}
                  value={sections[s.id] ?? ""}
                  onChange={(e) => handleSectionChange(s.id, e.target.value)}
                />
              </div>
            ))}

            <div>
              <label className="text-sm font-medium block mb-3">Final Recommendation</label>
              <div className="flex gap-3">
                {(["buy", "hold", "sell"] as const).map((r) => (
                  <Button
                    key={r}
                    variant={recommendation === r ? "default" : "outline"}
                    className="capitalize"
                    onClick={() => setRecommendation(r)}
                  >
                    {r}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!recommendation}
              className="bg-finstep-orange hover:bg-finstep-orange/90"
            >
              Submit Thesis
            </Button>
          </div>
        </CardContent>
      </Card>

      {submitted && recommendation && (
        <Card className="border-emerald-200 dark:border-emerald-900/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Thesis Submitted
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Recommendation: <span className="font-bold capitalize text-foreground">{recommendation}</span> on {company.ticker}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Your thesis has been captured. In a real workflow, you would publish this as a research note with a price target and catalyst timeline.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
