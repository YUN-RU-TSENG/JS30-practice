const buttons = document.querySelectorAll("button");
const input = document.querySelector('input[name="minutes"]');
const title = document.querySelector(".display h1");
let activeCount = null;
let setTimeID = null;
// 透過 enter 事件，取得 input 數值。

buttons.forEach(element => element.addEventListener("click", setTimeCounter));
input.addEventListener("change", e => {
  e.preventDefault();
});

input.addEventListener("keydown", setInputTimeCounter);

function setTimeCounter(e) {
  if (setTimeID) clearInterval(setTimeID);
  let totalSecond = Number(this.dataset.time);
  setTimeID = setInterval(() => {
    let time = {
      clockSecond: null,
      clockMinute: null
    };
    time.clockSecond = totalSecond % 60;
    time.clockMinute = (totalSecond - time.clockSecond) / 60;
    let sureSecondTime = time.clockSecond.toString().replace(/\b(?=\d$)/, 0);
    title.textContent = `${time.clockMinute}:${sureSecondTime}`;
    if(totalSecond > 0)  {
      totalSecond -= 1
    } else{
      clearInterval(setTimeID);
    }
  }, 1000);
}

function setInputTimeCounter(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    if (setTimeID) clearInterval(setTimeID);
    let totalSecond = Number(this.value) * 60;
    console.log(totalSecond);
    setTimeID = setInterval(() => {
      let time = {
        clockSecond: null,
        clockMinute: null
      };
      time.clockSecond = totalSecond % 60;
      time.clockMinute = (totalSecond - time.clockSecond) / 60;
      let sureSecondTime = time.clockSecond.toString().replace(/\b(?=\d$)/, 0);
      title.textContent = `${time.clockMinute}:${sureSecondTime}`;
      if(totalSecond > 0)  {
        totalSecond -= 1
      } else{
        clearInterval(setTimeID);
      }
    }, 1000);
    this.value = ''
  }
}
