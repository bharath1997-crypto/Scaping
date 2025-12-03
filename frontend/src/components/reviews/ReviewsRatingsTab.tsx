import React from "react";
import { useAppReviewsAnalytics } from "@/hooks/useAppReviewsAnalytics";
import StarBreakdownChart from "./StarBreakdownChart";
import RatingTrendChart from "./RatingTrendChart";
import ReviewVolumeChart from "./ReviewVolumeChart";
import KeywordCloud from "./KeywordCloud";
import InsightsCards from "./InsightsCards";
import FeatureRequestsList from "./FeatureRequestsList";
import TrustAlerts from "./TrustAlerts";

export default function ReviewsRatingsTab({ store, appId }: { store: string; appId: string }) {
  const { data, loading } = useAppReviewsAnalytics(store, appId);

  if (loading) return <div className="p-6 text-sm text-muted-foreground">Loading review analytics…</div>;
  if (!data) return <div className="p-6 text-sm text-red-500">Failed to load analytics.</div>;

  const { app, dailyStats, insights } = data;

  return (
    <div className="grid gap-6 p-6">
      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Kpi label="Avg Rating" value={app.score?.toFixed(2)} />
        <Kpi label="Total Ratings" value={formatBig(app.ratings)} />
        <Kpi label="Total Reviews" value={formatBig(app.reviews)} />
        <Kpi label="Sentiment Score" value={`${Math.round(insights.sentimentScore * 100)}%`} />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Panel title="Star Distribution">
          <StarBreakdownChart app={app} />
        </Panel>

        <Panel title="Rating Trend (30 days)">
          <RatingTrendChart dailyStats={dailyStats} />
        </Panel>

        <Panel title="Review Volume (30 days)">
          <ReviewVolumeChart dailyStats={dailyStats} />
        </Panel>

        <Panel title="Top Keywords">
          <KeywordCloud keywords={insights.topKeywords || []} />
        </Panel>
      </div>

      {/* Insights */}
      <InsightsCards insights={insights} />

      {/* Feature requests */}
      <Panel title="Top Feature Requests">
        <FeatureRequestsList items={insights.featureRequests || []} />
      </Panel>

      {/* Trust flags */}
      <Panel title="Trust & Manipulation Alerts">
        <TrustAlerts flags={insights.trustFlags || []} />
      </Panel>
    </div>
  );
}

function Panel({ title, children }: any) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 text-sm font-semibold">{title}</div>
      {children}
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-xl font-bold">{value ?? "—"}</div>
    </div>
  );
}

function formatBig(v: any) {
  if (v === null || v === undefined) return "—";
  const n = typeof v === "bigint" ? Number(v) : v;
  return Intl.NumberFormat().format(n);
}

