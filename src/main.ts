const calendar = document.querySelector(".calendar") as HTMLElement
const date = document.querySelector(".date") as HTMLElement
const daysContainer = document.querySelector(".days") as HTMLElement
const prev = document.querySelector(".prev") as HTMLElement
const next = document.querySelector(".next") as HTMLElement
const todayBtn = document.querySelector(".today-btn") as HTMLElement
const eventDay = document.querySelector(".event-day") as HTMLElement;
const eventDate = document.querySelector(".event-date") as HTMLElement;
const eventsContainer = document.querySelector(".events") as HTMLElement;
const addEventSubmit = document.querySelector(".add-event-btn") as HTMLElement;
const addEventFrom = document.querySelector(".event-time-from") as HTMLFormElement

let today = new Date();
let activeDay: any;
let month = today.getMonth();
let year = today.getFullYear();

const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

//default events array
/* const eventsArr = [
{
    day: 6,
    month: 9,
    year: 2023,
    events: [
       {
         title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
        time: "10:00 AM",
      },
       {
        title: "Event 2",
        time: "11:00 AM",
      },
     ],
   },
   {
    day: 18,
    month: 9,
    year: 2023,
    events: [
       {
         title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
        time: "10:00 AM",
      },
       {
        title: "Event 2",
        time: "11:00 AM",
      },
     ],
   },
 ]; */

//set a empty array
let eventsArr: any[] = [];

//then call get

getEvents();

// function to add days

function initCalendar() {
    const firstDay = new Date(year, month, 0);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay();

    // update date on the top 

    date.textContent = months[month] + " " + year;

    // adding days on DOM

    let days = "";

    // prev month days

    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    //current month day

    for (let i = 1; i <= lastDate; i++) {

        //check if event present on current day

        let event = false;
        eventsArr.forEach((eventObj: any) => {
            if (
                eventObj.day === i &&
                eventObj.month === month + 1 &&
                eventObj.year === year
            ) {
                //if event found
                event = true;
            }
        });

        // if day is today add class today
        if (
            i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
        ) {

            activeDay = i;
            getActiveDay(i);
            updateEvents(i);

            /* days += `<div class="day today active">${i}</div>`; */ //El tio lo borra
            //if event found also add event class
            //add active on today at startup
            if (event) {
                days += `<div class="day today active event">${i}</div>`;
            }
            else {
                days += `<div class="day today active">${i}</div>`;
            }

        }
        // add remaining as it is
        else {
            if (event) {
                days += `<div class="day event">${i}</div>`;
            }
            else {
                days += `<div class="day">${i}</div>`;
            }
        }
    }

    // next month days

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }
    daysContainer.innerHTML = days;
    //add listener after calender initalized
    addListener();
}

initCalendar();

// prev month

function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

// next month 

function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

// add eventListener on prev and next

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
})

//lets show active day events and date at top

function getActiveDay(date: any) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(' ')[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;

    const activeDay = new Date(year, month, date);
    activeDay.setDate(day.getDate() + 1);
    console.log(activeDay.toISOString().substr(0, 16));
    console.log(activeDay);
    addEventFrom.value = activeDay.toISOString().substr(0, 16);
}

const addEventBtn = document.querySelector(".add-event") as HTMLElement;
const addEventContainer = document.querySelector(".add-event-wrapper") as HTMLElement;
const addEventCloseBtn = document.querySelector(".close") as HTMLElement;
const addEventTitle = document.querySelector(".event-name") as HTMLFormElement;
const addEventTo = document.querySelector(".event-time-to") as HTMLFormElement;
const description = document.querySelector(".description") as HTMLFormElement;
const addEventActivity = document.querySelector(".event-select") as HTMLFormElement;

const openAddEventContainer = () => {
    addEventContainer.classList.add("active");
    addEventTitle.value = "";
    addEventTo.value = "";
    description.value = "";
};

const closeAddEventContainer = () => {
    addEventContainer.classList.remove("active");
};

const toggleAddEventContainer = () => {
    addEventContainer.classList.toggle("active");
    if (addEventContainer.classList.contains("active")) {
        addEventTitle.value = "";
        addEventTo.value = "";
        description.value = "";
    }
};

addEventBtn.addEventListener("click", toggleAddEventContainer);

addEventCloseBtn.addEventListener("click", closeAddEventContainer);

document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    if (
        target !== addEventBtn &&
        !(addEventContainer.contains(target)) &&
        target !== addEventContainer
    ) {
        closeAddEventContainer();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeAddEventContainer();
    }
});

daysContainer.addEventListener('dblclick', function(event) {
    const target = event.target as HTMLElement;
    if (target?.classList.contains('day')) {
        toggleAddEventContainer();
    }
});


//allow only 50 chars in tittle
addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 60);
});

/* 
//Chicos lo pongo en comentarios porque la hora desde y hasta no lo tenemos configurada en html
//time format in from and to time

addEventFrom.addEventListener("input",(e) =>{
    //remove anything else numbers
    addEventFrom.value = addEventFrom.value.replace(/[^0-9]/g, "");
    //if two numbers entered auto add:
    if (addEventFrom.value.length === 2){
        addEventFrom.value += ":";
    }
    //dont let user enter more than 5 chars
    if (addEventFrom.value.length >5){
        addEventFrom.value = addEventFrom.value.slice(0,5);
    }
});

//same with to time
addEventTo.addEventListener("input",(e) =>{
    //remove anything else numbers
    addEventTo.value = addEventTo.value.replace(/[^0-9]/g, "");
    //if two numbers entered auto add:
    if (addEventTo.value.length === 2){
        addEventTo.value += ":";
    }
    //dont let user enter more than 5 chars
    if (addEventTo.value.length >5){
        addEventTo.value = addEventFrom.value.slice(0,5);
    }
}); */

//lets create function to add listener on days after rendered
function addListener() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            const target = e.target as HTMLElement;

            //set current day as active day
            activeDay = Number(target.innerHTML);

            //call active day after click
            getActiveDay(target.innerHTML);
            updateEvents(Number(target.innerHTML));

            //remove active from already active day

            days.forEach((day) => {
                day.classList.remove("active");
            });

            //if prev month day clicked goto prev month and add active

            if (target.classList.contains("prev-date")) {
                prevMonth();

                setTimeout(() => {
                    //select all days of that month
                    const days = document.querySelectorAll(".day");

                    //after going to prev month add active to clicked
                    days.forEach((day) => {
                        if (!day.classList.contains("prev-date") &&
                            day.innerHTML === target.innerHTML) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
                //same with next month days
            } else if (target.classList.contains("next-date")) {
                nextMonth();

                setTimeout(() => {
                    //select all days of that month
                    const days = document.querySelectorAll(".day");

                    //after going to prev month add active to clicked
                    days.forEach((day) => {
                        if (!day.classList.contains("next-date") &&
                            day.innerHTML === target.innerHTML) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            }
            else {
                //remaing current month days
                target.classList.add("active");
            }
        });
    });
}


//function to show events of that day
function updateEvents(date: any) {
    let events = "";
    eventsArr.forEach((event) => {
        if (
            date === event.day &&
            month + 1 === event.month &&
            year === event.year
        ) {

            event.events.forEach((event: any) => {
                events += `
                <div class="event">
                    <div class="title">
                        <i class="fas fa-circle"></i>
                        <h3 class="event-title">${event.title}</h3><h3 class="event-title">${event.activity}</h3>
                    </div>
                    <div class="event-time">
                        <span class="event-time">${event.fullTime}</span>
                    </div>
                </div>
                `;
            });
        }
    });

    if (events === "") {
        events = `<div class="no-event">
                    <h3>No Events</h3>
                </div>`;
    }

    eventsContainer.innerHTML = events;
    saveEvents();
}

const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
if (!link) {
    const newLink = document.createElement('link');
    newLink.rel = 'icon';
    newLink.id = 'favicon';
    newLink.href = '/assets/img/icon.png';
    document.head.appendChild(newLink);
} else {
    link.href = '/assets/img/icon.png';
};

let theme: string = "light-mode";

function toggleTheme() {
    const calendar = document.querySelector("body");
    const logoLightHeader = document.getElementById("logoLightHeader");
    const logoDarkHeader = document.getElementById("logoDarkHeader");
    const logoLight = document.getElementById("logoLight");
    const logoDark = document.getElementById("logoDark");

    if (theme === "light-mode") {
        theme = "dark-mode";
        calendar?.classList.remove("light-mode");
        calendar?.classList.add("dark-mode");

        logoLightHeader?.classList.add("hidden");
        logoDarkHeader?.classList.remove("hidden");

        logoLight?.classList.add("hidden");
        logoDark?.classList.remove("hidden");

        const favicon = document.getElementById('favicon') as HTMLLinkElement;
        if (favicon) {
            favicon.href = '/assets/img/icon-dark.png';
        }
    } else {
        theme = "light-mode";
        calendar?.classList.remove("dark-mode");
        calendar?.classList.add("light-mode");

        logoLightHeader?.classList.remove("hidden");
        logoDarkHeader?.classList.add("hidden");

        logoLight?.classList.remove("hidden");
        logoDark?.classList.add("hidden");

        const favicon = document.getElementById('favicon') as HTMLLinkElement;
        if (favicon) {
            favicon.href = '/assets/img/icon.png';
        }
    }
}


const themeSwitch: HTMLInputElement | null = document.getElementById("themeSwitch") as HTMLInputElement | null;
if (themeSwitch) {
    themeSwitch.addEventListener("click", toggleTheme);
}

//lets create function to add events
addEventSubmit.addEventListener("click", () => {


    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;
    // crear const Activity
    const eventActivity = addEventActivity.value;

    //Some validations
    if (eventTitle === "" || eventTimeFrom === "") {
        alert("Please fill all the fields");
        return;
    }

    const timeFromArr = eventTimeFrom.split(":");
    const timeToArr = eventTimeTo.split(":");

    if (
        timeFromArr.length != 2 ||
        timeFromArr[0] > 23 ||
        timeFromArr[1] > 59
    ) {
        alert("Invalid time format");
    }
    //verificar si hace falta

    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);

    // create elements field [obj]
    const newEvent = {
        title: eventTitle,
        activity: eventActivity,
        time: timeFrom,
        fullTime: eventTimeFrom.slice(11,16) + " " + eventTimeTo.slice(11,16),
    };

    if (eventTimeTo) {
        newEvent.fullTime = eventTimeFrom.slice(11, 16) + " - " + eventTimeTo.slice(11, 16);
    }

    let eventAdded = false;

    //check if eventarr not empty
    if (eventsArr.length > 0) {
        //check if current day has already any event then add to that
        eventsArr.forEach((item) => {
            if (
                item.day === activeDay &&
                item.month === month + 1 &&
                item.year === year
            ) {
                item.events.push(newEvent);
                eventAdded = true;
            }
        });
    }

    //if event array empty or current day has no event create new

    if (!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [newEvent]
        })
    }

    //remove active from add event form
    addEventContainer.classList.remove('active')
    //clear the fields
    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";
    description.value = "";

    //show current added event

    updateEvents(activeDay);

    //also add event class to newly added day if not already

    const activeDayElem = document.querySelector(".day-active");
    if (!activeDayElem?.classList.contains("event")) {
        activeDayElem?.classList.add("event");
    }
    initCalendar();
});

function convertTime(time: any) {
    let timeArr = time.split(":");
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    timeHour = timeHour % 12 || 12;
    time = timeHour + ":" + timeMin + " " + timeFormat;
    return time;
}

//lets create a function to remove events on click

eventsContainer.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("event")) {
        const eventTitle = target.children[0].children[1].innerHTML;
        //get the title of event than search in array by title and delete
        eventsArr.forEach((event) => {
            if (
                event.day === activeDay &&
                event.month === month + 1 &&
                event.year === year
            ) {
                event.events.forEach((item: any, index: any) => {
                    if (item.title === eventTitle) {
                        event.events.splice(index, 1);
                    }
                });

                //if no event remaing on that day remove complete day

                if (event.events.length === 0) {
                    eventsArr.splice(eventsArr.indexOf(event), 1);
                    //after remove complete day remove active class of that day

                    const activeDayElem = document.querySelector(".day.active") as HTMLElement;
                    if (activeDayElem.classList.contains("event")) {
                        activeDayElem.classList.remove("event");
                    }

                }

            }
        });
        // after removing from array update event
        updateEvents(activeDay);
    }
});

//lets store events in local storage get from there

function saveEvents() {
    localStorage.setItem("events", JSON.stringify(eventsArr));
}

function getEvents() {
    const storedEvents = localStorage.getItem("events");

    if (storedEvents === null) {
        return;
    }

    const parsedEvents = JSON.parse(storedEvents);

    eventsArr.push(...parsedEvents);
}

document.addEventListener('DOMContentLoaded', () => {
    const textbox = document.getElementById('textbox') as HTMLTextAreaElement;

    textbox.addEventListener('input', () => {
        if (textbox.value.length > 500) {
            textbox.value = textbox.value.slice(0, 500);
        }
    });
});

const checkboxFrom = document.getElementById("checkboxTo") as HTMLFormElement;
const checkboxReminder = document.getElementById("checkboxReminder") as HTMLFormElement;
const reminderSelect = document.getElementById("reminderSelect") as HTMLFormElement;

checkboxFrom.addEventListener("change", function () {
    if (checkboxFrom.checked === true) {
        addEventTo.classList.remove("hidden");
    } else {
        addEventTo.classList.add("hidden");
    }
});

checkboxReminder.addEventListener("change", function () {
    if (checkboxReminder.checked === true) {
        reminderSelect.classList.remove("hidden");
    } else {
        reminderSelect.classList.add("hidden");
    }
});