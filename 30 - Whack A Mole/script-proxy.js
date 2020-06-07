/**
 * proxy 版本，資料驅動畫面！！！！！！！！
 */

// (function IIFE(){

  const holes = document.querySelectorAll(".hole");
  const scoreBoard = document.querySelector(".score");
  const bactria = Array.from(document.querySelectorAll(".mole"))
  const startButton = document.querySelector('#start');
  const timeShow = document.querySelector('#time');
  let score = 0;
  let timeToggle = false;
  let totalTime = 60;

  const moleData = bactria.reduce((pre, next, index)=>{
    pre[index] = false
    return pre
  },{})

  const proxyMoleData = new Proxy(moleData, {
    get(target, key){
      console.info('>>>>>>>>>>',target, key)
      return target[key]
    },
    set(target, key, value){
      console.info('>>>>>>>>>>', target, key, value)
      target[key] = value
      if(target[key]){
        bactria[key].addEventListener('click', toggleDone)
        bactria[key].parentNode.classList.add('up')
      }else{
        bactria[key].removeEventListener('click', toggleDone)
        bactria[key].parentNode.classList.remove('up')
      }
    }
  })

  function toggleDone(e){
    setScore();
    bactria[bactria.indexOf(e.currentTarget)].removeEventListener('click', toggleDone)
    bactria[bactria.indexOf(e.currentTarget)].parentNode.classList.remove('up')
  }

  function setScore(){
    score += 1
    scoreBoard.textContent = `${score}`
  }

  function appearHole(){
    const randomTime = Math.round(2500 * Math.random());
    const randomeHole = Math.floor(Math.random() * holes.length);

    if(proxyMoleData[randomeHole]) return appearHole()
    setHole(randomeHole, randomTime)
  }

  function setHole(randomeHole, randomTime){
    if(!timeToggle) return;
    proxyMoleData[randomeHole] = true;
    setTimeout(()=>{
      appearHole();
    }, randomTime)
    setTimeout(()=>{
      proxyMoleData[randomeHole] && (proxyMoleData[randomeHole] = false)
    }, randomTime)
  }

  startButton.addEventListener('click', startGame);
  function startGame(){
    timeToggle = true;
    score = 0;
    appearHole();
    startButton.textContent = 'running'
    startButton.disabled = true
    setTimeout(()=>{
      timeToggle = false
    }, 60000)
  }


// })();


// const scoreBoard = document.querySelector(".score");
// const moles = [...document.querySelectorAll(".mole")];
// const status = moles.reduce((prev, current, index) => {
//   prev[index] = false;
//   return prev;
// }, {});

// const clickHandler = function() {
//   if (molesProxy[moles.indexOf(this)]) {
//     setScore(score + 1);
//     molesProxy[moles.indexOf(this)] = false;
//   }
// };
// const molesProxy = new Proxy(status, {
//   get(target, key) {
//     return target[key];
//   },
//   set(target, key, value) {
//     target[key] = value;
//     moles[key].removeEventListener("click", clickHandler);
//     if (value) {
//       moles[key].addEventListener("click", clickHandler);
//       moles[key].classList.add("up");
//     } else {
//       moles[key].classList.remove("up");
//     }
//   }
// });

// let score = 0;
// let timeUp = true;

// const setScore = function(s) {
//   score = s;
//   scoreBoard.textContent = score;
// };

// const setMole = function(mole, time) {
//   molesProxy[mole] = true;
//   setTimeout(() => {
//     if (!timeUp) showRandomMole();
//   }, 500);
//   setTimeout(() => {
//     molesProxy[mole] = false;
//   }, time);
// };
// const showRandomMole = function() {
//   const mole = Math.floor(Math.random() * moles.length);
//   const time = Math.random() * (1500 - 1000) + 1000; // 1000~1500
//   if (molesProxy[mole]) return showRandomMole();
//   setMole(mole, time);
// };
// const startGame = function() {
//   if (!timeUp) return;
//   setScore(0);
//   timeUp = false;
//   showRandomMole();
//   setTimeout(() => {
//     (timeUp = true), alert("Time's Up");
//   }, 10000);
// };

// document.querySelector("button").addEventListener("click", startGame);