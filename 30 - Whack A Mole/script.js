/**
 * @brief 此練習乃打地鼠遊戲，在限定時間內打到地鼠，會加分在儀表板上。
 */

void function IIFE(){
  let   lastHole,
        countScore = 0,
        start = false,
        totalTime = 60;

  const holes = document.querySelectorAll(".hole"),
        scoreBoard = document.querySelector(".score"),
        bactria = document.querySelectorAll(".mole"),
        stratButton = document.querySelector('#start'),
        timeShow = document.querySelector('#time');

  stratButton.addEventListener('click', startGame)

  /**
   * 開始遊戲，初始化數值
   * @param {*} e 事件物件
   */
  function startGame(e){
    countScore = 0;
    lastHole = undefined;
    totalTime = 60;
    start = true;
    stratButton.textContent = 'running'
    stratButton.disabled = true
    scoreBoard.textContent = countScore;

    appearHole();
    let interval = setInterval(()=>{
      totalTime -= 1
      timeShow.textContent = `${totalTime}s`;
      if(totalTime === 0) {
        start = false;
        timeShow.textContent = `${totalTime}s`;
        stratButton.textContent = 'start';
        stratButton.disabled = false;
        bactria.forEach(mole => mole.parentNode.classList.remove('up'));

        clearInterval(interval);
      }
    }, 1000)
  }

  /**
   * 設定細菌出現，隨機和任意一隻細菌
   */
  function appearHole(){
    const hole = randomHole(),
          time = randomNumber(1000, 500);

    randomHole().classList.add('up');
    var timeOut = setTimeout(()=>{
      hole.classList.remove('up')
      start ? appearHole() : clearTimeout(timeOut)
    }, time)
  }

  /**
   * 返回 Max Min 之間的任意數字
   * @param {Number} Max
   * @param {Number} Min
   */
  function randomNumber(Max, Min){
    if(typeof Max !== "number" || typeof Min !== "number") return;
    return Math.round(Math.random() * (Max - Min) + Min)
  }

  /**
   * 返回隨意的細菌元素
   */
  function randomHole(){
    const randomIndex =  Math.floor(Math.random() * holes.length),
          hole = holes[randomIndex];
    if(hole === lastHole) return randomHole()
    lastHole = hole;
    return hole;
  }

  bactria.forEach( mole => mole.addEventListener('click', addScore))
  /**
   * 添加分數
   * @param {*} event 事件物件
   */
  function addScore(e){
    if(!e.isTrusted) return;
    countScore += 1;
    scoreBoard.textContent = countScore;
    e.currentTarget.parentNode.classList.remove('up')
  }

}()