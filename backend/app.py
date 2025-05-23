# app.py (Flask backend)
import pickle
from flask import Flask, request, jsonify
from prophet import Prophet
import pandas as pd
import joblib
import json
from flask_cors import CORS
import google.generativeai as genai
import os

# Set your Gemini API key
genai.configure(
    api_key="AIzaSyBIpn7wZdStKbfe2KXKTDF3bdoCIAqZtaY"
)  # Or hardcode it for now


app = Flask(__name__)
CORS(app)
lr_model = joblib.load("xgb_coffee_classifier.pkl")
prp_model = joblib.load("prophet_model.h5")
xgb_model = joblib.load("xgb_coffee_model.pkl")


@app.route("/predict/forecast", methods=["POST"])
def predict_forecast():
    try:
        data = request.json
        years_to_check = data.get("years", [])

        if not years_to_check:
            return jsonify({"status": "error", "message": "No years provided"}), 400

        # Load the saved Prophet model
        with open("prophet_model.h5", "rb") as f:
            prophet_model = pickle.load(f)

        # Generate future dataframe
        future = prophet_model.make_future_dataframe(periods=15, freq="Y")
        forecast = prophet_model.predict(future)

        # Prepare results
        results = []
        for year in years_to_check:
            row = forecast[forecast["ds"].dt.year == int(year)]
            if not row.empty:
                yhat = float(row["yhat"].values[0])
                results.append(
                    {"year": int(year), "forecastedProduction": round(yhat, 2)}
                )
            else:
                results.append(
                    {
                        "year": int(year),
                        "forecastedProduction": None,
                        "message": "Year not in forecast",
                    }
                )

        return jsonify({"status": "success", "forecast": results})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route("/predict/regression", methods=["POST"])
def predict_regression():
    data = request.json
    temperature = float(data["temperature"])
    year = int(data["year"])
    country_encoded = int(data["country_encoded"])
    attribute_encoded = int(data["attribute_encoded"])

    # Construct input DataFrame
    input_df = pd.DataFrame(
        [
            {
                "Year": year,
                "TemperatureAnomaly": temperature,
                "Country_encoded": country_encoded,
                "Attribute_encoded": attribute_encoded,
            }
        ]
    )

    # Predict using the regression model
    reg_pred = xgb_model.predict(input_df)[0]

    response = {
        "predictedValue": float(reg_pred),
    }
    return jsonify(response)


@app.route("/predict/classification", methods=["POST"])
def predict_classification():
    data = request.json
    temperature = float(data["temperature"])
    year = int(data["year"])
    country_encoded = int(data["country_encoded"])
    attribute_encoded = int(data["attribute_encoded"])

    # Input DataFrame
    input_df = pd.DataFrame(
        [
            {
                "Year": year,
                "TemperatureAnomaly": temperature,
                "Country_encoded": country_encoded,
                "Attribute_encoded": attribute_encoded,
            }
        ]
    )

    # Predict
    class_pred = lr_model.predict(input_df)[0]
    probas = lr_model.predict_proba(input_df)[0]
    confidence = float(probas[int(class_pred)])  # ✅ Convert to native float

    label = "HIGH" if class_pred == 1 else "LOW"

    response = {
        "label": label,
        "predictedValue": int(class_pred),
        "confidence": round(confidence, 4),  # Already a Python float
    }
    return jsonify(response)


@app.route("/predict/story", methods=["POST"])
def generate_story():
    try:
        data = request.json
        print("Received /predict/story data:", data)

        label = data.get("label")
        confidence = data.get("confidence")
        regression_value = data.get("regressionValue")
        forecast = data.get("forecast", [])

        if not all([label, confidence is not None, regression_value is not None]):
            print("❌ Missing values in input!")
            return (
                jsonify({"status": "error", "message": "Missing required input"}),
                400,
            )

        forecast_text = "\n".join(
            [f" - {f['year']}: {f['forecastedProduction']} kg" for f in forecast]
        )

        prompt = f"""
        You are an assistant who explains machine learning predictions about coffee production in a storytelling style for general users.

        Here are the results:
        - Classification label: {label}
        - Confidence: {confidence * 100:.1f}%
        - Regression predicted value: {regression_value:.2f} kg
        - Forecasts:\n{forecast_text}

        Write a friendly, engaging summary of these predictions for a non-technical audience.
        """
        print("Generated prompt:\n", prompt)

        # Use the default Gemini model for free tier
        model = genai.GenerativeModel()
        response = model.generate_content(prompt)
        print("Gemini response received.")

        return jsonify({"status": "success", "story": response.text})

    except Exception as e:
        print("❌ Gemini API Error:", str(e))
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
