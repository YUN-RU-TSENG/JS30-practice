(() => {

  const items = Array.from(document.querySelectorAll(".item input"));
  let indexOfStart = null;
  let shiftIsKeydown = false;

  items.forEach((element, index) => element.addEventListener("click", function(e){
    return setCheckInput.call(this, ...[e, index])
    // return setCheckInput.apply(this, [e, index])
  }));

  window.addEventListener("keydown", (e) => (e.key === "Shift") && (shiftIsKeydown = true));
  window.addEventListener("keyup", (e) => (e.key === "Shift") && (shiftIsKeydown = false));

  function setCheckInput(e, index) {

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