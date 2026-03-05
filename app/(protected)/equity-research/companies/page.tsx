"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  COMPANIES,
  getCompany,
  computeGrowthRates,
} from "@/lib/equity-research/companies";
import { getAnalysisFeedback } from "@/lib/equity-research/valuation-engine";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Lightbulb } from "lucide-react";

export default function CompanyAnalysisPage() {
  const [selectedId, setSelectedId] = useState<string>("nvidia");
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState({ drivers: "", margins: "" });

  const company = useMemo(() => getCompany(selectedId) ?? COMPANIES[0], [selectedId]);
  const { revenueGrowth, grossMargin, operatingMargin, fcfMargin } = useMemo(
    () => computeGrowthRates(company.financials),
    [company]
  );

  const chartData = company.financials.map((f, i) => ({
    year: f.year,
    revenue: f.revenue,
    grossProfit: f.grossProfit,
    operatingIncome: f.operatingIncome,
    fcf: f.freeCashFlow,
    grossMargin: grossMargin[i],
    operatingMargin: operatingMargin[i],
    fcfMargin: fcfMargin[i],
    revenueGrowthPct: i > 0 ? revenueGrowth[i - 1] : 0,
  }));

  const feedback = useMemo(() => {
    if (!submitted) return [];
    const identifiedDrivers = answers.drivers.length > 3 ? ["revenue drivers"] : [];
    const missedRisks: string[] = [];
    if (!answers.margins.toLowerCase().includes("cost") && !answers.margins.toLowerCase().includes("mix")) {
      missedRisks.push("cost structure and mix effects");
    }
    return getAnalysisFeedback(identifiedDrivers, missedRisks, false);
  }, [submitted, answers]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-varela font-bold text-finstep-brown dark:text-foreground">
          Company Analysis Lab
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Analyze financials, identify drivers, and answer analyst questions.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {COMPANIES.map((c) => (
          <Button
            key={c.id}
            variant={selectedId === c.id ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setSelectedId(c.id);
              setSubmitted(false);
            }}
          >
            {c.ticker}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{company.name} ({company.ticker})</CardTitle>
              <p className="text-sm text-muted-foreground">{company.description}</p>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Revenue & Profitability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `$${v}B`} />
                    <Tooltip
                      formatter={(v: number | undefined) => [`$${(v ?? 0).toFixed(1)}B`, ""]}
                      contentStyle={{ fontSize: 11 }}
                    />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" />
                    <Bar dataKey="grossProfit" name="Gross Profit" fill="#22c55e" />
                    <Bar dataKey="operatingIncome" name="Operating Income" fill="#f59e0b" />
                    <Bar dataKey="fcf" name="FCF" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Revenue Growth Trend</CardTitle>
                <p className="text-xs text-muted-foreground">YoY revenue growth %</p>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData.filter((d, i) => i > 0)} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
                      <Tooltip
                        formatter={(v: number | undefined) => [`${(v ?? 0).toFixed(1)}%`, "Growth"]}
                        contentStyle={{ fontSize: 11 }}
                      />
                      <Line type="monotone" dataKey="revenueGrowthPct" name="Revenue Growth %" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Free Cash Flow Trend</CardTitle>
                <p className="text-xs text-muted-foreground">FCF over time ($B)</p>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `$${v}`} />
                      <Tooltip
                        formatter={(v: number | undefined) => [`$${(v ?? 0).toFixed(1)}B`, "FCF"]}
                        contentStyle={{ fontSize: 11 }}
                      />
                      <Line type="monotone" dataKey="fcf" name="FCF" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Margin Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} domain={[0, 60]} />
                    <Tooltip
                      formatter={(v: number | undefined) => [`${(v ?? 0).toFixed(1)}%`, ""]}
                      contentStyle={{ fontSize: 11 }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="grossMargin" name="Gross Margin %" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="operatingMargin" name="Operating Margin %" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="fcfMargin" name="FCF Margin %" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Analysis Questions</CardTitle>
              <p className="text-xs text-muted-foreground">
                What are the key revenue drivers? Why are margins improving or declining?
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Key revenue drivers of {company.ticker}</label>
                <textarea
                  className="mt-2 w-full min-h-[80px] rounded-md border bg-background px-3 py-2 text-sm"
                  placeholder="e.g., Data center AI demand, gaming cycles..."
                  value={answers.drivers}
                  onChange={(e) => setAnswers((a) => ({ ...a, drivers: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Why are margins improving or declining?</label>
                <textarea
                  className="mt-2 w-full min-h-[80px] rounded-md border bg-background px-3 py-2 text-sm"
                  placeholder="e.g., Mix shift, scale, competition..."
                  value={answers.margins}
                  onChange={(e) => setAnswers((a) => ({ ...a, margins: e.target.value }))}
                />
              </div>
              <Button onClick={() => setSubmitted(true)} className="bg-finstep-orange hover:bg-finstep-orange/90">
                Submit Analysis
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Revenue Drivers</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {company.revenueDrivers.map((d, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-finstep-orange">•</span>
                    {d}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Margin Drivers</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {company.marginDrivers.map((d, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-finstep-orange">•</span>
                    {d}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {submitted && feedback.length > 0 && (
            <Card className="border-amber-200 dark:border-amber-900/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Performance Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {feedback.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
