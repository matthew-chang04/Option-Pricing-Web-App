import { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8000"

const BlackScholesForm = ({setResult, setHeatmaps}) => {

    const [formData, setFormData] = useState({
        spot_price: 100,
        strike_price: 100,
        time_to_maturity: 5,
        interest_rate: 0.05,
        volatility: 0.2,
        spot_range_min: 80,
        spot_range_max: 120,
        vol_range_min: 0.1,
        vol_range_max: 0.5,
    });

    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: parseFloat(value),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const [priceResult, heatmapResult] = await Promise.all([
                axios.post(`${BASE_URL}/api/option/price/`, formData),
                axios.post(`${BASE_URL}/api/option/heatmap/`, formData),
            ]);

            setResult(priceResult.data);
            setHeatmaps(heatmapResult.data);
        } catch (error) {
            console.error("Error Submitting Data:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-white p-6 rounded shadow">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col">
              <label htmlFor={key} className="capitalize text-sm font-medium mb-1">
                {key.replace(/_/g, " ")}
              </label>
              <input
                type="number"
                step="any"
                id={key}
                value={formData[key]}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded"
              />
            </div>
          ))}
          <div className="col-span-2">
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Calculate Prices & Heatmap
            </button>
          </div>
        </form>
      );
    };
    
    export default BlackScholesForm;