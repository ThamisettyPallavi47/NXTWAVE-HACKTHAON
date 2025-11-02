# import requests
# import os

# def generate_image(prompt):
#     url = "https://api.stability.ai/v2beta/stable-image/generate/sd2"
#     headers = {
#         "Authorization": f"Bearer {os.getenv('STABILITY_API_KEY')}",
#         "Content-Type": "application/json"
#     }
#     payload = {
#         "prompt": prompt,
#         "width": 512,
#         "height": 512,
#         "samples": 1,
#         "seed": None,
#         "webhook": None,
#         "track_id": None
#     }
#     response = requests.post(url, json=payload, headers=headers)
#     if response.status_code == 200:
#         image_url = response.json()['artifacts'][0]['url']
#         return image_url
#     else:
#         return None


import requests
import os

def generate_image(prompt):
    api_key = os.getenv("STABILITY_API_KEY")
    if not api_key:
        print("STABILITY_API_KEY not set")
        return None

    url = "https://api.stability.ai/v1/generation/stable-diffusion-512-v2-1/text-to-image"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "text_prompts": [{"text": prompt}],
        "cfg_scale": 7,
        "height": 512,
        "width": 512,
        "samples": 1,
        "steps": 30
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code == 200:
            # image comes as base64
            image_base64 = response.json()["artifacts"][0]["base64"]
            return f"data:image/png;base64,{image_base64}"
        else:
            print("Stability AI Error:", response.status_code, response.text)
            return None
    except Exception as e:
        print("Exception while generating image:", e)
        return None
