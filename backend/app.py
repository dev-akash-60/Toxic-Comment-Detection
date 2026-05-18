from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow React to connect

# Load model
model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

labels = [
    "toxic",
    "severe_toxic",
    "obscene",
    "threat",
    "insult",
    "identity_hate"
]

# Prediction function
def predict_comment(text):
    vec = vectorizer.transform([text])
    pred = model.predict(vec)[0]

    result = {}
    for i, label in enumerate(labels):
        result[label] = int(pred[i])

    return result

# API route
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    text = data["text"]

    result = predict_comment(text)

    return jsonify({
        "comment": text,
        "analysis": result
    })

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
