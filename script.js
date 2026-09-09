async function analyzeEmotion() {
    let text = document.getElementById("inputText").value;

    if (text.trim() === "") {
        alert("Please type something!");
        return;
    }

    const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text })
    });

    const data = await response.json();

    let resultDiv = document.getElementById("result");

    // Convert polarity to percent (0 to 100)
    let percent = ((data.polarity + 1) / 2 * 100).toFixed(2);

    // MAIN RESULT UI
    resultDiv.innerHTML = `
        <h2 style="font-size:28px; color:#00eaff;">
            ${data.emoji}  ${data.emotion}
        </h2>

        <p style="font-size:18px; color:#ccc;">
            Polarity: ${Number(data.polarity.toFixed(3))}
        </p>

        <strong style="color:white;">Emotion Strength (${percent}%)</strong>
        <div style="background:#444; border-radius:4px; width:100%; height:12px; margin-top:8px;">
            <div style="
                height:12px;
                width:${percent}%;
                background:#00eaff;
                border-radius:4px;
            "></div>
        </div>
    `;

    // EXTRA EXPLANATION FOR MIXED SENTENCES
    const mixedWords = ["crying", "sad", "upset", "hurt", "tears"];

    if (mixedWords.some(word => text.toLowerCase().includes(word))) {
        resultDiv.innerHTML += `
            <div style="margin-top:20px; padding:15px; background:#2b2b2b; border-radius:10px; border-left:4px solid #ff4d4d;">
                <p style="color:#ff4d4d; font-size:16px;">
                    ⚠ TextBlob Limitation Notice:
                </p>

                <p style="color:#ddd; font-size:15px; margin-top:5px;">
                    This sentence contains a mix of <b>positive</b> and <b>negative</b> emotional words.
                    <br><br>
                    Because TextBlob uses simple word-based sentiment analysis,
                    it may <b>incorrectly classify</b> such sentences.
                </p>

                <p style="color:#00eaff; margin-top:10px;">
                    ✔ For accurate emotion detection (sadness, anger, fear, joy), a <b>Transformer AI model</b> is recommended.
                </p>
            </div>
        `;
    }
}

// RESET BUTTON FUNCTION
function resetAll() {
    document.getElementById("inputText").value = "";
    document.getElementById("result").innerHTML = "";
}
