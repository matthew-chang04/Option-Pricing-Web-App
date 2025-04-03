import React, { useState } from "react";
import axios from "axios";
import { ResponsiveHeatMap } from "@nivo/heatmap";

const BASE_URL = "http://127.0.0.1:8000";

const BlackScholesApp = () => {
  const [inputs, setInputs] = useState({
    spot_price: "",
    strike_price: "",
    interest_rate: "",
    volatility: "",
    time_to_maturity: "",
    spot_range_min: "",
    spot_range_max: "",
    vol_range_min: "",
    vol_range_max: "",
  });

  const [result, setResult] = useState(null);
  const [heatmaps, setHeatmaps] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const priceResponse = await axios.post(`${BASE_URL}/api/option/price/`, inputs);
      setResult(priceResponse.data);
      
      const heatmapResponse = await axios.post(`${BASE_URL}/api/option/heatmap/`, inputs);
      setHeatmaps(heatmapResponse.data);
    } catch (error) {
      console.error("Error fetching option prices", error);
    }
  };

  const formatHeatmapData = (matrix) => {
    return matrix.map((row, i) => ({
      id: `Spot ${i + 1}`,
      data: row.map((value, j) => ({ x: `Vol ${j + 1}`, y: value }))
    }));
  };

  return (
    <div>
      <h1>Black-Scholes Option Pricing</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(inputs).map((key) => (
          <div key={key}>
            <label>{key.replace("_", " ")}: </label>
            <input
              type="number"
              name={key}
              value={inputs[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Calculate</button>
      </form>

      {result && (
        <div>
          <h2>Results</h2>
          <p>Call Price: {result.call_price.toFixed(2)}</p>
          <p>Put Price: {result.put_price.toFixed(2)}</p>
        </div>
      )}

      {heatmaps && (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <h2>Call Option Heatmap</h2>
            <ResponsiveHeatMap
              data={formatHeatmapData(heatmaps.call_heatmap)}
              keys={[...Array(10).keys()].map((i) => `Vol ${i + 1}`)}
              indexBy="id"
              margin={{ top: 40, right: 60, bottom: 40, left: 60 }}
              axisTop={{ orient: "top", tickSize: 5, tickPadding: 5, tickRotation: -45 }}
              axisLeft={{ orient: "left", tickSize: 5, tickPadding: 5, tickRotation: 0 }}
              colors={{ scheme: "blues" }}
            />
          </div>
          <div>
            <h2>Put Option Heatmap</h2>
            <ResponsiveHeatMap
              data={formatHeatmapData(heatmaps.put_heatmap)}
              keys={[...Array(10).keys()].map((i) => `Vol ${i + 1}`)}
              indexBy="id"
              margin={{ top: 40, right: 60, bottom: 40, left: 60 }}
              axisTop={{ orient: "top", tickSize: 5, tickPadding: 5, tickRotation: -45 }}
              axisLeft={{ orient: "left", tickSize: 5, tickPadding: 5, tickRotation: 0 }}
              colors={{ scheme: "reds" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlackScholesApp;