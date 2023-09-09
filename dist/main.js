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
const addEventFrom = document.querySelector(".event-time-from");
let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();
const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
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
    addListener();
    updateEvents(activeDay);
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
function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(' ')[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;
    const activeDay = new Date(year, month, date);
    activeDay.setDate(day.getDate() + 1);
    addEventFrom.value = activeDay.toISOString().substr(0, 16);
}
const addEventBtn = document.querySelector(".add-event");
const addEventContainer = document.querySelector(".add-event-wrapper");
const addEventCloseBtn = document.querySelector(".close");
const addEventTitle = document.querySelector(".event-name");
const addEventTo = document.querySelector(".event-time-to");
const description = document.querySelector(".description");
const addEventActivity = document.querySelector(".event-select");
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
    const target = e.target;
    if (target !== addEventBtn &&
        !(addEventContainer.contains(target)) &&
        target !== addEventContainer) {
        closeAddEventContainer();
    }
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeAddEventContainer();
    }
});
daysContainer.addEventListener('dblclick', function (event) {
    const target = event.target;
    if (target === null || target === void 0 ? void 0 : target.classList.contains('day')) {
        toggleAddEventContainer();
    }
});
addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 60);
});
function addListener() {
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
initCalendar();
function updateEvents(date) {
    let events = "";
    eventsArr.forEach((event) => {
        if (date === event.day &&
            month + 1 === event.month &&
            year === event.year) {
            event.events.forEach((event) => {
                const eventTime = new Date(event.time);
                const currentTime = new Date();
                const timeDifferenceMs = eventTime.getTime() - currentTime.getTime();
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
                checkReminder(timeDifferenceMs);
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
let theme = "light-mode";
function toggleTheme() {
    const calendar = document.querySelector("body");
    const logoLightHeader = document.getElementById("logoLightHeader");
    const logoDarkHeader = document.getElementById("logoDarkHeader");
    const logoLight = document.getElementById("logoLight");
    const logoDark = document.getElementById("logoDark");
    if (theme === "light-mode") {
        theme = "dark-mode";
        calendar === null || calendar === void 0 ? void 0 : calendar.classList.remove("light-mode");
        calendar === null || calendar === void 0 ? void 0 : calendar.classList.add("dark-mode");
        logoLightHeader === null || logoLightHeader === void 0 ? void 0 : logoLightHeader.classList.add("hidden");
        logoDarkHeader === null || logoDarkHeader === void 0 ? void 0 : logoDarkHeader.classList.remove("hidden");
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
        logoLightHeader === null || logoLightHeader === void 0 ? void 0 : logoLightHeader.classList.remove("hidden");
        logoDarkHeader === null || logoDarkHeader === void 0 ? void 0 : logoDarkHeader.classList.add("hidden");
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
    const eventActivity = addEventActivity.value;
    const timeFromArr = eventTimeFrom.split(":");
    const timeToArr = eventTimeTo.split(":");
    const timeFromHour = parseInt(timeFromArr[0], 10);
    const timeFromMin = parseInt(timeFromArr[1], 10);
    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);
    if (eventTitle === "" || eventTimeFrom === "" || eventActivity === "") {
        validateActivity(), validateTitle();
        return;
    }
    const newEvent = {
        title: eventTitle,
        activity: eventActivity,
        time: timeFrom,
        fullTime: eventTimeFrom.slice(11, 16) + " " + eventTimeTo.slice(11, 16),
    };
    if (eventTimeTo) {
        newEvent.fullTime = eventTimeFrom.slice(11, 16) + " - " + eventTimeTo.slice(11, 16);
    }
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
    const [hours, minutes] = time.split(":").map(Number);
    const timeFormat = hours >= 12 ? "PM" : "AM";
    let formattedHours = hours % 12;
    formattedHours = formattedHours === 0 ? 12 : formattedHours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${formattedHours}:${formattedMinutes} ${timeFormat}`;
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
    localStorage.setItem("eventsArr", JSON.stringify(eventsArr));
}
function getEvents() {
    if (localStorage.getItem("eventsArr")) {
        eventsArr = JSON.parse(localStorage.getItem("eventsArr") || "[]");
        updateEvents(activeDay);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const textbox = document.getElementById('textbox');
    textbox.addEventListener('input', () => {
        if (textbox.value.length > 500) {
            textbox.value = textbox.value.slice(0, 500);
        }
    });
});
const checkboxFrom = document.getElementById("checkboxTo");
const checkboxReminder = document.getElementById("checkboxReminder");
const reminderSelect = document.getElementById("reminderSelect");
checkboxFrom.addEventListener("change", function () {
    if (checkboxFrom.checked === true) {
        addEventTo.classList.remove("hidden-input");
        addEventTo.classList.add("shown-input");
    }
    else {
        addEventTo.classList.remove("shown-input");
        addEventTo.classList.add("hidden-input");
    }
});
checkboxReminder.addEventListener("change", function () {
    if (checkboxReminder.checked === true) {
        reminderSelect.classList.remove("hidden-input");
        reminderSelect.classList.add("shown-input");
    }
    else {
        reminderSelect.classList.remove("shown-input");
        reminderSelect.classList.add("hidden-input");
    }
});
const titleValidationMessage = document.querySelector(".event-name + .validation-message");
const activityValidationMessage = document.querySelector(".event-select + .validation-message");
const validationTitle = document.querySelector(".validation-title");
const validationActivity = document.querySelector(".validation-activity");
addEventTitle.addEventListener("blur", validateTitle);
addEventTitle.addEventListener("focus", clearValidationMessage);
addEventActivity.addEventListener("blur", validateActivity);
addEventActivity.addEventListener("focus", clearValidationMessage);
function validateTitle() {
    const eventTitle = addEventTitle.value.trim();
    if (eventTitle === "") {
        titleValidationMessage.textContent = "Please enter a title.";
        addEventTitle.classList.add("error");
        validationTitle.classList.add("error-animation");
    }
    else {
        titleValidationMessage.textContent = "";
        addEventTitle.classList.remove("error");
    }
}
function validateActivity() {
    const eventActivity = addEventActivity.value;
    if (eventActivity === "") {
        activityValidationMessage.textContent = "Please select an activity.";
        addEventActivity.classList.add("error");
        validationActivity.classList.add("error-animation");
    }
    else {
        activityValidationMessage.textContent = "";
        addEventActivity.classList.remove("error");
    }
}
function clearValidationMessage() {
    addEventTitle.textContent = "";
    addEventTitle.classList.remove("error");
}
function checkReminder(minutesLeft) {
    const reminderSelect = document.getElementById("reminderSelect");
    const selectedValue = reminderSelect.value;
    const alarmElement = document.getElementById("custom_alarm");
    if (selectedValue) {
        const minutesLeft = Number(selectedValue);
        alarmElement.textContent = `${minutesLeft} minutes left until event starts!`;
        alarmElement.style.display = "block";
        setTimeout(() => {
            alarmElement.style.display = "none";
        }, minutesLeft * 60000);
    }
    console.log(`timeDifferenceMs: ${minutesLeft}`);
}
export {};
