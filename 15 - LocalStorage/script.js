/**
 * 此頁面乃為新增頁面元素功能，可以新增 TODO 以及完成狀態。
 */

void function todolistDisplayIIFE() {

  const inputItems = document.querySelector(".add-items"); // form 文字輸入
  const itemsList = document.querySelector(".plates"); // ul 項目列表
  const items = JSON.parse(localStorage.getItem("items")) || [];

  // 先打印存取在本地端的資料到畫面中
  displayItem(items, itemsList);
  // 一旦發生表單 submit，添加元素到畫面中
  inputItems.addEventListener("submit", addItem);

  /**
   * @brief 新增項目、儲存項目到 localStorage。ps，將資料列印到畫面的部分由 displayItem() 實現
   *
   * @param {event} 事件物件
   */
  function addItem(e) {
    e.preventDefault();
    const text = e.currentTarget.querySelector('[name="item"]').value;
    const item = {
      isFinish: false,
      text,
    };

    items.push(item);

    // 存取到 localStorage 中
    localStorage.setItem("items", JSON.stringify(items));
    displayItem(items, itemsList);

    e.currentTarget.reset();
  }

  /**
   * @brief 打印 data 陣列的內容到 displayParentElement 元素內
   *
   * @param {Array} data 將打印的陣列資料
   * @param {HTMLULElement} displayParentElement 打印資料的 ul 元素
   */
  function displayItem(data, displayParentElement) {
    displayParentElement.innerHTML = data
      .map((item, index) => {
        return `
      <li>
          <input type="checkbox" data-index=${index} id="item${index}" ${
          item.isFinish ? "checked" : ""
        } />
          <label for="item${index}">${item.text}</label>
      </li>
      `;
      })
      .join("");
  }

  // 當 li 發生點擊時觸發，此為事件委派
  itemsList.addEventListener("click", toggleDone);

  /**
   * @brief 儲存 item 的狀態到 localStorage 中，注意此處的事件註冊在外層，為事件委派
   *
   * @param {event} 事件物件
   */
  function storeToggleDone(e) {
    const regExp = /input/gi
    if (!regExp.test(e.target.tagName)) return; // 由於是事件委派，故需要排除非目標元素

    const index = e.target.dataset.index;
    items[index].isFinish = !items[index].isFinish;

    // 存取到 localStorage 中
    localStorage.setItem("items", JSON.stringify(items));
    displayItem(items, itemsList);
  }

}();
