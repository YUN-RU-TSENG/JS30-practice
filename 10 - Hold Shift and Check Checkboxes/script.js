(() => {

  const items = Array.from(document.querySelectorAll(".item input"));
  let indexOfStart = null;
  let shiftIsKeydown = false;

  // select checkbox when keydow shift
  items.forEach((element, index) => element.addEventListener("click", function(e){
    return void setCheckInput.call(this, e, index)
    // return setCheckInput.apply(this, [e, index])
  }));

  // make sure shift is click
  window.addEventListener("keydown", (e) => (e.key === "Shift") && (shiftIsKeydown = true));
  // make sure shift is click
  window.addEventListener("keyup", (e) => (e.key === "Shift") && (shiftIsKeydown = false));

  /**
   * 當按下 shift 案件時，可以複選之前到現在的 checkbox 按鈕
   *
   * @param {event} e
   * @param {Number} index
   */
  function setCheckInput(e, index) {

    // console.log(e, index)
    if (!e.currentTarget.checked) {
      indexOfStart = null;
      return;
    }

    if (indexOfStart === null || !shiftIsKeydown) {
      indexOfStart = index;
    } else {
      items
        .slice(Math.min(index, indexOfStart), Math.max(index, indexOfStart))
        .forEach((element) => (element.checked = true));
      indexOfStart = index;
    }
  }

})();