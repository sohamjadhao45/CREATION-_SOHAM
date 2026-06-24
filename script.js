document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. INTRO SCREEN LOGIC & UNLOCK ---
    const introScreen = document.getElementById("intro-screen");
    const enterBtn = document.getElementById("enter-chamber-btn");
    const secretInput = document.getElementById("secret-word");

    function unlockChamber() {
        introScreen.classList.add("fade-out");
        showToast("Welcome to the Chamber");
        startRainEffect();
    }

    enterBtn.addEventListener("click", unlockChamber);
    secretInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") unlockChamber();
    });

    // --- 2. MULTI-PAGE NAVIGATION ENGINE ---
    const navLinks = document.querySelectorAll(".nav-link, .book-spine");
    const pages = document.querySelectorAll(".page");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            const targetId = link.getAttribute("data-target");
            if (!targetId) return;

            // Stop speech synthesis if switching pages
            window.speechSynthesis.cancel();
            document.querySelectorAll(".listen-btn").forEach(b => b.innerText = "🔊 Listen Poem");

            pages.forEach(page => {
                if (page.classList.contains("active")) {
                    page.classList.remove("active");
                }
            });

            const targetPage = document.getElementById(targetId);
            if (targetPage) {
                targetPage.classList.add("active");
                
                // Active link tracking update
                document.querySelectorAll(".nav-link").forEach(nl => {
                    nl.classList.remove("active-nav");
                    if (nl.getAttribute("data-target") === targetId) {
                        nl.classList.add("active-nav");
                    }
                });

                // Auto animate typewriter signature if inside view
                const signature = targetPage.querySelector(".sign-animate");
                if (signature) signature.classList.add("active-sign");
            }
        });
    });

    // --- 3. INTERACTIVE WAX SEAL (VAULT) ---
    const sealWrapper = document.getElementById("vault-seal-wrapper");
    const mainSeal = document.getElementById("main-wax-seal");
    const closeVaultBtn = document.getElementById("close-vault-btn");

    if (mainSeal && sealWrapper) {
        mainSeal.addEventListener("click", () => {
            sealWrapper.classList.add("broken");
            showToast("Seal Broken! Access Granted.");
        });
    }

    if (closeVaultBtn) {
        closeVaultBtn.addEventListener("click", () => {
            // Vault reset logic safely exit
            document.querySelector('.nav-link[data-target="page-home"]').click();
            setTimeout(() => {
                sealWrapper.classList.remove("broken");
            }, 600);
        });
    }

    // --- 4. 🔊 LAG-FREE AI VOICE (SPEECH ENGINE) ---
    let speechInstance = null;

    function handlePoemSpeech(button, textContainer) {
        // Agar pehle se bol raha hai toh stop karein (Toggle Play/Pause mechanic)
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            button.innerText = "🔊 Listen Poem";
            return;
        }

        // Clean text formatting extraction
        let textToSpeak = textContainer.innerText;
        // Dropcap ko ignore karke continuous speech read karne ke liye
        const dropCap = textContainer.querySelector(".drop-cap-antique");
        if (dropCap) {
            textToSpeak = textToSpeak.replace(dropCap.innerText, dropCap.innerText + " ");
        }

        speechInstance = new SpeechSynthesisUtterance(textToSpeak);
        
        // Premium sounding smooth voice filtering options
        const voices = window.speechSynthesis.getVoices();
        const premiumVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Natural") || v.lang === "en-US");
        if (premiumVoice) speechInstance.voice = premiumVoice;

        speechInstance.rate = 0.88;  // Perfectly antique poetic parsing pace
        speechInstance.pitch = 0.95; // Slightly deeper aesthetic frequency

        speechInstance.onstart = () => {
            button.innerText = "🛑 Stop Listening";
            button.classList.add("active-fav");
        };

        speechInstance.onend = () => {
            button.innerText = "🔊 Listen Poem";
            button.classList.remove("active-fav");
        };

        speechInstance.onerror = () => {
            button.innerText = "🔊 Listen Poem";
            button.classList.remove("active-fav");
        };

        window.speechSynthesis.speak(speechInstance);
    }

    // Dynamic global listener attachment pattern
    document.addEventListener("click", (e) => {
        if (e.target && e.target.classList.contains("listen-btn")) {
            const poemContainer = e.target.closest(".antique-parchment").querySelector(".royal-poem-text");
            handlePoemSpeech(e.target, poemContainer);
        }
    });

    // Ensure speech stops on sudden window close event
    window.addEventListener("beforeunload", () => window.speechSynthesis.cancel());

    // --- 5. TOUCH RIPPLE EFFECT ---
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

    // --- 6. THEME CONFIG & CONTROLS ---
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const nextTheme = currentTheme === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", nextTheme);
        themeToggle.innerText = nextTheme === "light" ? "☀️" : "🌙";
        showToast(`Chamber shifting to ${nextTheme} mode.`);
    });

    // --- 7. UTILITIES (TOAST & SCROLL PROGRESS) ---
    function showToast(msg) {
        const container = document.getElementById("toast-container");
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerText = msg;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3400);
    }

    window.addEventListener("scroll", () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        document.getElementById("reading-progress").style.width = scrolled + "%";
    });

    // --- 8. BOOKMARK DRAWER INTERACTION ---
    const drawer = document.getElementById("bookmark-drawer");
    document.getElementById("open-drawer-btn").addEventListener("click", () => drawer.classList.add("open"));
    document.getElementById("close-drawer-btn").addEventListener("click", () => drawer.classList.remove("open"));

    // --- 9. RAIN ENGINE CANVAS ---
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
        for (let i = 0; i < 60; i++) {
            drops.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, len: Math.random() * 15 + 10, speed: Math.random() * 4 + 4 });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "rgba(191, 164, 111, 0.15)";
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
