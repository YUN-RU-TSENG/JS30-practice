(()=>{

  var panels = document.querySelectorAll('div.panel')

  panels.forEach((panel) => panel.addEventListener('click', addClass))
  panels.forEach((panel) => panel.addEventListener('transitionend', addClassSecond))

  /**
   *
   * 添加、刪除第一種樣式，展開寬度
   */
  function addClass(e){
    panel.classList.toggle('panel-change')
    panels.forEach(el => { // 這裡的 this 是為了除了自己的都會移除樣式，使用到了 this！
      el !== this && el.classList.remove('panel-change')
    })
  }

  /**
   *
   * 添加、刪除第二種延遲視覺樣式，移動字體
   */
  function addClassSecond(e){
    panel.classList.toggle('panel-changes')
  }

})();