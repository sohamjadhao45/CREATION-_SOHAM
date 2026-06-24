/* =====================================================================
   THE MIDNIGHT LIBRARY ENGINE (ULTIMATE PRO EDITION)
   Linter-Safe | Interactive Click Wax Seal | 11:11 Easter Egg
   ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* ======================================================
       📜 POEM DATABASE (AUTO-BUILD)
       ====================================================== */
    const POEM_DATABASE = [
        {
            chapterLabel: "CHAPTER I", spineLabel: "ANCHOR - CH.I", title: "ANCHOR", subtitle: "A TRIBUTE TO MY FATHER", themeTag: "❤️ Family & Love", dateText: "A memory from 5 May, 2026", signature: "-- Soham Jadhao<br>Love You Pappa !!!!",
            text: `You're my truth, my life,\nmy beginning, my end.\nYou know my weaknesses and flaws,\nyet you're my buddy and my friend.\n\nThis relation is not only of blood,\nbut of emotions and linked hearts too.\nAmong all the bonds I've ever known,\nyou're a part of me, I'm a part of you.\n\nAs love has no age limit,\nthat's why my love for you stays true.\nYour morals and your way of seeing life\nhave taught me something new.\n\nWords are too few to describe you,\neven calamities fear facing you.\nYou're present in my every breath,\nand I know what you truly mean to me.`,
            whispers: [ { word: "friend", hidden: "mirror" }, { word: "blood", hidden: "soul" } ]
        },
        {
            chapterLabel: "CHAPTER II", spineLabel: "SPORTSMAN - CH.II", title: "SPORTSMAN<br>SPIRIT", subtitle: "THE SPIRIT OF EXCELLENCE", themeTag: "⚡ Motivation", dateText: "Written on 14 March 2026", signature: "— Soham Jadhao",
            text: `Ignite your fire.\nLearn from every downfall,\nBouncers will come and go,\nDon't fear the pavilion's call.\n\nNever get upset,\nFace every yorker,\nBuild your own present,\nYour ace will be your marker.\n\nSometimes a hundred,\nSometimes a duck,\nGive your best always,\nAnd leave the rest to luck.\n\nThe past is your best teacher,\nThe future, an unseen creature,\nSpread your wings in the present sky,\nEvery great score begins with a try.`,
            whispers: [ { word: "duck", hidden: "lesson" } ]
        }
    ];

    const UPCOMING_CHAPTER = { chapterNum: "III", title: "THE COSMOS WITHIN" };

    window.twMasterState = {}; 
    const globalState = { activeTheme: "dark", isAudioPlaying: false, vortexActive: false, secretClicks: 0, notesVisitCount: 0, secretPassword: "", hasTappedMoon: false, hasTypedWord: false, rainActive: false, visitorName: "Wanderer", elevenElevenTriggered: false };

    const quoteDatabase = ['"Every silence contains a poem."', '"The moon remembers what we choose to forget."', '"Ink writes the history of spirits navigating the dark."', '"A library is a hospital for the mind."', '"Words are the architecture of fleeting emotions."'];
    const moonWords = ["silence", "poetry", "creation", "memories", "love", "solitude", "eternity"];
    const midnightThoughts = ["The moon has seen every version of you.", "Not every chapter deserves a sequel.", "Some memories glow brighter after they're gone.", "The hardest part of moving forward is not looking back.", "We bury our loudest screams in the quietest poetry."];
    const notesCombos = [
        ["The hardest goodbyes are the ones that happen quietly.", "Some people become memories before they leave.", "Happiness often arrives disguised as ordinary moments."],
        ["Words are the shadows of deep hidden emotions.", "The moon remembers everything we choose to forget.", "Ink writes the history of spirits navigating the dark."],
        ["A quiet mind hears the loudest truths.", "Echoes of yesterday build the walls of tomorrow.", "Time is a silent thief, taking only what we love."],
        ["Stars do not beg for attention, they just shine.", "Oceans hide their deepest secrets beneath calm waves.", "Mountains teach patience to those who climb them."],
        ["To feel deeply is both a curse and a blessing.", "Scars are just poetry written on the human skin.", "A single teardrop holds an entire ocean of sorrow."]
    ];
    const starCoords = [{top: 50, left: 20}, {top: 20, left: 50}, {top: 60, left: 80}, {top: 80, left: 40}, {top: 30, left: 85}, {top: 75, left: 15}];

    // Audio Elements
    const audioPageTurn = document.getElementById("audio-page-turn");
    const audioRain = document.getElementById("audio-rain");
    const audioAmbient = document.getElementById("audio-ambient");

    buildLibrarySystem(); 
    initClockAndAtmosphere(); initUltimateUniverseBackground(); initCosmicNavigation(); 
    initLibraryFeatures(); initScrollProgressBar(); initSecretKeyboardVault(); initLedger();
    initDynamicShadows(); initBookmarksDrawer(); initFavouritesDrawer(); initTimeCapsule(); initPassport(); initTouchRipple(); init1111Wish();

    function initTouchRipple() {
        document.body.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'touch-ripple';
            ripple.style.left = e.clientX + 'px';
            ripple.style.top = e.clientY + 'px';
            document.body.appendChild(ripple);
            setTimeout(() => ripple.remove(), 800);
        });
    }

    function initPassport() {
        const input = document.getElementById("visitor-name");
        const enterBtn = document.getElementById("enter-library-btn");
        const savedName = localStorage.getItem("midnightVisitor");
        if(savedName && input) input.value = savedName;

        if(enterBtn) {
            enterBtn.addEventListener("click", () => {
                let name = input ? input.value.trim() : "";
                if(!name) name = "Wanderer";
                localStorage.setItem("midnightVisitor", name);
                globalState.visitorName = name;
                
                // Update Vault Greeting
                const greeting = document.getElementById("vault-greeting");
                if(greeting) greeting.innerHTML = `Ah, <span style="color:var(--gold);">${name}</span>... welcome to the Secret Vault.`;

                // Update Author Chamber Letter Title
                const letterTitle = document.getElementById("reader-letter-title");
                if(letterTitle) letterTitle.innerText = `A LETTER TO ${name.toUpperCase()}`;

                document.getElementById("intro-screen").classList.add("fade-out");
                
                // Start Ambient Audio
                if(audioAmbient && !globalState.isAudioPlaying) {
                    audioAmbient.volume = 0.2;
                    audioAmbient.play().catch(e => console.log("Audio play blocked by browser."));
                    globalState.isAudioPlaying = true;
                }
            });
        }
    }

    function buildLibrarySystem() {
        const nav = document.getElementById("library-nav"); const bookshelf = document.getElementById("dynamic-bookshelf"); const starMap = document.getElementById("star-map"); const authorScripting = document.getElementById("author-scripting-status"); const secretPage = document.getElementById("page-secret");
        if(nav) nav.innerHTML = `<button class="nav-link active-nav" data-target="page1">Library Entrance</button>`; if(bookshelf) bookshelf.innerHTML = ""; let prevPageId = "page1";

        POEM_DATABASE.forEach((poem, i) => {
            const pageId = `poem-page-${i + 1}`; const nextPageId = i < POEM_DATABASE.length - 1 ? `poem-page-${i + 2}` : `page-fragments`;
            if(nav) nav.innerHTML += `<button class="nav-link" data-target="${pageId}">${poem.chapterLabel}</button>`;
            const cleanTitle = poem.title.replace('<br>', ' '); const safeText = poem.text.replace(/\n/g, '\\n');

            const sectionHtml = `
            <section id="${pageId}" class="page" data-poem-index="${i}">
              <div class="top-deco">✧ ─ ❦ ─ ✧</div>
              <span class="chapter-badge">${poem.chapterLabel}</span>
              <div class="heading-wrapper"><h2 class="page1-heading moon-glow">${poem.title}</h2></div>
              <p class="poem-subtitle">${poem.subtitle}</p>
              <div class="meta-strip" style="margin: 15px 0;">
                <span class="mood-tag tag-motivation">${poem.themeTag}</span>
                <span class="read-time">⏱️ 1 Min Read</span>
                <button class="bookmark-btn btn-utility" data-poem="${poem.spineLabel}" style="border: none; background: transparent; padding: 0 !important; cursor: pointer; color: var(--gold);">🔖 Bookmark</button>
              </div>
              <div class="poetry-box antique-parchment dynamic-shadow" id="card-${pageId}">
                <div class="wax-seal-wrapper"><div class="wax-seal"><div class="seal-ring"></div><span class="seal-letter">SJ</span></div></div>
                <p class="royal-poem-text typewriter-poem" data-lines="${safeText}"></p><br>
                <p class="poem-date">${poem.dateText}</p>
                <span class="poem-greatvibes sign-animate">${poem.signature}</span>
                <div class="poem-interactions">
                    <button class="resonate-btn" data-poem="${cleanTitle}">⭐ Resonated With Me</button>
                    <button class="listen-btn" title="Future Feature">🎙️ Listen: SOON</button>
                </div>
              </div>
              <div class="button-row" style="margin-top: 15px;">
                <button class="btn-utility download-poem-btn" data-target="card-${pageId}" data-poem-index="${i}">📸 Save As A Memory</button>
                <button class="btn-utility share-poem-btn" data-poem-title="${cleanTitle}">🔗 Share Verse</button>
              </div>
              <div class="button-row mt-20"><button class="btn-outline trigger-nav" data-target="${prevPageId}">❮ Previous</button><button class="btn-solid trigger-nav" data-target="${nextPageId}">Next ❯</button></div>
            </section>`;
            if(secretPage) secretPage.insertAdjacentHTML('beforebegin', sectionHtml);
            if(bookshelf) bookshelf.innerHTML += `<div class="book-spine ${i % 2 !== 0 ? 'spine-gold' : ''} trigger-nav" data-target="${pageId}"><div class="spine-text">${poem.spineLabel}</div></div>`;
            prevPageId = pageId;
        });

        if(nav) nav.innerHTML += `<button class="nav-link" data-target="page-fragments">Notes Room</button><button class="nav-link" data-target="page-archive">Ancient Shelf</button><button class="nav-link" data-target="page-about">Author's Chamber</button>`;
        const btnExplore = document.getElementById("btn-explore"); if(btnExplore) btnExplore.setAttribute("data-target", "poem-page-1"); 
        const btnFragPrev = document.getElementById("btn-frag-prev"); if(btnFragPrev) btnFragPrev.setAttribute("data-target", `poem-page-${POEM_DATABASE.length}`);
        if(bookshelf) bookshelf.innerHTML += `<div class="book-spine spine-locked interactive-locked" title="Some stories are still being lived."><div class="spine-text">${UPCOMING_CHAPTER.title}</div><div class="spine-subtext" style="position: absolute; bottom: 10px; width: 100%; text-align: center; font-size: 8px; color: rgba(255,255,255,0.4);">UNAVAILABLE</div></div>`;

        let svgLines = ''; let starsHtml = '';
        for (let i = 0; i < POEM_DATABASE.length; i++) {
            let p1 = starCoords[i]; starsHtml += `<div class="star-node active-star trigger-nav" data-target="poem-page-${i+1}" title="${POEM_DATABASE[i].dateText} - ${POEM_DATABASE[i].title.replace('<br>',' ')}" style="top: ${p1.top}%; left: ${p1.left}%;"></div>`;
            if (i < POEM_DATABASE.length - 1) { let p2 = starCoords[i+1]; svgLines += `<line x1="${p1.left}%" y1="${p1.top}%" x2="${p2.left}%" y2="${p2.top}%" stroke="rgba(191,164,111,0.4)" stroke-width="1" stroke-dasharray="4" />`; }
        }
        if (POEM_DATABASE.length > 0) {
            let lastStar = starCoords[POEM_DATABASE.length - 1]; let lockedStar = starCoords[POEM_DATABASE.length];
            svgLines += `<line x1="${lastStar.left}%" y1="${lastStar.top}%" x2="${lockedStar.left}%" y2="${lockedStar.top}%" stroke="rgba(191,164,111,0.1)" stroke-width="1" stroke-dasharray="4" />`;
            starsHtml += `<div class="star-node pulse-star interactive-locked" title="Awaiting Completion..." style="top: ${lockedStar.top}%; left: ${lockedStar.left}%;"></div>`;
        }
        if(starMap) starMap.innerHTML = `<svg width="100%" height="100%" style="position: absolute; top:0; left:0; z-index: 1;">${svgLines}</svg>${starsHtml}`;
        if(authorScripting) authorScripting.innerHTML = `<span class="pulse-dot"></span><strong>Currently Scripting:</strong> Chapter ${UPCOMING_CHAPTER.chapterNum}: ${UPCOMING_CHAPTER.title}`;
    }

    const thoughtBtn = document.getElementById("reveal-thought-btn");
    const thoughtDisplay = document.getElementById("midnight-thought-display");
    if(thoughtBtn && thoughtDisplay) {
        thoughtBtn.addEventListener("click", () => {
            thoughtDisplay.style.opacity = 0;
            setTimeout(() => { thoughtDisplay.innerText = `"${midnightThoughts[Math.floor(Math.random() * midnightThoughts.length)]}"`; thoughtDisplay.style.opacity = 0.8; }, 300);
        });
    }

    function initDynamicShadows() {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20; const y = (e.clientY / window.innerHeight - 0.5) * 20;
            document.documentElement.style.setProperty('--shadow-x', `${x}px`); document.documentElement.style.setProperty('--shadow-y', `${15 + y}px`);
        });
    }

    function initTimeCapsule() {
        const capsule = document.getElementById("time-capsule-item"); const status = document.getElementById("capsule-status");
        if(!capsule || !status) return;
        if (new Date() >= new Date("January 1, 2027 00:00:00")) { status.innerHTML = `<span style="color:var(--gold);">Unlocked. "To the me who survived, thank you."</span>`; } 
        else { status.innerText = "A letter to the future. Sealed until January 1, 2027."; }
    }

    function initScrollProgressBar() { window.addEventListener("scroll", () => { let st = window.scrollY || document.documentElement.scrollTop; let sh = document.documentElement.scrollHeight - window.innerHeight; const progress = document.getElementById("reading-progress"); if(progress) progress.style.width = sh > 0 ? ((st / sh) * 100) + "%" : "0%"; }); }

    function checkUltimateVault() {
        const condMoon = document.getElementById("cond-moon"); const condNotes = document.getElementById("cond-notes"); const condWord = document.getElementById("cond-word"); if(!condMoon) return;
        condMoon.innerText = globalState.hasTappedMoon ? "✅ Moon Tapped (3/3)" : `❌ Moon Tapped (${globalState.secretClicks}/3)`;
        condNotes.innerText = globalState.notesVisitCount >= 5 ? "✅ Notes Room Visits (5/5)" : `❌ Notes Room Visits (${globalState.notesVisitCount}/5)`;
        if(globalState.hasTypedWord) condWord.innerText = "✅ Secret Word Typed";

        if(globalState.hasTappedMoon && globalState.notesVisitCount >= 5 && globalState.hasTypedWord) {
            const questConditions = document.getElementById("quest-conditions"); if(questConditions) questConditions.style.display = "none"; 
            const hiddenPoem = document.getElementById("hidden-poem-container"); if(hiddenPoem) hiddenPoem.style.display = "block"; 
            const secretLog = document.getElementById("ultimate-secret-log"); if(secretLog) secretLog.querySelector("strong").innerText = "🔓 Vault Log #003 (Status: Unlocked)";
        }
    }

    function initSecretKeyboardVault() {
        const randomIndex = Math.floor(Math.random() * moonWords.length);
        globalState.secretPassword = moonWords[randomIndex];
        const wordDisplay = document.getElementById("secret-word");
        if(wordDisplay) wordDisplay.innerText = globalState.secretPassword;

        let inputBuffer = "";
        window.addEventListener("keydown", (e) => {
            if (e.key.length === 1 && e.key.match(/[a-z]/i)) inputBuffer += e.key.toLowerCase();
            if (inputBuffer.endsWith("rain") && !globalState.rainActive) toggleRain();
            if (inputBuffer.length > globalState.secretPassword.length) inputBuffer = inputBuffer.substring(inputBuffer.length - globalState.secretPassword.length);
            if (inputBuffer === globalState.secretPassword) {
                globalState.hasTypedWord = true; checkUltimateVault(); showToast("👁️ The Vault Opens...");
                const vaultBtn = document.querySelector(".trigger-nav[data-target='page-secret']");
                if (vaultBtn) { vaultBtn.click(); } else { const secretPg = document.getElementById('page-secret'); if(secretPg) secretPg.classList.add('active'); }
                inputBuffer = ""; 
            }
        });
    }

    function initLedger() {
        const ledgerList = document.getElementById("ledger-list"); const submits = document.querySelectorAll(".ledger-submit"); const inputs = document.querySelectorAll(".ledger-input");
        let entries = JSON.parse(localStorage.getItem('midnightLedger') || '[]');
        function renderLedger() {
            if(!ledgerList) return; ledgerList.innerHTML = "";
            if(entries.length === 0) { ledgerList.innerHTML = `<p style="margin-bottom: 8px; font-style: italic; opacity:0.5;">No wandering souls have left a mark yet...</p>`; } 
            else { entries.forEach(e => { ledgerList.innerHTML += `<p style="margin-bottom: 8px; font-style: italic;">"${e.text}" <span style="font-size:11px; opacity:0.5;">— ${e.date}</span></p>`; }); }
        }
        renderLedger();
        submits.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                const input = inputs[index];
                if(input && input.value.trim() !== "") {
                    entries.unshift({ text: input.value.trim(), date: new Date().toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) });
                    if(entries.length > 10) entries.pop(); localStorage.setItem('midnightLedger', JSON.stringify(entries)); input.value = ""; showToast("🖋️ Your silence has been recorded."); renderLedger();
                }
            });
        });
    }

    function toggleRain() {
        globalState.rainActive = !globalState.rainActive; const rCanvas = document.getElementById("rain-canvas");
        if(globalState.rainActive) { 
            if(rCanvas) rCanvas.classList.add("raining"); 
            startRainVisuals(); 
            showToast("🌧️ The sky begins to weep..."); 
            if(audioRain) { audioRain.volume = 0.5; audioRain.play(); }
        } else { 
            if(rCanvas) rCanvas.classList.remove("raining"); 
            showToast("🌤️ The storm has passed."); 
            if(audioRain) { audioRain.pause(); }
        }
    }

    function init1111Wish() {
        const modal = document.getElementById("wish-modal");
        const submitBtn = document.getElementById("submit-wish-btn");
        const input = document.getElementById("wish-input");

        setInterval(() => {
            const d = new Date();
            if (d.getHours() === 23 && d.getMinutes() === 11 && !globalState.elevenElevenTriggered) {
                globalState.elevenElevenTriggered = true;
                if(modal) { modal.style.display = "flex"; }
            }
            if (d.getMinutes() !== 11) globalState.elevenElevenTriggered = false; 
        }, 10000);

        if(submitBtn) {
            submitBtn.addEventListener("click", () => {
                if(input && input.value.trim() !== "") {
                    if(modal) modal.style.display = "none";
                    showToast("Keep visiting, your wish will be completed soon wanderer. ✨");
                }
            });
        }
    }

    function initClockAndAtmosphere() {
        const dateEl = document.getElementById("journal-date"); if(dateEl) dateEl.innerText = `Journal Entry: ${new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}`;
        const rotatingWordEl = document.getElementById("secret-word"); let wordIndex = moonWords.indexOf(globalState.secretPassword);
        if(rotatingWordEl) { setInterval(() => { rotatingWordEl.style.opacity = 0; setTimeout(() => { wordIndex = (wordIndex + 1) % moonWords.length; globalState.secretPassword = moonWords[wordIndex]; rotatingWordEl.innerText = globalState.secretPassword; rotatingWordEl.style.opacity = 1; }, 500); }, 4000); }
        
        const themeBtn = document.getElementById("theme-toggle");
        if(themeBtn) { themeBtn.addEventListener("click", () => { const nextTheme = globalState.activeTheme === "dark" ? "light" : "dark"; document.documentElement.setAttribute("data-theme", nextTheme); themeBtn.innerText = nextTheme === "dark" ? "🌙 Night" : "☀️ Day"; globalState.activeTheme = nextTheme; }); }
        const rainToggleBtn = document.getElementById("rain-toggle"); if(rainToggleBtn) rainToggleBtn.addEventListener("click", toggleRain);
        const focusBtn = document.getElementById("reading-mode-toggle"); const exitFocusBtn = document.getElementById("exit-focus-btn");
        function toggleFocus() { document.body.classList.toggle("reading-mode"); if(focusBtn) focusBtn.innerText = document.body.classList.contains("reading-mode") ? "👁️ Normal" : "📖 Focus"; }
        if(focusBtn) focusBtn.addEventListener("click", toggleFocus); if(exitFocusBtn) exitFocusBtn.addEventListener("click", toggleFocus);
    }

    function startRainVisuals() {
        const rCanvas = document.getElementById("rain-canvas"); if(!rCanvas) return;
        const rCtx = rCanvas.getContext("2d"); rCanvas.width = window.innerWidth; rCanvas.height = window.innerHeight;
        const drops = []; for(let i=0; i<100; i++) drops.push({x: Math.random()*rCanvas.width, y: Math.random()*rCanvas.height, l: Math.random()*20+10, v: Math.random()*4+4});
        function drawRain() {
            if(!globalState.rainActive) return; rCtx.clearRect(0,0,rCanvas.width,rCanvas.height); rCtx.strokeStyle = "rgba(191,164,111,0.2)"; rCtx.lineWidth = 1; rCtx.beginPath();
            for(let i=0; i<drops.length; i++) { let d = drops[i]; rCtx.moveTo(d.x, d.y); rCtx.lineTo(d.x+1, d.y+d.l); d.y += d.v; d.x += 0.5; if(d.y > rCanvas.height) { d.y = -20; d.x = Math.random()*rCanvas.width; } }
            rCtx.stroke(); requestAnimationFrame(drawRain);
        }
        drawRain();
    }

    function initUltimateUniverseBackground() {
        const canvas = document.getElementById("universe"); if(!canvas) return; const ctx = canvas.getContext("2d", { alpha: false }); 
        let width = canvas.width = window.innerWidth; let height = canvas.height = window.innerHeight;
        window.addEventListener("resize", () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; });

        const backgroundStars = []; const goldenDust = [];
        const hour = new Date().getHours(); const isLateNight = hour >= 23 || hour <= 4;
        const darkThemeBgColor = isLateNight ? "#030308" : "#050507"; 
        
        for(let i = 0; i < 60; i++) backgroundStars.push({ x: Math.random() * width, y: Math.random() * height, radius: Math.random() * 1.2 + 0.3, baseAlpha: Math.random() * 0.5 + 0.2, phase: Math.random() * Math.PI });
        for(let i = 0; i < 25; i++) goldenDust.push({ x: Math.random() * width, y: Math.random() * height, radius: Math.random() * 1.5 + 0.5, vy: -Math.random() * 0.2 - 0.1, vx: (Math.random() - 0.5) * 0.1, alpha: Math.random() * 0.4 + 0.1 });

        function processRenderLoop() {
            ctx.fillStyle = globalState.activeTheme === "dark" ? darkThemeBgColor : "#f4ebd0"; ctx.fillRect(0, 0, width, height);
            for(let star of backgroundStars) {
                if (globalState.vortexActive) { const dx = (width/2) - star.x; const dy = (height/2) - star.y; star.x += dx * 0.05; star.y += dy * 0.05; if(Math.abs(dx) < 5 && Math.abs(dy) < 5) { star.x = Math.random() * width; star.y = Math.random() * height; }
                } else { star.phase += 0.02; }
                let a = star.baseAlpha + Math.sin(star.phase) * 0.2; ctx.beginPath(); ctx.fillStyle = globalState.activeTheme === "dark" ? `rgba(242,238,233,${Math.max(0.1, a)})` : `rgba(28, 22, 12,${Math.max(0.1, a)})`; ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2); ctx.fill();
            }
            for(let d of goldenDust) { d.y += d.vy; d.x += d.vx; if(d.y < 0) d.y = height; ctx.beginPath(); ctx.fillStyle = globalState.activeTheme === "dark" ? `rgba(191,164,111,${d.alpha})` : `rgba(74, 44, 17,${d.alpha})`; ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2); ctx.fill(); }
            requestAnimationFrame(processRenderLoop);
        }
        requestAnimationFrame(processRenderLoop);
    }

    /* --- ✨ INTERACTIVE WAX SEAL (SINGLE CLICK) ✨ --- */
    function bindWaxSeals(page) {
        const sealWrap = page.querySelector(".wax-seal-wrapper:not(.broken)");
        if (!sealWrap) { initTypewriterEngine(); return; }
        
        if (sealWrap.dataset.isBroken === "true") {
            sealWrap.classList.add("broken"); initTypewriterEngine(); return;
        }

        const sealBtn = sealWrap.querySelector(".wax-seal");
        showToast("👆 Click the wax seal to break it...");

        sealBtn.addEventListener('click', () => {
            sealWrap.dataset.isBroken = "true";
            sealWrap.classList.add("broken");
            showToast("🔓 The seal is broken.");
            setTimeout(initTypewriterEngine, 800);
        });
    }

    function initCosmicNavigation() {
        document.body.addEventListener("click", (e) => {
            if(e.target.classList.contains("trigger-nav") || e.target.classList.contains("nav-link") || e.target.classList.contains("star-node")) {
                const targetPageId = e.target.getAttribute("data-target"); 
                // Play page turn sound
                if(audioPageTurn) {
                    audioPageTurn.currentTime = 0;
                    audioPageTurn.play().catch(err => console.log("Audio blocked", err));
                }
                executePageFlip(targetPageId);
            }
        });

        function executePageFlip(targetPageId) {
            const currentActivePage = document.querySelector(".page.active"); const destinationPage = document.getElementById(targetPageId);
            if(!destinationPage || currentActivePage === destinationPage) return;

            globalState.vortexActive = true; document.body.style.overflowY = 'hidden'; 
            
            if(targetPageId === "page-fragments") {
                const currentCombo = notesCombos[globalState.notesVisitCount % 5];
                const q1 = document.getElementById("combo-quote-1"); if(q1) q1.innerText = currentCombo[0]; 
                const q2 = document.getElementById("combo-quote-2"); if(q2) q2.innerText = currentCombo[1]; 
                const q3 = document.getElementById("combo-quote-3"); if(q3) q3.innerText = currentCombo[2];
                globalState.notesVisitCount++; checkUltimateVault();
            }
            
            if(currentActivePage) {
                const sign = currentActivePage.querySelector('.sign-animate'); if (sign) sign.classList.remove('active-sign');
                currentActivePage.classList.remove("active"); currentActivePage.classList.add("vortex-out");
                
                setTimeout(() => {
                    currentActivePage.classList.remove("vortex-out"); destinationPage.classList.add("vortex-in"); destinationPage.classList.add("active");
                    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                    
                    setTimeout(() => {
                        destinationPage.classList.remove("vortex-in"); globalState.vortexActive = false; document.body.style.overflowY = 'auto'; 
                        
                        bindWaxSeals(destinationPage);
                    }, 50); 
                }, 600); 
            } else { destinationPage.classList.add("active"); initTypewriterEngine(); }
            document.querySelectorAll(".nav-link").forEach(lnk => { lnk.classList.toggle("active-nav", lnk.getAttribute("data-target") === targetPageId); });
        }
    }

    function applyWhispers(el, poemIndex) {
        const pData = POEM_DATABASE[poemIndex];
        if(!pData || !pData.whispers || el.dataset.whispersApplied === "true") return;
        let html = el.innerHTML;
        pData.whispers.forEach(w => { const regex = new RegExp(`\\b${w.word}\\b`, 'gi'); html = html.replace(regex, `<span class="whisper-word" data-original="${w.word}" data-hidden="${w.hidden}">${w.word}</span>`); });
        el.innerHTML = html; el.dataset.whispersApplied = "true";

        el.querySelectorAll('.whisper-word').forEach(span => {
            span.addEventListener('click', function() {
                let curr = this.innerText; this.style.opacity = '0';
                setTimeout(() => { this.innerText = (curr.toLowerCase() === this.dataset.original.toLowerCase()) ? this.dataset.hidden : this.dataset.original; this.style.opacity = '1'; this.classList.toggle('whispered'); }, 300);
            });
        });
    }

    function initTypewriterEngine() {
        const activePage = document.querySelector(".page.active"); if (!activePage) return;
        const poemIndex = activePage.getAttribute("data-poem-index");
        const poemEls = activePage.querySelectorAll(".typewriter-poem");
        
        poemEls.forEach((el, index) => {
            const text = el.getAttribute("data-lines"); if (!text) return;
            const lines = text.replace(/\\n/g, '\n').split('\n');
            const signEl = activePage.querySelector(".sign-animate");
            const poemId = activePage.id + "-" + index;

            if (!window.twMasterState[poemId]) { window.twMasterState[poemId] = { lineIndex: 0, charIndex: 0, outHtml: "", status: "unstarted" }; el.innerHTML = ""; }
            let state = window.twMasterState[poemId];
            
            if (state.status === "finished" || el.getAttribute("data-animated") === "true") { 
                if(signEl) { signEl.classList.add("show-instantly"); }
                if(poemIndex !== null) applyWhispers(el, poemIndex); return; 
            }
            if (state.status === "typing") return; 

            state.status = "typing"; el.classList.add("is-typing");

            function typeNext() {
                if (!activePage.classList.contains("active")) { state.status = "paused"; el.classList.remove("is-typing"); return; }
                if (state.lineIndex < lines.length) {
                    let currentLine = lines[state.lineIndex];
                    if (currentLine === "") { state.outHtml += "<br><br>"; el.innerHTML = state.outHtml; state.lineIndex++; state.charIndex = 0; setTimeout(typeNext, 200); return; }
                    if (state.charIndex === 0 && state.lineIndex === 0) {
                        let char = currentLine.charAt(0); state.outHtml += `<span class="drop-cap-antique">${char}</span>`; el.innerHTML = state.outHtml; state.charIndex++; setTimeout(typeNext, 40);
                    } else if (state.charIndex < currentLine.length) {
                        let isFirstChar = (state.charIndex === 0 && state.lineIndex === 0);
                        el.innerHTML = state.outHtml + currentLine.substring(isFirstChar ? 1 : 0, state.charIndex + 1); state.charIndex++; setTimeout(typeNext, 35); 
                    } else { state.outHtml = el.innerHTML + "<br>"; el.innerHTML = state.outHtml; state.lineIndex++; state.charIndex = 0; setTimeout(typeNext, 400); }
                } else { 
                    state.status = "finished"; el.setAttribute("data-animated", "true"); el.classList.remove("is-typing"); 
                    if(signEl) { signEl.classList.add("active-sign"); } 
                    if(poemIndex !== null) applyWhispers(el, poemIndex);
                }
            }
            setTimeout(typeNext, 200);
        });
    }

    document.body.addEventListener('click', async function(e) {
        // Save as Memory (Image)
        if(e.target && e.target.classList.contains('download-poem-btn')) {
            const pIdx = e.target.getAttribute('data-poem-index'); if(pIdx === null) return;
            const poem = POEM_DATABASE[pIdx]; const canvas = document.createElement("canvas"); const ctx = canvas.getContext("2d");
            canvas.width = 1080; canvas.height = 1920;
            ctx.fillStyle = globalState.activeTheme === "dark" ? "#0b0b0f" : "#e8dcc7"; ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "#bfa46f"; ctx.lineWidth = 4; ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);
            ctx.fillStyle = "#bfa46f"; ctx.textAlign = "center"; ctx.font = "bold 60px Cinzel, serif"; ctx.fillText("THE MIDNIGHT LIBRARY", canvas.width / 2, 180);
            ctx.font = "30px Urbanist, sans-serif"; ctx.fillText("✦  ✦  ✦", canvas.width / 2, 240);
            ctx.font = "bold 80px Cinzel, serif"; ctx.fillText(poem.title.replace('<br>', ' '), canvas.width / 2, 400);
            ctx.font = "35px Cinzel, serif"; ctx.fillStyle = globalState.activeTheme === "dark" ? "rgba(242,238,233,0.6)" : "rgba(59,34,16,0.6)"; ctx.fillText(poem.subtitle, canvas.width / 2, 460);
            ctx.fillStyle = globalState.activeTheme === "dark" ? "#f2eee9" : "#3B2210"; ctx.font = "40px Playfair Display, serif";
            let y = 600; const lines = poem.text.split('\n');
            lines.forEach(line => { if(line === "") y += 40; else { ctx.fillText(line.trim(), canvas.width / 2, y); y += 60; } });
            ctx.fillStyle = "#bfa46f"; ctx.font = "italic 60px Great Vibes, cursive"; ctx.fillText("— Soham Madan Jadhao", canvas.width / 2, canvas.height - 200);
            const link = document.createElement("a"); link.download = `${poem.title.replace('<br>','')}-Memory.png`; link.href = canvas.toDataURL("image/png"); link.click();
            showToast("📸 Memory Saved Successfully!");
        }

        // Web Share API implementation
        if(e.target && e.target.classList.contains('share-poem-btn')) {
            const title = e.target.getAttribute('data-poem-title');
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: `${title} | The Midnight Library`,
                        text: `Take a moment and read "${title}" at The Midnight Library.`,
                        url: window.location.href
                    });
                    showToast("✨ Shared with the world.");
                } catch (err) {
                    console.log("Sharing cancelled.", err);
                }
            } else {
                showToast("Sharing is not supported on this browser.");
            }
        }
    });

    function initBookmarksDrawer() {
        const drawer = document.getElementById("bookmarks-drawer"); const openBtn = document.getElementById("open-bookmarks-btn");
        const closeBtn = document.getElementById("close-drawer"); const list = document.getElementById("bookmarks-list");
        if(!drawer || !openBtn || !closeBtn || !list) return;
        function renderBookmarks() {
            let bookmarks = JSON.parse(localStorage.getItem('midnightBookmarks') || '[]'); list.innerHTML = "";
            if (bookmarks.length === 0) { list.innerHTML = `<p style="opacity: 0.5; font-style: italic;">Your soul hasn't saved any verses yet...</p>`; } 
            else { bookmarks.forEach(bm => { list.innerHTML += `<div class="bookmark-item">📖 ${bm}</div>`; }); }
        }
        openBtn.addEventListener("click", () => { renderBookmarks(); drawer.classList.add("open"); }); closeBtn.addEventListener("click", () => { drawer.classList.remove("open"); });
    }

    function initFavouritesDrawer() {
        const drawer = document.getElementById("favourites-drawer"); const openBtn = document.getElementById("open-fav-btn");
        const closeBtn = document.getElementById("close-fav-drawer"); const list = document.getElementById("favourites-list");
        if(!drawer || !openBtn || !closeBtn || !list) return;
        function renderFavs() {
            let favs = JSON.parse(localStorage.getItem('midnightFavs') || '[]'); list.innerHTML = "";
            if (favs.length === 0) { list.innerHTML = `<p style="opacity: 0.5; font-style: italic;">No verses have resonated with you yet...</p>`; } 
            else { favs.forEach(fv => { list.innerHTML += `<div class="bookmark-item">❤️ ${fv}</div>`; }); }
        }
        openBtn.addEventListener("click", () => { renderFavs(); drawer.classList.add("open"); }); closeBtn.addEventListener("click", () => { drawer.classList.remove("open"); });
    }

    function initLibraryFeatures() {
        const footerQuote = document.getElementById("quote-rotator"); 
        if(footerQuote) footerQuote.innerText = quoteDatabase[Math.floor(Math.random() * quoteDatabase.length)];
        
        // --- MOON MOVEMENT VAULT LOGIC ---
        const moonTrigger = document.getElementById("moon-phase");
        if(moonTrigger) {
            moonTrigger.addEventListener("click", () => {
                globalState.secretClicks++; checkUltimateVault();
                if(globalState.secretClicks === 3) { 
                    globalState.hasTappedMoon = true; checkUltimateVault();
                    showToast("🏆 Achievement Unlocked: Moonwalker");
                    
                    const currentActivePage = document.querySelector(".page.active");
                    const vaultPage = document.getElementById('page-secret');
                    
                    if (currentActivePage && currentActivePage !== vaultPage) {
                        currentActivePage.classList.remove("active");
                        currentActivePage.classList.add("vortex-out");
                        
                        setTimeout(() => {
                            currentActivePage.classList.remove("vortex-out");
                            if(vaultPage) {
                                vaultPage.classList.add("vortex-in", "active");
                                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                                
                                setTimeout(() => {
                                    vaultPage.classList.remove("vortex-in");
                                    bindWaxSeals(vaultPage);
                                }, 50);
                            }
                        }, 600);
                    } else {
                        if(vaultPage) vaultPage.classList.add("active");
                    }
                    
                    globalState.secretClicks = 0;
                }
            });
        }
    }

    function showToast(msg) {
        const container = document.getElementById("toast-container"); 
        if(!container) return;
        const toast = document.createElement("div"); 
        toast.className = "toast"; 
        toast.innerText = msg; 
        container.appendChild(toast); 
        setTimeout(() => toast.remove(), 3500);
    }
 // =====================================================================
// THE MIDNIGHT LIBRARY - REPAIR UTILITY FOR SOOHAM JADHAO'S PROJECTS
// =====================================================================

// Local arrays setup
let midnightFavs = JSON.parse(localStorage.getItem("library_favourites")) || [];
let midnightBooks = JSON.parse(localStorage.getItem("library_bookmarks")) || [];

// 1. GLOBAL FAVORITES (RESONATED WITH ME) CLICK HANDLER
document.addEventListener("click", function(e) {
    // Apne button classes ya text ke mutabiq match karna
    if (e.target && (e.target.classList.contains("dynamic-fav-trigger") || e.target.innerText.includes("RESONATED WITH ME"))) {
        
        // Aapke active slide/chapter ka naam nikalne ke liye
        let currentChapterTitle = "ANCHOR";
        const headingElement = document.querySelector(".page.active .page1-heading, .page.active h1, .page.active h2");
        if (headingElement) {
            currentChapterTitle = headingElement.innerText.trim();
        }

        if (!midnightFavs.some(item => item.title === currentChapterTitle)) {
            midnightFavs.push({ id: Date.now().toString(), title: currentChapterTitle });
            localStorage.setItem("library_favourites", JSON.stringify(midnightFavs));
            alert("❤️ Added to My Favourites: " + currentChapterTitle);
            syncMidnightDrawers();
        } else {
            alert("✨ This verse already resonates in your soul.");
        }
    }

    // 2. GLOBAL ARCHIVE (BOOKMARK) CLICK HANDLER
    if (e.target && (e.target.classList.contains("dynamic-bookmark-trigger") || e.target.id === "bookmark-btn" || e.target.innerText.includes("Bookmark"))) {
        
        let currentChapterTitle = "ANCHOR";
        const headingElement = document.querySelector(".page.active .page1-heading, .page.active h1, .page.active h2");
        if (headingElement) {
            currentChapterTitle = headingElement.innerText.trim();
        }

        if (!midnightBooks.some(item => item.title === currentChapterTitle)) {
            midnightBooks.push({ id: Date.now().toString(), title: currentChapterTitle });
            localStorage.setItem("library_bookmarks", JSON.stringify(midnightBooks));
            alert("🔖 Verse archived in Saved Echoes: " + currentChapterTitle);
            syncMidnightDrawers();
        } else {
            alert("📜 This echo is already safely locked inside the Archives.");
        }
    }

    // 3. LISTEN: SOON AUDIO SYNCHRONIZER
    if (e.target && e.target.innerText.includes("LISTEN: SOON")) {
        alert("🔮 Whispering the fragments of silence...");
        
        // Pura text uthane ke liye jo active page par ho
        const activePoemText = document.querySelector(".page.active .royal-poem-text, .page.active .poem-playfair");
        let textToSpeak = "Welcome back to the Midnight Library.";
        if (activePoemText) {
            textToSpeak = activePoemText.innerText;
        }

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'en-US';
        utterance.pitch = 0.85; // Soft deep tone
        utterance.rate = 0.8;  // Medium slow speed
        window.speechSynthesis.speak(utterance);
    }
});

// DRAWER UI RE-RENDER SYNCHRONIZER
function syncMidnightDrawers() {
    const favList = document.getElementById("favourites-list");
    const bookmarkList = document.getElementById("bookmarks-list");

    if (favList && midnightFavs.length > 0) {
        favList.innerHTML = midnightFavs.map(item => `
            <div class="drawer-item" style="padding: 15px; border-bottom: 1px dashed rgba(191,164,111,0.2); color: #bfa46f; font-family: 'Cinzel', serif;">
                ❤️ ${item.title}
            </div>
        `).join('');
    }

    if (bookmarkList && midnightBooks.length > 0) {
        bookmarkList.innerHTML = midnightBooks.map(item => `
            <div class="drawer-item" style="padding: 15px; border-bottom: 1px dashed rgba(191,164,111,0.2); color: #bfa46f; font-family: 'Cinzel', serif;">
                📖 ${item.title}
            </div>
        `).join('');
    }
}

// Initial script execution sync
setTimeout(syncMidnightDrawers, 1000);
  
});
