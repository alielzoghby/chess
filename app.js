const game = document.querySelectorAll("li");
const btn = document.querySelector(".btn");
const form = document.querySelector(".form");
const feild = document.querySelector(".view");
const timeGame = document.querySelector(".time");
const score = document.querySelector(".score");
const snd = new Audio("sounds/2F44Z5B-ui-notification-kalimba-second-02.mp3"); // buffers automatically when created
const sndStart = new Audio("sounds/game-start-6104.mp3");
const right = new Audio("sounds/success-1-6297.mp3");
const wrong = new Audio("sounds/wrong-buzzer-6268.mp3");
const sndEnd = new Audio("sounds/start-computeraif-14572.mp3");
const alertSnd = new Audio(
  "sounds/BZBGSUB-dragon-dialogue-10-seconds-remaining.mp3"
);

const result = document.querySelector(".result");
const header = document.querySelector(".header");
const originalHeadar = header.innerHTML;
const feildTime = document.querySelector(".feildTime");
let flag = 0;
let res;

function changeOrder() {
  const arr = ["a", "b", "c", "d", "e", "f", "g", "g"];
  let genNum = Math.ceil(Math.random() * 8);
  let elNum = Math.floor(Math.random() * 8);

  header.textContent = `${arr[elNum]}${genNum}`;

  let scount = 0;
  feild.textContent = `${arr[elNum]}${genNum}`;
  feild.classList.remove("display-none");
  feild.classList.add("view-black");

  let t = setInterval(() => {
    if (scount > 0) {
      feild.classList.add("display-none");
      clearInterval(t);
      flag = 0;
    }
    flag = 1;
    scount++;
  }, 800);

  if (flag) {
    clearInterval(t);
  }

  return `${arr[elNum]}${genNum}`;
}

function changeHeader() {
  const parent = document.querySelector(".img");
  const child = document.querySelector(".top");
  parent.classList.remove("flex");
  child.classList.add("img-start");
  form.classList.add("display-none");
  feild.classList.remove("display-none");
  timeGame.classList.remove("display-none");
  score.classList.remove("display-none");
  result.classList.remove("display-none");
  header.classList.add("header-start");
}

function finishOrder() {
  header.classList.remove("header-start");
  header.innerHTML = originalHeadar;
  form.classList.remove("display-none");
}

btn.addEventListener("click", () => {
  if (Number(feildTime.value) > 0) {
    changeHeader();

    let count = 0;
    let sco = 0;
    const time = setInterval(() => {
      let tt = feildTime.value;
      timeGame.style.color = "white";
      if (feildTime.value > 60) {
        let fix = Math.floor(feildTime.value / 60);
        if (fix < 10) fix = `0${fix}`;
        if (tt - 60 * fix < 10) {
          timeGame.textContent = `${fix}.0${tt - 60 * fix}`;
        } else {
          timeGame.textContent = `${fix}.${tt - 60 * fix}`;
        }
      } else {
        if (feildTime.value < 10) {
          timeGame.textContent = `00.0${feildTime.value}`;
          timeGame.style.color = "rgb(209, 66, 66)";
        } else {
          timeGame.textContent = `00.${feildTime.value}`;
        }
      }
      if (feildTime.value == 10) {
        alertSnd.play();
      }

      if (count == 0) {
        snd.currentTime = 0;
        feild.textContent = "3";
        snd.play();
      }
      if (count == 1) {
        snd.currentTime = 0;
        feild.textContent = "2";
        snd.play();
      }
      if (count == 2) {
        snd.currentTime = 0;
        feild.textContent = "1";
        snd.play();
      }
      if (count == 3) {
        snd.pause();
        feild.textContent = "GO!";
        sndStart.play();
        res = changeOrder();
      }
      if (count > 3) {
        feildTime.value--;
        feild.classList.add("display-none");
        game.forEach((el) => {
          el.onclick = (event) => {
            const parent = document.createElement("div");
            console.log(res);
            if (res == event.target.id.split("-")[1]) {
              right.currentTime = 0;
              wrong.currentTime = 0;
              right.pause();
              wrong.pause();
              parent.classList.add("corect");
              parent.innerHTML = `<i class="fa-solid fa-circle-check"></i>${res}`;
              sco++;
              score.textContent = sco;
              right.play();
            } else {
              right.currentTime = 0;
              wrong.currentTime = 0;
              right.pause();
              wrong.pause();
              parent.classList.add("wrong");
              parent.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>${res}`;
              wrong.play();
            }
            result.appendChild(parent);

            res = changeOrder();
          };
        });
      }
      count++;

      if (feildTime.value < 0) {
        clearInterval(time);
        finishOrder();
        game.forEach((el) => {
          el.onclick = () => {};
        });
        sndEnd.play();
        feildTime.value = 0;
        timeGame.style.color = "#8f8f8d";
      }
    }, 1000);
  } else {
    alert("Please Enter a Valid Time");
  }
});
