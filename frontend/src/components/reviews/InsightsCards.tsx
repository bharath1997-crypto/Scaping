export default function InsightsCards({ insights }: any) {
  const complaints = insights.topComplaints || [];
  const praises = insights.topPraises || [];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card title="Top Complaints" items={complaints} tone="bad" />
      <Card title="Top Praises" items={praises} tone="good" />
    </div>
  );
}

function Card({ title, items, tone }: any) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-2 text-sm font-semibold">{title}</div>
      {!items.length && <div className="text-sm text-muted-foreground">No data yet.</div>}
      <ul className="space-y-2">
        {items.map((x: any, i: number) => (
          <li key={i} className="flex justify-between text-sm">
            <span>{x.topic}</span>
            <span className={tone === "bad" ? "text-red-600" : "text-green-600"}>
              {x.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

