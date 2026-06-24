/* ==========================================================================
   THE MIDNIGHT LIBRARY - CENTRAL OPERATING ENGINE (COMPLETE UNIFIED CODE)
   ========================================================================== */

(function() {
    // ---- 1. CORE STATES & GLOBAL ENGINE VARIABLES ----
    let currentSpeech = null;
    let rainInterval = null;

    // LocalStorage Setup
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    let archives = JSON.parse(localStorage.getItem('archives')) || [];

    // ---- 2. APPLICATION INITIALIZATION & ENTRANCE CONTROL ----
    document.addEventListener("DOMContentLoaded", () => {
        // Enforce clean layout state on first load (Hides buttons/pills as requested)
        document.body.classList.add('on-entrance');

        // Render initially saved items into panels
        updateFavouritesUI();
        updateArchivesUI();
        initReadingProgress();
        initTouchRipple();
        setupDynamicScrolls();
    });

        // Handle Landing Gate Entry (Fixed & Guaranteed Transition)
    const openGatesBtn = document.getElementById('open-gates-btn') || document.querySelector('.btn-solid') || document.querySelector('button[onclick*="gates"]');
    if (openGatesBtn) {
        // Enforce pointer-events on initialization
        openGatesBtn.style.pointerEvents = "auto";
        
        openGatesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Remove the entrance lock to instantly display headers/footers/nav bars
            document.body.classList.remove('on-entrance');
            
            // Hide the intro landing screen element cleanly if it exists
            const introScreen = document.getElementById('intro-screen') || document.getElementById('landing-screen');
            if (introScreen) {
                introScreen.classList.add('fade-out');
            }
            
            // Forcefully look for the first content page to render it active
            const firstChapter = document.getElementById('page-ch1') || document.querySelector('.page');
            if (firstChapter) {
                switchPage(firstChapter.id);
            } else {
                // Fallback: If IDs are unique, find the first available page component
                const fallbackPage = document.querySelector('.page');
                if (fallbackPage) fallbackPage.classList.add('active');
            }
            
            if (typeof showToast === "function") showToast("✨ Welcome to the Sanctuary.");
        });
    }

    // Smooth Web-Wheel to Horizontal Translation for Navigation Strip (Lag-Free)
    function setupDynamicScrolls() {
        const navStrip = document.querySelector('.library-nav');
        if (navStrip) {
            navStrip.addEventListener('wheel', (evt) => {
                evt.preventDefault();
                navStrip.scrollLeft += evt.deltaY;
            }, { passive: true });
        }
    }

    // ---- 3. PAGE NAVIGATION & VORTEX TRANSITION SYSTEM ----
    window.switchPage = function(targetPageId) {
        const activePage = document.querySelector('.page.active');
        const targetPage = document.getElementById(targetPageId);
        
        if (!targetPage || activePage === targetPage) return;

        // Stop voice engine automatically when changing active verses
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            const listenBtn = document.getElementById('listen-btn') || document.querySelector('.listen-btn');
            if (listenBtn) listenBtn.innerHTML = "🎙️ LISTEN TO THE VERSE";
        }

        if (activePage) {
            activePage.classList.add('vortex-out');
            setTimeout(() => {
                activePage.classList.remove('active', 'vortex-out');
                executePageIn(targetPage);
            }, 400); // Synchronized with layout CSS rules
        } else {
            executePageIn(targetPage);
        }
    };

    function executePageIn(targetPage) {
        targetPage.classList.add('vortex-in', 'active');
        // Force browser layout repaint to register animation states
        targetPage.offsetHeight; 
        targetPage.classList.remove('vortex-in');
        
        // Sync active states on bottom pills strip
        document.querySelectorAll('.nav-link').forEach(link => {
            if(link.getAttribute('onclick')?.includes(targetPage.id)) {
                link.classList.add('active-nav');
            } else {
                link.classList.remove('active-nav');
            }
        });
    }

    // ---- 4. TEXT-TO-SPEECH AI VOICE ENGINE ----
    const listenBtn = document.getElementById('listen-btn') || document.querySelector('.listen-btn');
    if (listenBtn) {
        listenBtn.innerHTML = "🎙️ LISTEN TO THE VERSE";

        listenBtn.addEventListener('click', function(e) {
            e.preventDefault();

            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                this.innerHTML = "🎙️ LISTEN TO THE VERSE";
                return;
            }

            const activePage = document.querySelector('.page.active');
            if (!activePage) return;

            // Extract real verses blocks, discarding hidden elements or action bars
            const targets = activePage.querySelectorAll('.royal-poem-text, .poem-playfair, p:not(.footer-sub)');
            let proseCollection = "";
            targets.forEach(el => { proseCollection += el.innerText + " "; });

            if (!proseCollection.trim()) return;

            currentSpeech = new SpeechSynthesisUtterance(proseCollection.trim());
            
            // Target highly expressive cinematic accents if available in environment native browser state
            const systemVoices = window.speechSynthesis.getVoices();
            const preferredVoice = systemVoices.find(v => v.lang.includes('en-GB') || v.lang.includes('en-US'));
            if (preferredVoice) currentSpeech.voice = preferredVoice;
            
            currentSpeech.rate = 0.85; // Slow, deliberate artistic flow
            currentSpeech.pitch = 1.0;

            currentSpeech.onstart = () => { listenBtn.innerHTML = "🛑 STOP LISTENING"; };
            currentSpeech.onend = () => { listenBtn.innerHTML = "🎙️ LISTEN TO THE VERSE"; };
            currentSpeech.onerror = () => { listenBtn.innerHTML = "🎙️ LISTEN TO THE VERSE"; };

            window.speechSynthesis.speak(currentSpeech);
        });
    }

    // Ensure system voice registries reload instantly when async environment triggers
    if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {};
    }

    // ---- 5. STRICTLY ISOLATED REPOSITORY ENGINE (FAVOURITES VS ARCHIVES) ----
    function getActiveVerseMetadata() {
        const activePage = document.querySelector('.page.active');
        if (!activePage) return null;
        
        const generatedId = activePage.id || "unspecified-fragment";
        const targetTitle = activePage.querySelector('.page1-heading, h1, h2, h3, .top-deco');
        const cleanTitle = targetTitle ? targetTitle.innerText.split('\n')[0].trim() : "An Untold Verse";
        
        return { id: generatedId, title: cleanTitle };
    }

    // RESONATE ACTION (Strictly Maps to Favourites Interface Only)
    const resonateBtn = document.getElementById('resonated-btn') || document.querySelector('.resonate-btn');
    if (resonateBtn) {
        resonateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const verse = getActiveVerseMetadata();
            if (!verse) return;

            favourites = JSON.parse(localStorage.getItem('favourites')) || [];
            if (!favourites.some(entry => entry.id === verse.id)) {
                favourites.push(verse);
                localStorage.setItem('favourites', JSON.stringify(favourites));
                
                if (typeof showToast === "function") showToast("❤️ Added to Favourites!");
                else alert("❤️ Added to your Favourites!");
            } else {
                alert("❤️ Already in your Favourites.");
            }
            updateFavouritesUI();
        });
    }

    // BOOKMARK ACTION (Strictly Maps to Archives Interface Only)
    const bookmarkBtn = document.getElementById('bookmark-btn') || document.querySelector('.bookmark-btn') || document.querySelector('[data-action="bookmark"]');
    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const verse = getActiveVerseMetadata();
            if (!verse) return;

            archives = JSON.parse(localStorage.getItem('archives')) || [];
            if (!archives.some(entry => entry.id === verse.id)) {
                archives.push(verse);
                localStorage.setItem('archives', JSON.stringify(archives));
                
                alert("📜 This echo is already safely locked inside the Archives.");
            } else {
                alert("📜 This verse is already in your Archives.");
            }
            updateArchivesUI();
        });
    }

    // UI Panel Draw Rendering Functions
    function updateFavouritesUI() {
        // Targets 'My Favourites' inner panels dynamically
        const favDrawer = document.querySelector('#favourites-list') || document.querySelector('.drawer-content');
        if (!favDrawer) return;
        
        favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        if (favourites.length === 0) {
            favDrawer.innerHTML = `<div class="bookmark-item" style="opacity:0.5; cursor:default;">No Favourites Whispered Yet.</div>`;
            return;
        }
        
        favDrawer.innerHTML = favourites.map(item => `
            <div class="bookmark-item" onclick="switchPage('${item.id}'); closeAllDrawers();">
                ❤️ ${item.title}
            </div>
        `).join('');
    }

    function updateArchivesUI() {
        // Targets 'My Saved Echoes' or Archives panel explicitly
        const archiveDrawer = document.querySelector('#archives-list') || document.querySelectorAll('.drawer-content')[1];
        if (!archiveDrawer) return;
        
        archives = JSON.parse(localStorage.getItem('archives')) || [];
        if (archives.length === 0) {
            archiveDrawer.innerHTML = `<div class="bookmark-item" style="opacity:0.5; cursor:default;">No Archives Collected Yet.</div>`;
            return;
        }
        
        archiveDrawer.innerHTML = archives.map(item => `
            <div class="bookmark-item" onclick="switchPage('${item.id}'); closeAllDrawers();">
                📜 ${item.title}
            </div>
        `).join('');
    }

    // ---- 6. SIDEBAR PANELS / DRAWER CONTROLS ----
    window.toggleDrawer = function(drawerId) {
        const targetDrawer = document.getElementById(drawerId);
        if (!targetDrawer) return;
        
        const isOpen = targetDrawer.classList.contains('open');
        closeAllDrawers();
        
        if (!isOpen) {
            targetDrawer.classList.add('open');
            // Re-sync UI state when panels deploy
            updateFavouritesUI();
            updateArchivesUI();
        }
    };

    window.closeAllDrawers = function() {
        document.querySelectorAll('.drawer').forEach(d => d.classList.remove('open'));
    };

    // Close drawers with close buttons explicitly if target wrappers match HTML structures
    document.querySelectorAll('.drawer-header .btn-icon, .drawer-header span, [onclick*="close"]').forEach(btn => {
        btn.addEventListener('click', closeAllDrawers);
    });

    // ---- 7. IMMERSIVE ENVIRONMENT UTILITIES (RAIN, PROGRESS BAR, RIPPLES) ----
    
    // Top Progress Bar Logic
    function initReadingProgress() {
        window.addEventListener('scroll', () => {
            if (document.body.classList.contains('on-entrance')) return;
            const bar = document.getElementById('reading-progress');
            if (!bar) return;
            
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            bar.style.width = scrolled + "%";
        }, { passive: true });
    }

    // Interactive Ambient Rain System
    window.toggleRain = function() {
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
                ctx.fillStyle = 'rgba(191, 164, 111, 0.2)'; // Gold-tinted rain drops
                ctx.font = '10px monospace';
                
                drops.forEach((y, x) => {
                    ctx.fillText('|', x * 8, y);
                    if (y > canvas.height && Math.random() > 0.98) drops[x] = 0;
                    else drops[x] = y + 12;
                });
            }, 33);
            if (typeof showToast === "function") showToast("🌧️ Atmospheric rain activated.");
        } else {
            clearInterval(rainInterval);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    // Lightweight Click Touch Ripple Generation
    function initTouchRipple() {
        window.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'touch-ripple';
            ripple.style.left = `${e.clientX}px`;
            ripple.style.top = `${e.clientY}px`;
            document.body.appendChild(ripple);
            
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        }, { passive: true });
    }

    // Global utility fallback to toast tracking alerts
    window.showToast = function(msg) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const t = document.createElement('div');
        t.className = 'toast';
        t.innerText = msg;
        container.appendChild(t);
        setTimeout(() => t.remove(), 3400);
    };

})();
