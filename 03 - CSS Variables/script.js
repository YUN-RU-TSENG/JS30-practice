(() => {

  var inputs = document.querySelectorAll(".controls input"),
      selector = document.querySelector(".controls select");

  // 不使用 Array.from 或是解構是因為 Nodelist 本身可以使用 forEach
  inputs.forEach((element) => element.addEventListener("input", changeValue));
  selector.addEventListener("input", changeValue)

  function changeValue(e) {
    const unit = e.currentTarget.dataset.sizing || "";
    document.documentElement.style.setProperty(`--${e.currentTarget.name}`, e.currentTarget.value + unit)
  }

})();
