(()=>{

  var panels;
  panels = document.querySelectorAll('div.panel')

  panels.forEach((panel) => panel.addEventListener('click', addClass))
  panels.forEach((panel) => panel.addEventListener('transitionend', addClassSecond))

  /**
   *
   * 添加、刪除第一種樣式，展開寬度
   */
  function addClass(e){
    e.target.classList.toggle('panel-change')
    panels.forEach(el => el !== e.target && el.classList.remove('panel-change')) // 這裡的 this 是為了除了自己的都會移除樣式，使用到了 this！但是我後來覺得使用 e.target 更符合邏輯
  }

  /**
   *
   * 添加、刪除第二種延遲視覺樣式，移動字體
   */
  function addClassSecond(e){
    e.target.classList.toggle('panel-changes')
  }

})();