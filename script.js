// THE DATES (With IST Timezone +05:30)
const valentinesWeek = [
    { id: 'rose', name: "Rose Day", date: "2026-02-07T00:00:00+05:30", icon: "🌹", link: "pages/rose.html" },
    { id: 'propose', name: "Propose Day", date: "2026-02-08T00:00:00+05:30", icon: "💍", link: "pages/propose.html" },
    { id: 'chocolate', name: "Chocolate Day", date: "2026-02-09T00:00:00+05:30", icon: "🍫", link: "pages/chocolate.html" },
    { id: 'teddy', name: "Teddy Day", date: "2026-02-10T00:00:00+05:30", icon: "🧸", link: "pages/teddy.html" },
    { id: 'promise', name: "Promise Day", date: "2026-02-11T00:00:00+05:30", icon: "🤝", link: "pages/promise.html" },
    { id: 'hug', name: "Hug Day", date: "2026-02-12T00:00:00+05:30", icon: "🤗", link: "pages/hug.html" },
    { id: 'kiss', name: "Kiss Day", date: "2026-02-13T00:00:00+05:30", icon: "💋", link: "pages/kiss.html" },
    { id: 'valentine', name: "Valentine's Day", date: "2026-02-14T00:00:00+05:30", icon: "❤️", link: "pages/valentine.html" }
];

const grid = document.getElementById('card-grid');

// Generate the Cards
valentinesWeek.forEach(day => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-day', day.name);
    
    // Create inner HTML structure
    card.innerHTML = `
        <div class="icon">${day.icon}</div>
        <div class="title">${day.name}</div>
        <div class="status" id="timer-${day.id}">Loading...</div>
    `;

    // Start the Logic
    const targetTime = new Date(day.date).getTime();
    const now = new Date().getTime();

    if (now >= targetTime) {
        // --- UNLOCKED ---
        card.classList.add('unlocked');
        card.querySelector(`#timer-${day.id}`).innerText = "Tap to Open! 🎁";
        
        card.onclick = () => {
             confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            setTimeout(() => { window.location.href = day.link; }, 1000);
        };
    } else {
        // --- LOCKED ---
        card.classList.add('locked');
        
        // Start Timer
        startCountdown(targetTime, `timer-${day.id}`);
        
        card.onclick = () => {
            Swal.fire({
                title: 'Not Yet! 🤫',
                text: `Wait until 12:00 AM on ${day.name}!`,
                icon: 'info',
                confirmButtonColor: '#D81B60',
                background: '#FFF0F5',
                color: '#5D4037'
            });
        };
    }

    grid.appendChild(card);
});

// COUNTDOWN FUNCTION
function startCountdown(targetTime, elementId) {
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetTime - now;

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById(elementId).innerText = "Refresh to Open!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById(elementId).innerText = 
            `⏳ ${days}d ${hours}h ${minutes}m ${seconds}s`;
            
    }, 1000);
}

// Music Logic remains the same
let isPlaying = false;
function toggleMusic() {
    const music = document.getElementById('bg-music');
    if (isPlaying) { music.pause(); } else { music.play(); }
    isPlaying = !isPlaying;
}