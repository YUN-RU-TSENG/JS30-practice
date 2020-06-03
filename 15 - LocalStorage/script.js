void function todolistDisplayIIFE() {

  const add_items = document.querySelector(".add-items");
  const plates = document.querySelector(".plates");
  const li = document.querySelectorAll("li");
  const items = JSON.parse(localStorage.getItem("item")) || [];

  add_items.addEventListener("submit", storeItem);
  plates.addEventListener("click", checkItem);

  function storeItem(e) {
    e.preventDefault();
    let value = document.querySelector('input[type="text"]');
    const inputValue = {
      value: value.value,
      isActive: true,
    };

    items.push(inputValue);
    localStorage.setItem("item", JSON.stringify(items));

    setList(items, plates);
    add_items.reset();
  }

  function setList(setItems, listContainer) {
    const itemInnerHtml = setItems
      .map((value, index) => {
        return `
    <li>
      <input data-active="${
        value.isActive
      }" data-number="${index}" type="checkbox" ${
          value.isActive ? "" : "checked"
        }>
      <label data-number="${index}">${value.value}</label>
    </li>
    `;
      })
      .join("");

    listContainer.innerHTML = itemInnerHtml;
  }

  function checkItem(e) {
    let checkIndex = e.target.dataset.number;
    items[checkIndex].isActive = !items[checkIndex].isActive;
    localStorage.setItem("item", JSON.stringify(items));
    setList(items, plates);
    console.log(li);
  }

}();