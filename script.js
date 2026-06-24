/* ==========================================================================
   THE MIDNIGHT LIBRARY - ULTIMATE CORE ENGINE
   (Restores All Effects: Rain, Audio, Seals, Moon 3-Click, Navigation)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // ---- 1. WELCOME SCREEN & ENTRANCE LOCK ----
    document.body.classList.add('on-entrance');
    const enterBtn = document.getElementById('enter-library-btn') || document.querySelector('.btn-solid');
    if(enterBtn) {
        enterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.remove('on-entrance');
            const intro = document.getElementById('intro-screen');
            if(intro) {
                intro.classList.add('fade-out');
                setTimeout(() => intro.style.display = 'none', 1200);
            }
            if (typeof window.showToast === "function") window.showToast("✨ Welcome to the Sanctuary.");
        });
    }

    // ---- 2. SAFE PAGE NAVIGATION (Will NOT overwrite your HTML Text) ----
    window.switchPage = function(targetPageId) {
        // Stop Voice Engine on page change
        if (window.speechSynthesis && window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            document.querySelectorAll('.listen-btn').forEach(btn => btn.innerHTML = "🎙️ LISTEN TO THE VERSE");
        }

        // Handle vortex animations for active pages
        const activePage = document.querySelector('.page.active, .screen.active');
        const targetPage = document.getElementById(targetPageId);
        
        if (!targetPage || activePage === targetPage) return;

        if (activePage) {
            activePage.classList.add('vortex-out');
            setTimeout(() => {
                activePage.classList.remove('active', 'vortex-out');
                executePageIn(targetPage);
            }, 400); 
        } else {
            executePageIn(targetPage);
        }

        // Sync Bottom Navigation Tabs
        document.querySelectorAll('.nav-link').forEach(link => {
            if(link.getAttribute('onclick')?.includes(targetPageId)) {
                link.classList.add('active-nav');
            } else {
                link.classList.remove('active-nav');
            }
        });
    };

    function executePageIn(targetPage) {
        targetPage.classList.add('vortex-in', 'active');
        targetPage.offsetHeight; // Force DOM repaint
        targetPage.classList.remove('vortex-in');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ---- 3. WAX SEAL BREAK ENGINE ----
    const waxSeals = document.querySelectorAll('.wax-seal, .sj-seal');
    waxSeals.forEach(seal => {
        seal.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const wrapper = this.closest('.wax-seal-wrapper');
            if(wrapper) {
                wrapper.classList.add('broken');
            } else {
                this.classList.add('broken');
                setTimeout(() => this.style.display = 'none', 800);
            }
            if (typeof window.showToast === "function") window.showToast("👁️ Vault Seal Broken. Forbidden contents exposed.");
        });
    });

    // ---- 4. MYSTERY VAULT (3-CLICK MOON LOGIC) ----
    let moonClicks = 0;
    let clickTimer = null;
    const moonElement = document.querySelector('.interactive-moon, .moon-visual, .waxing-gibbous');
    
    if (moonElement) {
        moonElement.style.cursor = "pointer";
        moonElement.addEventListener('click', () => {
            moonClicks++;
            
            if (moonClicks === 2) {
                if (typeof window.showToast === "function") window.showToast("The moon shifts its gaze...");
            }
            
            if (moonClicks === 3) {
                if (typeof window.showToast === "function") window.showToast("👁️ Mystery Vault Unlocked");
                
                // Switch to Vault ID (Make sure 'page-secret' matches your HTML ID for the vault)
                window.switchPage('page-secret'); 
                moonClicks = 0;
            }

            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => { moonClicks = 0; }, 3000);
        });
    }

    // ---- 5. INTERNAL BUTTON ROUTING (Explore & Author) ----
    document.querySelectorAll('button').forEach(btn => {
        const text = btn.innerText.toUpperCase();
        if (text.includes('EXPLORE CHAPTERS')) {
            btn.addEventListener('click', () => window.switchPage('page-archive')); // Ancient Shelf ID
        }
        if (text.includes("AUTHOR'S CHAMBER")) {
            btn.addEventListener('click', () => window.switchPage('page-about')); // Author Chamber ID
        }
    });

    // ---- 6. AUDIO TTS & ATMOSPHERIC RAIN ENGINE ----
    let currentSpeech = null;
    let rainInterval = null;

    // Listen Button
    document.querySelectorAll('.listen-btn, #listen-btn').forEach(listenBtn => {
        listenBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                this.innerHTML = "🎙️ LISTEN TO THE VERSE";
                return;
            }
            
            // Read text from the currently active page
            const activePage = document.querySelector('.page.active');
            const textToRead = activePage ? activePage.innerText : document.body.innerText;
            
            currentSpeech = new SpeechSynthesisUtterance(textToRead);
            currentSpeech.rate = 0.88;
            currentSpeech.onstart = () => { this.innerHTML = "🛑 STOP LISTENING"; };
            currentSpeech.onend = () => { this.innerHTML = "🎙️ LISTEN TO THE VERSE"; };
            window.speechSynthesis.speak(currentSpeech);
        });
    });

    // Rain Toggle
    const rainToggle = document.getElementById('rain-toggle');
    if (rainToggle) {
        rainToggle.addEventListener('click', function() {
            const canvas = document.getElementById('rain-canvas');
            if (!canvas) return;
            canvas.classList.toggle('raining');
            const ctx = canvas.getContext('2d');
            
            if (canvas.classList.contains('raining')) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                let drops = Array(Math.floor(window.innerWidth / 8)).fill(0);
                rainInterval = setInterval(() => {
                    ctx.fillStyle = 'rgba(5, 5, 7, 0.15)';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = 'rgba(191, 164, 111, 0.2)';
                    ctx.font = '10px monospace';
                    drops.forEach((y, x) => {
                        ctx.fillText('|', x * 8, y);
                        if (y > canvas.height && Math.random() > 0.98) drops[x] = 0;
                        else drops[x] = y + 12;
                    });
                }, 33);
                if (typeof window.showToast === "function") window.showToast("🌧️ Atmospheric rain activated.");
            } else {
                clearInterval(rainInterval);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        });
    }

    // ---- 7. DRAWERS & LOCAL STORAGE ----
    window.toggleDrawer = function(drawerId) {
        window.closeAllDrawers();
        const drawer = document.getElementById(drawerId);
        if (drawer) drawer.classList.add('open');
    };

    window.closeAllDrawers = function() {
        document.querySelectorAll('.drawer').forEach(d => d.classList.remove('open'));
    };

    document.querySelectorAll('#close-drawer, #close-fav-drawer, .overlay-close').forEach(btn => {
        btn.addEventListener('click', window.closeAllDrawers);
    });

    // ---- 8. UTILITIES: TOASTS, RIPPLES & PROGRESS BAR ----
    window.showToast = function(msg) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const t = document.createElement('div');
        t.className = 'toast';
        t.innerText = msg;
        container.appendChild(t);
        setTimeout(() => t.remove(), 3400);
    };

    window.addEventListener('scroll', () => {
        const bar = document.getElementById('reading-progress');
        if (!bar) return;
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        bar.style.width = height > 0 ? `${(winScroll / height) * 100}%` : "0%";
    }, { passive: true });

    window.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'touch-ripple';
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        document.body.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    }, { passive: true });

});
