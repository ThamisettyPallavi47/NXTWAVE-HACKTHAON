import random

def generate_social_post(name, material):
    """
    Generates a short social media caption + hashtags.
    """
    captions = [
        f"Check out this amazing {name} made with {material}! 🌿✨",
        f"Add some style to your life with our {material}-based {name}. #Handmade #EcoFriendly",
        f"Discover the beauty of artisanal craftsmanship with {name}. Perfect for gifting! #ArtisanLife #Sustainable"
    ]

    hashtags = ["#Handmade", "#EcoFriendly", "#ArtisanProduct", f"#{name.replace(' ', '')}"]

    return random.choice(captions), hashtags
