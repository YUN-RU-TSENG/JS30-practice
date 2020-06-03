# 05 - Flex Panel Gallery

### 目的
![](https://i.imgur.com/Rsg1NWl.png)

調整頁面 `flex` 結構。
當觸發的時候，會新增 CSS 樣式，改變呈現的樣貌。

### 新增、刪減 CSS
> [https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList)

classList

| 方法 	| 內容 	|  	|
|-------------------	|-----------------------------------------	|---	|
| classList.toggle 	| 如果 class 存在，則移除他，反之添加他。 	|  	|
| classList.add 	| 添加 class 	|  	|
| classList.remove 	| 移除 class 	|  	|
| classList.replace 	| 替換 class 	|  	|

### this、currentTarget、target

* this 代表添加事件的元素
* currentTarget 屬性總會指向當時處理該事件的事件監聽器所註冊的 DOM 物件
==和 this 相同==
* target 屬性則是永遠指向觸發事件的 DOM 物件

> 基本情況下使用 currentTarget 我覺得叫好，是他所提供的， this 是他刻意綁定的範圍，目前待觀察。

在這題特別的是，若是要使元素開後點任一元素，其他元素都會閉合，則可以使用：

當非當前元素，panel 的樣式都會被清除。

```javascript=
panels.forEach(el => el !== e.currentTarget && el.classList.remove('panel-change'))
```

---

下面的做法是採用每次執行完後存取這次的 this ，下一次刪除並重新存取，第一次取的值永遠不會正確（因為預存了 penals）所以不會被刪除，但是我覺得他使用 `undefined` 也行，這個做法不直觀，覺得不太好。

```javascript=
const panels = document.querySelectorAll(".panel");

let lastClickPanel = document.querySelector(".panels");

function toggleOpen() {
  if (this !== lastClickPanel) {
    lastClickPanel.classList.remove("open");
    lastClickPanel = this;
  }
  this.classList.toggle("open");
}

function toggleActive(e) {
  console.log(e.propertyName);
  if (e.propertyName.includes("flex")) {
    this.classList.toggle("open-active");
  }
}

panels.forEach((panel) => panel.addEventListener("click", toggleOpen));
panels.forEach((panel) =>
  panel.addEventListener("transitionend", toggleActive)
);

```

### flex

👉🏻 實作了一組 flex 可線上調整的小項目：
[https://codepen.io/yunru1230/full/QWjzOzE](https://codepen.io/yunru1230/full/QWjzOzE)

![](https://i.imgur.com/EECjhpx.png)
