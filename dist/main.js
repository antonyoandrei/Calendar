"use strict";
const calendar = document.querySelector(".calendar");
const date = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const todayBtn = document.querySelector(".today-btn");
const eventDay = document.querySelector(".event-day");
const eventDate = document.querySelector(".event-date");
const eventsContainer = document.querySelector(".events");
const addEventSubmit = document.querySelector(".add-event-btn");
let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();
const months = [
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
];
let eventsArr = [];
getEvents();
function initCalendar() {
    const firstDay = new Date(year, month, 0);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay();
    date.textContent = months[month] + " " + year;
    let days = "";
    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }
    for (let i = 1; i <= lastDate; i++) {
        let event = false;
        eventsArr.forEach((eventObj) => {
            if (eventObj.day === i &&
                eventObj.month === month + 1 &&
                eventObj.year === year) {
                event = true;
            }
        });
        if (i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()) {
            activeDay = i;
            getActiveDay(i);
            updateEvents(i);
            if (event) {
                days += `<div class="day today active event">${i}</div>`;
            }
            else {
                days += `<div class="day today active">${i}</div>`;
            }
        }
        else {
            if (event) {
                days += `<div class="day event">${i}</div>`;
            }
            else {
                days += `<div class="day">${i}</div>`;
            }
        }
    }
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }
    daysContainer.innerHTML = days;
    addListner();
}
initCalendar();
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}
function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);
todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});
const addEventBtn = document.querySelector(".add-event");
const addEventContainer = document.querySelector(".add-event-wrapper");
const addEventCloseBtn = document.querySelector(".close");
const addEventTitle = document.querySelector(".event-name");
const addEventFrom = document.querySelector(".event-time-from");
const addEventTo = document.querySelector(".event-time-to");
const description = document.querySelector(".description");
addEventBtn.addEventListener("click", () => {
    addEventContainer.classList.toggle("active");
    addEventTitle.value = "";
    addEventFrom.innerHTML = "";
    addEventTo.value = "";
    description.value = "";
});
addEventCloseBtn.addEventListener("click", () => {
    addEventContainer === null || addEventContainer === void 0 ? void 0 : addEventContainer.classList.remove("active");
    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";
    description.value = "";
});
document.addEventListener("click", (e) => {
    const target = e.target;
    if (target !== addEventBtn &&
        !(addEventContainer.contains(target)) &&
        target !== addEventContainer) {
        addEventContainer.classList.remove("active");
        addEventTitle.value = "";
        addEventFrom.value = "";
        addEventTo.value = "";
        description.value = "";
    }
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        addEventContainer.classList.remove("active");
        addEventTitle.value = "";
        addEventFrom.value = "";
        addEventTo.value = "";
        description.value = "";
    }
});
addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 60);
});
function addListner() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            const target = e.target;
            activeDay = Number(target.innerHTML);
            getActiveDay(target.innerHTML);
            updateEvents(Number(target.innerHTML));
            days.forEach((day) => {
                day.classList.remove("active");
            });
            if (target.classList.contains("prev-date")) {
                prevMonth();
                setTimeout(() => {
                    const days = document.querySelectorAll(".day");
                    days.forEach((day) => {
                        if (!day.classList.contains("prev-date") &&
                            day.innerHTML === target.innerHTML) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            }
            else if (target.classList.contains("next-date")) {
                nextMonth();
                setTimeout(() => {
                    const days = document.querySelectorAll(".day");
                    days.forEach((day) => {
                        if (!day.classList.contains("next-date") &&
                            day.innerHTML === target.innerHTML) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            }
            else {
                target.classList.add("active");
            }
        });
    });
}
function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(' ')[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;
}
function updateEvents(date) {
    let events = "";
    eventsArr.forEach((event) => {
        if (date === event.day &&
            month + 1 === event.month &&
            year === event.year) {
            event.events.forEach((event) => {
                events += `
                <div class="event">
                    <div class="title">
                        <i class="fas fa-circle"></i>
                        <h3 class="event-title">${event.title}</h3>
                    </div>
                    <div class="event-time">
                        <span class="event-time">${event.time}</span>
                    </div>
                </div>
                `;
            });
        }
    });
    if ((events === "")) {
        events = `<div class="no-event">
                    <h3>No Events</h3>
                </div>`;
    }
    eventsContainer.innerHTML = events;
    saveEvents();
}
const link = document.querySelector("link[rel~='icon']");
if (!link) {
    const newLink = document.createElement('link');
    newLink.rel = 'icon';
    newLink.id = 'favicon';
    newLink.href = '/assets/img/icon.png';
    document.head.appendChild(newLink);
}
else {
    link.href = '/assets/img/icon.png';
}
;
let theme = "light-mode";
function toggleTheme() {
    const calendar = document.querySelector("body");
    const logoLight = document.getElementById("logo-light");
    const logoDark = document.getElementById("logo-dark");
    if (theme === "light-mode") {
        theme = "dark-mode";
        calendar === null || calendar === void 0 ? void 0 : calendar.classList.remove("light-mode");
        calendar === null || calendar === void 0 ? void 0 : calendar.classList.add("dark-mode");
        logoLight === null || logoLight === void 0 ? void 0 : logoLight.classList.add("hidden");
        logoDark === null || logoDark === void 0 ? void 0 : logoDark.classList.remove("hidden");
        const favicon = document.getElementById('favicon');
        if (favicon) {
            favicon.href = '/assets/img/icon-dark.png';
        }
    }
    else {
        theme = "light-mode";
        calendar === null || calendar === void 0 ? void 0 : calendar.classList.remove("dark-mode");
        calendar === null || calendar === void 0 ? void 0 : calendar.classList.add("light-mode");
        logoLight === null || logoLight === void 0 ? void 0 : logoLight.classList.remove("hidden");
        logoDark === null || logoDark === void 0 ? void 0 : logoDark.classList.add("hidden");
        const favicon = document.getElementById('favicon');
        if (favicon) {
            favicon.href = '/assets/img/icon.png';
        }
    }
}
const themeSwitch = document.getElementById("themeSwitch");
if (themeSwitch) {
    themeSwitch.addEventListener("click", toggleTheme);
}
addEventSubmit.addEventListener("click", () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;
    if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
        alert("Please fill all the fields");
        return;
    }
    const timeFromArr = eventTimeFrom.split(":");
    const timeToArr = eventTimeTo.split(":");
    if (timeFromArr.length != 2 ||
        timeToArr.length != 2 ||
        timeFromArr[0] > 23 ||
        timeFromArr[1] > 59 ||
        timeToArr[0] > 23 ||
        timeToArr[1] > 59) {
        alert("Invalid time format");
    }
    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);
    const newEvent = {
        title: eventTitle,
        time: timeFrom + " - " + timeTo,
    };
    let eventAdded = false;
    if (eventsArr.length > 0) {
        eventsArr.forEach((item) => {
            if (item.day === activeDay &&
                item.month === month + 1 &&
                item.year === year) {
                item.events.push(newEvent);
                eventAdded = true;
            }
        });
    }
    if (!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [newEvent]
        });
    }
    addEventContainer.classList.remove('active');
    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";
    description.value = "";
    updateEvents(activeDay);
    const activeDayElem = document.querySelector(".day-active");
    if (!(activeDayElem === null || activeDayElem === void 0 ? void 0 : activeDayElem.classList.contains("event"))) {
        activeDayElem === null || activeDayElem === void 0 ? void 0 : activeDayElem.classList.add("event");
    }
    initCalendar();
});
function convertTime(time) {
    let timeArr = time.split(":");
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    timeHour = timeHour % 12 || 12;
    time = timeHour + ":" + timeMin + " " + timeFormat;
    return time;
}
eventsContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("event")) {
        const eventTitle = target.children[0].children[1].innerHTML;
        eventsArr.forEach((event) => {
            if (event.day === activeDay &&
                event.month === month + 1 &&
                event.year === year) {
                event.events.forEach((item, index) => {
                    if (item.title === eventTitle) {
                        event.events.splice(index, 1);
                    }
                });
                if (event.events.length === 0) {
                    eventsArr.splice(eventsArr.indexOf(event), 1);
                    const activeDayElem = document.querySelector(".day.active");
                    if (activeDayElem.classList.contains("event")) {
                        activeDayElem.classList.remove("event");
                    }
                }
            }
        });
        updateEvents(activeDay);
    }
});
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
    const textbox = document.getElementById('textbox');
    textbox.addEventListener('input', () => {
        if (textbox.value.length > 500) {
            textbox.value = textbox.value.slice(0, 500);
        }
    });
});
