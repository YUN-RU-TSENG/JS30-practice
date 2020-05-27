# js - 08

## 如何繪製 canvas
> [https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas\_API/Tutorial/Drawing\_shapes](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)

建立上下文。

```javascript=
// canvas起初是空白的
  const canvas = document.querySelector('canvas');
// getContext() 用來獲得渲染上下文和它的繪畫功能
  const canvasContext = canvas.getContext('2d');
```

### 繪製圓形
繪製圓弧或者圓，我們使用`arc()`方法。

```javascript=
arc(x, y, radius, startAngle, endAngle, anticlockwise)
```

畫一個以（x, y）為圓心的以 radius 為半徑的圓弧（圓），從 startAngle 開始到 endAngle 結束，按照 anticlockwise 給定的方向（默認為順時針）來生成。

:::success
**注意：`arc()` 函數中表示角的單位是弧度，不是角度。角度與弧度的js表達式:**

**弧度=(Math.PI/180)*角度。**
:::

#### 實際上畫一個
```javascript=
canvasContext.arc(300,300,100, 0, (Math.PI/180)*360)
canvasContext.stroke();
```


### 畫線條

1.  首先，你需要創建路徑起始點。
2.  然後你使用[畫圖命令](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#Paths)去畫出路徑。
3.  之後你把路徑封閉。
4.  一旦路徑生成，你就能通過描邊或填充路徑區域來渲染圖形。

| 方法 	|  	|  	|
|-------------	|--------------------------------------------------------------------------	|---	|
| beginPath() 	| beginPath() 新建一條路徑，生成之後，圖形繪製命令被指向到路徑上生成路徑。而每次這個方法調用之後，列表清空重置，然後我們就可以重新繪製新的圖形。 	|  	|
| closePath() 	| closePath() 閉合路徑之後圖形繪製命令又重新指向到上下文中。就是閉合路徑closePath(),不是必需的。這個方法會通過繪製一條從當前點到開始點的直線來閉合圖形。如果圖形是已經閉合了的，即當前點為開始點，該函數什麼也不做。	|  	|
| stroke() 	| stroke() 通過線條來繪製圖形輪廓。 	|  	|
| fill() 	| fill() 通過填充路徑的內容區域生成實心的圖形。 	|  	|

:::success
**注意：當你調用fill()函數時，所有沒有閉合的形狀都會自動閉合，所以你不需要調用closePath()函數。但是調用stroke()時不會自動閉合****。**
:::

* #### [`lineTo(x, y)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineTo)

繪製一條從當前位置到指定x以及y位置的直線。

* #### `moveTo(_x_, _y_)`

將筆觸移動到指定的坐標x以及y上。

```javascript=
  // 填充三角形
  ctx.beginPath();
  ctx.moveTo(25, 25);
  ctx.lineTo(105, 25);
  ctx.lineTo(25, 105);
  ctx.fill();

  // 描邊三角形
  ctx.beginPath();
  ctx.moveTo(125, 125);
  ctx.lineTo(125, 45);
  ctx.lineTo(45, 125);
  ctx.closePath();
  ctx.stroke();
```

### 漸層
> [https://ithelp.ithome.com.tw/articles/10193989](https://ithelp.ithome.com.tw/articles/10193989)

```javascript=
//線性漸層
context.createLinearGradient(x0,y0,x1,y1);
x0:漸層起點的X軸座標。
y0:漸層起點的y軸座標。
x1:漸層終點的X軸座標。
y1:漸層終點的y軸座標。
```

```javascript=
//新增顏色
gradient.addColorStop(stop,color);
stop:代表漸層起點到終點間的位置。該值從0(起點)到1(終點)。
color:代表漸層在該位置上的顏色。
```

```javascript=
let canvas = document.getElementById('mycanvas');
let ctx = canvas.getContext('2d');
let grd = ctx.createLinearGradient(50,50, 150, 50);
grd.addColorStop(0, 'red');
grd.addColorStop(0.5, 'orange');
grd.addColorStop(1, 'yellow');
ctx.fillStyle=grd;
ctx.fillRect(50, 50, 150, 150);
```

### 問題 canvas

- [x] 當設置基礎的顏色寬度時，需要每次畫線條就重新設置嗎？不用
- [x] beginPath 做什麼的？設置新線條，否則每條線就無法重新繪製，會是一樣的樣式

### 色彩模型

| 色彩模型	| 內容	|  	|
|-----	|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|------------------------------------------------	|
| RGB 	| RGB顏色模型是一種加色模型，其中紅，綠和藍光以各種方式添加在一起以再現各種顏色。 模型的名稱,來自三種添加的原色(Blue, Green, Blue)的縮寫。 	|  	|
| HSL 	| HSL(Hue, Saturation, Lightness)和HSV(Hue, Saturation, Value) 是RGB顏色模型的兩種替代表示形式，它們更接近人類視覺感知顏色屬性的方式。 在HSL模型中，每種色調的顏色依序排列在圓環中， 圍繞著中心軸，亮度從底部的黑色到頂部的白色。 	| 色調(Hue)\|飽和度(Saturation)\|亮度(Lightness) 	|
| HSV 	| HSV(Hue, Saturation, Value)定義了另一種顏色空間。 它與RGB和CMYK模型相似。HSV色彩空間有三個組成部分：色調，飽和度和值。 	| 色調(Hue)\|飽和度(Saturation)\|值(Value) 	|

### HSV
![](https://i.imgur.com/hzcTqcH.png)

### HSL
![](https://i.imgur.com/unSiGON.png)
![](https://i.imgur.com/bCWf6DL.png)

#### 線上轉換工具
[https://www.ginifab.com.tw/tools/colors/rgb\_to\_hsv_hsl.html](https://www.ginifab.com.tw/tools/colors/rgb_to_hsv_hsl.html)

### 解構賦值
**解構賦值** (Destructuring assignment) 語法是一種 JavaScript 運算式，可以把陣列或物件中的資料解開擷取成為獨立變數。


```javascript=
let a, b, rest;
[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20

[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50]

({ a, b } = { a: 10, b: 20 });
console.log(a); // 10
console.log(b); // 20


// Stage 4(finished) proposal
({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});
console.log(a); // 10
console.log(b); // 20
console.log(rest); // {c: 30, d: 40}
```

### 可以使用預設值
當解構來源陣列對應的元素是 undefined 時，變數可以被設定預設值。

```javascript=
let a, b;

[a=5, b=7] = [1];
console.log(a); // 1
console.log(b); // 7
```

### 可以忽略某些值
可以忽略某些回傳值：

```js
function f() {
  return [1, 2, 3];
}

const [a, , b] = f();
console.log(a); // 1
console.log(b); // 3
```

:::success
```js
const [a, ...b,] = [1, 2, 3];

// SyntaxError 語法錯誤: 其餘元素不可以跟隨結尾逗號
// 需要把其餘運算子放在最後的元素
```
:::

### 物件解構

```js
const o = {p: 42, q: true};
const {p, q} = o;

console.log(p); // 42
console.log(q); // true
```


### 指派到新變數名稱
物件中的屬性可以解構並擷取到名稱跟該屬性不一樣的變數。

```js
const o = {p: 42, q: true};
const {p: foo, q: bar} = o;

console.log(foo); // 42
console.log(bar); // true
```

### 其餘參數
**其餘參數（rest parameter）** 語法可以讓我們表示不確定數量的參數，並將其視為一個陣列。

#### 與 argument 差異
以下是其餘參數和 arguments 物件三個主要的差異：

其餘參數是 arguments 物件被傳入到函式的時候，還沒被指定變數名稱的引數。
arguments 物件不是一個實際的陣列，而 rest parameter 是陣列的實體，即 sort、map、forEach 或 pop 可以直接在其餘參數被調用。
arguments 物件自身有額外的功能，例如 callee 屬性。

```javascript=
function f(...[a, b, c]) {
  return a + b + c;
}

f(1)          // NaN (b 和 c 都是 undefined)
f(1, 2, 3)    // 6
f(1, 2, 3, 4) // 6 (第四個參數不會被解構，因為解構式只有三個定義好的變數名稱)
```

### 滑鼠事件介面
![](https://i.imgur.com/UAW4Yzx.png)
> [https://blog.csdn.net/salunone/article/details/86523852](https://blog.csdn.net/salunone/article/details/86523852)

:::success
partial interface [MouseEvent](https://www.w3.org/TR/DOM-Level-3-Events/#interface-MouseEvent) {
  readonly attribute [double](http://heycam.github.io/webidl/#idl-double) [screenX](https://drafts.csswg.org/cssom-view/#dom-mouseevent-screenx);
  readonly attribute [double](http://heycam.github.io/webidl/#idl-double) [screenY](https://drafts.csswg.org/cssom-view/#dom-mouseevent-screeny);
  readonly attribute [double](http://heycam.github.io/webidl/#idl-double) [pageX](https://drafts.csswg.org/cssom-view/#dom-mouseevent-pagex);
  readonly attribute [double](http://heycam.github.io/webidl/#idl-double) [pageY](https://drafts.csswg.org/cssom-view/#dom-mouseevent-pagey);
  readonly attribute [double](http://heycam.github.io/webidl/#idl-double) [clientX](https://drafts.csswg.org/cssom-view/#dom-mouseevent-clientx);
  readonly attribute [double](http://heycam.github.io/webidl/#idl-double) [clientY](https://drafts.csswg.org/cssom-view/#dom-mouseevent-clienty);
  readonly attribute [double](http://heycam.github.io/webidl/#idl-double) [x](https://drafts.csswg.org/cssom-view/#dom-mouseevent-x);
  readonly attribute [double](http://heycam.github.io/webidl/#idl-double) [y](https://drafts.csswg.org/cssom-view/#dom-mouseevent-y);
  readonly attribute [double](http://heycam.github.io/webidl/#idl-double) [offsetX](https://drafts.csswg.org/cssom-view/#dom-mouseevent-offsetx);
  readonly attribute [double](http://heycam.github.io/webidl/#idl-double) [offsetY](https://drafts.csswg.org/cssom-view/#dom-mouseevent-offsety);
};
:::

| 事件屬性 	| 內容 	|  	|
|----------	|----------------------------------------------------------------------------------------------------------------------------------------------------	|------------------------------------------	|
| screenX 	| The screenX attribute must return the x-coordinate of the position where the event occurred relative to the origin of the Web-exposed screen area. 	| 提供了鼠標相對於屏幕坐標系的水平偏移量。 	|
| pageX 	| pageX 是一個由MouseEvent接口返回的相對於整個文檔的x（水平）坐標以像素為單位的只讀屬性。 	|  	|
| clientX 	| 提供事件發生時的應用客戶端區域的水平坐標 (與頁面坐標不同) 	|  	|
| x 	| The x attribute must return the value of clientX. 	|  	|
| offsetX 	| 規定了事件對象與目標節點的內填充邊（padding edge）在X軸方向上的偏移量。 	|  	|

:::success
下面的分派標誌等待研究：
The `pageY` attribute must follow these steps:

Pagey 属性必须遵循以下步骤:

1.  If the event’s [dispatch flag](https://dom.spec.whatwg.org/#dispatch-flag) is set, return the vertical coordinate of the position where the event occurred relative to the origin of the [initial containing block](https://drafts.csswg.org/css-display-3/#initial-containing-block) and terminate these steps.

    如果设置了事件的分派标志，则返回事件发生位置相对于初始包含块原点的垂直坐标，并终止这些步骤。

2.  Let offset be the value of the `[scrollY](https://drafts.csswg.org/cssom-view/#dom-window-scrolly)` attribute of the event’s associated `[Window](https://html.spec.whatwg.org/multipage/window-object.html#window)` object, if there is one, or zero otherwise.

    让偏移量为事件关联的 Window 对象的 scrollY 属性的值(如果有一个) ，否则为零。

3.  Return the sum of offset and the value of the event’s `[clientY](https://drafts.csswg.org/cssom-view/#dom-mouseevent-clienty)` attribute.

    返回偏移量和事件的 clientY 属性值。
> [https://drafts.csswg.org/cssom-view/#dom-mouseevent-offsetx](https://drafts.csswg.org/cssom-view/#dom-mouseevent-offsetx)
:::

### Window.innerWidth

| 屬性名稱 	| 內容 	|  	|
|--------------------	|----------------------------------------------------------------------------------------	|---	|
| Window.innerHeight 	| 瀏覽器窗口的視口（viewport）高度（以像素為單位）；如果有水平滾動條，也包括滾動條高度。 	|  	|
| Window.innerWidth 	| innerWidth返回以像素為單位的窗口的內部寬度。如果存在滾動條，則包括垂直滾動條的寬度。 	|  	|

[https://www.quirksmode.org/mobile/tableViewport_desktop.html#t05](https://www.quirksmode.org/mobile/tableViewport_desktop.html#t05)

---

### canvas

```javascript=
(()=>{
  const canvas = document.querySelector('canvas')
  canvasContext = canvas.getContext('2d')

  // 設置線條寬度以及樣式
  // 設置線條顏色
  canvasContext.strokeStyle = '#19caad';

  // 設置線條寬度
  canvasContext.lineWidth = 12

  // 設定線條結尾的樣式
  // butt
  // 線條端點樣式為方形
  // round
  // 線條端點樣式為圓形
  // square
  // 增加寬同線條寬度、高線條寬度一半的的方塊於線條端點
  canvasContext.lineCap = 'square'

  // 設定線條和線條間接合處的樣式
  // round
  // 代表圓弧型連接樣式。
  // bevel
  // 代表斜面型連接樣式。在連接區段的共同終點處填滿一個三角形區域，將原本的外接角處形成一個切面。
  // miter
  // 代表斜交型連接樣式。向外延伸連結區段外緣直到相交於一點，然後形成菱形區域，而miterLimit屬性會影響miter屬性。
  canvasContext.lineJoin = 'milter'

  // 產生新路徑
  canvasContext.beginPath();
  // 移動到目前繪畫點
  canvasContext.moveTo(0, 40)
  // 從目前繪畫點繪製一條直線到指定坐標點
  canvasContext.lineTo(350, 160);
  // 從目前繪畫點繪製一條直線到指定坐標點
  canvasContext.lineTo(700, 40);
  // 會在現在所在點到起始點間畫一條直線以閉合圖形，如果圖形已經閉合或是只含一個點，這個方法不會有任何效果
  canvasContext.closePath();
  // 填滿目前路徑
  canvasContext.fill();
  // 描邊目前路徑
  canvasContext.stroke();
})()
```