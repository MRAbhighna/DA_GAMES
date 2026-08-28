
/* ================= XP SYSTEM ================= */
let level = parseInt(localStorage.getItem("astro_level")) || 0;
let xp = parseInt(localStorage.getItem("astro_xp")) || 0;

const pfpMilestones = {
    0: "https://img.magnific.com/premium-vector/cartoon-computer-character-with-keyboard-mouse_1240970-37507.jpg?semt=ais_hybrid&w=740&q=80",
    1: "https://img.magnific.com/premium-vector/cartoon-computer-character-with-keyboard-mouse_1240970-37507.jpg?semt=ais_hybrid&w=740&q=80",
    25: "https://img.magnific.com/premium-vector/cartoon-computer-character-with-keyboard-mouse_1240970-37507.jpg?semt=ais_hybrid&w=740&q=80",
    100: "https://img.magnific.com/premium-vector/cartoon-computer-character-with-keyboard-mouse_1240970-37507.jpg?semt=ais_hybrid&w=740&q=80",
    250: "https://img.magnific.com/premium-vector/cartoon-computer-character-with-keyboard-mouse_1240970-37507.jpg?semt=ais_hybrid&w=740&q=80",
    500: "https://img.magnific.com/premium-vector/cartoon-computer-character-with-keyboard-mouse_1240970-37507.jpg?semt=ais_hybrid&w=740&q=80",
    1000: "https://img.magnific.com/premium-vector/cartoon-computer-character-with-keyboard-mouse_1240970-37507.jpg?semt=ais_hybrid&w=740&q=80"
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
