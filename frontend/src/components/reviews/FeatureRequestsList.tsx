export default function FeatureRequestsList({ items }: { items: any[] }) {
  if (!items.length) return <div className="text-sm text-muted-foreground">No requests yet.</div>;

  return (
    <ul className="space-y-2">
      {items.map((x, i) => (
        <li key={i} className="flex justify-between rounded-xl border p-3 text-sm">
          <span>{x.feature}</span>
          <span className="font-semibold">{x.count}</span>
        </li>
      ))}
    </ul>
  );
}

