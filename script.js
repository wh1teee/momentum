//Images
const baseMorning = './assets/images/morning/';
const baseDay= './assets/images/day/';
const baseEvening= './assets/images/evening/';
const baseNight= './assets/images/night/';

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg'];
const imagesMorning = shuffle(images)
const imagesDay = shuffle(images)
const imagesEvening = shuffle(images)
const imagesNight = shuffle(images)


// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  dayMonth = document.querySelector('.dayMonth');
  btn = document.querySelector('.btn');

const hideName= document.querySelector('#hide-name');
const hideFocus= document.querySelector('#hide-focus');
const txtName = document.querySelector('#txt-name');
const txtFocus = document.querySelector('#txt-focus');

let i = 0;

// Options
const showAmPm = true;


// Show Day and Month
function showDayMonth() {
  let today = new Date(),
  day = today.getDay(),
  date = today.getUTCDate(),
  month = today.getMonth();

  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day];
  month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][month];

  dayMonth.innerHTML = `${weekday}<span>, </span>${date}<span> </span>${month}`;
}

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

    function displaySec(itemTime) {
      if (itemTime < 10) {
        let strVal = String(addZero(itemTime))
        return `<div class="time_2_items"><div>${parseInt(strVal[0])}</div><div>${parseInt(strVal[1])}</div></div>`
      } else {
        let strVal = String(itemTime)
        return `<div class="time_2_items"><div>${parseInt(strVal[0])}</div><div>${parseInt(strVal[1])}</div></div>`
      }
    }

  // Output Time
  time.innerHTML = `<div class="hour">${displaySec(hour)}</div><span>:</span><div class="min">${displaySec(min)}</div><span>:</span><div class="sec digit">${displaySec(sec)}</div>`

  setNewBgEahHour()
  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Background Images
function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
  };
}

function getImage(basePath, imageFolder) {
  if (imageFolder.length) {
    const index = i % imageFolder.length;
    const imageSrc = basePath + imageFolder[index];
    viewBgImage(imageSrc);
    i++;
  }
}

function setBgImage() {
  let today = new Date(),
    hour = today.getHours();
  if (06 < hour && hour < 12) {
    // Morning
    getImage(baseMorning, imagesMorning);
    greeting.textContent = 'Good Morning, ';
    document.body.style.color = 'white';
  } else if (12 <= hour && hour < 18) {
    // Afternoon
    getImage(baseDay, imagesDay);
    greeting.textContent = 'Good Afternoon, ';
    document.body.style.color = 'white';
  } else if ((18 <= hour && hour < 24) ) {
    // Evening
    getImage(baseEvening, imagesEvening);
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  } else {
    // Night
    getImage(baseNight, imagesNight);
    greeting.textContent = 'Good Night, ';
    document.body.style.color = 'white';
  }
}

function setNewBgEahHour () {
  let today = new Date(),
  min = today.getMinutes(),
  sec = today.getSeconds();
  if (min == 00 && sec == 00) {
    setBgImage();
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') != null) {
    name.value = localStorage.getItem('name');
    resizeInputTextName();
  }
}


// Set Name
function setNameKeyPress(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (name.value != '' && !name.value.replace(/\s/g, '').length != true) {
        localStorage.setItem('name', name.value);
        name.blur();
        resizeInputTextName();
      } else {
        name.value = localStorage.getItem('name');
        resizeInputTextName();
      }
    }
  }
}

function setNameBlur() {
  if (name.value != '' && !name.value.replace(/\s/g, '').length == false) {
    localStorage.setItem('name', name.value);
    name.value = localStorage.getItem('name');
    resizeInputTextName();
  } else if (localStorage.getItem('name') != null) {
    name.value = localStorage.getItem('name');
    resizeInputTextName();
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') != null) {
    focus.value = localStorage.getItem('focus');
    resizeInputTextFocus();
  }
}

// Set Focus
function setFocusKeyPress(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (focus.value != '' && !focus.value.replace(/\s/g, '').length != true) {
        localStorage.setItem('focus', focus.value);
        focus.blur();
        resizeInputTextFocus();
      } else {
        focus.value = localStorage.getItem('focus');
        resizeInputTextFocus();
      }
    }
  }
}

function setFocusBlur() {
  if (focus.value != '' && !focus.value.replace(/\s/g, '').length == false) {
    localStorage.setItem('focus', focus.value);
    focus.value = localStorage.getItem('focus');
    resizeInputTextFocus();
  } else if (localStorage.getItem('focus') != null) {
    focus.value = localStorage.getItem('focus');
    resizeInputTextFocus();
  }
}

function displayName() {
  if (localStorage.getItem('name') != null && localStorage.getItem('name') != '' ) {
    name.value = localStorage.getItem('name')
    resizeInputTextName();
  } else {
    localStorage.setItem('name', "[Enter Name]");
    name.value = localStorage.getItem('name');
  }
}

function displayFocus() {
  if (localStorage.getItem('focus') != null && localStorage.getItem('focus') != '' ) {
    focus.value = localStorage.getItem('focus')
    resizeInputTextFocus();
  } else {
    localStorage.setItem('focus', "[Enter Focus]");
    focus.value = localStorage.getItem('focus');
  }
}

function displayEmptyName() {
  name.value = ''
  name.addEventListener('blur', setNameBlur);
}

function displayEmptyFocus() {
  focus.value = ''
  focus.addEventListener('blur', setFocusBlur);
}


// Resize Input fields
function resizeInputTextName() {
  resizeName()
  txtName.addEventListener("input", resizeName);
}

function resizeInputTextFocus() {
  resizeFocus()
  txtFocus.addEventListener("input", resizeFocus);
}

function resizeName() {
  hideName.textContent = txtName.value;
  txtName.style.width = hideName.offsetWidth + "%";
}

function resizeFocus() {
  hideFocus.textContent = txtFocus.value;
  txtFocus.style.width = hideFocus.offsetWidth + "%";
}

function nameSize() {
  name.setAttribute('size', name.getAttribute('placeholder').length);
  resizeInputTextName()
}

function focusSize() {
  focus.setAttribute('size', focus.getAttribute('placeholder').length);
  resizeInputTextFocus()
}

// Events
name.addEventListener('keypress', setNameKeyPress);
name.addEventListener('blur', setNameBlur);
focus.addEventListener('keypress', setFocusKeyPress);
focus.addEventListener('blur', setFocusBlur);

name.addEventListener('click', displayEmptyName);
focus.addEventListener('click', displayEmptyFocus);

btn.addEventListener('click', setBgImage);


function onInput ({target}) {
  target.style = "opacity: 0.8;"
  resizeInputTextName()
  resizeInputTextFocus()
}

function outInput ({target}) {
  target.style = "opacity: 1;"
  resizeInputTextName()
  resizeInputTextFocus()
}

name.addEventListener('mouseover', onInput);
name.addEventListener('mouseout', outInput);
focus.addEventListener('mouseover', onInput);
focus.addEventListener('mouseout', outInput);

// Run
nameSize()
focusSize()
displayName()
displayFocus()
showDayMonth();
showTime();
setBgImage()
getName();
getFocus();