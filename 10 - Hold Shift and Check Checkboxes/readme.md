# 10 - Hold Shift and Check Checkboxes
###### tags: `JS30`

## 解題過程
這題使用的是 Alex 的解題過程：

使用陣列的方式解題，透過將 input NodeList 轉換成陣列，並且存取起始點（上一個 check），和終點（下一個 check），透過 slice 的方式擷取，並且將其中間段選取。

:::spoiler
```javascript=
(() => {

  const items = Array.from(document.querySelectorAll(".item input"));
  let indexOfStart = null;
  let shiftIsKeydown = false;

  items.forEach((element, index) => element.addEventListener("click", function(e){
    return setCheckInput.call(this, e, index)
    // return setCheckInput.apply(this, [e, index])
  }));

  window.addEventListener("keydown", (e) => (e.key === "Shift") && (shiftIsKeydown = true));
  window.addEventListener("keyup", (e) => (e.key === "Shift") && (shiftIsKeydown = false));

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
```
:::

點擊深入細節

![](https://i.imgur.com/H6kyZ6p.png)

## addEventListener 回呼函式如何使用自訂參數
> 當使用事件監聽器時，由於會幫我們自定義事件參數 `e`，若是想要自定義參數，且保留 `e` 時，就可以使用 `call`、`apply` 等方式。

若是要使用 `call`、`apply` 等方式撰寫 callback 函式，要記得不可以直接在 fun.call() 參數寫，要使用 function(){ return fun.call() } 的方式撰寫。

* 使用 `call(this, ...[])` 綁定參數。
* 使用 匿名函數回傳要使用的回呼，才可以傳遞 `e`，這個自動綁定的參數。

```javascript=
items.forEach((element, index) => element.addEventListener("click", function(e){
    return setCheckInput.call(this, ...[e, index])
    // return setCheckInput.apply(this, [e, index])
  }));
items.forEach((element, index) => element.addEventListener("click", setCheckInput.call(this, ...[e, index])
    // 錯誤的
  }));
```


### call v.s. apply
以綁定的 `this` 以及參數去呼叫函式。

```javascript=
function a(){
    console.log(arguments)
}
a.call(null, [12,22,32,42])
a.call(null, ...[12,22,32,42])
a.apply(null, [12,22,32,42]) // 有了展開運算子可以不使用 apply
```

| 名稱 	| 內容 	|
|---------	|---------------------------------------------------------------------------	|---	|
| `call()` [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) 	| 呼叫一個 fun，使用自定義參數以及 this 此處的參數接受的是逐項傳入的參數。 	|
| `apply()` [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)	| 呼叫一個 fun，使用自定義參數以及 this 此處的參數接受的是陣列形式。 	|

## 將 Array-like 轉換成 Array

```javascript=
var divs = document.querySelectorAll('div')
var one = Array.from(divs)
var two = [...divs]
var three = Array.prototype.slice.call(divs)
```

`Array.prototype.slice.call(divs)` 有些不懂。

## slice() v.s spilce()

```javascript=
arr.slice(_\[_begin\[, end\]\])
```

```javascript=
let arrDeletedItems = array.splice(start\[, deleteCount\[, item1\[, item2\[, ...\]\]\]\])
```

| 方法 	| 內容 	|
|----------	|---------------------------------------------------------------------------------------------------------------------------	|
| splice() 	| 方法通過刪除或替換現有元素或者原地添加新的元素來修改數組,並以數組形式返回被修改的內容。此方法會改變原數組。 	|
| slice() 	| 方法會回傳一個新陣列物件，為原陣列選擇之 begin 至 end（不含 end）部分的淺拷貝（shallow copy）。而原本的陣列將不會被修改。 	|

:::warning
看不懂：
```javascript=
function list() {
  return Array.prototype.slice.call(arguments)
}

let list1 = list(1, 2, 3) // [1, 2, 3]
```
:::

:::success
解析 JS 原始碼 map ：
規範定義
> [https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.slice](https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.slice)

```json=
LetObeToObject(this value).
ReturnIfAbrupt(O).
LetlenbeToLength(Get(O, "length")).
ReturnIfAbrupt(len).
IfIsCallable(callbackfn)isfalse, throw a TypeError exception.
IfthisArgwas supplied, letTbethisArg; else letTbeundefined.
LetAbeArraySpeciesCreate(O, len).
ReturnIfAbrupt(A).
Letkbe 0.
Repeat, whilek<len\ a. LetPkbeToString(k).\ b. LetkPresentbeHasProperty(O, Pk).\ c.ReturnIfAbrupt(kPresent).\ d. IfkPresentistrue, then\ d-1. LetkValuebeGet(O, Pk).\ d-2.ReturnIfAbrupt(kValue).\ d-3. LetmappedValuebeCall(callbackfn, T, «kValue, k, O»).\ d-4.ReturnIfAbrupt(mappedValue).\ d-5. LetstatusbeCreateDataPropertyOrThrow (A, Pk, mappedValue).\ d-6.ReturnIfAbrupt(status).\ e. Increasekby 1.
ReturnA.
```

網上解讀資源：
> [【進階 6-3 期】Array 原型方法源碼實現大揭秘](https://juejin.im/post/5d76f08ef265da03970be192)

```javascript=
Array.prototype.map = function(callbackfn, thisArg) {
  // 异常处理
  if (this == null) {
  	throw new TypeError("Cannot read property 'map' of null or undefined");
  }
  // Step 1. 转成数组对象，有 length 属性和 K-V 键值对
  let O = Object(this)
  // Step 2. 无符号右移 0 位，左侧用 0 填充，结果非负
  let len = O.length >>> 0
  // Step 3. callbackfn 不是函数时抛出异常
  if (typeof callbackfn !== 'function') {
    throw new TypeError(callbackfn + ' is not a function')
  }
  // Step 4.
  let T = thisArg
  // Step 5.
  let A = new Array(len)
  // Step 6.
  let k = 0
  // Step 7.
  while(k < len) {
    // Step 7.1、7.2、7.3
    // 检查 O 及其原型链是否包含属性 k
    if (k in O) {
      // Step 7.3.1
      let kValue = O[k]
      // Step 7.3.2 执行 callbackfn 函数
      // 传入 this, 当前元素 element, 索引 index, 原数组对象 O
      let mappedValue = callbackfn.call(T, kValue, k, O)
    	// Step 7.3.3 返回结果赋值给新生成数组
      A[k] = mappedValue
    }
    // Step 7.4
    k++
  }
  // Step 8. 返回新数组
  return A
}
```
完全看不懂之 V8 解釋：
> [V8 系列文](https://v8.dev/blog/tags/ecmascript)
> [微軟開發者介紹 V8 與 map](https://dev.to/captainsafia/everything-you-needed-to-know-and-more-about-array-map-4a9b)

```javascript=
function ArrayMap(f, receiver) {
  CHECK_OBJECT_COERCIBLE(this, "Array.prototype.map");

  // Pull out the length so that modifications to the length in the
  // loop will not affect the looping and side effects are visible.
  var array = TO_OBJECT(this);
  var length = TO_LENGTH_OR_UINT32(array.length);
  return InnerArrayMap(f, receiver, array, length);
}
```

找到相關 MDN polyfill 說明了實作與規範搭配：
> [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

```javascript=
// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

  Array.prototype.map = function(callback/*, thisArg*/) {

    var T, A, k;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the |this|
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal
    //    method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = arguments[1];
    }

    // 6. Let A be a new array created as if by the expression new Array(len)
    //    where Array is the standard built-in constructor with that name and
    //    len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while (k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal
        //    method of O with argument Pk.
        kValue = O[k];

        // ii. Let mappedValue be the result of calling the Call internal
        //     method of callback with T as the this value and argument
        //     list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor
        // { Value: mappedValue,
        //   Writable: true,
        //   Enumerable: true,
        //   Configurable: true },
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, k, {
        //   value: mappedValue,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // });

        // For best browser support, use the following:
        A[k] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };
}

```
:::



