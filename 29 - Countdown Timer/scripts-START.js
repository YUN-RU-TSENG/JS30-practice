const buttons = document.querySelectorAll("button");
const input = document.querySelector('input[name="minutes"]');
const title = document.querySelector(".display h1");
let activeCount = null;
let setTimeID = null;
// 透過 enter 事件，取得 input 數值。

buttons.forEach(element => element.addEventListener("click", setTimeCounter));
input.addEventListener("change", e => e.preventDefault());
input.addEventListener("keydown", setInputTimeCounter);

function setTimeCounter(e) {

  if (setTimeID) clearInterval(setTimeID);

  let now = Date.now();
  let finialTime = Number(this.dataset.time) + now;
  let totalSecond = finialTime - now;

  setTimeID = setInterval(() => {
    printTimeCounter(totalSecond);

    if(totalSecond <= 0) clearInterval(setTimeID)
    totalSecond -= 1;
  }, 1000);
}

function printTimeCounter(totalSecond){

  let time = {
    clockSecond: null,
    clockMinute: null
  };

  time.clockSecond = totalSecond % 60;
  time.clockMinute = (totalSecond - time.clockSecond) / 60;
  let sureSecondTime = time.clockSecond.toString().replace(/\b(?=\d$)/, 0);
  document.title = `${time.clockMinute}:${sureSecondTime}`;
  title.textContent = `${time.clockMinute}:${sureSecondTime}`;
}

function setInputTimeCounter(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    if (setTimeID) clearInterval(setTimeID);
    let totalSecond = Number(this.value) * 60;
    setTimeID = setInterval(() => {
      printTimeCounter(totalSecond);

      if(totalSecond < 0) clearInterval(setTimeID)
      totalSecond -= 1;
    }, 1000);
    this.value = ''
  }
}
