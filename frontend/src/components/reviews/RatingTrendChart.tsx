import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function RatingTrendChart({ dailyStats }: any) {
  const data = dailyStats.map((d: any) => ({
    date: d.date.slice(5,10),
    score: d.score,
  }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={[0,5]} />
          <Tooltip />
          <Line type="monotone" dataKey="score" strokeWidth={2} dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

