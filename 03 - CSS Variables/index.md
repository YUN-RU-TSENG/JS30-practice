# JS03
> 本文是對於 JS30 實作的筆記記錄，不會針對作法一步一步解釋（有更多好文已經紀錄了，可到 JS30 github 上查看），本系列會記錄下自己當下疑惑的部分的查詢、思考心得。
## 題目

將網頁上的圖片透過畫面上三個滑竿，調整圖片的邊框顏色以及顏色、模糊。

![](https://i.imgur.com/FqWTF6R.png)

:::info
💡**本題重點注意：**
* 本題使用了 CSS 全域變數，所以本題思路會朝向更改此變數值，進一步改變使用此變數值的顏色、邊界大小、模糊大小。
* Nodelist 類陣列可使用的方法，不可使用的，以及該如何解決。
:::


#### 解法紀錄：
* 監聽所有 `input`，透過 `input` 數值，改變全域變數。
```javascript=
(() => {
  var inputs = document.querySelectorAll(".controls input");
  // 不使用 Array.from 或是解構是因為 Nodelist 本身可以使用 forEach
  inputs.forEach((element) => element.addEventListener("input", changeValue));

  function changeValue(e) {
    const unit = e.target.dataset.sizing || "";
    document.documentElement.style.setProperty(`--${e.target.name}`, e.target.value + unit)
  }
})();
```

---

### CSS 變數

在過去，我們使用 SCSS 幫助我們編輯 CSS，透過 SCSS 設定變數，可以對維護管理顏色、字體大小管理起到很大的作用。

CSS 幾經發展，也可使用變數幫助我們進行管理。

#### 變數語法：
```css=
:root {
 --color：＃000;
}
```

#### 使用方式
* 區分大小寫
* 接受第二個參數作為預設值
```css=
.box {
    color: var(--color, #19caad)
}
```

```css=
:root { --color: blue; }
div { --color: green; }
#alert { --color: red; }
* { color: var(--color); }
```

記住，CSS 變數宣告若是在不同的地方使用了相同的變數名稱，則會依照 [casecode 的計算方式計算變數屬性](https://www.w3.org/TR/2012/WD-css-variables-20120410/#using-variables)。

在本題中，使用 `:root` 將變數設定在根元素上，而非設定在圖片上，這是由於變數不只會有圖片使用，字體標題也使用了變數顏色，一般情況下設置在全域搭配 JS 會更容易管理，若是使用了 CSS 變數但是卻分別設置在標題和圖片上，抽取 CSS 共用變數的意義就不在了，並不會更好管理。

> 參考來源：
> [CSS Variables](https://medium.com/codezillas/css-variables-62eba9e30e97)
> [規範](https://www.w3.org/TR/css-variables-1/)

---

### CSS 樣式設置

#### CSSStyleDeclaration.setProperty()
透過此屬性可以設置行內樣式。同樣的也可直接設定 `el.style = ""`，不過兩者的差別在於 `setProperty` 是增加屬性，但是透過 `style` 直接設置等於重新賦值，舊有的屬性會被刪除，這不是我們想要的。

```javascript=
style.setProperty(propertyName, value, priority);
```

```javascript=
const unit = e.target.dataset.sizing || "";
document.documentElement.style.setProperty(`--${e.target.name}`, e.target.value   +   unit)
```
### CSSOM
**CSS對象模型**是一組API，允許從JavaScript操作CSS的。它是DOM和HTML API的挂件，但僅適用於CSS。它允許動態讀取和修改CSS樣式。


#### The [CSSStyleDeclaration](https://drafts.csswg.org/cssom/#cssstyledeclaration) Interface

:::info
\[[Exposed](https://heycam.github.io/webidl/#Exposed)=Window\]
interface `CSSStyleDeclaration` {
  \[[CEReactions](https://html.spec.whatwg.org/multipage/custom-elements.html#cereactions)\] attribute [CSSOMString](https://drafts.csswg.org/cssom/#cssomstring) [cssText](https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-csstext);
  readonly attribute [unsigned long](https://heycam.github.io/webidl/#idl-unsigned-long) [length](https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-length);
  getter [CSSOMString](https://drafts.csswg.org/cssom/#cssomstring) [item](https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-item)([unsigned long](https://heycam.github.io/webidl/#idl-unsigned-long) `index`[](https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-item-index-index));
  [CSSOMString](https://drafts.csswg.org/cssom/#cssomstring) [getPropertyValue](https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-getpropertyvalue)([CSSOMString](https://drafts.csswg.org/cssom/#cssomstring) `property`[](https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-getpropertyvalue-property-property));
  [CSSOMString](https://drafts.csswg.org/cssom/#cssomstring) [getPropertyPriority](https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-getpropertypriority)([CSSOMString](https://drafts.csswg.org/cssom/#cssomstring) `property`[](https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-getpropertypriority-property-property));
  \[[CEReactions](https://html.spec.whatwg.org/multipage/custom-elements.html#cereactions)\] void [setProperty](https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-setproperty)([CSSOMString](https://drafts.csswg.org/cssom/#cssomstring) `property`[](https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-setproperty-property-value-priority-property), \[[LegacyNullToEmptyString](https://heycam.github.io/webidl/#LegacyNullToEmptyString)\] [CSSOMString](https://drafts.csswg.org/cssom/#cssomstring) `value`[](https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-setproperty-property-value-priority-value), optional \[[LegacyNullToEmptyString](https://heycam.github.io/webidl/#LegacyNullToEmptyString)\] [CSSOMString](https://drafts.csswg.org/cssom/#cssomstring) `priority`[](https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-setproperty-property-value-priority-priority) = "");
  \[[CEReactions](https://html.spec.whatwg.org/multipage/custom-elements.html#cereactions)\] [CSSOMString](https://drafts.csswg.org/cssom/#cssomstring) [removeProperty](https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-removeproperty)([CSSOMString](https://drafts.csswg.org/cssom/#cssomstring) `property`[](https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-removeproperty-property-property));
  readonly attribute [CSSRule](https://drafts.csswg.org/cssom/#cssrule)? [parentRule](https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-parentrule);
  \[[CEReactions](https://html.spec.whatwg.org/multipage/custom-elements.html#cereactions)\] attribute \[[LegacyNullToEmptyString](https://heycam.github.io/webidl/#LegacyNullToEmptyString)\] [CSSOMString](https://drafts.csswg.org/cssom/#cssomstring) [cssFloat](https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-cssfloat);
};

:::

> 規範：[CSSOM](https://drafts.csswg.org/cssom/#the-cssstylesheet-interface)

---

### CSS filter
CSS 濾鏡可以做到很多近似於 `photoshop` 的功能，詳情可查閱 [https://css-tricks.com/almanac/properties/f/filter/](https://css-tricks.com/almanac/properties/f/filter/)

```css
/* URL to SVG filter */
filter: url("filters.svg#filter-id");

/* <filter-function> values */
filter: blur(5px);
filter: brightness(0.4);
filter: contrast(200%);
filter: drop-shadow(16px 16px 20px blue);
filter: grayscale(50%);
filter: hue-rotate(90deg);
filter: invert(75%);
filter: opacity(25%);
filter: saturate(30%);
filter: sepia(60%);

/* Multiple filters */
filter: contrast(175%) brightness(3%);

/* Use no filter */
filter: none;

/* Global values */
filter: inherit;
filter: initial;
filter: unset;
```

> [filter 濾鏡效果參考](https://css-tricks.com/almanac/properties/f/filter/)


**`transition-timing-function`**

此 CSS 屬性用於表示各個被[動畫特效](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)影響的屬性的區間值計算方式。

```javascript=
/* Keyword */
transition-timing-function: ease;
transition-timing-function: ease-in;
transition-timing-function: ease-out;
transition-timing-function: ease-in-out; //緩進緩出
transition-timing-function: linear; //線性
transition-timing-function: step-start;
transition-timing-function: step-end;

/* 函數 */
transition-timing-function: steps(4, end);
transition-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1);
transition-timing-function: frames(10);

/* 多個函數 */
transition-timing-function: ease, step-start, cubic-bezier(0.1, 0.7, 1.0, 0.1);

/* 全域值 */
transition-timing-function: inherit;
transition-timing-function: initial;
transition-timing-function: unset;

/* 包含 transition-property */
transition-property: width, height;
transition-timing-function: ease-in, ease-out; // ease-in to width and ease-out to height
```

