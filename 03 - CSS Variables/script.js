(() => {
  var inputs = document.querySelectorAll(".controls input");
  inputs.forEach((element) => element.addEventListener("input", changeValue));

  function changeValue(e) {
    const unit = e.target.dataset.sizing || "";
    document.documentElement.style.setProperty(`--${e.target.name}`, e.target.value + unit)
  }

})();

// (() => {
//   var inputs = document.querySelectorAll(".controls input");
//   inputs.forEach((element) => element.addEventListener("input", changeValue));

//   function changeValue(e) {
//     const unit = e.target.dataset.sizing || "";
//     document.documentElement.style.setProperty(`--${e.target.name}`, e.target.value + unit)

//     // document.documentElement.style = `--${e.target.name}:${
//     //   e.target.value + unit
//     // }`;
//   }

// })();
