import requests

url = "http://127.0.0.1:5000/generate-description"
data = {
    "name": "Handmade Bamboo Basket",
    "material": "Bamboo",
    "price": "500"
}

response = requests.post(url, json=data)
print(response.json())
