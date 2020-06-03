(() => {
  // debugger;
  var panels;
  panels = document.querySelectorAll(".panel");

  panels.forEach((panel) => panel.addEventListener("click", addClassAndClearOthersClass));
  panels.forEach((panel) => panel.addEventListener("transitionend", addClassSecond));

  /**
   *
   * 添加、刪除第一種樣式，展開寬度
   */
  function addClassAndClearOthersClass(e, elements = panels) {
    e.currentTarget.classList.toggle("panel-change");
    elements.forEach(
      (el) => el !== e.currentTarget && el.classList.remove("panel-change")
    ); // 這裡的 this 是為了除了自己的都會移除樣式，使用到了 this！但是我後來覺得使用 e.target 更符合這裡一致性
  }

  /**
   *
   * 添加、刪除第二種延遲視覺樣式，移動字體
   */
  function addClassSecond(e) {
    const keyWordRegExp = /flex/gi
    if(!keyWordRegExp.test(e.propertyName)) return
    e.currentTarget.classList.toggle("panel-changes");
  }

})();