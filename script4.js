
/* ================= XP SYSTEM ================= */
let level = parseInt(localStorage.getItem("astro_level")) || 0;
let xp = parseInt(localStorage.getItem("astro_xp")) || 0;

const pfpMilestones = {
    0: "https://cdn.jsdelivr.net/gh/Joeclickavit/astrosilly@main/Vintage_Astro.webp",
    1: "https://cdn.jsdelivr.net/gh/Joeclickavit/astrosilly@main/Astro.webp",
    25: "https://cdn.jsdelivr.net/gh/Joeclickavit/astrosilly@main/North_Star.webp",
    100: "https://cdn.jsdelivr.net/gh/Joeclickavit/astrosilly@main/Bedtime_Bear.webp",
    250: "https://cdn.jsdelivr.net/gh/Joeclickavit/astrosilly@main/Star-Time_Astro.webp",
    500: "https://cdn.jsdelivr.net/gh/Joeclickavit/astrosilly@main/Starry_Night.webp",
    1000: "https://cdn.jsdelivr.net/gh/Joeclickavit/astrosilly@main/Scarlet_Night.webp"
};

function xpNeeded(lvl){
    return Math.floor(100 * Math.pow(1.001, lvl));
}

function xpPerGame(){
    return 25 + Math.floor(level / 10) * 5;
}

function updateUI(){
    const needed = xpNeeded(level);
    document.getElementById("levelText").innerText = "Level " + level;
    document.getElementById("xpText").innerText = xp + " / " + needed + " XP  (" + xpPerGame() + " XP/game)";
    document.getElementById("xpFill").style.width = (xp / needed * 100) + "%";

    // Only auto-set pfp if user hasn't manually chosen one
    const chosenPfp = localStorage.getItem("astro_chosen_pfp");
    if(!chosenPfp){
        let currentPfp = pfpMilestones[0];
        Object.keys(pfpMilestones).forEach(m => {
            if(level >= parseInt(m)){
                currentPfp = pfpMilestones[m];
            }
        });
        document.getElementById("levelPfp").src = currentPfp;
    } else {
        document.getElementById("levelPfp").src = chosenPfp;
    }
}

function addXP(amount){
    xp += amount;
    while(xp >= xpNeeded(level)){
        xp -= xpNeeded(level);
        level++;
    }
    localStorage.setItem("astro_level", level);
    localStorage.setItem("astro_xp", xp);
    updateUI();
}

document.addEventListener("DOMContentLoaded", () => {
    updateUI();

    if(level >= 1100){
        document.getElementById("levelPfp").onclick = () => {
            const unlocked = Object.keys(pfpMilestones)
                .filter(m => level >= parseInt(m))
                .map(m => pfpMilestones[m]);

            const choice = prompt("Choose avatar number:\n" + 
                unlocked.map((_,i)=> i + ": Avatar").join("\n")
            );

            if(unlocked[choice]){
                const chosen = unlocked[choice];
                localStorage.setItem("astro_chosen_pfp", chosen);
                document.getElementById("levelPfp").src = chosen;
            }
        };
    }
});