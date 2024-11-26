const apiKey = '0U7D9wfke1uQ0leQL4gOYVIN3PDJqyTeMxAI5DxS';
const apiUrl = 'https://api.nasa.gov/planetary/apod';

async function displayAPOD() {
  const result = await fetchAPIData();
  console.log(result);

  displayPage(result);
}

async function displayRandom() {
  const response = await fetch(`${apiUrl}?api_key=${apiKey}&count=1`);

  const data = await response.json();
  const result = data[0];

  displayPage(result);
}

function displayPage(result) {
  document.getElementById('date').innerText = result.date;

  if (result.media_type === 'video') {
    const iframe = document.createElement('iframe');
    iframe.src = result.url;
    iframe.setAttribute('class', 'video-container');
    document.getElementById('content').appendChild(iframe);
  } else {
    const img = document.createElement('img');
    img.src = result.url;
    img.setAttribute('loading', 'lazy');
    img.setAttribute('class', 'responsive-img');
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

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

const today = date;
const todayDate = today.getDate();
const todayMonth = today.getMonth() + 1;
const todayYear = today.getFullYear();

const prevNextIcon = document.querySelectorAll('.icons button');
async function displayCalander() {
  const currentDate = document.querySelector('.current-date');
  const daysTag = document.querySelector('.days');

  // getting date

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); //getting last date of month
  let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(); //getting last day of month
  let lastDateofLastMonth = new Date(currYear, currMonth + 1, 0).getDate(); //getting last date of prev month
  let firstDateofMonth = new Date(currYear, currMonth, 1).getDay(); //getting first day of month

  let liTag = '';
  document.getElementById('next').disabled = false;

  for (let i = firstDateofMonth; i > 0; i--) {
    liTag += `
    <li class='grey-text'>${lastDateofLastMonth - i + 1}
    </li>`;
  }

  if (currYear === todayYear && currMonth + 1 === todayMonth) {
    document.getElementById('next').disabled = true;

    const response = await fetch(
      `${apiUrl}?api_key=${apiKey}&start_date=${currYear}-${
        currMonth + 1
      }-01&end_date=${currYear}-${currMonth + 1}-${todayDate}`
    );
  
    const data = await response.json();
    console.log(data);

    for (let i = 1; i <= todayDate; i++) {
      const mediaUrl = data[i - 1].url;
      let mediaElement;
    
      if (mediaUrl.endsWith('.jpg') || mediaUrl.endsWith('.jpeg') || mediaUrl.endsWith('.png') || mediaUrl.endsWith('.gif')) {
        mediaElement = `<img src="${mediaUrl}" alt="${data[i - 1].title}" loading='lazy' class="responsive-img">`;
      } else if (mediaUrl.includes('youtube')) {
        mediaElement = `<div class="responsive-video">
                          <iframe src="${mediaUrl}" ></iframe>
                        </div>`;
      } else {
        mediaElement = `<p>Unsupported media type</p>`;
      }
    
      liTag += `
        <li>
          ${i}
          <a class='modal-trigger' href='#modal${i - 1}'>
          ${data[i - 1].title}
          </a>
          <div id='modal${i - 1}' class="modal white-text">
            <div class="modal-content">
              <h4>${data[i - 1].title}</h4>
              ${mediaElement}
              <p>Illustration Credit & Copyright: ${data[i - 1].copyright}</p>
              <p class="flow-text">${data[i - 1].explanation}</p>
            </div>
            <div class="modal-footer">
              <a href="#!" class='modal-close'>close</a>
            </div>
          </div>
        </li>`;
    }

    for (let i = todayDate + 1; i <= lastDateofMonth; i++) {
      liTag += `<li class='grey-text'>${i}</li>`;
    }
  } else {
    const response = await fetch(
      `${apiUrl}?api_key=${apiKey}&start_date=${currYear}-${
        currMonth + 1
      }-01&end_date=${currYear}-${currMonth + 1}-${lastDateofMonth}`
    );

    const data = await response.json();

    for (let i = 1; i <= lastDateofMonth; i++) {
      liTag += `
    <li>
      ${i}
      <a class='modal-trigger' href='#modal${i - 1}'>
      ${data[i - 1].title}
      </a>
      <div id='modal${i - 1}' class="modal white-text">
        <div class="modal-content">
          <h4>${data[i - 1].title}</h4>
              <img src="${data[i - 1].url}" alt="${
      data[i - 1].title
    }" loading='lazy' class="responsive-img">
              <p>Illustration Credit & Copyright: ${data[i - 1].copyright}</p>
              <p class="flow-text">${data[i - 1].explanation}</p>
          </div>
        <div class="modal-footer">
          <a href="#!" class='modal-close'>close</a>
        </div>
      </div>
    </li>`;
    }
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class='grey-text'>${i - lastDayofMonth + 1}</li>`;
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;

  var elems = document.querySelectorAll('.modal');
  console.log(elems);
  var instances = M.Modal.init(elems, {
    // specify options here
  });
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
      break;
    case '/randomapod':
    case '/randomAPOD.html':
      displayRandom();
      break;
    case '/calendar':
    case '/calendar.html':
      displayCalander();
      prevNextIcon.forEach((icon) => {
        icon.addEventListener('click', () => {
          currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;

          if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth;
          }

          displayCalander();
        });
      });
      break;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  init();
});
