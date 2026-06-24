document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. INTRO SCREEN BYPASS & UNLOCK ---
    const introScreen = document.getElementById("intro-screen");
    const enterBtn = document.getElementById("enter-chamber-btn");
    const secretInput = document.getElementById("secret-word");

    function unlockChamber() {
        introScreen.classList.add("fade-out");
        showToast("Welcome back, Grand Archivist.");
        startRainEffect();
    }

    enterBtn.addEventListener("click", unlockChamber);
    secretInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") unlockChamber();
    });

    // --- 2. ROBUST NAVIGATION ENGINE (NEVER BREAKS) ---
    const navLinks = document.querySelectorAll(".nav-link, .book-spine");
    const pages = document.querySelectorAll(".page");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            const targetId = link.getAttribute("data-target");
            if (!targetId) return;

            // Stop speech immediately when changing tabs to maintain lag-free memory
            window.speechSynthesis.cancel();
            document.querySelectorAll(".listen-btn").forEach(b => b.innerText = "🔊 Listen Poem");

            pages.forEach(page => page.classList.remove("active"));

            const targetPage = document.getElementById(targetId);
            if (targetPage) {
                targetPage.classList.add("active");
                
                // Track current active states across navigation bars
                document.querySelectorAll(".nav-link").forEach(nl => {
                    nl.classList.remove("active-nav");
                    if (nl.getAttribute("data-target") === targetId) {
                        nl.classList.add("active-nav");
                    }
                });

                // Signature reveal animation triggers when page loads
                const signature = targetPage.querySelector(".sign-animate");
                if (signature) signature.classList.add("active-sign");
            }
        });
    });

    // --- 3. WAX SEAL VAULT CONTROLLER ---
    const sealWrapper = document.getElementById("vault-seal-wrapper");
    const mainSeal = document.getElementById("main-wax-seal");
    const closeVaultBtn = document.getElementById("close-vault-btn");

    if (mainSeal && sealWrapper) {
        mainSeal.addEventListener("click", () => {
            sealWrapper.classList.add("broken");
            showToast("The wax has shattered. Forbidden truth revealed.");
        });
    }

    if (closeVaultBtn) {
        closeVaultBtn.addEventListener("click", () => {
            document.querySelector('.nav-link[data-target="page-home"]').click();
            setTimeout(() => {
                sealWrapper.classList.remove("broken");
            }, 600);
        });
    }

    // --- 4. 🔊 HIGH-PERFORMANCE LAG-FREE AI VOICE ENGINE ---
    function handlePoemSpeech(button, textContainer) {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            button.innerText = "🔊 Listen Poem";
            button.classList.remove("active-fav");
            return;
        }

        let textToSpeak = textContainer.innerText;
        const dropCap = textContainer.querySelector(".drop-cap-antique");
        if (dropCap) {
            // Smooth patch rendering for continuous pronunciation matching
            textToSpeak = textToSpeak.replace(dropCap.innerText, dropCap.innerText + " ");
        }

        const speechInstance = new SpeechSynthesisUtterance(textToSpeak);
        const voices = window.speechSynthesis.getVoices();
        
        // Priority selection for standard cinematic reading voices
        const premiumVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Natural") || v.lang === "en-US");
        if (premiumVoice) speechInstance.voice = premiumVoice;

        speechInstance.rate = 0.88; 
        speechInstance.pitch = 0.95;

        speechInstance.onstart = () => {
            button.innerText = "🛑 Stop Voice";
            button.classList.add("active-fav");
        };

        speechInstance.onend = () => {
            button.innerText = "🔊 Listen Poem";
            button.classList.remove("active-fav");
        };

        window.speechSynthesis.speak(speechInstance);
    }

    document.addEventListener("click", (e) => {
        if (e.target && e.target.classList.contains("listen-btn")) {
            const poemText = e.target.closest(".antique-parchment").querySelector(".royal-poem-text");
            handlePoemSpeech(e.target, poemText);
        }
    });

    // --- 5. VISITOR JOURNAL LOG ENGINE ---
    const journalInput = document.getElementById("journal-input");
    const journalSubmit = document.getElementById("journal-submit");

    if (journalSubmit && journalInput) {
        journalSubmit.addEventListener("click", () => {
            const text = journalInput.value.trim();
            if (text === "") {
                showToast("The ledger cannot preserve blank thoughts.");
                return;
            }
            showToast("Your thoughts have been carved into the archive.");
            journalInput.value = "";
        });
    }

    // --- 6. RESONANCE (BOOKMARK STORAGE ENGINE) ---
    const resonateButtons = document.querySelectorAll(".resonate-btn");
    const ledgerList = document.getElementById("ledger-list");
    let savedPoems = JSON.parse(localStorage.getItem("savedResonances")) || [];

    function updateLedgerUI() {
        if (!ledgerList) return;
        if (savedPoems.length === 0) {
            ledgerList.innerHTML = `<p style="color: var(--text-muted); text-align:center; padding-top:20px;">No resonances saved yet.</p>`;
            return;
        }
        ledgerList.innerHTML = savedPoems.map(poem => `
            <div class="bookmark-item" data-target-poem="${poem}">
                ✦ ${poem} <span style="float:right; color:#8b0000;" class="delete-resonance" data-del="${poem}">✕</span>
            </div>
        `).join('');
    }

    resonateButtons.forEach(btn => {
        const id = btn.getAttribute("data-target-id") || btn.getAttribute("data-poem-id");
        if(savedPoems.includes(id)) btn.classList.add("active-fav");

        btn.addEventListener("click", () => {
            const poemId = btn.getAttribute("data-target-id") || btn.getAttribute("data-poem-id");
            if (savedPoems.includes(poemId)) {
                savedPoems = savedPoems.filter(p => p !== poemId);
                btn.classList.remove("active-fav");
                showToast("Resonance forgotten.");
            } else {
                savedPoems.push(poemId);
                btn.classList.add("active-fav");
                showToast("Saved into the ledger matrix.");
            }
            localStorage.setItem("savedResonances", JSON.stringify(savedPoems));
            updateLedgerUI();
        });
    });

    if (ledgerList) {
        ledgerList.addEventListener("click", (e) => {
            if (e.target.classList.contains("delete-resonance")) {
                e.stopPropagation();
                const toDel = e.target.getAttribute("data-del");
                savedPoems = savedPoems.filter(p => p !== toDel);
                localStorage.setItem("savedResonances", JSON.stringify(savedPoems));
                updateLedgerUI();
                const matchingBtn = document.querySelector(`.resonate-btn[data-poem-id="${toDel}"]`);
                if(matchingBtn) matchingBtn.classList.remove("active-fav");
                showToast("Removed from ledger.");
            }
        });
    }
    updateLedgerUI();

    // --- 7. WHISPER WORDS ENGINE ---
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("whisper-word")) {
            const secret = e.target.getAttribute("data-whisper");
            e.target.classList.add("whispered");
            showToast(`[Echo]: ${secret}`);
        }
    });

    // --- 8. TOUCH RIPPLE EFFECT ---
    document.addEventListener("click", (e) => {
        if (e.target.closest("#intro-screen") && !introScreen.classList.contains("fade-out")) {
            if (e.target !== enterBtn && e.target !== secretInput) return;
        }
        const ripple = document.createElement("div");
        ripple.className = "touch-ripple";
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        document.body.appendChild(ripple);
        ripple.addEventListener("animationend", () => ripple.remove());
    });

    // --- 9. THEME TRANSITION CONTROLLER ---
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const nextTheme = currentTheme === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", nextTheme);
        themeToggle.innerText = nextTheme === "light" ? "☀️" : "🌙";
        showToast(`Chamber shifting to ${nextTheme} configuration.`);
    });

    // --- 10. SCROLL PROGRESS TRACKER ---
    window.addEventListener("scroll", () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        document.getElementById("reading-progress").style.width = scrolled + "%";
    });

    // --- 11. BOOKMARK DRAWER TOGGLES ---
    const drawer = document.getElementById("bookmark-drawer");
    document.getElementById("open-drawer-btn").addEventListener("click", () => drawer.classList.add("open"));
    document.getElementById("close-drawer-btn").addEventListener("click", () => drawer.classList.remove("open"));

    // --- 12. PERFORMANCE OPTIMIZED RAIN CANVAS CANVAS ---
    function startRainEffect() {
        const canvas = document.getElementById("rain-canvas");
        canvas.classList.add("raining");
        const ctx = canvas.getContext("2d");
        
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener("resize", resize);
        resize();

        const drops = [];
        for (let i = 0; i < 45; i++) { // Optimized drop limit for low end devices
            drops.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, len: Math.random() * 15 + 10, speed: Math.random() * 4 + 4 });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "rgba(191, 164, 111, 0.13)";
            ctx.lineWidth = 1;
            ctx.lineCap = "round";

            drops.forEach(d => {
                ctx.beginPath();
                ctx.moveTo(d.x, d.y);
                ctx.lineTo(d.x, d.y + d.len);
                ctx.stroke();

                d.y += d.speed;
                if (d.y > canvas.height) {
                    d.y = -d.len;
                    d.x = Math.random() * canvas.width;
                }
            });
            requestAnimationFrame(draw);
        }
        draw();
    }
});
