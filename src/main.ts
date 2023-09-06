const calendar = document.querySelector(".calendar") as HTMLElement
const date = document.querySelector(".date") as HTMLElement
const daysContainer = document.querySelector(".days") as HTMLElement
const prev = document.querySelector(".prev") as HTMLElement
const next = document.querySelector(".next") as HTMLElement
const todayBtn = document.querySelector(".today-btn") as HTMLElement
const eventDay = document.querySelector(".event-day") as HTMLElement;
const eventDate = document.querySelector(".event-date") as HTMLElement;
const eventsContainer= document.querySelector(".events") as HTMLElement;

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

//default events array
const eventsArr = [
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
 ];

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
        eventsArr.forEach((eventObj) =>{
            if(
                eventObj.day === i &&
                eventObj.month === month +1 &&
                eventObj.year === year
            )
            {
                //if event found
                event=true;
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
            if(event){
                days += `<div class="day today active event">${i}</div>`;
            }
            else{
                days += `<div class="day today active">${i}</div>`;
            }
        }
        // add remaining as it is
        else {
            if(event){
                days += `<div class="day event">${i}</div>`;
            }
            else{
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
    addListner();
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

const addEventBtn = document.querySelector(".add-event") as HTMLElement
const addEventContainer = document.querySelector(".add-event-wrapper") as HTMLElement
const addEventCloseBtn = document.querySelector(".close") as HTMLElement
const addEventTitle= document.querySelector(".event-name") as HTMLFormElement
const addEventFrom = document.querySelector(".event-time-from") as HTMLFormElement
const addEventTo = document.querySelector(".event-time-to") as HTMLFormElement

addEventBtn.addEventListener("click", () => {
    addEventContainer?.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
    addEventContainer?.classList.remove("active");
});

// closes if click outside

document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    if (
        target !== addEventBtn &&
        !(addEventContainer.contains(target)) &&
        target !== addEventContainer
    ) {
        addEventContainer.classList.remove("active");
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        addEventContainer.classList.remove("active");
    }
});

//allow only 50 chars in tittle
addEventTitle.addEventListener("input",(e) =>{
    addEventTitle.value = addEventTitle.value.slice(0, 50);
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
function addListner() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click",(e) => {
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

            if(target.classList.contains("prev-date")){
                prevMonth();

                setTimeout(() =>{
                    //select all days of that month
                    const days = document.querySelectorAll(".day");

                    //after going to prev month add active to clicked
                    days.forEach((day) =>{
                        if(!day.classList.contains("prev-date") &&
                        day.innerHTML === target.innerHTML) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
                //same with next month days
            }else if(target.classList.contains("next-date")){
                nextMonth();

                setTimeout(() =>{
                    //select all days of that month
                    const days = document.querySelectorAll(".day");

                    //after going to prev month add active to clicked
                    days.forEach((day) =>{
                        if(!day.classList.contains("next-date") &&
                        day.innerHTML === target.innerHTML) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            }
            else{
                //remaing current month days
                target.classList.add("active");
            }
        });
    });
}

//lets show active day events and date at top

function getActiveDay(date: any){
    const day = new Date(year, month, date);
    const dayName = day.toString().split(' ')[0];
    eventDay.innerHTML=dayName;
    eventDate.innerHTML= date + " " + months[month] + " " + year;
}


//function to show events of that day
function updateEvents(date:any){
    let events = "";
    eventsArr.forEach((event)=>{
        // get events at active day only
        if(
            date === event.day &&
            month + 1 === event.month &&
            year === event.year
        ){

            // then show event on document

            event.events.forEach((event)=>{
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

    //if nothing found

    if((events === "")){
        events = `<div class="no-event">
                    <h3>No Events</h3>
                </div>`;
    }

    eventsContainer.innerHTML = events;
}

let theme: string = "light-mode";

function toggleTheme() {
    const calendar: HTMLElement | null = document.querySelector("body");

    if (theme === "light-mode") {
        theme = "dark-mode";
            calendar?.classList.remove("light-mode");
            calendar?.classList.add("dark-mode");
    } else {
        theme = "light-mode";
            calendar?.classList.remove("dark-mode");
            calendar?.classList.add("light-mode");
    }
}

const themeSwitch = document.getElementById("themeSwitch") as HTMLInputElement;
if (themeSwitch) {
    themeSwitch.addEventListener("click", toggleTheme);
}




