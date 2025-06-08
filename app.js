let gameSeq=[];
let userSeq=[];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let bestScore = localStorage.getItem("bestScore") || 0;


let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started == false){
    console.log("game is started");
    started = true;
        levelUp();
}
})

function gameFlash(btn){
btn.classList.add("flash");
setTimeout(function(){
    btn.classList.remove("flash");
}, 300)};

function userFlash(btn){
btn.classList.add("userflash");
setTimeout(function(){
    btn.classList.remove("userflash");
}, 50);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
    
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over ! Your score was <b>${level}</b>. 
        <br>Press any Key to start`;
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");

    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}


function reset(){
    if (level > bestScore) {
        bestScore = level;
        localStorage.setItem("bestScore", bestScore);
    }

    h2.innerHTML = `Game Over! Your score was <b>${level}</b>.
    <br>Best Score: <b>${bestScore}</b><br>Press any key to restart.`;

    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;

    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
        document.querySelector("body").style.backgroundColor = "white";
    }, 200);
}
