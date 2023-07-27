document.getElementById("searchBtn").addEventListener("click", function () {
  const text = document.getElementById("textInput").value;
  if (text.length > 0) {
    const apiKey = "n8EyKaqyzclwKOGRZhUKrA==33iTgW0O8IM1Vy8F";
    const apiUrl = `https://api.api-ninjas.com/v1/sentiment?text=${encodeURIComponent(text)}`;

    fetch(apiUrl, {
      headers: { "X-Api-Key": apiKey },
    })
      .then((response) => response.json())
      .then((result) => {
        document.getElementById("resultText").textContent = result.text;
        document.getElementById("resultScore").textContent = `Sentiment: ${result.sentiment} (${result.score.toFixed(3)})`;

        
        const body = document.body;
        if (result.sentiment === "WEAK_NEGATIVE") {
          body.style.backgroundColor = "black"; 
        } else if (result.sentiment === "POSITIVE") {
          body.style.backgroundColor = "#0093E9"; // Light green for positive
        } else if (result.sentiment === "NEUTRAL") {
          body.style.backgroundColor = "#FF6A88"; // Light gray for neutral
        } else {
          body.style.backgroundColor = "#FFFFFF"; 
        }

        document.getElementById("resultContainer").style.backgroundColor = ""; 
        document.getElementById("resultContainer").style.display = "block";
      })
      .catch((error) => {
        console.error("Error: ", error);
        document.getElementById("resultText").textContent = "An error occurred.";
        document.getElementById("resultScore").textContent = "";
        document.body.style.backgroundColor = "#FFFFFF"; 
        document.getElementById("resultContainer").style.backgroundColor = ""; // Reset result container background color
        document.getElementById("resultContainer").style.display = "block";
      });
  }
});
