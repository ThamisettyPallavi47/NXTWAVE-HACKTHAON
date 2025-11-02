

# def suggest_price(product_name: str, material: str, location: str, artisan_name: str = None) -> str:
#     """
#     Returns a dummy price range string for testing purposes.
#     """
#     # You can make this more dynamic if you want
#     dummy_prices = {
#         "Bamboo Basket": "₹400 - ₹600",
#         "Clay Pot": "₹250 - ₹400",
#         "Handmade Scarf": "₹500 - ₹800"
#     }
    
#     # Return the dummy price if product exists, else a default
#     return dummy_prices.get(product_name, "₹300 - ₹500")


def suggest_price(product_name: str, material: str, location: str, artisan_name: str = None) -> str:
    """
    Returns a dummy price range string for testing purposes.
    """
    # Expanded dummy prices
    dummy_prices = {
        "bamboo basket": "₹400 - ₹600",
        "clay pot": "₹250 - ₹400",
        "handmade scarf": "₹500 - ₹800",
        "terracotta vase": "₹350 - ₹550",
        "embroidered cushion": "₹450 - ₹700",
        "wooden jewelry box": "₹600 - ₹900",
        "knitted woolen socks": "₹300 - ₹450",
        "hand-painted mug": "₹200 - ₹350",
        "leather wallet": "₹700 - ₹1200",
        "silk saree": "₹1500 - ₹2500",
        "ceramic plate set": "₹800 - ₹1200",
        "handwoven bag": "₹500 - ₹850"
    }
    
    # Normalize input
    key = product_name.strip().lower()

    # Return the dummy price if product exists, else a default
    return dummy_prices.get(key, "₹300 - ₹500")
