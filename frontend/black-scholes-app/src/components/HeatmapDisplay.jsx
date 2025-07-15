// THIS FILE DOES NOT DO ANYTHING NOT CALLED ANYWHERE IS NOT NEEDED AT ALL PLEASE DELETE WHEN DONE


import React from "react";
import { ResponsiveHeatMap } from '@nivo/heatmap'

const Heatmap = ({ data }) => (
  <ResponsiveHeatMap
      data={data}
      margin={{ top :60, right: 90, bottom: 60, left: 90 }}
      valueFormat=">-.2s"
      axisTop={{ tickRotation: -90 }}
      axisLeft={{legend: "Current Price", legendOffset: -60}}
      axisRight={{legend: "Current Price", legendOffset: 60}}
      colors={{
        type: 'diverging',
        scheme: 'red_yellow_blue',
        divergeAt: 0.5,
        minValue: -100000,
        maxValue: 100000
      }}
      emptyColor="#555555"
      legends={[
        {
          anchor: 'bottom',
          translateX: 0,
          translateY: 30,
          length: 400,
          thickness: 8,
          direction: 'row',
          tickPosition: 'after',
          tickSize: 3,
          tickSpacing: 4,
          tickOverlap: false,
          tickFormat: '>-.2s',
          title: 'Value →',
          titleAlign: 'start',
         titleOffset: 4
        }
      ]}
      />
)
const HeatmapDisplay = ({ heatmaps }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Heatmap data={heatmaps.call_heatmap} title="📈 Call Option Heatmap" />
      <Heatmap data={heatmaps.put_heatmap} title="📉 Put Option Heatmap" />
    </div>
  );
};

export default HeatmapDisplay;