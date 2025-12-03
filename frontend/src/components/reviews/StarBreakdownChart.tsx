import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function StarBreakdownChart({ app }: any) {
  const data = [
    { star: "5★", count: Number(app.star5Count || 0) },
    { star: "4★", count: Number(app.star4Count || 0) },
    { star: "3★", count: Number(app.star3Count || 0) },
    { star: "2★", count: Number(app.star2Count || 0) },
    { star: "1★", count: Number(app.star1Count || 0) },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="star" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" radius={[6,6,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

