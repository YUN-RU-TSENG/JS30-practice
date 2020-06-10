/**
 * proxy 版本，資料驅動畫面！！！！！！！！
 */

void function IIFE(){
  let   score = 0;
        timeToggle = false;
  const holes = document.querySelectorAll(".hole"),
        scoreBoard = document.querySelector(".score"),
        bactria = Array.from(document.querySelectorAll(".mole")),
        startButton = document.querySelector('#start');

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

}();
