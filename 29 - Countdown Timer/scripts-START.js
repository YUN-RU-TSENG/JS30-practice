const timer_button = document.querySelectorAll('.timer__controls button')
let display_h1 = document.querySelector('.display h1')
let display_p = document.querySelector('.display p')
let form = document.querySelector('#custom')
let countTime;

timer_button.forEach(element => element.addEventListener('click', startTimeCount))
form.addEventListener('submit', function(e){
  if(!this.firstElementChild.value) return;
  e.preventDefault()
  timer(parseInt(this.firstElementChild.value)*60)
})

function startTimeCount(e){
  timer(this.dataset.time)
}


function timer(value){
  clearInterval(countTime)
  const now = Date.now() / 1000;
  const then = now + parseInt(value);
  const total = then - now;

  printCountTime(total);
  printLastTime(then);

  countTime = setInterval(() => {
    let totalLeft = then - Math.floor(Date.now() / 1000);
    printCountTime(totalLeft);
    if(totalLeft < 0) clearInterval(countTime);
  }, 1000)

}

function printCountTime(total){
  const startSec = Math.floor(total % 60);
  const startMin = Math.floor((total - startSec) / 60);
  display_h1.innerHTML = `${startMin}:${startSec.toString().replace(/\b(?=\d$)/, '0')}`;
}

function printLastTime(time){
  const endTime = new Date(time * 1000)
  const endHour = endTime.getHours()
  const endMin = endTime.getMinutes().toString().replace(/\b(?=\d$)/, 0)
  const endSec = endTime.getSeconds().toString().replace(/\b(?=\d$)/, 0)
  display_p.innerHTML = `
  即將結束於 ${endHour} 點 ${endMin} 分 ${endSec} 秒。
  `
}

// const buttons = document.querySelectorAll("button");
// const input = document.querySelector('input[name="minutes"]');
// const title = document.querySelector(".display h1");
// let activeCount = null;
// let setTimeID = null;
// // 透過 enter 事件，取得 input 數值。

// buttons.forEach(element => element.addEventListener("click", setTimeCounter));
// input.addEventListener("change", e => e.preventDefault());
// input.addEventListener("keydown", setInputTimeCounter);

// function setTimeCounter(e) {

//   if (setTimeID) clearInterval(setTimeID);
//   let now = Date.now();
//   let finialTime = Number(this.dataset.time) + now;
//   let totalSecond = finialTime - now;

//   setTimeID = setInterval(() => {
//     printTimeCounter(totalSecond);
//     if(totalSecond <= 0) clearInterval(setTimeID)
//     totalSecond -= 1;
//   }, 1000);
// }


// function printTimeCounter(totalSecond){
//   let time = {
//     clockSecond: null,
//     clockMinute: null
//   };

//   time.clockSecond = totalSecond % 60;
//   time.clockMinute = (totalSecond - time.clockSecond) / 60;
//   let sureSecondTime = time.clockSecond.toString().replace(/\b(?=\d$)/, 0);
//   document.title = `${time.clockMinute}:${sureSecondTime}`;
//   title.textContent = `${time.clockMinute}:${sureSecondTime}`;
// }


// function setInputTimeCounter(e) {
//   if (e.key === "Enter") {
//     e.preventDefault();
//     if (setTimeID) clearInterval(setTimeID);
//     let totalSecond = Number(this.value) * 60;
//     setTimeID = setInterval(() => {
//       printTimeCounter(totalSecond);
//       if(totalSecond < 0) clearInterval(setTimeID)
//       totalSecond -= 1;
//     }, 1000);
//     this.value = ''
//   }
// }
