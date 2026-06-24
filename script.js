/* ==========================================================================
   THE MIDNIGHT LIBRARY - CENTRAL OPERATING ENGINE (ULTIMATE REPAIR BUILD)
   ========================================================================== */

(function() {
    // ---- 1. CORE POEMS & FRAGMENTS DATA ARCHIVE ----
    const POEMS_DATABASE = {
        "page1": {
            title: "CREATION",
            subtitle: "The Genesis",
            date: "June 2026",
            text: "Time moves softly, like a river carrying memories downstream.\n\nAlong its banks, Soham leaves behind his self-composed verses—each poem a footprint of a feeling, each stanza a witness to a fleeting moment.\n\nThis space shall grow with time itself, gathering words the way the night gathers stars."
        },
        "chapter-1": {
            id: "chapter-1",
            title: "Whispers of Wind",
            subtitle: "Chapter I — Silent Echoes",
            date: "Autumn 2025",
            text: "The leaves change color, whispering secrets to the cold wind.\nWe walk down paths built from choices we never meant to make.\nEvery shadow holds a memory, every breeze a forgotten name.\nIn the rustle of the night, we find what remains unsaid."
        },
        "chapter-2": {
            id: "chapter-2",
            title: "Echoes of the Night",
            subtitle: "Chapter II — Lunar Shadows",
            date: "Midnight 2025",
            text: "The moon sits high, a silver watchman over our deepest fears.\nWe try to write down words that only the darkness understands.\nStars burn out, leaving trails of dust across an empty canvas.\nYet, in this absolute silence, the soul speaks loudest."
        },
        "chapter-3": {
            id: "chapter-3",
            title: "Stardust & Shadows",
            subtitle: "Chapter III — Cosmic Dreams",
            date: "Winter 2025",
            text: "We are all made of old stardust, looking for a way back home.\nTrapped inside moments that fade before we can even blink.\nHolding onto pieces of dreams that dissolve into the morning air.\nBut shadows protect the light, and dust still learns to shine."
        }
    };

    const MIDNIGHT_THOUGHTS = [
        "Some stars burn so bright that their light reaches us long after they are dead. People are like that too.",
        "The universe doesn't speak in words; it speaks in silence, timing, and sudden realizations.",
        "We spend our whole lives building walls, only to look for someone crazy enough to climb them.",
        "Perhaps the moon is lonely too, which is why it pulls the entire ocean just to feel close to something."
    ];

    // ---- 2. CORE STATES & GLOBAL ENGINE VARIABLES ----
    let currentSpeech = null;
    let rainInterval = null;
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    let archives = JSON.parse(localStorage.getItem('archives')) || [];

    // ---- 3. APPLICATION INITIALIZATION & ENTRANCE CONTROL ----
    document.addEventListener("DOMContentLoaded", () => {
        // Enforce clean layout state on first load
        document.body.classList.add('on-entrance');

        // Render initially saved items into panels
        updateFavouritesUI();
        updateArchivesUI();
        initReadingProgress();
        initTouchRipple();
        setupDynamicScrolls();
        buildBookshelf(); // Dynamically draw the books with data!

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

        // Setup Midnight Thought Generator
        const thoughtBtn = document.getElementById('reveal-thought-btn');
        if (thoughtBtn) {
            thoughtBtn.addEventListener('click', () => {
                const randomThought = MIDNIGHT_THOUGHTS[Math.floor(Math.random() * MIDNIGHT_THOUGHTS.length)];
                const display = document.getElementById('midnight-thought-display');
                if (display) {
                    display.style.opacity = 0;
                    setTimeout(() => {
                        display.innerText = `"${randomThought}"`;
                        display.style.opacity = 0.8;
                    }, 200);
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

    // Dynamic Bookshelf Builder from DB Data
    function buildBookshelf() {
        const shelf = document.getElementById('dynamic-bookshelf');
        const nav = document.getElementById('library-nav');
        if (!shelf || !nav) return;

        // Reset elements
        shelf.innerHTML = '';
        
        // Static Nav Menu Setup
        const navigationPages = [
            { id: 'page1', label: '🏛️ Home' },
            { id: 'page-fragments', label: '🕯️ Notes Room' },
            { id: 'page-archive', label: '📜 Ancient Shelf' },
            { id: 'page-about', label: '🖋️ Author\'s Chamber' },
            { id: 'page-secret', label: '👁️ Vault' }
        ];
        
        nav.innerHTML = navigationPages.map(p => `
            <button class="nav-link ${p.id === 'page1' ? 'active-nav' : ''}" onclick="switchPage('${p.id}')">${p.label}</button>
        `).join('');

        // Generate Interactive Books on the Shelf
        Object.keys(POEMS_DATABASE).forEach((key, index) => {
            if (key === 'page1') return; // Skip home page text on shelf
            const poem = POEMS_DATABASE[key];
            
            const book = document.createElement('div');
            book.className = `book-spine ${index % 2 === 0 ? 'spine-gold' : ''}`;
            book.setAttribute('title', `Read: ${poem.title}`);
            book.innerHTML = `<span class="spine-text">${poem.title}</span>`;
            
            book.addEventListener('click', () => {
                // Instantly inject clicked poem into our layout content boxes dynamically
                injectPoemToDisplay(poem);
                window.showToast(`📖 Opened: ${poem.title}`);
            });
            
            shelf.appendChild(book);
        });
    }

    function injectPoemToDisplay(poem) {
        // Find main page text spots to cleanly place clicked book text
        const mainPoemBox = document.querySelector('#page1 .royal-poem-text');
        const mainHeading = document.querySelector('#page1 .page1-heading');
        const mainTagline = document.getElementById('tagline');
        
        if (mainPoemBox && mainHeading) {
            mainHeading.innerText = poem.title.toUpperCase();
            if (mainTagline) mainTagline.innerText = `"${poem.subtitle}"`;
            mainPoemBox.innerHTML = poem.text.replace(/\n/g, '<br>');
            
            // Switch view elegantly back to default viewer panel
            switchPage('page1');
        }
    }

    // ---- 4. PAGE NAVIGATION & VORTEX TRANSITION SYSTEM ----
    window.switchPage = function(targetPageId) {
        const activePage = document.querySelector('.page.active');
        const targetPage = document.getElementById(targetPageId);
        
        if (!targetPage || activePage === targetPage) return;

        // Stop voice engine automatically when changing active rooms
        if (window.speechSynthesis && window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
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
        targetPage.offsetHeight; // Force Repaint
        targetPage.classList.remove('vortex-in');
        
        // Sync bottom active nav bar tabs
        document.querySelectorAll('.nav-link').forEach(link => {
            if(link.getAttribute('onclick')?.includes(targetPage.id)) {
                link.classList.add('active-nav');
            } else {
                link.classList.remove('active-nav');
            }
        });
    }

    // ---- 5. SIDEBAR DRAWERS MANAGEMENT & STORAGE SYSTEM ----
    function getActiveVerseMetadata() {
        const activePage = document.querySelector('.page.active');
        if (!activePage) return null;
        
        const headingElement = activePage.querySelector('.page1-heading') || activePage.querySelector('h2');
        return { 
            id: activePage.id || "unspecified-fragment", 
            title: headingElement ? headingElement.innerText.trim() : "An Untold Verse" 
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

    // Core Sidebar Event Wireups
    document.getElementById('open-fav-btn')?.addEventListener('click', () => window.toggleDrawer('favourites-drawer'));
    document.getElementById('open-bookmarks-btn')?.addEventListener('click', () => window.toggleDrawer('bookmarks-drawer'));
    document.getElementById('close-drawer')?.addEventListener('click', window.closeAllDrawers);
    document.getElementById('close-fav-drawer')?.addEventListener('click', window.closeAllDrawers);

    // ---- 6. IMMERSIVE ENVIRONMENT UTILITIES (RAIN, PROGRESS BAR, RIPPLES) ----
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

    // Toggle Rain Controller
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

    // Live Clock Sync
    const dateDisplay = document.getElementById('journal-date');
    if (dateDisplay) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.innerText = `Journal Entry: ${new Date().toLocaleDateString('en-US', options)}`;
    }
})();
