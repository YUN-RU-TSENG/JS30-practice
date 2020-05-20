(()=>{

  var panels;
  panels = document.querySelectorAll('.panel')

  panels.forEach((panel) => panel.addEventListener('click', addClass))
  panels.forEach((panel) => panel.addEventListener('transitionend', addClassSecond))

  /**
   *
   * 添加、刪除第一種樣式，展開寬度
   */
  function addClass(e){
    e.currentTarget.classList.toggle('panel-change')
    // 刪除除了自己的樣式
    panels.forEach(el => el !== e.currentTarget && el.classList.remove('panel-change')) // 這裡的 this 是為了除了自己的都會移除樣式，使用到了 this！但是我後來覺得使用 e.target 更符合這裡一致性
  }

  /**
   *
   * 添加、刪除第二種延遲視覺樣式，移動字體
   */
  function addClassSecond(e){
    e.target.classList.toggle('panel-changes')
  }

})();