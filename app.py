from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
import json

app = Flask(__name__, static_folder='.')
CORS(app)

@app.route("/")  
def home():
    return send_from_directory('.', 'ml cart.html')

@app.route("/cart")  
def cart():
    return send_from_directory('.', 'ml cart.html')

@app.route("/suggestions")
def get_suggestions():
    try:
        with open("suggestions.json") as f:
            rules = json.load(f)
        return jsonify(rules)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
