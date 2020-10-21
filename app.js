const time = document.querySelector('.time')
// const time = document.getElementsByClassName('time');
// // const time = document.getElementById('time')

const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name')
const focus = document.querySelector('.focus')
const previous = document.querySelector('.previous')
const next = document.querySelector('.next')


//show time
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        minutes = today.getMinutes(),
        seconds = today.getSeconds(),
        weekDay = today.toLocaleString('ru-RU', {weekday: 'long'}),
        day = today.toLocaleString('ru-RU', {day: 'numeric'}),
        month = today.toLocaleString('ru-RU', {month: 'long'});


    //show AM PM
    const showAmPm = false

    //PM or AM
    const amPm = hour >= 12 ? 'PM' : 'AM'

    //12hr format
    if (showAmPm) {
        hour = hour % 12 || 12
    }

    //output time
    time.innerHTML = `${hour}<span>:</span>${addZero(minutes)}<span>:</span>${
        addZero(seconds)
    } ${showAmPm ? amPm : ''} <br>${weekDay} ${day} ${month.slice(0, -1)}я`;

    setTimeout(showTime, 1000);
}

//add zero
function addZero(n) {
    return (parseInt(n) < 10 ? '0' : '') + n
}

// //set Background and Greeting
// function setBgGreet() {
//     let today = new Date(),
//         hour = today.getHours()
//
//     if (hour >= 6 && hour < 12) {
//         //Morning
//         document.body.style.backgroundImage = 'url("assets/images/morning/01.jpg")'
//         greeting.textContent = 'Good Morning, '
//     } else if (hour >= 12 && hour < 18) {
//         //Day
//         document.body.style.backgroundImage = 'url("assets/images/day/01.jpg")'
//         greeting.textContent = 'Good Day, '
//     } else if (hour >= 18 && hour < 24) {
//         //Evening
//         document.body.style.backgroundImage = 'url("assets/images/evening/01.jpg")'
//         greeting.textContent = 'Good Evening, '
//     } else {
//         //Evening
//         document.body.style.backgroundImage = 'url("assets/images/night/01.jpg")'
//         greeting.textContent = 'Good Night, '
//         document.body.style.color = 'white';
//     }
// }

//get Name
function getName() {
    if (localStorage.getItem('name').length === 0) {
        name.textContent = "[Enter Name]"
    } else {
        name.textContent = localStorage.getItem('name')
    }
}

//set Name
function setName(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    }
    if (e.target.innerText.length > 0) {
        localStorage.setItem('name', e.target.innerText);

    }
    // else {
    //     localStorage.setItem('name', e.target.innerText);
    // }
}

//get Focus
function getFocus() {
    if (localStorage.getItem('focus').length === 0) {
        focus.textContent = "[Enter Your Focus]"
    } else {
        focus.textContent = localStorage.getItem('focus')
    }
}

//set Focus
function setFocus(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}

//check name and focus
function nameFocusCheck() {
    if (name.textContent.length === 0 && localStorage.getItem('name').length === 0) {
        name.textContent = "[Enter Name]"
    }
    if (name.textContent.length === 0 && localStorage.getItem('name').length !== 0) {
        name.textContent = localStorage.getItem('name')
    }


    if (focus.textContent.length === 0 && localStorage.getItem('focus').length === 0) {
        focus.textContent = "[Enter Focus]"
    }
    if (focus.textContent.length === 0 && localStorage.getItem('focus').length !== 0) {
        focus.textContent = localStorage.getItem('focus')
    }
}

//clear name area
function clearName() {
    name.textContent = ''
}

//clear focus area
function clearFocus() {
    focus.textContent = ''
}


//set day/night and etc. folder
function setTimesOfDay() {
    let today = new Date(),
        hour = today.getHours()

    if (hour >= 6 && hour < 12) {
        //morning
        return 'morning'
    } else if (hour >= 12 && hour < 18) {
        //day
        return 'day'
    } else if (hour >= 18 && hour < 24) {
        //Evening
        return 'evening'
    } else {
        //night
        return 'night'

    }
}

//set Greeting
function setBgGreet() {
    greeting.textContent = `Good ${setTimesOfDay()[0].toUpperCase() + setTimesOfDay().slice(1)}, `
}

//change bg
let n = 1

function bg(n = 1) {

    if (n < 10) {
        document.body.style.background = `url("assets/images/${setTimesOfDay()}/0${n}.jpg")`
    }
    if (n >= 10) {
        document.body.style.background = `url("assets/images/${setTimesOfDay()}/${n}.jpg")`
    }
}

//change bg every hour
let today3 = new Date(),
    hours3 = today3.getHours(),
    minute3 = today3.getMinutes(),
    seconds3 = today3.getSeconds()

function changeEveryHour() {
    let today = new Date(),
        hour = today.getHours(),
        minutes = today.getMinutes(),
        seconds = today.getSeconds()

    //change Greeting if it need
    setBgGreet()

    if (hours3 > 23) {
        hours3 = 0
    }
    if (hour !== hours3) {
        bg()
        hours3++
    }

    // if (minutes !== minute3) {
    //     nexImage()
    //     minute3++
    // }

    if (seconds !== seconds3) {
        nexImage()
        seconds3++
    }

    setTimeout(changeEveryHour, 1000)
}


// next image
function nexImage() {
    if (n < 20) {
        bg(++n)
    } else {
        n = 1
        bg(n)
    }
}

// previous image
function previousImage() {
    if (n < 21 && n > 1) {
        bg(--n)
    } else {
        n = 20
        bg(n)
    }
}


name.addEventListener('keypress', setName)
name.addEventListener('blur', setName)
name.addEventListener('click', clearName)
name.addEventListener('blur', nameFocusCheck)

focus.addEventListener('keypress', setFocus)
focus.addEventListener('blur', setFocus)
focus.addEventListener('click', clearFocus)
focus.addEventListener('blur', nameFocusCheck)

// document.querySelector('body').addEventListener('click', nameFocusCheck)
// document.querySelector('body').addEventListener('blur', nameFocusCheck)

next.addEventListener('click', nexImage)
previous.addEventListener('click', previousImage)


showTime()
setBgGreet()
getName()
getFocus()
bg()
changeEveryHour()
