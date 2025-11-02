# services/publish_service.py

def publish_social_mock(caption, image_url, platform):
    """
    Mock publishing function.
    Returns a success message without calling any real API.
    """
    # You can add some fake delay to make it look real
    import time
    time.sleep(1)

    return {
        "status": "success",
        "platform": platform,
        "caption": caption,
        "image_url": image_url,
        "message": f"Successfully 'published' to {platform} (mock)"
    }
