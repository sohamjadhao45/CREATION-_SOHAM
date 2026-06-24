/* ==========================================================================
   THE MIDNIGHT LIBRARY - CENTRAL OPERATING ENGINE (REPAIR VERSION)
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
        // Enforce clean layout state on first load
        document.body.classList.add('on-entrance');

        // Render initially saved items into panels
        updateFavouritesUI();
        updateArchivesUI();
        initReadingProgress();
        initTouchRipple();
        setupDynamicScrolls();
        generateNavLinks(); // Create nav links if not present dynamically

        // ---- GUARANTEED ENTER GATES TRIGGER ----
        const enterLibraryBtn = document.getElementById('enter-library-btn');
        if (enterLibraryBtn) {
            enterLibraryBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Unlock layout wrappers
                document.body.classList.remove('on-entrance');
                
                // Smooth fade out of entry shield
                const introScreen = document.getElementById('intro-screen');
                if (introScreen) {
                    introScreen.classList.add('fade-out');
                    setTimeout(() => {
                        introScreen.style.display = 'none';
                    }, 1200);
                }
                
                // Force load the first layout page
                switchPage('page1');
                
                if (typeof window.showToast === "function") {
                    window.showToast("✨ Welcome to the Sanctuary.");
                }
            });
        }
    });

    // Smooth Web-Wheel to Horizontal Translation for Navigation Strip
    function setupDynamicScrolls() {
        const navStrip = document.querySelector('.library-nav');
        if (navStrip) {
            navStrip.addEventListener('wheel', (evt) => {
                evt.preventDefault();
                navStrip.scrollLeft += evt.deltaY;
            }, { passive: true });
        }
    }

    // Dynamic Navigation Pill Builder to align with HTML sections
    function generateNavLinks() {
        const nav = document.getElementById('library-nav');
        if (!nav) return;
        const pages = [
            { id: 'page1', label: '🏛️ Home' },
            { id: 'page-fragments', label: '🕯️ Notes Room' },
            { id: 'page-archive', label: '📜 Ancient Shelf' },
            { id: 'page-about', label: '🖋️ Author\'s Chamber' },
            { id: 'page-secret', label: '👁️ Vault' }
        ];
        nav.innerHTML = pages.map(p => `
            <button class="nav-link ${p.id === 'page1' ? 'active-nav' : ''}" onclick="switchPage('${p.id}')">${p.label}</button>
        `).join('');
    }

    // ---- 3. PAGE NAVIGATION & VORTEX TRANSITION SYSTEM ----
    window.switchPage = function(targetPageId) {
        const activePage = document.querySelector('.page.active');
        const targetPage = document.getElementById(targetPageId);
        
        if (!targetPage || activePage === targetPage) return;

        // Stop voice engine automatically when changing active verses
        if (window.speechSynthesis && window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            const listenBtn = document.getElementById('listen-btn') || document.querySelector('.listen-btn');
            if (listenBtn) listenBtn.innerHTML = "🎙️ LISTEN TO THE VERSE";
        }

        if (activePage) {
            activePage.classList.add('vortex-out');
            setTimeout(() => {
                activePage.classList.remove('active', 'vortex-out');
                executePageIn(targetPage);
            }, 400); 
        } else {
            executePageIn(targetPage);
        }
    };

    function executePageIn(targetPage) {
        targetPage.classList.add('vortex-in', 'active');
        targetPage.offsetHeight; // Force Layout Repaint
        targetPage.classList.remove('vortex-in');
        
        // Sync nav links
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

            const targets = activePage.querySelectorAll('.royal-poem-text, .poem-playfair, p:not(.footer-sub)');
            let proseCollection = "";
            targets.forEach(el => { proseCollection += el.innerText + " "; });

            if (!proseCollection.trim()) return;

            currentSpeech = new SpeechSynthesisUtterance(proseCollection.trim());
            const systemVoices = window.speechSynthesis.getVoices();
            const preferredVoice = systemVoices.find(v => v.lang.includes('en-GB') || v.lang.includes('en-US'));
            if (preferredVoice) currentSpeech.voice = preferredVoice;
            
            currentSpeech.rate = 0.85;
            currentSpeech.onstart = () => { listenBtn.innerHTML = "🛑 STOP LISTENING"; };
            currentSpeech.onend = () => { listenBtn.innerHTML = "🎙️ LISTEN TO THE VERSE"; };
            currentSpeech.onerror = () => { listenBtn.innerHTML = "🎙️ LISTEN TO THE VERSE"; };

            window.speechSynthesis.speak(currentSpeech);
        });
    }

    // ---- 5. REPOSITORY ENGINE ----
    function getActiveVerseMetadata() {
        const activePage = document.querySelector('.page.active');
        if (!activePage) return null;
        return { 
            id: activePage.id || "unspecified-fragment", 
            title: activePage.querySelector('.page1-heading')?.innerText.trim() || "An Untold Verse" 
        };
    }

    function updateFavouritesUI() {
        const favDrawer = document.querySelector('#favourites-list');
        if (!favDrawer) return;
        favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        if (favourites.length === 0) {
            favDrawer.innerHTML = `<div class="bookmark-item" style="opacity:0.5; cursor:default;">No Favourites Whispered Yet.</div>`;
            return;
        }
        favDrawer.innerHTML = favourites.map(item => `
            <div class="bookmark-item" onclick="switchPage('${item.id}'); closeAllDrawers();">❤️ ${item.title}</div>
        `).join('');
    }

    function updateArchivesUI() {
        const archiveDrawer = document.querySelector('#bookmarks-list');
        if (!archiveDrawer) return;
        archives = JSON.parse(localStorage.getItem('archives')) || [];
        if (archives.length === 0) {
            archiveDrawer.innerHTML = `<div class="bookmark-item" style="opacity:0.5; cursor:default;">No Archives Collected Yet.</div>`;
            return;
        }
        archiveDrawer.innerHTML = archives.map(item => `
            <div class="bookmark-item" onclick="switchPage('${item.id}'); closeAllDrawers();">📜 ${item.title}</div>
        `).join('');
    }

    // ---- 6. DRAWER INTERFACE MANAGEMENT ----
    window.toggleDrawer = function(drawerId) {
        const targetDrawer = document.getElementById(drawerId);
        if (!targetDrawer) return;
        const isOpen = targetDrawer.classList.contains('open');
        window.closeAllDrawers();
        if (!isOpen) {
            targetDrawer.classList.add('open');
            updateFavouritesUI();
            updateArchivesUI();
        }
    };

    window.closeAllDrawers = function() {
        document.querySelectorAll('.drawer').forEach(d => d.classList.remove('open'));
    };

    // Attach native button clicks for explicit drawers setup via HTML
    document.getElementById('open-fav-btn')?.addEventListener('click', () => window.toggleDrawer('favourites-drawer'));
    document.getElementById('open-bookmarks-btn')?.addEventListener('click', () => window.toggleDrawer('bookmarks-drawer'));
    document.getElementById('close-drawer')?.addEventListener('click', window.closeAllDrawers);
    document.getElementById('close-fav-drawer')?.addEventListener('click', window.closeAllDrawers);

    // ---- 7. TIMELINE & AMBIENT EFFECTS ----
    function initReadingProgress() {
        window.addEventListener('scroll', () => {
            if (document.body.classList.contains('on-entrance')) return;
            const bar = document.getElementById('reading-progress');
            if (!bar) return;
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            bar.style.width = height > 0 ? `${(winScroll / height) * 100}%` : "0%";
        }, { passive: true });
    }

    // Toggle Rain System Wireup to HTML header
    document.getElementById('rain-toggle')?.addEventListener('click', function() {
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
            window.showToast("🌧️ Atmospheric rain activated.");
        } else {
            clearInterval(rainInterval);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    });

    function initTouchRipple() {
        window.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'touch-ripple';
            ripple.style.left = `${e.clientX}px`;
            ripple.style.top = `${e.clientY}px`;
            document.body.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        }, { passive: true });
    }

    window.showToast = function(msg) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const t = document.createElement('div');
        t.className = 'toast';
        t.innerText = msg;
        container.appendChild(t);
        setTimeout(() => t.remove(), 3400);
    };

    // Live Date Synchronizer for header
    const dateDisplay = document.getElementById('journal-date');
    if (dateDisplay) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.innerText = `Journal Entry: ${new Date().toLocaleDateString('en-US', options)}`;
    }
})();
