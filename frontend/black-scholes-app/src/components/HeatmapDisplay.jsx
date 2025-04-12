import React from "react";
import {
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Scatter,
  ResponsiveContainer,
} from "recharts";

const getColor = (value) => {
    if (value < 50) return "#FF5733"; //Red
    if (value < 150) return "#FFBD33"; //Yellow
    return "#33FF57"; //Green
  };

const Heatmap = ({ data, title }) => {
  const formatted = [];

  data.forEach((row, i) => {
    row.forEach((value, j) => {
      formatted.push({ x: j, y: i, z: value });
    });
  });

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="Volatility Index" />
          <YAxis type="number" dataKey="y" name="Spot Index" />
          <ZAxis type="number" dataKey="z" name="Option Price" range={[0, 255]} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={formatted}>
            {formatted.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.z)} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

const HeatmapDisplay = ({ heatmaps }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Heatmap data={heatmaps.call_heatmap} title="📈 Call Option Heatmap" />
      <Heatmap data={heatmaps.put_heatmap} title="📉 Put Option Heatmap" />
    </div>
  );
};

export default HeatmapDisplay;