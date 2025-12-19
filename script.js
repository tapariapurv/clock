const clockElement = document.getElementById('clock');
const dateElement = document.getElementById('date');
const messageElement = document.getElementById('message');
const analogClock = document.getElementById('analog-clock');
const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');

let is24Hour = false;

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Analog Clock Logic
    const sDeg = seconds * 6;
    const mDeg = minutes * 6 + seconds * 0.1;
    const hDeg = hours * 30 + minutes * 0.5;

    secondHand.style.transform = `translateX(-50%) rotate(${sDeg}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${mDeg}deg)`;
    hourHand.style.transform = `translateX(-50%) rotate(${hDeg}deg)`;

    // Check for Easter Eggs before formatting hours
    checkEasterEggs(hours, minutes, seconds);

    // Time Formatting
    let ampm = '';
    if (!is24Hour) {
        ampm = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
    }

    const hStr = hours.toString().padStart(2, '0');
    const mStr = minutes.toString().padStart(2, '0');
    const sStr = seconds.toString().padStart(2, '0');

    clockElement.innerText = `${hStr}:${mStr}:${sStr}${ampm}`;

    // Date Formatting
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.innerText = now.toLocaleDateString(undefined, options);
}

function checkEasterEggs(h, m, s) {
    // Reset classes
    clockElement.className = 'clock';
    analogClock.className = 'analog-clock';

    const eggs = [
        { h: 0, m: 0, msg: "🌙 New Day! 🌙", style: "night-mode" },
        { h: 0, m: 1, msg: "🌱 Fresh Start", style: "nature-mode" },
        { h: 0, m: 7, msg: "🕵️ Bond, James Bond", style: "night-mode" },
        { h: 0, m: 42, msg: "🤖 Meaning of Life", style: "neon-mode" },
        { h: 1, m: 1, msg: "1️⃣ One by One", style: "neon-mode" },
        { h: 1, m: 11, msg: "1️⃣ Ones", style: "neon-mode" },
        { h: 1, m: 23, msg: "🔢 1-2-3 Go!", style: "nature-mode" },
        { h: 2, m: 0, msg: "🦉 Night Owl", style: "night-mode" },
        { h: 2, m: 2, msg: "👯 Double Trouble", style: "neon-mode" },
        { h: 2, m: 22, msg: "2️⃣ Twos", style: "neon-mode" },
        { h: 3, m: 0, msg: "👻 Witching Hour", style: "night-mode" },
        { h: 3, m: 3, msg: "☘️ Three Leaf Clover", style: "nature-mode" },
        { h: 3, m: 14, msg: "🥧 Pi Time", style: "gold-mode" },
        { h: 3, m: 21, msg: "🚀 Blast Off!", style: "fire-mode" },
        { h: 3, m: 33, msg: "3️⃣ Threes", style: "neon-mode" },
        { h: 4, m: 4, msg: "❌ Sleep Not Found", style: "danger-mode" },
        { h: 4, m: 20, msg: "🌿 Chill Vibes", style: "nature-mode" },
        { h: 4, m: 44, msg: "4️⃣ Fours", style: "neon-mode" },
        { h: 5, m: 5, msg: "🖐️ High Five", style: "gold-mode" },
        { h: 5, m: 55, msg: "5️⃣ Fives", style: "neon-mode" },
        { h: 6, m: 6, msg: "🎲 Sixes", style: "neon-mode" },
        { h: 6, m: 28, msg: "🥧 2 Pi", style: "gold-mode" },
        { h: 6, m: 30, msg: "🐦 Early Bird", style: "nature-mode" },
        { h: 7, m: 0, msg: "🌅 Rise & Shine", style: "gold-mode" },
        { h: 7, m: 7, msg: "🎰 Lucky Sevens", style: "gold-mode" },
        { h: 7, m: 11, msg: "🏪 Slurpee Time", style: "neon-mode" },
        { h: 7, m: 30, msg: "🥞 Breakfast Time", style: "gold-mode" },
        { h: 8, m: 8, msg: "♾️ Infinite Loop", style: "neon-mode" },
        { h: 8, m: 16, msg: "💡 Power of 2", style: "neon-mode" },
        { h: 8, m: 50, msg: "🕗 Ten to Nine", style: "nature-mode" },
        { h: 9, m: 0, msg: "🚀 Work Mode", style: "fire-mode" },
        { h: 9, m: 5, msg: "💼 9 to 5", style: "danger-mode" },
        { h: 9, m: 9, msg: "☁️ Cloud Nine", style: "nature-mode" },
        { h: 9, m: 41, msg: "📱 Keynote Time", style: "gold-mode" },
        { h: 10, m: 4, msg: "⚡ 1.21 Gigawatts", style: "danger-mode" },
        { h: 10, m: 10, msg: "⚖️ Perfect Balance", style: "nature-mode" },
        { h: 10, m: 24, msg: "💾 Kilobyte", style: "neon-mode" },
        { h: 11, m: 11, msg: "✨ Make a Wish! ✨", style: "gold-mode" },
        { h: 11, m: 23, msg: "➗ Fibonacci", style: "nature-mode" },
        { h: 11, m: 34, msg: "🙃 Hell(o)", style: "fire-mode" },
        { h: 11, m: 59, msg: "⏳ Last Minute", style: "danger-mode" },
        { h: 12, m: 0, msg: "☀️ High Noon", style: "gold-mode" },
        { h: 12, m: 12, msg: "🍩 Dozen", style: "gold-mode" },
        { h: 12, m: 21, msg: "🔄 Palindrome", style: "neon-mode" },
        { h: 12, m: 34, msg: "🔢 1, 2, 3, 4!", style: "nature-mode" },
        { h: 12, m: 51, msg: "🎸 The Strokes", style: "neon-mode" },
        { h: 13, m: 13, msg: "🐈‍⬛ Unlucky?", style: "night-mode" },
        { h: 13, m: 37, msg: "👾 Leet Time 👾", style: "neon-mode" },
        { h: 14, m: 0, msg: "🕑 2 PM", style: "nature-mode" },
        { h: 14, m: 14, msg: "💖 Double 14", style: "love-mode" },
        { h: 15, m: 15, msg: "� Quarter Past 3", style: "love-mode" },
        { h: 16, m: 4, msg: "📄 Page Not Found", style: "danger-mode" },
        { h: 16, m: 20, msg: "🍵 Tea Time", style: "nature-mode" },
        { h: 17, m: 0, msg: "🕔 Happy Hour!", style: "party-mode" },
        { h: 17, m: 17, msg: "🕖 Symmetry", style: "neon-mode" },
        { h: 18, m: 18, msg: "🌇 Sunset Vibes", style: "fire-mode" },
        { h: 18, m: 30, msg: "🍽️ Dinner Time", style: "fire-mode" },
        { h: 19, m: 0, msg: "📺 Prime Time", style: "neon-mode" },
        { h: 19, m: 19, msg: "🌌 Twilight", style: "night-mode" },
        { h: 19, m: 58, msg: "🕗 Almost 8", style: "night-mode" },
        { h: 20, m: 20, msg: "👓 20/20 Vision", style: "neon-mode" },
        { h: 20, m: 48, msg: "🎮 2048", style: "neon-mode" },
        { h: 21, m: 12, msg: "🎸 2112", style: "night-mode" },
        { h: 21, m: 21, msg: "🪞 Mirror Time", style: "night-mode" },
        { h: 22, m: 0, msg: "🕙 10 PM", style: "night-mode" },
        { h: 22, m: 22, msg: "✨ Double Eleven", style: "gold-mode" },
        { h: 23, m: 23, msg: "🧬 Chromosome", style: "neon-mode" },
        { h: 23, m: 45, msg: "🪜 Step Up", style: "nature-mode" },
        { h: 23, m: 59, msg: "⏳ Final Countdown", style: "danger-mode" }
    ];

    const activeEgg = eggs.find(egg => egg.h === h && egg.m === m);

    if (activeEgg) {
        messageElement.innerText = activeEgg.msg;
        messageElement.classList.add('show');
        if (activeEgg.style) {
            clockElement.classList.add(activeEgg.style);
            analogClock.classList.add(activeEgg.style);
        }
    } else {
        messageElement.classList.remove('show');
    }
}

// Toggle 12/24h format on click
clockElement.addEventListener('click', () => {
    is24Hour = !is24Hour;
    updateClock();
});

setInterval(updateClock, 1000);
updateClock();