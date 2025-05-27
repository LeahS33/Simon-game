
let memoryArr = [];
let sum;
let sumPoints = 0;
let points;

//בונה את הלוח
createBoard();
function createBoard() {
    createGameKeys();
    createPoints();
}

//יוצרת את הכפתורים למשחק
function createGameKeys() {
    let divContainerCircles = document.createElement("div");
    divContainerCircles.setAttribute('id', 'divContainerCircles');
    document.body.appendChild(divContainerCircles);
    for (let i = 1; i < 5; i++) {
        let key = document.createElement("button");
        divContainerCircles.appendChild(key);
        key.classList.add("circles");
        key.setAttribute('id', 'key' + i);
        key.setAttribute('aria-label', 'Color button ' + i);
        key.disabled = true;
        key.addEventListener("click", (event) => pressingKey(key.id));
    }
    let activationKey = document.createElement("button");
    activationKey.setAttribute('id', 'startButton');
    document.body.appendChild(activationKey);
    activationKey.innerText = "start game";
    activationKey.addEventListener("click", () => starting());
}

function setButtonsEnabled(enabled) {
    const btns = document.getElementsByClassName("circles");
    for (let btn of btns) {
        btn.disabled = !enabled;
    }
}

//כותב כמה נקודות צברו
function createPoints() {
    points = document.createElement("div");
    points.classList.add("points");
    let user = sessionStorage.getItem("currentUser");
    let highScores = JSON.parse(sessionStorage.getItem("highScores")) || {};
    let userHighScore = highScores[user] || 0;
    points.innerText = "The points you scored: " + sumPoints + " | High Score: " + userHighScore;
    document.body.appendChild(points);
}

//מפעיל את המשחק בלחיצה על הכפתור
function starting() {
    sumPoints = 0;
    let user = sessionStorage.getItem("currentUser");
    let highScores = JSON.parse(sessionStorage.getItem("highScores")) || {};
    let userHighScore = highScores[user] || 0;
    points.innerText = "The points you scored: " + sumPoints + " | High Score: " + userHighScore;
    memoryArr.length = 0;
    setButtonsEnabled(false);
    increaseMemory();
}

//מכניסה מספר חדש למערך ומזמן פונקציה שמדליק את הכפתורים לפי הסדר במערך
function increaseMemory() {
    let num = Math.floor((Math.random() * 4) + 1);
    memoryArr.push(num);
    for (let i = 0; i < memoryArr.length; i++) {
        setTimeout(() => {
            flickers(memoryArr[i], 0.7);
            if (i === memoryArr.length - 1) {
                setTimeout(() => setButtonsEnabled(true), 700); // Enable after last flicker
            }
        }, 700 * i + 500)
    }
    sum = -1;
}

//מדליק את הכפתור שלחצתי ובודק אם ניפסלתי שאז עובר לסוף המשחק
function pressingKey(id) {
    sum++;
    keyNum = parseInt(id.replace('key', ''));
    flickers(keyNum, 0.5);
    if (keyNum === memoryArr[sum]) {
        sumPoints = sumPoints + 1;
        let user = sessionStorage.getItem("currentUser");
        let highScores = JSON.parse(sessionStorage.getItem("highScores")) || {};
        if (!highScores[user] || sumPoints > highScores[user]) {
            highScores[user] = sumPoints;
            sessionStorage.setItem("highScores", JSON.stringify(highScores));
        }
        let userHighScore = highScores[user] || 0;
        points.innerText = "The points you scored: " + sumPoints + " | High Score: " + userHighScore;
        if (sum === 15) {//ניצחון לאחר 16 סיבובים
            setTimeout(() => winEnding(), 1000);
        }
        else if (sum === memoryArr.length - 1) {
            if (sum % 4 == 3) {
                let clap = document.getElementById("clap");
                clap.play();
                setTimeout(() => { increaseMemory(); }, 2000);
            }
            else
                setTimeout(() => { increaseMemory(); }, 500);
        }
    }
    else {
        ending();
    }
}

//מדליק את הכפתור
function flickers(num, second) {
    const btn = document.getElementById("key" + num);
    btn.classList.add("lit");
    setTimeout(() => {
        btn.classList.remove("lit");
    }, second * 500);
}

//אם ניפסלו עובר לדף של סןף המשחק
function ending() {
    setButtonsEnabled(false);
    window.location.href = "../html/end.html";
}

function winEnding() {
    window.location.href = "../html/win.html";
    setButtonsEnabled(false);
}



