import random

def generate_description(name, material, price):
    """
    Generates a simple AI-like description and keywords for a product.
    Replace with Hugging Face/OpenAI API later.
    """
    # templates = [
    #     f"The {name} is handcrafted with premium {material}, priced around {price}. A perfect choice for sustainable living.",
    #     f"Experience authentic craftsmanship with this {material}-based {name}. Estimated price: {price}.",
    #     f"A unique {name} made using eco-friendly {material}, ideal for everyday use. Price range: {price}."
    # ]
    templates = [
    f"The {name} is handcrafted with premium {material}, priced around {price}. Each piece is made with attention to detail and care, ensuring lasting quality. Perfect for eco-conscious living and gifting.",
    f"Experience authentic craftsmanship with this {material}-based {name}. Estimated price: {price}. This product combines traditional techniques with modern design, making it both functional and stylish.",
    f"A unique {name} made using eco-friendly {material}, ideal for everyday use. Price range: {price}. It is lightweight, durable, and a perfect addition to your sustainable lifestyle.",
    f"Introducing the {name}, made from high-quality {material} and priced at {price}. Designed for both utility and elegance, it reflects artisanal excellence and a commitment to the environment."
]


    description = random.choice(templates)
    keywords = [name, material, "handmade", "eco-friendly", "artisan product"]

    return description, keywords
