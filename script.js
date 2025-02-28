document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const query = document.getElementById('query').value;
  searchSGPT(query);
});

async function searchSGPT(query) {
  const apiKey = '0a66da64-4c88-4f2f-ab01-6db2f207220f';
  const url = `https://api.your-llama-search-endpoint.com/search?q=${encodeURIComponent(query)}&api_key=${apiKey}`;
  try {
      const response = await fetch(url);
      const data = await response.json();
      displayResults(data);
  } catch (error) {
      console.error('Error fetching search results:', error);
  }
}

function displayResults(data) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';
  if (data.results && data.results.length > 0) {
      data.results.forEach(result => {
          const resultItem = document.createElement('div');
          resultItem.classList.add('result-item');
          resultItem.innerHTML = `
              <h3><a href="${result.url}" target="_blank">${result.title}</a></h3>
              <p>${result.snippet}</p>
          `;
          resultsDiv.appendChild(resultItem);
      });
  } else {
      resultsDiv.innerHTML = '<p>No results found.</p>';
  }
}
