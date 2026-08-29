function getPinnedGames(){
    try{ return JSON.parse(localStorage.getItem("astro_pinned") || "[]"); }
    catch(e){ return []; }
}

function togglePin(file){
    let pinned = getPinnedGames();
    if(pinned.includes(file)){
        pinned = pinned.filter(f => f !== file);
    } else {
        if(pinned.length >= 3){
            alert("You can only pin up to 3 games! Unpin one first.");
            return;
        }
        pinned.push(file);
    }
    localStorage.setItem("astro_pinned", JSON.stringify(pinned));
    renderPinnedGames();
    refreshAllPinButtons();
}

function refreshAllPinButtons(){
    const pinned = getPinnedGames();
    document.querySelectorAll('.pin-btn[data-file]').forEach(btn => {
        const f = btn.dataset.file;
        if(pinned.includes(f)){
            btn.classList.add('pinned');
            btn.title = 'Unpin game';
        } else {
            btn.classList.remove('pinned');
            btn.title = 'Pin game';
        }
    });
}

function renderPinnedGames(){
    const container = document.getElementById("pinnedGames");
    if(!container) return;
    const pinned = getPinnedGames();
    if(pinned.length === 0){
        container.innerHTML = '<span class="pinned-empty">No games pinned yet — pin up to 3 favorites!</span>';
        return;
    }
    container.innerHTML = '';
    pinned.forEach(file => {
        const card = document.createElement('div');
        card.className = 'pinned-card';

        const label = document.createElement('span');
        label.textContent = '📌 ' + file.replace(/^cl/i,'');
        label.style.flex = '1';
        label.style.cursor = 'pointer';
        label.onclick = () => {
            recordRecentGame(file);
            const normalized = file.endsWith('.html') ? file : file + '.html';
            fetch(`https://cdn.jsdelivr.net/gh/bubbls/ugs-singlefile/UGS-Files/${encodeURIComponent(normalized)}?t=${Date.now()}`)
                .then(r => r.text())
                .then(t => {
                    const w = window.open('about:blank','_blank');
                    if(w){ w.document.open(); w.document.write(t); w.document.close(); }
                });
        };

        const unpinBtn = document.createElement('button');
        unpinBtn.className = 'unpin-btn';
        unpinBtn.textContent = '✕';
        unpinBtn.title = 'Unpin';
        unpinBtn.onclick = (e) => {
            e.stopPropagation();
            togglePin(file);
        };

        card.appendChild(label);
        card.appendChild(unpinBtn);
        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", renderPinnedGames);

/* ================= RECENTLY PLAYED ================= */
function getRecentGames(){
    try{ return JSON.parse(localStorage.getItem("astro_recent") || "[]"); }
    catch(e){ return []; }
}

function recordRecentGame(file){
    let recent = getRecentGames();
    recent = recent.filter(f => f !== file);
    recent.unshift(file);
    recent = recent.slice(0, 5);
    localStorage.setItem("astro_recent", JSON.stringify(recent));
    renderRecentGames();
}

function renderRecentGames(){
    const container = document.getElementById("recentGames");
    if(!container) return;
    const recent = getRecentGames();
    if(recent.length === 0){
        container.innerHTML = '<span class="recent-empty">No games played yet — launch one to get started!</span>';
        return;
    }
    container.innerHTML = '';
    recent.forEach(file => {
        const card = document.createElement('div');
        card.className = 'recent-card';
        card.textContent = '▶ ' + file.replace(/^cl/i,'');
        card.onclick = () => {
            recordRecentGame(file);
            const normalized = file.endsWith('.html') ? file : file + '.html';
            fetch(`https://cdn.jsdelivr.net/gh/bubbls/ugs-singlefile/UGS-Files/${encodeURIComponent(normalized)}?t=${Date.now()}`)
                .then(r => r.text())
                .then(t => {
                    const w = window.open('about:blank','_blank');
                    if(w){ w.document.open(); w.document.write(t); w.document.close(); }
                });
        };
        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", renderRecentGames);
