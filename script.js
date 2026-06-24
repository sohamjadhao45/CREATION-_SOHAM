/* ==========================================================================
   THE MIDNIGHT LIBRARY - CENTRAL OPERATING ENGINE (COMPLETE UNABRIDGED BUILD)
   ========================================================================== */

(function() {
    // ---- 1. COMPLETE POEMS & CHAPTERS RAW DATA ARCHIVE ----
    const POEMS_DATABASE = {
        "page1": {
            title: "CREATION",
            subtitle: "The Genesis",
            date: "June 2026",
            text: "Time moves softly, like a river carrying memories downstream.\n\nAlong its banks, Soham leaves behind his self-composed verses—each poem a footprint of a feeling, each stanza a witness to a fleeting moment.\n\nThis space shall grow with time itself, gathering words the way the night gathers stars. Every click uncovers an emotion, every chapter unfolds a piece of life left unsaid."
        },
        "chapter-1": {
            title: "ANCHOR",
            subtitle: "A Tribute To My Father",
            date: "June 2026",
            text: "You're my truth, my life,\nThe steady ground beneath my stride.\nIn every storm, you are the guide,\nAn anchor standing by my side.\n\nThrough winters cold and summers bright,\nYou held my hand and gave me light.\nNo words can paint the debt I owe,\nYou are the strongest force I know.\n\nWhen shadows fall and doubts creep in,\nYour silent faith helps me to win.\nMore than a guide, more than a friend,\nYour love is an anchor till the end."
        },
        "chapter-2": {
            title: "SPORTSMAN SPIRIT",
            subtitle: "The Spirit of Excellence",
            date: "June 2026",
            text: "Ignite your fire.\nLearn from every downfall,\nDon't fear the pavilion's call.\nNever get upset,\nFace every yorker,\nBuild your own present.\n\nThe stadium roars, the lights shine bright,\nBut real champions thrive in the night.\nIt's not about the medals you hold,\nIt's the spirit within, fierce and bold.\n\nSo run the extra mile today,\nLet dedication clear the way.\nWin or lose, you stand up tall,\nFor the sportsman spirit conquers all."
        },
        "page-fragments": {
            title: "SILENT FRAGMENTS",
            subtitle: "Notes From The Shadows",
            date: "Midnight Chronicles",
            text: "These are random ink spills from nights when sleep refused to visit.\n\nLoose thoughts scribbled on napkin edges and digital margins. Read them like scattered autumn leaves—each unique, dry, but full of the tree's lifetime memories."
        }
    };

    const MIDNIGHT_THOUGHTS = [
        "Some stars burn so bright that their light reaches us long after they are dead. People are like that too.",
        "The universe doesn't speak in words; it speaks in silence, timing, and sudden realizations.",
        "We spend our whole lives building walls, only to look for someone crazy enough to climb them.",
        "Perhaps the moon is lonely too, which is why it pulls the entire ocean just to feel close to something.",
        "Ink lasts longer than the hand that writes it, and whispers stay longer than the voice that spoke them."
    ];

    // ---- 2. GLOBAL ENGINE VARIABLES ----
    let currentSpeech = null;
    let rainInterval = null;
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    let archives = JSON.parse(localStorage.getItem('archives')) || [];

    // ---- 3. CORE APPLICATION INITIALIZATION ----
    document.addEventListener("DOMContentLoaded", () => {
        // Enforce entry overlay lock state on load
        document.body.classList.add('on-entrance');

        // Render panels and states smoothly
        updateFavouritesUI();
        updateArchivesUI();
        initReadingProgress();
        initTouchRipple();
        buildNavigationMenu();
        initWaxSealEngine();

        // ---- "OPEN THE GATES" GATES CLICK EVENT ----
        const enterLibraryBtn = document.getElementById('enter-library-btn') || document.querySelector('.btn-solid');
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
                
                // Load default screen view cleanly
                window.switchPage('page1');
                
                if (typeof window.showToast === "function") {
                    window.showToast("✨ Welcome to the Sanctuary.");
                }
            });
        }

        // Setup Midnight Thought Generator Control
        const thoughtBtn = document.getElementById('reveal-thought-btn');
        if (thoughtBtn) {
            thoughtBtn.addEventListener('click', () => {
                const randomThought = MIDNIGHT_THOUGHTS[Math.floor(Math.random() * MIDNIGHT_THOUGHTS.length)];
                const display = document.getElementById('midnight-thought-display');
                if (display) {
                    display.style.opacity = '0';
                    setTimeout(() => {
                        display.innerText = `"${randomThought}"`;
                        display.style.opacity = '0.8';
                    }, 300);
                }
            });
        }

        // Setup Event Listeners for Ambient Systems
        setupAmbientListeners();
    });

    // Dynamic Navigation Renderer
    function buildNavigationMenu() {
        const nav = document.getElementById('library-nav');
        if (!nav) return;

        const navigationPages = [
            { id: 'page1', label: '🏛️ Home' },
            { id: 'chapter-1', label: '⚓ Chapter I' },
            { id: 'chapter-2', label: '⚡ Chapter II' },
            { id: 'page-fragments', label: '🕯️ Notes Room' }
        ];
        
        nav.innerHTML = navigationPages.map(p => `
            <button class="nav-link ${p.id === 'page1' ? 'active-nav' : ''}" onclick="window.switchPage('${p.id}')">${p.label}</button>
        `).join('');
    }

    // ---- 4. PAGE SWITCHING & TRANSITION LOGIC ----
    window.switchPage = function(targetPageId) {
        const activePage = document.querySelector('.page.active');
        
        // Dynamic Injection into Core Royal Text Block on the fly
        if (POEMS_DATABASE[targetPageId]) {
            const data = POEMS_DATABASE[targetPageId];
            const mainHeading = document.querySelector('.page1-heading') || document.querySelector('h1');
            const mainTagline = document.getElementById('tagline') || document.querySelector('.intro-highlight');
            const mainPoemBox = document.querySelector('.royal-poem-text');
            const dateBox = document.querySelector('.poem-date');

            // Reset TTS Voice engine on room change
            if (window.speechSynthesis && window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                const listenBtn = document.getElementById('listen-btn');
                if (listenBtn) listenBtn.innerHTML = "🎙️ LISTEN TO THE VERSE";
            }

            if (mainHeading) mainHeading.innerText = data.title;
            if (mainTagline) mainTagline.innerText = data.subtitle || "";
            if (mainPoemBox) mainPoemBox.innerHTML = data.text.replace(/\n/g, '<br>');
            if (dateBox && data.date) dateBox.innerText = data.date;
            
            // Sync navigation active pills layout
            document.querySelectorAll('.nav-link').forEach(link => {
                if(link.getAttribute('onclick')?.includes(targetPageId)) {
                    link.classList.add('active-nav');
                } else {
                    link.classList.remove('active-nav');
                }
            });
            return;
        }

        const targetPage = document.getElementById(targetPageId);
        if (!targetPage || activePage === targetPage) return;

        if (activePage) {
            activePage.classList.add('vortex-out');
            setTimeout(() => {
                activePage.classList.remove('active', 'vortex-out');
                targetPage.classList.add('vortex-in', 'active');
                targetPage.offsetHeight; 
                targetPage.classList.remove('vortex-in');
            }, 400); 
        } else {
            targetPage.classList.add('active');
        }
    };

    // ---- 5. SIDEBAR MANAGEMENT & STORAGE SYSTEM ----
    function updateFavouritesUI() {
        const favDrawer = document.querySelector('#favourites-list') || document.getElementById('favourites-drawer');
        if (!favDrawer) return;
        if (favourites.length === 0) {
            favDrawer.innerHTML = `<div class="bookmark-item" style="opacity:0.5; border:none;">No Favourites Whispered Yet.</div>`;
            return;
        }
        favDrawer.innerHTML = favourites.map(item => `
            <div class="bookmark-item" onclick="window.switchPage('${item.id}'); window.closeAllDrawers();">❤️ ${item.title}</div>
        `).join('');
    }

    function updateArchivesUI() {
        const archiveDrawer = document.querySelector('#bookmarks-list') || document.getElementById('bookmarks-drawer');
        if (!archiveDrawer) return;
        if (archives.length === 0) {
            archiveDrawer.innerHTML = `<div class="bookmark-item" style="opacity:0.5; border:none;">No Archives Collected Yet.</div>`;
            return;
        }
        archiveDrawer.innerHTML = archives.map(item => `
            <div class="bookmark-item" onclick="window.switchPage('${item.id}'); window.closeAllDrawers();">📜 ${item.title}</div>
        `).join('');
    }

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

    // ---- 6. AUDIO HANDLERS & ENVIRONMENT UTILITIES ----
    function setupAmbientListeners() {
        // Voice TTS Engine Trigger Setup
        const listenBtn = document.getElementById('listen-btn') || document.querySelector('.listen-btn');
        if (listenBtn) {
            listenBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (window.speechSynthesis.speaking) {
                    window.speechSynthesis.cancel();
                    this.innerHTML = "🎙️ LISTEN TO THE VERSE";
                    return;
                }
                const mainPoemBox = document.querySelector('.royal-poem-text');
                if (!mainPoemBox) return;

                currentSpeech = new SpeechSynthesisUtterance(mainPoemBox.innerText);
                currentSpeech.rate = 0.88;
                currentSpeech.onstart = () => { listenBtn.innerHTML = "🛑 STOP LISTENING"; };
                currentSpeech.onend = () => { listenBtn.innerHTML = "🎙️ LISTEN TO THE VERSE"; };
                window.speechSynthesis.speak(currentSpeech);
            });
        }

        // Toggle Rain Controller Setup
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

        // Sidebar Header Actions Trigger Wiring
        document.getElementById('open-fav-btn')?.addEventListener('click', () => window.toggleDrawer('favourites-drawer'));
        document.getElementById('open-bookmarks-btn')?.addEventListener('click', () => window.toggleDrawer('bookmarks-drawer'));
        document.querySelectorAll('.drawer-header button, #close-drawer, #close-fav-drawer').forEach(btn => {
            btn.addEventListener('click', window.closeAllDrawers);
        });
    }

    // ---- 7. WAX SEAL SECURE CRYPTO UNLOCKER ----
    function initWaxSealEngine() {
        const waxWrapper = document.querySelector('.wax-seal-wrapper');
        const waxSeal = document.querySelector('.wax-seal');
        if (waxSeal && waxWrapper) {
            waxSeal.addEventListener('click', function(e) {
                e.preventDefault();
                waxWrapper.classList.add('broken');
                window.showToast("👁️ Vault Seal Broken. Forbidden contents exposed.");
            });
        }
    }

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
})();
