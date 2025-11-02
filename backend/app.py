
from flask import Flask, request, jsonify
from flask_cors import CORS
from services.description_service import generate_description
from services.social_service import generate_social_post
from services.story_service import generate_story 
from services.marketplace_service import recommend_marketplaces
from services.pricing_service import suggest_price
from services.image_service import generate_image
from services.interest_service import predict_interest
from services.publish_service import publish_social_mock
from deep_translator import GoogleTranslator

from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import os
import razorpay
from werkzeug.utils import secure_filename

# ---------- App Config ----------
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# ---------- MongoDB Setup ----------
client = MongoClient("mongodb://localhost:27017/")  # Update if needed
db = client["artisan_marketplace"]
products_collection = db["products"]


# Reviews collection
reviews_collection = db["reviews"]

users_collection = db["users"]

orders_collection = db["orders"]

wishlist_collection = db["wishlist"]

cart_collection = db["cart"]

RAZORPAY_KEY_ID = "rzp_test_RabCipwRqE6OvD"
RAZORPAY_KEY_SECRET = "CRq63kgfFXVlnnG7dnxjhMzF"

razorpay_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

# ---------- USER AUTH (REGISTER / LOGIN) ----------
@app.route("/register", methods=["POST"])
def register_user():
    try:
        data = request.json
        full_name = data.get("fullName")
        email = data.get("email")
        password = data.get("password")
        role = data.get("role", "user")

        if not all([full_name, email, password]):
            return jsonify({"error": "All fields required"}), 400

        if users_collection.find_one({"email": email}):
            return jsonify({"error": "User already exists"}), 400

        hashed_pw = generate_password_hash(password)
        users_collection.insert_one({
            "full_name": full_name,
            "email": email,
            "password": hashed_pw,
            "role": role
        })
        return jsonify({"message": "Registration successful"}), 201
    except Exception as e:
        print("Error registering user:", e)
        return jsonify({"error": "Server error"}), 500


@app.route("/login", methods=["POST"])
def login_user():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")

        if not all([email, password]):
            return jsonify({"error": "Email and password required"}), 400

        user = users_collection.find_one({"email": email})
        if not user:
            return jsonify({"error": "User not found"}), 404

        if not check_password_hash(user["password"], password):
            return jsonify({"error": "Invalid password"}), 401

        return jsonify({
            "message": "Login successful",
            "user": {
                "full_name": user["full_name"],
                "email": user["email"],
                "role": user.get("role", "user")
            }
        }), 200
    except Exception as e:
        print("Error during login:", e)
        return jsonify({"error": "Server error"}), 500

@app.route("/add-review", methods=["POST"])
def add_review():
    try:
        data = request.json
        product_name = data.get("product_name")
        user_email = data.get("user_email")
        rating = data.get("rating")
        comment = data.get("comment", "")

        if not all([product_name, user_email, rating]):
            return jsonify({"error": "All fields required"}), 400

        review_data = {
            "product_name": product_name,
            "user_email": user_email,
            "rating": rating,
            "comment": comment
        }
        reviews_collection.insert_one(review_data)
        return jsonify({"message": "Review added successfully"}), 201
    except Exception as e:
        print("Error adding review:", e)
        return jsonify({"error": "Server error"}), 500


@app.route("/get-reviews/<product_name>", methods=["GET"])
def get_reviews(product_name):
    try:
        product_reviews = list(reviews_collection.find({"product_name": product_name}, {"_id": 0}))
        return jsonify({"reviews": product_reviews}), 200
    except Exception as e:
        print("Error fetching reviews:", e)
        return jsonify({"error": "Server error"}), 500


# Orders collection
orders_collection = db["orders"]

@app.route("/create-order", methods=["POST"])
def create_order():
    try:
        data = request.json
        user_email = data.get("user_email")
        products = data.get("products", [])
        total = sum([float(p.get("price", 0)) for p in products])

        if not user_email or not products:
            return jsonify({"error": "User email and products required"}), 400

        order = {
            "user_email": user_email,
            "products": products,
            "total": total,
            "status": "paid"  # mock
        }
        orders_collection.insert_one(order)
        return jsonify({"message": "Order created successfully", "order_id": str(order["_id"])}), 201
    except Exception as e:
        print("Error creating order:", e)
        return jsonify({"error": "Server error"}), 500

# ---------- Upload Folder ----------
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


# ---------- Helper Functions ----------
def translate_text(text, target_lang):
    try:
        return GoogleTranslator(source='auto', target=target_lang).translate(text)
    except Exception as e:
        print("Translation error:", e)
        return text

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/add-product", methods=["POST"])
def add_product():
    try:
        name = request.form.get("name")
        description = request.form.get("description")
        price = request.form.get("price")
        category = request.form.get("category")
        material = request.form.get("material")
        artisan_name = request.form.get("artisan_name") 
        admin_email = request.form.get("admin_email")  # <-- Add this
        image_file = request.files.get("image")

        if not all([name, description, price, category, material, artisan_name,admin_email]):
            return jsonify({"error": "All fields are required"}), 400

        image_url = None
        if image_file and allowed_file(image_file.filename):
            filename = secure_filename(image_file.filename)
            image_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            image_file.save(image_path)
            image_url = f"/uploads/{filename}"
        elif image_file:
            return jsonify({"error": "Invalid image format. Use JPG or PNG."}), 400

        product_data = {
            "name": name,
            "description": description,
            "price": price,
            "category": category,
            "material": material,
            "artisan_name": artisan_name,
            "admin_email": admin_email,     # <-- Store artisan name in DB
            "image_url": image_url,
        }

        products_collection.insert_one(product_data)
        return jsonify({"message": "Product added successfully!"}), 201

    except Exception as e:
        print("Error adding product:", e)
        return jsonify({"error": "Server error. Try again later."}), 500



@app.route("/get-products", methods=["GET"])
def get_products():
    try:
        admin_email = request.args.get("admin_email")

        query = {}
        if admin_email:
            query["admin_email"] = admin_email  # ✅ return only that admin’s products

        products = list(products_collection.find(query, {"_id": 0}))
        return jsonify({"products": products}), 200
    except Exception as e:
        print("Error fetching products:", e)
        return jsonify({"error": "Failed to fetch products"}), 500


@app.route("/get-product/<string:name>", methods=["GET"])
def get_product(name):
    try:
        product = products_collection.find_one({"name": name}, {"_id": 0})
        if not product:
            return jsonify({"error": "Product not found"}), 404
        return jsonify({"product": product}), 200
    except Exception as e:
        print("Error fetching product:", e)
        return jsonify({"error": "Server error"}), 500


# ---------- Update Product ----------
# @app.route("/update-product/<string:name>", methods=["PUT"])
# def update_product(name):
#     try:
#         data = request.json
#         update_fields = {k: v for k, v in data.items() if v}
#         result = products_collection.update_one({"name": name}, {"$set": update_fields})
#         if result.matched_count == 0:
#             return jsonify({"error": "Product not found"}), 404
#         return jsonify({"message": "Product updated successfully"}), 200
#     except Exception as e:
#         print("Error updating product:", e)
#         return jsonify({"error": "Server error"}), 500

# ---------- Update Product (supports image upload) ----------
@app.route("/update-product/<string:name>", methods=["PUT"])
def update_product(name):
    try:
        # Get existing product
        product = products_collection.find_one({"name": name})
        if not product:
            return jsonify({"error": "Product not found"}), 404

        # Handle form data (for text + optional image)
        name_new = request.form.get("name", product["name"])
        description = request.form.get("description", product["description"])
        price = request.form.get("price", product["price"])
        category = request.form.get("category", product["category"])
        material = request.form.get("material", product["material"])

        update_fields = {
            "name": name_new,
            "description": description,
            "price": price,
            "category": category,
            "material": material,
        }

        # Handle new image if provided
        image_file = request.files.get("image")
        if image_file and image_file.filename != "":
            if allowed_file(image_file.filename):
                filename = secure_filename(image_file.filename)
                image_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
                image_file.save(image_path)
                update_fields["image_url"] = f"/uploads/{filename}"
            else:
                return jsonify({"error": "Invalid image format"}), 400

        # Update in MongoDB
        result = products_collection.update_one({"name": name}, {"$set": update_fields})
        if result.matched_count == 0:
            return jsonify({"error": "Product not found"}), 404

        return jsonify({"message": "Product updated successfully"}), 200

    except Exception as e:
        print("Error updating product:", e)
        return jsonify({"error": str(e)}), 500



# ---------- Delete Product ----------
@app.route("/delete-product/<string:name>", methods=["DELETE"])
def delete_product(name):
    try:
        result = products_collection.delete_one({"name": name})
        if result.deleted_count == 0:
            return jsonify({"error": "Product not found"}), 404
        return jsonify({"message": "Product deleted successfully"}), 200
    except Exception as e:
        print("Error deleting product:", e)
        return jsonify({"error": "Server error"}), 500


# ---------- Serve Uploaded Images ----------
@app.route("/uploads/<filename>")
def serve_image(filename):
    from flask import send_from_directory
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)


# ---------- Existing Routes ----------
@app.route("/generate-description", methods=["POST"])
def generate_description_api():
    data = request.json
    name = data.get("name", "")
    material = data.get("material", "")
    price = data.get("price", "")
    lang = data.get("lang", "en")

    description, keywords = generate_description(name, material, price)
    if lang != "en":
        description = translate_text(description, lang)
        keywords = [translate_text(k, lang) for k in keywords]
    return jsonify({"description": description, "keywords": keywords})


@app.route("/generate-social-post", methods=["POST"])
def generate_social_post_api():
    data = request.json
    name = data.get("name", "")
    material = data.get("material", "")
    lang = data.get("lang", "en")

    caption, hashtags = generate_social_post(name, material)
    if lang != "en":
        caption = translate_text(caption, lang)
        hashtags = [translate_text(h, lang) for h in hashtags]
    return jsonify({"caption": caption, "hashtags": hashtags})


@app.route('/generate-story', methods=['POST'])
def generate_story_endpoint():
    data = request.json
    product_name = data.get('product_name')
    material = data.get('material')
    artisan_name = data.get('artisan_name')
    location = data.get('location')
    use_case = data.get('use_case')
    story, caption = generate_story(product_name, material, artisan_name, location, use_case)
    return jsonify({'story': story, 'caption': caption})


@app.route("/recommend-marketplace", methods=["POST"])
def recommend_marketplace_endpoint():
    data = request.json
    product_name = data.get("product_name", "")
    material = data.get("material", "")
    if not product_name:
        return jsonify({"error": "Product name is required"}), 400
    recommendations = recommend_marketplaces(product_name, material)
    return jsonify({"marketplaces": recommendations})


@app.route("/suggest-price", methods=["POST"])
def suggest_price_api():
    data = request.json or {}
    product_name = data.get("product_name", "").strip()
    material = data.get("material", "").strip()
    location = data.get("location", "").strip()
    artisan_name = data.get("artisan_name", "").strip() if data.get("artisan_name") else None
    if not product_name or not material or not location:
        return jsonify({"error": "Product name, material, and location are required"}), 400
    price_range = suggest_price(product_name, material, location, artisan_name)
    if price_range.lower().startswith("error"):
        return jsonify({"error": price_range}), 500
    return jsonify({"price_range": price_range})


@app.route('/generate-image', methods=['POST'])
def generate_image_route():
    data = request.get_json()
    prompt = data.get('prompt')
    if prompt:
        image_url = generate_image(prompt)
        if image_url:
            return jsonify({"image_url": image_url}), 200
        else:
            return jsonify({"error": "Image generation failed"}), 500
    else:
        return jsonify({"error": "No prompt provided"}), 400


@app.route("/predict-interest", methods=["POST"])
def predict_interest_api():
    data = request.json
    product_name = data.get("name", "")
    category = data.get("category", "")
    material = data.get("material", "")
    if not product_name or not category or not material:
        return jsonify({"error": "Product name, category, and material are required"}), 400
    try:
        predictions = predict_interest(product_name, category, material)
        return jsonify({"predictions": predictions})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/publish-social", methods=["POST"])
def publish_social_api():
    data = request.json
    caption = data.get("caption", "")
    image_url = data.get("image_url", "")
    platform = data.get("platform", "")
    if not caption or not platform:
        return jsonify({"error": "Caption and platform are required"}), 400
    result = publish_social_mock(caption, image_url, platform)
    return jsonify(result)

# ---------- Chat System (Customer ↔ Artisan) ----------
chats_collection = db["chats"]

@app.route("/send-message", methods=["POST"])
def send_message():
    """
    sender_email: str
    receiver_email: str
    message: str
    sender_lang: str  (e.g., 'en')
    receiver_lang: str (e.g., 'te')
    """
    try:
        data = request.json
        sender_email = data.get("sender_email")
        receiver_email = data.get("receiver_email")
        message = data.get("message")
        sender_lang = data.get("sender_lang", "en")
        receiver_lang = data.get("receiver_lang", "en")

        if not all([sender_email, receiver_email, message]):
            return jsonify({"error": "Missing required fields"}), 400

        # Translate message for receiver
        translated_msg = translate_text(message, receiver_lang)

        chat_entry = {
            "sender_email": sender_email,
            "receiver_email": receiver_email,
            "original_message": message,
            "translated_message": translated_msg,
            "sender_lang": sender_lang,
            "receiver_lang": receiver_lang,
        }
        chats_collection.insert_one(chat_entry)

        return jsonify({
            "message": "Message sent successfully",
            "translated_message": translated_msg
        }), 201
    except Exception as e:
        print("Error in /send-message:", e)
        return jsonify({"error": "Server error"}), 500


@app.route("/get-chat", methods=["GET"])
def get_chat():
    """
    Fetch chat history between two users
    Query params:
      ?user1=email1&user2=email2
    """
    try:
        user1 = request.args.get("user1")
        user2 = request.args.get("user2")

        if not all([user1, user2]):
            return jsonify({"error": "Both user emails required"}), 400

        chats = list(chats_collection.find({
            "$or": [
                {"sender_email": user1, "receiver_email": user2},
                {"sender_email": user2, "receiver_email": user1}
            ]
        }, {"_id": 0}))
        return jsonify({"chats": chats}), 200
    except Exception as e:
        print("Error fetching chat:", e)
        return jsonify({"error": "Server error"}), 500


@app.route("/update-language", methods=["POST"])
def update_language():
    """
    Store or update a user's preferred chat language
    """
    try:
        data = request.json
        email = data.get("email")
        language = data.get("language")

        if not all([email, language]):
            return jsonify({"error": "Email and language required"}), 400

        users_collection.update_one(
            {"email": email},
            {"$set": {"preferred_language": language}},
            upsert=True
        )
        return jsonify({"message": f"Language updated to {language}"}), 200
    except Exception as e:
        print("Error updating language:", e)
        return jsonify({"error": "Server error"}), 500

# ------------------------------
# 💖 WISHLIST FEATURE (Stored in MongoDB)
# ------------------------------

@app.route('/wishlist/toggle', methods=['POST'])
def toggle_wishlist():
    """
    Toggle wishlist status for a product.
    Expects JSON:
    {
      "user_email": "abc@gmail.com",
      "product_name": "Clay Pot"
    }
    """
    try:
        data = request.get_json()
        user_email = data.get("user_email")
        product_name = data.get("product_name")

        if not user_email or not product_name:
            return jsonify({"error": "Missing data"}), 400

        existing = wishlist_collection.find_one({
            "user_email": user_email,
            "product_name": product_name
        })

        if existing:
            wishlist_collection.delete_one({
                "user_email": user_email,
                "product_name": product_name
            })
            return jsonify({"status": "removed"}), 200
        else:
            wishlist_collection.insert_one({
                "user_email": user_email,
                "product_name": product_name
            })
            return jsonify({"status": "added"}), 201

    except Exception as e:
        print("Error toggling wishlist:", e)
        return jsonify({"error": "Server error"}), 500


@app.route('/wishlist/<user_email>', methods=['GET'])
def get_wishlist(user_email):
    """
    Get all wishlist items for a specific user
    """
    try:
        items = list(wishlist_collection.find(
            {"user_email": user_email},
            {"_id": 0, "product_name": 1}
        ))
        wishlist_items = [i["product_name"] for i in items]
        return jsonify({"wishlist": wishlist_items}), 200
    except Exception as e:
        print("Error fetching wishlist:", e)
        return jsonify({"error": "Server error"}), 500

@app.route('/cart/add', methods=['POST'])
def add_to_cart():
    """
    Add a product to the user's cart.
    Expected JSON:
    {
      "user_email": "pallavi@gmail.com",
      "product_name": "Clay Pot",
      "price": 250,
      "image_url": "/uploads/claypot.jpg",
      "quantity": 1
    }
    """
    try:
        data = request.get_json()
        user_email = data.get("user_email")
        product_name = data.get("product_name")
        price = data.get("price")
        image_url = data.get("image_url")
        quantity = int(data.get("quantity", 1))

        if not all([user_email, product_name, price]):
            return jsonify({"error": "Missing required fields"}), 400

        existing_item = cart_collection.find_one({
            "user_email": user_email,
            "product_name": product_name
        })

        if existing_item:
            # If product already in cart, increase quantity
            cart_collection.update_one(
                {"_id": existing_item["_id"]},
                {"$inc": {"quantity": quantity}}
            )
            return jsonify({"message": "Quantity updated in cart"}), 200

        # Otherwise, add new item
        cart_item = {
            "user_email": user_email,
            "product_name": product_name,
            "price": price,
            "image_url": image_url,
            "quantity": quantity
        }
        cart_collection.insert_one(cart_item)
        return jsonify({"message": "Product added to cart"}), 201

    except Exception as e:
        print("Error adding to cart:", e)
        return jsonify({"error": "Server error"}), 500


@app.route('/cart/<user_email>', methods=['GET'])
def get_cart(user_email):
    """
    Get all cart items for a user
    """
    try:
        items = list(cart_collection.find({"user_email": user_email}, {"_id": 0}))
        return jsonify({"cart": items}), 200
    except Exception as e:
        print("Error fetching cart:", e)
        return jsonify({"error": "Server error"}), 500


@app.route('/cart/remove', methods=['POST'])
def remove_from_cart():
    """
    Remove a product from the user's cart.
    Expected JSON:
    {
      "user_email": "pallavi@gmail.com",
      "product_name": "Clay Pot"
    }
    """
    try:
        data = request.get_json()
        user_email = data.get("user_email")
        product_name = data.get("product_name")

        if not all([user_email, product_name]):
            return jsonify({"error": "Missing data"}), 400

        result = cart_collection.delete_one({
            "user_email": user_email,
            "product_name": product_name
        })

        if result.deleted_count == 0:
            return jsonify({"message": "Item not found in cart"}), 404

        return jsonify({"message": "Item removed from cart"}), 200

    except Exception as e:
        print("Error removing from cart:", e)
        return jsonify({"error": "Server error"}), 500


@app.route('/cart/clear/<user_email>', methods=['DELETE'])
def clear_cart(user_email):
    """
    Clear all items from a user's cart.
    """
    try:
        cart_collection.delete_many({"user_email": user_email})
        return jsonify({"message": "Cart cleared successfully"}), 200
    except Exception as e:
        print("Error clearing cart:", e)
        return jsonify({"error": "Server error"}), 500

# @app.route("/create-payment", methods=["POST"])
# def create_payment():
#     """
#     Create a Razorpay order for frontend payment.
#     Expected JSON:
#     {
#       "amount": 500,  # in rupees
#       "currency": "INR",
#       "user_email": "pallavi@gmail.com",
#       "products": [{...}]
#     }
#     """
#     try:
#         data = request.get_json()
#         amount = int(float(data.get("amount", 0)) * 100)  # Convert to paise
#         user_email = data.get("user_email")
#         products = data.get("products", [])

#         if amount <= 0:
#             return jsonify({"error": "Invalid amount"}), 400

#         # Create Razorpay order
#         payment_order = razorpay_client.order.create({
#             "amount": amount,
#             "currency": "INR",
#             "payment_capture": "1"
#         })

#         # Store order in DB
#         orders_collection.insert_one({
#             "user_email": user_email,
#             "products": products,
#             "amount": amount / 100,
#             "order_id": payment_order["id"],
#             "status": "created"
#         })

#         return jsonify({
#             "order_id": payment_order["id"],
#             "amount": amount,
#             "currency": "INR",
#             "key": "YOUR_RAZORPAY_KEY_ID"
#         }), 200

#     except Exception as e:
#         print("Error creating payment:", e)
#         return jsonify({"error": "Payment creation failed"}), 500


# @app.route("/verify-payment", methods=["POST"])
# def verify_payment():
#     """
#     Verify the payment signature sent by Razorpay
#     Expected JSON:
#     {
#       "razorpay_order_id": "...",
#       "razorpay_payment_id": "...",
#       "razorpay_signature": "..."
#     }
#     """
#     try:
#         data = request.get_json()
#         order_id = data.get("razorpay_order_id")
#         payment_id = data.get("razorpay_payment_id")
#         signature = data.get("razorpay_signature")

#         # Verify signature
#         params_dict = {
#             "razorpay_order_id": order_id,
#             "razorpay_payment_id": payment_id,
#             "razorpay_signature": signature
#         }

#         result = razorpay_client.utility.verify_payment_signature(params_dict)

#         if result:
#             orders_collection.update_one(
#                 {"order_id": order_id},
#                 {"$set": {"status": "paid", "payment_id": payment_id}}
#             )
#             return jsonify({"message": "Payment verified successfully"}), 200
#         else:
#             return jsonify({"error": "Invalid signature"}), 400

#     except Exception as e:
#         print("Error verifying payment:", e)
#         return jsonify({"error": "Payment verification failed"}), 500

@app.route("/create-payment", methods=["POST"])
def create_payment():
    try:
        data = request.get_json()
        amount = int(float(data.get("amount", 0)) * 100)  # ₹ to paise
        user_email = data.get("user_email", "unknown")
        products = data.get("products", [])

        if amount <= 0:
            return jsonify({"error": "Invalid amount"}), 400

        payment_order = razorpay_client.order.create({
            "amount": amount,
            "currency": "INR",
            "payment_capture": "1"
        })

        orders_collection.insert_one({
            "user_email": user_email,
            "products": products,
            "amount": amount / 100,
            "order_id": payment_order["id"],
            "status": "created"
        })

        return jsonify({
            "order_id": payment_order["id"],
            "amount": amount,
            "currency": "INR",
            "key": RAZORPAY_KEY_ID  # ✅ send real key
        }), 200

    except Exception as e:
        print("Error creating payment:", e)
        return jsonify({"error": "Payment creation failed"}), 500


@app.route("/verify-payment", methods=["POST"])
def verify_payment():
    try:
        data = request.get_json()
        params_dict = {
            "razorpay_order_id": data.get("razorpay_order_id"),
            "razorpay_payment_id": data.get("razorpay_payment_id"),
            "razorpay_signature": data.get("razorpay_signature")
        }

        razorpay_client.utility.verify_payment_signature(params_dict)

        orders_collection.update_one(
            {"order_id": data.get("razorpay_order_id")},
            {"$set": {"status": "paid", "payment_id": data.get("razorpay_payment_id")}}
        )

        return jsonify({"message": "Payment verified successfully"}), 200
    except Exception as e:
        print("Verification error:", e)
        return jsonify({"error": "Payment verification failed"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)





