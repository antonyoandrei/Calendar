const calendar = document.querySelector(".calendar") as HTMLElement
const date = document.querySelector(".date") as HTMLElement
const daysContainer = document.querySelector(".days") as HTMLElement
const prev = document.querySelector(".prev") as HTMLElement
const next = document.querySelector(".next") as HTMLElement
const todayBtn = document.querySelector(".today-btn") as HTMLElement

let today = new Date();
let activeDay;
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
    for (let i = 1; i <= lastDate; i++) {
        // if day is today add class today
        if (
            i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
        ) {
            days += `<div class="day today active">${i}</div>`;
        }
        // add remaining as it is
        else {
            days += `<div class="day">${i}</div>`;
        }
    }

    // next month days

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }
    daysContainer.innerHTML = days;
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

// 32.12

todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();

})