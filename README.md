# ☕ Coffee Production Prediction System

This project uses machine learning to predict coffee production based on environmental and categorical parameters such as year, temperature anomaly, country, and coffee type. The system compares three regression models (Linear Regression, Random Forest, XGBoost) to determine the most effective model for prediction.

## 📌 Features

- Predicts coffee production (in kg) based on:
  - Year
  - Temperature anomaly (°C)
  - Country
  - Type of coffee attribute (e.g., Arabica, Robusta)
- Compares model performance using MSE and R² metrics
- Uses historical data for training
- Real-time prediction capability for any given input
- Can be extended for visualization, dashboarding (Power BI), and natural language interpretation (AI/ML storytelling module)

## 🔍 Dataset Columns

- `Year`: Year of observation
- `TemperatureAnomaly`: Temperature anomaly value for the year
- `Country`: Country name
- `Attribute`: Type of coffee production
- `Value`: Coffee production quantity in kilograms

Encoded columns:
- `Country_encoded`: Numerical encoding of country
- `Attribute_encoded`: Numerical encoding of coffee type

## 🧠 Machine Learning Models Used

| Model              | Description                           |
|-------------------|---------------------------------------|
| Linear Regression  | Simple baseline model                 |
| Random Forest      | Ensemble tree-based regression        |
| XGBoost Regressor  | Gradient-boosted decision trees       |

## 📊 Model Evaluation Metrics

- **MSE (Mean Squared Error)**: Measures average squared difference between actual and predicted values
- **R² (R-squared)**: Proportion of variance explained by the model

## 🛠️ Setup Instructions

### Prerequisites

Make sure you have the following installed:
- Python 3.8+
- pip
- virtualenv (optional but recommended)

### Install Dependencies

```bash
pip install -r requirements.txt
