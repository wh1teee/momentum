const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.button-active');
const btnInProgress= document.querySelector('.in-progress');

function getQuote() {
  fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?region=US&q=tesla", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      "x-rapidapi-key": "c7c7586b0cmshe143f809abed68ap1437a6jsn93ae43a1397a"}
  }).then(res => {
    res.json().then(data => {
      let quotesList = data['news']

      function displayQuotes(dataList) {
        const randomInfo = dataList[Math.floor(Math.random() * dataList.length)];
        blockquote.textContent = randomInfo['title'];
        figcaption.textContent = randomInfo['publisher'];
      }
      displayQuotes(quotesList)

    });
  })
  .catch(err => {
    console.error(err);
  });
}

// document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);

function hideActiveRefreshBtn() {
  btn.hidden = true
}

function hideInProgressRefreshBtn() {
  btnInProgress.hidden = true
}

function showActiveRefreshBtn() {
  btn.hidden = false
}


function showInProgressRefreshBtn() {
  btnInProgress.hidden = false
}

hideInProgressRefreshBtn()