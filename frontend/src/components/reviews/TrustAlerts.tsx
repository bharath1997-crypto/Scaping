export default function TrustAlerts({ flags }: { flags: any[] }) {
  if (!flags.length) return <div className="text-sm text-muted-foreground">No alerts.</div>;

  return (
    <div className="space-y-2">
      {flags.map((f, i) => (
        <div key={i} className="rounded-xl border p-3 text-sm">
          <div className="font-semibold">{f.type.replace("_"," ")}</div>
          <div className="text-muted-foreground">{f.message}</div>
        </div>
      ))}
    </div>
  );
}

