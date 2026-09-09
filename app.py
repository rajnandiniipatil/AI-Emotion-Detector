from flask import Flask, request, jsonify
from textblob import TextBlob
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    text = data.get("text", "")

    blob = TextBlob(text)
    polarity = blob.sentiment.polarity

    if polarity > 0.1:
        emotion = "Positive"
        emoji = "😊"
    elif polarity < -0.1:
        emotion = "Negative"
        emoji = "😢"
    else:
        emotion = "Neutral"
        emoji = "😐"

    return jsonify({
        "input": text,
        "emotion": emotion,
        "emoji": emoji,
        "polarity": polarity
    })

app.run(debug=True)
