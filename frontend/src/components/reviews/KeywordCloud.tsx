export default function KeywordCloud({ keywords }: { keywords: any[] }) {
  if (!keywords.length) return <div className="text-sm text-muted-foreground">No keywords yet.</div>;

  return (
    <div className="flex flex-wrap gap-2">
      {keywords.map((k, i) => (
        <span
          key={i}
          className="rounded-full border px-3 py-1 text-xs bg-gray-50"
          title={`${k.count} mentions`}
        >
          {k.word} · {k.count}
        </span>
      ))}
    </div>
  );
}

