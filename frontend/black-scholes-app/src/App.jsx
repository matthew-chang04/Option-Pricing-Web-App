import React from "react";
import BlackScholesForm from "./components/BlackScholesForm";
import HeatmapDisplay from "./components/HeatmapDisplay";
import { useState } from "react";

const App = () => {
  const [result, setResult] = useState(null);
  const [heatmaps, setHeatmaps] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <header className="text-center py-8 bg-blue-600 text-white shadow">
        <h1 className="text-3xl font-bold">Black-Scholes Option Pricing</h1>
        <p className="text-md mt-2">Calculate call & put prices + heatmap visualization</p>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-12">
        <BlackScholesForm setResult={setResult} setHeatmaps={setHeatmaps} />

        {result && (
          <section className="bg-white p-4 rounded shadow text-center">
            <h2 className="text-xl font-semibold mb-2">Option Prices</h2>
            <p className="text-lg">📈 Call Price: <strong>${result.call_price.toFixed(2)}</strong></p>
            <p className="text-lg">📉 Put Price: <strong>${result.put_price.toFixed(2)}</strong></p>
          </section>
        )}

        {heatmaps && (
          <HeatmapDisplay heatmaps={heatmaps} />
        )}
      </main>
    </div>
  );
};

export default App;