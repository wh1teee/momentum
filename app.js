const time = document.querySelector('.time')
// const time = document.getElementsByClassName('time');
// // const time = document.getElementById('time')

const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name')
const focus = document.querySelector('.focus')


//show AM PM
const showAmPm = true

//show time

function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        minutes = today.getMinutes(),
        seconds = today.getSeconds()

    //PM or AM
    const amPm = hour >= 12 ? 'PM' : 'AM'

    //12hr format
    hour = hour % 12 || 12

    //output time
    time.innerHTML = `${hour}<span>:</span>${addZero(minutes)}<span>:</span>${
        addZero(seconds)
    } ${showAmPm ? amPm : ''}`;

    setTimeout(showTime, 1000);
}

//add zero
function addZero(n) {
    return (parseInt(n) < 10 ? '0' : '') + n
}

//set Background and Greeting
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours()

    if (hour < 12 && hour >= 6) {
        //Morning
        document.body.style.backgroundImage = 'url("assets/images/morning/01.jpg")'
        greeting.textContent = 'Good Morning, '
    }else if (hour < 18 && hour >= 12) {
        //Day
        document.body.style.backgroundImage = 'url("assets/images/day/01.jpg")'
        greeting.textContent = 'Good Day, '
    }else if(hour < 22 && hour >= 18) {
        //Evening
        document.body.style.backgroundImage = 'url("assets/images/evening/01.jpg")'
        greeting.textContent = 'Good Evening, '
    }else {
        //Evening
        document.body.style.backgroundImage = 'url("assets/images/night/01.jpg")'
        greeting.textContent = 'Good Night, '
        document.body.style.color = 'white';
    }
}

//get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = "[Enter Name]"
    }else {
        name.textContent = localStorage.getItem('name')
    }
}

//set Name
function setName(e) {
    if (e.type === 'keypress') {
        //Make sure enter has press
        if (e.wich == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText)
            name.blur()
        }else {
            localStorage.setItem('name', e.target.innerText)
        }
    }
}

//get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = "[Enter Your Focus]"
    }else {
        focus.textContent = localStorage.getItem('focus')
    }
}

//set Name
function setFocus(e) {
    if (e.wich == 13 || e.keyCode == 13) {
       localStorage.setItem('focus', e.target.innerText)
        focus.blur()

    }else {
        localStorage.setItem('focus', e.target.innerText)
    }
}

name.addEventListener('keypress', setName)
name.addEventListener('blur', setName)
focus.addEventListener('keypress', setFocus)
focus.addEventListener('blur', setFocus)


showTime()
setBgGreet()
getName()
getFocus()
