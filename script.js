const apiKey = '0U7D9wfke1uQ0leQL4gOYVIN3PDJqyTeMxAI5DxS';
const apiUrl = 'https://api.nasa.gov/planetary/apod';

async function displayAPOD() {
  const result = await fetchAPIData();
  console.log(result);

  document.getElementById('date').innerText = result.date;

  if (result.media_type === 'video') {
    const iframe = document.createElement('iframe');
    iframe.src = result.url;
    document.getElementById('content').appendChild(iframe);
  } else {
    const img = document.createElement('img');
    img.src = result.url;
    document.getElementById('content').appendChild(img);
  }

  document.querySelector('h2').innerText = result.title;
  if (result.copyright) {
    document.getElementById(
      'copyright'
    ).innerText = `Illustration Credit & Copyright: ${result.copyright}`;
  }

  document.getElementById('explanation').innerText = result.explanation;
}

async function fetchAPIData() {
  const response = await fetch(`${apiUrl}?api_key=${apiKey}`);

  const data = await response.json();

  //   console.log(data);
  return data;
}

function init() {
  switch (window.location.pathname) {
    case '/':
    case '/index.html':
      displayAPOD();
  }
}

init();
