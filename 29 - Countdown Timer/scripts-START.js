const timer_button = document.querySelectorAll('.timer__controls button')
const display_h1 = document.querySelector('.display h1')
const display_p = document.querySelector('.display p')
const form = document.querySelector('#custom')
let countTime;

timer_button.forEach(element => element.addEventListener('click', startTimeCount))
form.addEventListener('submit', function(e){
  if(!this.firstElementChild.value) return;
  e.preventDefault();
  const inputValue = this.firstElementChild.value;
  timer(inputValue * 60);
  this.reset();
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
    const totalLeft = then - Math.floor(Date.now() / 1000);
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
  const endMin = endTime.getMinutes()
  display_p.innerHTML = `
  即將結束於 ${endHour} 點 ${endMin.toString().replace(/\b(?=\d$)/, 0)} 分。
  `
}