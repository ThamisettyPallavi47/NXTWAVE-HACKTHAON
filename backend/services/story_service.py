

import random

def generate_story(product_name, material, artisan_name=None, location=None, use_case=None):
    """
    Generates a dynamic, personalized brand/origin story and multiple captions.
    """
    # Default placeholders if not provided
    artisan = artisan_name if artisan_name else "skilled local artisans"
    place = f"from {location}" if location else ""
    use_case_text = f"perfect for {use_case}" if use_case else "ideal for everyday use and gifting"

    # Story chunks with personalization
    story_chunks = [
        f"The {product_name} is meticulously handcrafted from premium {material} by {artisan} {place}.",
        f"Each piece tells a story of dedication, tradition, and attention to detail.",
        f"Designed to combine functionality with elegance, this {product_name} is {use_case_text}, bringing a touch of artisanal charm to your home.",
        f"This product showcases the beauty of traditional craftsmanship while meeting modern needs.",
        f"Every curve and texture reflects hours of work and a commitment to eco-friendly practices.",
        f"A timeless piece that adds warmth and character to your everyday life.",
        f"From sourcing materials responsibly to the final finishing touches, each {product_name} is created with care, skill, and passion.",
        f"Perfect for those who value authenticity, sustainability, and artistry in every product they own.",
        f"Lightweight yet durable, this piece is ideal for both functional use and decorative display.",
        f"Bring a piece of heritage into your home with this unique, handcrafted {product_name}."
    ]

    # Randomly pick 3–5 chunks
    num_chunks = random.randint(3, 5)
    selected_chunks = random.sample(story_chunks, num_chunks)
    story = " ".join(selected_chunks)

    # Captions (can be later personalized too)
    caption = [
        f"Celebrate the art of handmade with our {product_name} made from {material}. {use_case_text.capitalize()}! #Handmade #ArtisanLife #SustainableLiving",
        # f"Discover the elegance and charm of our {material}-based {product_name} crafted by {artisan}. Every piece tells a story of craftsmanship and care. #EcoFriendly #Handcrafted #ArtisanProduct",
        # f"Bring tradition and artistry into your life with our {product_name}. Made with love by {artisan} {place}, it’s perfect for conscious living. #ArtisanCraft #HandmadeWithLove #Sustainable",
        # f"Experience authentic craftsmanship with this {product_name} made from {material}. A beautiful addition to your home or a thoughtful gift! #Handmade #EcoFriendly #ArtisanLife",
        # f"Every {product_name} has a story to tell. Made from {material} by {artisan} {place}, it combines tradition, elegance, and sustainability. #Artisan #Handcrafted #EcoFriendly"
    ]

    return story, caption
