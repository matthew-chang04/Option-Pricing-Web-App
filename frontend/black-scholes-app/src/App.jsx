import React from "react";
import BlackScholesForm from "./components/BlackScholesForm";
import Heatmap from './components/Heatmap';
import { useState } from "react";
import './index.css';

const App = () => {
  const [result, setResult] = useState(null);
  const [heatmaps, setHeatmaps] = useState(null);

  return (
    <div className="min-h-screen bg-blue-100 text-white font-mono">
      <header className="text-center py-8 bg-indigo-600 text-white shadow">
        <h1 className="text-3xl font-mono">Black-Scholes Option Pricing</h1>
        <p className="text-md mt-2 font-mono">Calculate call & put prices + heatmap visualization</p>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-12">
        <BlackScholesForm setResult={setResult} setHeatmaps={setHeatmaps} />

        {result && (
          <section className="bg-blue-500 p-4 rounded shadow text-center">
            <h2 className="text-xl font-semibold mb-2">Option Prices</h2>
            <p className="text-lg">📈 Call Price: <strong>${result.call_price.toFixed(2)}</strong></p>
            <p className="text-lg">📉 Put Price: <strong>${result.put_price.toFixed(2)}</strong></p>
          </section>
        )}

        {heatmaps && (
          <div className="grid md:grid-cols-2 gap-30">
            <Heatmap data={heatmaps.call_heatmap} start_price={result.call_price.toFixed(2)} title="Call Price Details" />
            <Heatmap data={heatmaps.put_heatmap} start_price={result.put_price.toFixed(2)} title="Put Price Details" />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;