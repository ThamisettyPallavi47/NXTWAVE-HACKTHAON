

def recommend_marketplaces(product_name: str, material: str = ""):
    """
    Returns recommended marketplaces (name + URL) based on product type + material.
    """

    name = product_name.lower()
    mat = material.lower()

    # Marketplace mapping with links
    marketplaces_info = {
        ("bamboo", "basket"): [
            {"name": "Etsy", "url": "https://www.etsy.com"},
            {"name": "Amazon Handmade", "url": "https://www.amazon.com/handmade"},
            {"name": "Flipkart Samarth", "url": "https://www.flipkart.com/samarth"},
            {"name": "Craftsvilla", "url": "https://www.craftsvilla.com"},
        ],
        ("cotton", "bag"): [
            {"name": "Myntra", "url": "https://www.myntra.com"},
            {"name": "Amazon", "url": "https://www.amazon.com"},
            {"name": "Flipkart", "url": "https://www.flipkart.com"},
            {"name": "Ajio", "url": "https://www.ajio.com"},
        ],
        ("handmade", "jewelry"): [
            {"name": "Etsy", "url": "https://www.etsy.com"},
            {"name": "Instagram Shops", "url": "https://www.instagram.com"},
            {"name": "Amazon Handmade", "url": "https://www.amazon.com/handmade"},
        ]
    }

    # Try exact (material + product) match
    for (mat_key, prod_key), marketplaces in marketplaces_info.items():
        if mat_key in mat or mat_key in name:
            if prod_key in name:
                return marketplaces

    # If no exact combo match, fallback by product keywords only
    if "basket" in name:
        return marketplaces_info[("bamboo", "basket")]
    elif "jewelry" in name or "necklace" in name or "earring" in name:
        return marketplaces_info[("handmade", "jewelry")]
    elif "bag" in name:
        return marketplaces_info[("cotton", "bag")]
    else:
        # Default
        return [
            {"name": "Amazon", "url": "https://www.amazon.com"},
            {"name": "Etsy", "url": "https://www.etsy.com"},
            {"name": "Flipkart", "url": "https://www.flipkart.com"},
        ]
