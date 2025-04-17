import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Layout/Navbar';
import axios from 'axios';

export const MLModel: React.FC = () => {
  const [inputs, setInputs] = useState({
    temperature: '',
    rainfall: '',
    humidity: '',
    soilMoisture: '',
    year: '',
    country_encoded: '',
    attribute_encoded: '',
  });

  const [forecastYear, setForecastYear] = useState('');
  const [prediction, setPrediction] = useState<any | null>(null);
  const [forecastResults, setForecastResults] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const timestamp = new Date().toISOString();

    try {
      const classificationRes = await axios.post('http://127.0.0.1:5000/predict/classification', {
        temperature: inputs.temperature,
        year: inputs.year,
        country_encoded: inputs.country_encoded,
        attribute_encoded: inputs.attribute_encoded,
      });

      const regressionRes = await axios.post('http://127.0.0.1:5000/predict/regression', {
        temperature: inputs.temperature,
        year: inputs.year,
        country_encoded: inputs.country_encoded,
        attribute_encoded: inputs.attribute_encoded,
      });

      const forecastRes = await axios.post('http://127.0.0.1:5000/predict/forecast', {
        years: [parseInt(forecastYear)],
      });

      setPrediction({
        predictedValue: classificationRes.data.predictedValue,
        confidence: classificationRes.data.confidence,
        label: classificationRes.data.label,
        regressionValue: regressionRes.data.predictedValue,
        message: 'Prediction Results',
        timestamp,
      });

      if (forecastRes.data.status === 'success') {
        setForecastResults(forecastRes.data.forecast);
      }
    } catch (error) {
      console.error('Prediction failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-10"
        >
          <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-10">
            ☕ Coffee Production Predictor
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Temperature (°C)', key: 'temperature', placeholder: 'Average temperature' },
              { label: 'Year', key: 'year', placeholder: 'e.g., 2025' },
              { label: 'Country (Encoded)', key: 'country_encoded', placeholder: 'Country code' },
              { label: 'Attribute (Encoded)', key: 'attribute_encoded', placeholder: 'Attribute code' },
            ].map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {label}
                </label>
                <input
                  type="text"
                  value={(inputs as any)[key]}
                  onChange={(e) => setInputs({ ...inputs, [key]: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder={placeholder}
                  required
                />
              </div>
            ))}

            {/* Forecast Year Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Forecast Year (e.g., 2030)
              </label>
              <input
                type="number"
                value={forecastYear}
                onChange={(e) => setForecastYear(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter a future year"
                required
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-200"
              >
                {isLoading ? 'Predicting...' : '🚀 Predict Production'}
              </button>
            </div>
          </form>

          {/* Prediction Display */}
          {prediction && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 p-6 bg-blue-100 dark:bg-blue-900 rounded-xl shadow-sm"
            >
              <h3 className="text-xl font-semibold text-blue-800 dark:text-white mb-4">
                {prediction.message}
              </h3>
              <div className="space-y-2 text-blue-800 dark:text-blue-100">
                <p>
                  Classification Label: <span className="font-bold">{prediction.label}</span>
                </p>
                <p>
                  Predicted Value: <span className="font-bold">{prediction.predictedValue}</span>
                </p>
                <p>
                  Confidence:{' '}
                  <span className="font-bold">
                    {prediction.confidence ? `${(prediction.confidence * 100).toFixed(1)}%` : 'N/A'}
                  </span>
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-300">
                  Generated at: {new Date(prediction.timestamp).toLocaleString()}
                </p>
                <p>
                  Regression Prediction:{' '}
                  <span className="font-bold">
                    {prediction.regressionValue ? `${prediction.regressionValue.toFixed(2)} kg` : 'N/A'}
                  </span>
                </p>
              </div>
            </motion.div>
          )}

          {/* Forecast Display */}
          {forecastResults && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-green-100 dark:bg-green-900 rounded-xl shadow-sm"
            >
              <h3 className="text-xl font-semibold text-green-800 dark:text-white mb-4">
                🌿 Forecasted Coffee Production
              </h3>
              <div className="space-y-2 text-green-800 dark:text-green-100">
                {forecastResults.map((result: any) => (
                  <p key={result.year}>
                    Forecast for {result.year}:{' '}
                    <span className="font-semibold">
                      {result.forecastedProduction
                        ? `${result.forecastedProduction.toFixed(2)} kg`
                        : 'Not available'}
                    </span>
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
