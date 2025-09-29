const clockElement = document.querySelector('.clock');
const dateElement = document.querySelector('.date');

/**

 * @param {number} day
   @returns {string}
 */
function getDaySuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
}

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    

    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    const timeString = `${paddedHours}:${paddedMinutes}:${paddedSeconds} ${meridiem}`;
    clockElement.textContent = timeString;


    const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
    const dayOfMonth = now.getDate();
    const month = now.toLocaleDateString('en-US', { month: 'long' });
    const year = now.getFullYear();
    const daySuffix = getDaySuffix(dayOfMonth);

    const dateString = `${dayOfWeek}, ${dayOfMonth}${daySuffix} ${month} ${year}`;
    dateElement.textContent = dateString;
}

updateClock();
setInterval(updateClock, 1000);