import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ReviewVolumeChart({ dailyStats }: any) {
  const data = dailyStats.map((d: any) => ({
    date: d.date.slice(5,10),
    reviews: Number(d.reviews || 0),
  }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="reviews" strokeWidth={2} fillOpacity={0.2}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

