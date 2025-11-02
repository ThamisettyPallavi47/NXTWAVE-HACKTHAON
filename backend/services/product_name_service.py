from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import re, torch

# Load BLIP model once (for speed)
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

def predict_product_name(image_path):
    image = Image.open(image_path).convert("RGB")
    inputs = processor(image, return_tensors="pt")
    output = model.generate(**inputs, max_new_tokens=20)
    caption = processor.decode(output[0], skip_special_tokens=True)

    # Clean caption to product-like name
    caption = caption.lower()
    caption = re.sub(r"^(a|an|the)\s+", "", caption)
    caption = re.sub(r"\b(on|of|in|with|and|by)\b.*", "", caption)
    words = caption.split()
    product_name = " ".join(words[:4])
    return product_name.strip()
