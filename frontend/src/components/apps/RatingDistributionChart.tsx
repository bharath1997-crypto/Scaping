'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface RatingDistributionChartProps {
  distribution: {
    '1': number;
    '2': number;
    '3': number;
    '4': number;
    '5': number;
  };
}

export default function RatingDistributionChart({ distribution }: RatingDistributionChartProps) {
  const data = [
    { star: '1★', count: distribution['1'] },
    { star: '2★', count: distribution['2'] },
    { star: '3★', count: distribution['3'] },
    { star: '4★', count: distribution['4'] },
    { star: '5★', count: distribution['5'] },
  ];

  const maxCount = Math.max(...data.map((d) => d.count));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="star" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#2563EB" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

