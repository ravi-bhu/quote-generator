const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const tweetBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');
let quotes = [];

const newQuote = () => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  quote.text.length > 50
    ? quoteText.classList.add('long-quote')
    : quoteText.classList.remove('long-quote');
  quoteText.textContent = quote.text;
  quoteAuthor.textContent = quote.author ? quote.author : 'unknown';
};

const getQuotes = async () => {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    quotes = await response.json();
    newQuote();
    loadComplete();
  } catch (error) {
    alert(error);
  }
};

const tweetQuote = () => {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteText.textContent}`;
  window.open(tweetUrl, '_blank');
};

const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const loadComplete = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

newQuoteBtn.addEventListener('click', newQuote);
tweetBtn.addEventListener('click', tweetQuote);

getQuotes();
