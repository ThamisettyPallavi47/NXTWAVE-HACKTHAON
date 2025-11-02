import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder

# Load sample data
data = pd.read_csv("data/product_sales.csv")

# Encode categorical features
le_product = LabelEncoder()
le_region = LabelEncoder()
le_category = LabelEncoder()
le_material = LabelEncoder()

data["product_encoded"] = le_product.fit_transform(data["product_name"])
data["region_encoded"] = le_region.fit_transform(data["region"])
data["category_encoded"] = le_category.fit_transform(data["category"])
data["material_encoded"] = le_material.fit_transform(data["material"])

# Features and target
X = data[["product_encoded", "region_encoded", "category_encoded", "material_encoded"]]
y = data["sales_last_month"]

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X, y)

# Prediction function
def predict_interest(product_name, category, material):
    product_encoded = le_product.transform([product_name])[0] if product_name in le_product.classes_ else -1
    category_encoded = le_category.transform([category])[0] if category in le_category.classes_ else -1
    material_encoded = le_material.transform([material])[0] if material in le_material.classes_ else -1

    regions = le_region.classes_
    predictions = {}
    for region in regions:
        region_encoded = le_region.transform([region])[0]
        X_test = [[product_encoded, region_encoded, category_encoded, material_encoded]]
        predicted_sales = model.predict(X_test)[0]
        predictions[region] = round(predicted_sales, 2)

    # Sort by predicted sales descending
    sorted_predictions = dict(sorted(predictions.items(), key=lambda x: x[1], reverse=True))
    return sorted_predictions
