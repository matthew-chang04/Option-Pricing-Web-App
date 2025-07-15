import { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8000"

const BlackScholesForm = ({setResult, setHeatmaps}) => {

    const [formData, setFormData] = useState({
        spot_price: 20,
        strike_price: 20,
        time_to_maturity: 14,
        interest_rate: 0.06,
        volatility: 0.2,
        price_shock: 5,
        volatility_shock: 0.5,
    });

    function formatLabel(key) {
        return key
          .replace(/_/g, " ")       
          .replace(/\b\w/g, (c) => c.toUpperCase()); 
    }

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

            setResult(priceResult.data); // Note this is a JSON object with call and put values
            setHeatmaps(heatmapResult.data);
        } catch (error) {
            console.error("Error Submitting Data:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 bg-blue-900 p-6 rounded shadow font-mono">

           {Object.keys(formData).map((key) => (
            <div key={key}>
                <label htmlFor={key}>{formatLabel(key)}</label>
                <input type="number" id={key} value={formData[key]} onChange={handleChange} className="m-4 bg-blue-700 rounded shadow"/>
            </div>
        ))}  
          <div className="col-span-2">
            <button type="submit" className=" bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Calculate Prices & Heatmap
            </button>
          </div>
        </form>
      );
    };
    
    export default BlackScholesForm;