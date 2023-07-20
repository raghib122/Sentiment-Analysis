document.addEventListener("DOMContentLoaded", function () {
    const apiKey = 'n8EyKaqyzclwKOGRZhUKrA==33iTgW0O8IM1Vy8F';
    const apiUrl = 'https://api.api-ninjas.com/v1/sentiment';
  
    document.getElementById('searchBtn').addEventListener('click', function() {
      const text = document.getElementById('textInput').value.trim();
      if (text === '') {
        alert('Please enter your text.');
        return;
      }
  
      fetchSentiment(apiUrl, apiKey, text)
        .then(displaySentiment)
        .catch(handleError);
    });
  
    function fetchSentiment(url, apiKey, text) {
      const headers = new Headers({
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json'
      });
  
      const requestOptions = {
        method: 'GET',
        headers: headers
      };
  
      return fetch(`${url}?text=${encodeURIComponent(text)}`, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        });
    }
  
    function displaySentiment(data) {
      const resultContainer = document.getElementById('resultContainer');
      resultContainer.innerHTML = '';
  
      const score = data.score;
      const sentiment = data.sentiment;
      const scoreElement = document.createElement('p');
      const sentimentElement = document.createElement('p');
  
      scoreElement.textContent = `Sentiment Score: ${score}`;
      sentimentElement.textContent = `Sentiment: ${sentiment}`;
  
      resultContainer.appendChild(scoreElement);
      resultContainer.appendChild(sentimentElement);

      //Change bg image
      const bodyElement = document.body;
      bodyElement.className = '';
      if (sentiment === 'NEUTRAL') {
        bodyElement.classList.add('neutral-bg');
      } else if (sentiment === 'POSITIVE') {
        bodyElement.classList.add('positive-bg');
      } else if (sentiment === 'WEAK_NEGATIVE') {
        bodyElement.classList.add('weak-negative-bg');
      } else {
        bodyElement.classList.add('default-bg');
      }
  
    }
  
    function handleError(error) {
      console.error('An error occurred: ', error);
      alert('An error occurred. Please try again later.');
    }
  });
  