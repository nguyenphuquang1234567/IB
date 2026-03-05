"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  generateTimeSeries,
  computeMetrics,
  generateScatterPortfolios,
  CORRELATION_MATRIX,
} from "@/lib/asset-management/risk-engine";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

const DEFAULT_PORTFOLIO_RETURN = 8;
const DEFAULT_PORTFOLIO_VOL = 12;
const DEFAULT_BENCHMARK_RETURN = 10;
const DEFAULT_BENCHMARK_VOL = 16;

export default function RiskPerformancePage() {
  const [portfolioReturn, setPortfolioReturn] = useState(DEFAULT_PORTFOLIO_RETURN);
  const [portfolioVol, setPortfolioVol] = useState(DEFAULT_PORTFOLIO_VOL);

  const data = useMemo(
    () =>
      generateTimeSeries(
        36,
        portfolioReturn,
        portfolioVol,
        DEFAULT_BENCHMARK_RETURN,
        DEFAULT_BENCHMARK_VOL,
        0.7
      ),
    [portfolioReturn, portfolioVol]
  );

  const metrics = useMemo(() => computeMetrics(data), [data]);

  const formatTooltip = (value: number | undefined) => [`$${(value ?? 0).toFixed(2)}`, ""];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-varela font-bold text-finstep-brown dark:text-foreground">
          Risk & Performance Analysis
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Evaluate portfolio performance vs S&P 500 benchmark.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <MetricCard
          label="Portfolio Return"
          value={`${metrics.portfolioReturn.toFixed(1)}%`}
          positive={metrics.portfolioReturn > 0}
        />
        <MetricCard
          label="Benchmark Return"
          value={`${metrics.benchmarkReturn.toFixed(1)}%`}
          positive={metrics.benchmarkReturn > 0}
        />
        <MetricCard label="Portfolio Volatility" value={`${metrics.portfolioVolatility.toFixed(1)}%`} />
        <MetricCard label="Benchmark Volatility" value={`${metrics.benchmarkVolatility.toFixed(1)}%`} />
        <MetricCard
          label="Sharpe Ratio"
          value={metrics.sharpeRatio.toFixed(2)}
          positive={metrics.sharpeRatio > 0.5}
        />
        <MetricCard label="Beta" value={metrics.beta.toFixed(2)} />
        <MetricCard
          label="Max Drawdown"
          value={`${metrics.maxDrawdown.toFixed(1)}%`}
          positive={false}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Portfolio vs S&P 500</CardTitle>
          <p className="text-xs text-muted-foreground">
            Simulated 3-year performance. Adjust assumptions below to see impact.
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  formatter={formatTooltip}
                  contentStyle={{ fontSize: 12 }}
                  labelFormatter={(l) => `Period: ${l}`}
                />
                <Legend />
                <ReferenceLine y={100} stroke="var(--muted-foreground)" strokeDasharray="2 2" />
                <Line
                  type="monotone"
                  dataKey="portfolio"
                  name="Portfolio"
                  stroke="var(--finstep-orange)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="benchmark"
                  name="S&P 500"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Assumptions</CardTitle>
          <p className="text-xs text-muted-foreground">
            Change expected return and volatility to simulate different portfolios.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium">Portfolio Expected Return (% p.a.)</label>
              <input
                type="range"
                min={2}
                max={18}
                step={0.5}
                value={portfolioReturn}
                onChange={(e) => setPortfolioReturn(Number(e.target.value))}
                className="w-full mt-2"
              />
              <span className="text-sm text-muted-foreground ml-2">{portfolioReturn}%</span>
            </div>
            <div>
              <label className="text-sm font-medium">Portfolio Volatility (% p.a.)</label>
              <input
                type="range"
                min={4}
                max={30}
                step={0.5}
                value={portfolioVol}
                onChange={(e) => setPortfolioVol(Number(e.target.value))}
                className="w-full mt-2"
              />
              <span className="text-sm text-muted-foreground ml-2">{portfolioVol}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Risk vs Return</CardTitle>
            <p className="text-xs text-muted-foreground">
              Sample portfolios by allocation style. Higher return typically comes with higher volatility.
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    type="number"
                    dataKey="volatility"
                    name="Volatility"
                    unit="%"
                    domain={[0, 20]}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="return"
                    name="Return"
                    unit="%"
                    domain={[0, 12]}
                    tick={{ fontSize: 10 }}
                  />
                  <ZAxis type="number" dataKey="sharpe" range={[50, 400]} />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    formatter={(v, n) => [((v as number) ?? 0).toFixed(1), (n as string) ?? ""]}
                    contentStyle={{ fontSize: 11 }}
                  />
                  <Scatter
                    name="Portfolios"
                    data={generateScatterPortfolios()}
                    fill="var(--finstep-orange)"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Asset Correlation Heatmap</CardTitle>
            <p className="text-xs text-muted-foreground">
              Correlation between asset classes. Lower correlation improves diversification.
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr>
                    <th className="p-1.5 text-left font-medium text-muted-foreground" />
                    {CORRELATION_MATRIX.assets.map((a) => (
                      <th key={a} className="p-1.5 text-center font-medium text-muted-foreground w-16">
                        {a.split(" ")[0]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CORRELATION_MATRIX.matrix.map((row, i) => (
                    <tr key={i}>
                      <td className="p-1.5 font-medium text-muted-foreground">
                        {CORRELATION_MATRIX.assets[i]}
                      </td>
                      {row.map((v, j) => {
                        const intensity = v >= 0 ? Math.min(1, v) : Math.min(1, -v);
                        const bg =
                          v >= 0
                            ? `rgba(249, 115, 22, ${0.2 + intensity * 0.6})`
                            : `rgba(59, 130, 246, ${0.2 + intensity * 0.6})`;
                        return (
                          <td key={j} className="p-1.5 text-center" style={{ backgroundColor: bg }}>
                            {v.toFixed(1)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  positive,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <Card>
      <CardContent className="pt-4">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p
          className={`text-lg font-bold mt-1 ${
            positive === true ? "text-emerald-600" : positive === false && label.includes("Drawdown") ? "text-red-600" : ""
          }`}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
