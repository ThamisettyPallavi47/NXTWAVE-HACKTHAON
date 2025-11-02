# import requests

# url = "https://api.dev.runwayml.com/v1/text_to_video"
# headers = {
#     "Authorization": "Bearer key_9965c337eb754bc3519e6dd89f6f5b917082068819471896fb8004f1347f3457c42f41d70b4e630d07b43ef799e69a5c4adf3c6da35d1aff2911b7e45db36fa7",
#     "Content-Type": "application/json",
#     "X-Runway-Version": "2024-11-06"
# }
# data = {
#     "model": "gen3",  # 👈 fallback model
#     "promptText": "A test video of a flying kite",
#     "duration": 4,
#     "ratio": "1280:720"
# }

# response = requests.post(url, headers=headers, json=data)

# print("Status code:", response.status_code)
# print("Response:", response.json())
import requests, os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("STABILITY_API_KEY")
print("Using API KEY:", api_key)

# url = "https://api.stability.ai/v1/generation/stable-diffusion-512-v2-1/text-to-image"
url = "https://api.stability.ai/v1/generation/stable-diffusion-xl-beta-v2-2/text-to-image"

headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
# payload = {"text_prompts":[{"text":"A cute robot"}], "height":512, "width":512, "samples":1}
payload = {
    "text_prompts": [{"text": "A cute robot"}],
    "cfg_scale": 7,
    "height": 512,
    "width": 512,
    "samples": 1,
    "steps": 30
}


res = requests.post(url, json=payload, headers=headers)
print(res.status_code)
print(res.text)
