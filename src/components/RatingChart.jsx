import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const BAR_COLORS = ['#7C3AED', '#8B5CF6', '#A78BFA', '#F59E0B', '#F97316']

const tooltipContentStyle = {
  background: '#1E1535',
  border: '1px solid rgba(124,58,237,0.4)',
  borderRadius: '8px',
  color: '#F8F5FF',
  fontSize: '0.8rem',
}

function formatAxisTick(n) {
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n
}

export default function RatingChart({ ratings }) {
  const data = ratings.map((r) => ({ name: r.name, count: r.count }))

  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} margin={{ top: 4, right: 0, left: -18, bottom: 0 }}>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: '#7A6A9A' }}
            tickFormatter={(v) => v.split(' ')[0]}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#7A6A9A' }}
            tickFormatter={formatAxisTick}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => [formatAxisTick(value), 'Reviews']}
            contentStyle={tooltipContentStyle}
            cursor={{ fill: 'rgba(124,58,237,0.08)' }}
          />
          <Bar dataKey="count" radius={[5, 5, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
