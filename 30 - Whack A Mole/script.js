/**
 * @brief 此練習乃打地鼠遊戲，在限定時間內打到地鼠，會加分在儀表板上。
 */

void function IIFE(){
  const holes = document.querySelectorAll(".hole");
  const scoreBoard = document.querySelector(".score");
  const bactria = document.querySelectorAll(".mole");
  const stratButton = document.querySelector('#start');
  const timeShow = document.querySelector('#time');
  let lastHole;
  let countScore = 0;
  let start = false;
  let totalTime = 60;

  stratButton.addEventListener('click', startGame)

  /**
   * @brief 開始遊戲，初始化數值
   *
   * @param {event} e 事件物件
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
        stratButton.textContent = 'start'
        stratButton.disabled = false
        bactria.forEach(mole => mole.parentNode.classList.remove('up'))

        clearInterval(interval)
      }
    }, 1000)
  }

  /**
   * @brief 設定細菌出現，隨機和任意一隻細菌
   */
  function appearHole(){
    const hole = randomHole();
    const time = randomNumber(200, 1000);
    randomHole().classList.add('up')

    setTimeout(()=>{
      hole.classList.remove('up')
      start && appearHole()
    }, time)
  }

  /**
   * @brief 返回 Max Min 之間的任意數字
   *
   * @param {Numbet} Max
   * @param {Number} Min
   */
  function randomNumber(Max, Min){
    return Math.round(Math.random() * (Max - Min) + Min)
  }

  /**
   * 返回隨意的細菌元素
   */
  function randomHole(){
    const randomIndex =  Math.floor(Math.random() * holes.length)
    const hole = holes[randomIndex]
    if(hole === lastHole){
      console.warn("Oops, some wrong, auto reload new hole.")
      randomHole()
    }
    lastHole = hole;
    return hole;
  }

  bactria.forEach( mole => mole.addEventListener('click', addScore))
  /**
   * @brief 添加分數
   * @param {event} 事件物件
   */
  function addScore(e){
    if(!e.isTrusted) return;
    countScore += 1;
    scoreBoard.textContent = countScore;
    e.currentTarget.parentNode.classList.remove('up')
  }

}()