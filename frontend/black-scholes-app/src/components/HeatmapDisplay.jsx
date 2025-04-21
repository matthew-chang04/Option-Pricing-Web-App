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
  Rectangle,
} from "recharts";

const getColor = (value) => {
    if (value < 50) return "#FF5733"; //Red
    if (value < 10) return '#FFA500'; //Orange
    if (value < 150) return "#FFBD33"; //Yellow

    return "#33FF57"; //Green
  };

const Heatmap = ({ data, title }) => {
  const formatted = [];

  data.forEach((row, i) => {
    row.forEach((value, j) => {
      formatted.push({ x: j, y: i, z : value });
    });
  });

  const coloredData = formatted.map((entry) => ({
    ...entry,
    fill: getColor(entry.z),
  }));

  const blockShape = (props) => {

    const {cx, cy, z} = props;

    return(
      <rect
      x={cx - 5} 
      y={cy - 5}
      width={10}
      height={10}
      fill={getColor(z)}
      opacity={z / 100}
    />
    );
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
      <div id="heatmap">
        <ScatterChart width={500} height={500}>
          <XAxis type="number" dataKey="x" name="Volatility Index" />
          <YAxis type="number" dataKey="y" name="Current Price" />
          <ZAxis type="number" dataKey="z" name="Option Price" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={coloredData} name="Heatmap Points" fill="#8884d8" shape={blockShape}>
          </Scatter>
        </ScatterChart>
      </div>
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