# 06 - Type Ahead
###### tags: `JS30`

### 目的：
遠端串接 API 然後將資料接回，並且透過正則篩選資料，接著打印到頁面上。

---

## Ajax
> [https://medium.com/beginners-guide-to-mobile-web-development/the-fetch-api-2c962591f5c](https://medium.com/beginners-guide-to-mobile-web-development/the-fetch-api-2c962591f5c) 有錯將 Fetch 寫成由 ECMA 定義，但是由 WHATCH 定義才對。

在 Ajax 概念出現以前，為了更新部分網頁頁面，也得向網頁伺服器發出完整網頁請求，伺服器收到請求後會建立一個完整頁面並且回傳給網頁瀏覽器。這表示即使是加載頁面的一小部分，也得要重新加載頁面。

使用 Ajax，瀏覽器能夠非同步的向伺服器發送、檢索資料（在後台）。

| AJAX(Asynchronous JavaScript and XML) 	|  	|
|---------------------------------------	|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| [XMLHttpRequest](https://xhr.spec.whatwg.org/) 	| 2006年，美國萬維網聯盟發佈了 XMLHttpRequest 物件的工作草案規範，用於非同步從伺服器檢索資料。Xmlhttprequest 物件背後的原始概念最初是由 outlookwebaccess 的開發人員(由 Microsoft) 建立的。  一開始他只能透過 http 接受 XML 類型資料，現在他可以獲得的不僅僅是 XML 類型的資料，還有 json、html 等 	|
| [Fetch](https://fetch.spec.whatwg.org/) 	| 由於上面這組實作非同步請求的方式太過複雜，所以 Fetch 出現了。根據 Google Developers Documentation Fetch 的說法，它使得非同步請求變得容易。它使 非同步請求和處理應變得比舊版 XMLHttpRequest 更加容易。 這是對 XMLHttpRequest API 的一個改進。 Fetch 和 XMLHttpRequest 之間的主要區別在於 Fetch API 使用了 Promises，因此避免了大量的 callback。 	|

:::info
Fetch 發出請求後，得到的是 response 物件，他並非直接可用的 data，得要用 `.json()` 方法得到我們需要的資料。
:::

```javascript=
// XMLHttpRequest 為一個建構函式

console.log(window.XMLHttpRequest);
console.log(window.XMLHttpRequest.__proto__.__proto__);

// 創建過程，首先創建實例
const httpRequest = new window.XMLHttpRequest();

// 接著下面代表的是當請求成功時會執行的函式，他是一個事件監測
// 器，當發送請求後 stste 改變，便會觸發，所以此處相當於 onclick
httpRequest.onreadystatechange = function(event) {

  // 狀態自零開始，但是零不改變所以不會被響應
  // Readystate 值的完整列表见 xmlhttprequest.readyState，如下:
  // 0 (uninitialized) or (request not initialized) 0(未初始化)或(未初始化請求)
  // 1 (loading) or (server connection established) 1(加載)或(服務器連接建立)
  // 2 (loaded) or (request received) 2(已裝載)或(已收到請求)
  // 3 (interactive) or (processing request) 3(交互式)或(處理要求)
  // 4 (complete) or (request finished and response is ready) 4(完成)或(請求完成並準備響應)
  console.warn(
    "httpRequest.readyState",
    httpRequest.readyState,
    "XMLHttpRequest.DONE",
    XMLHttpRequest.DONE
  );
  console.log("httpRequest.status", httpRequest.status);
  // 真正執行時，需要確認請求完才執行，所以需要用 if 判定，
  try {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
      console.log(`
        正確啦
        **********
        ${JSON.parse(httpRequest.responseText)}
        **********
        是請求回來的資料。`);
    } else {
      console.log("資料尚未請求");
    }
  } catch (e) {
    console.error(e.description);
  }
};

// 初始化請求細節設定，設定請求方式，請求位址
httpRequest.open("GET", "./data.json");
// 發送請求
httpRequest.send();


```

```javascript=
console.log(fetch);

fetch("./data.json", {
  method: "GET", // 預設也是 get
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
```

### filter

回傳一組淺拷貝陣列，是通過過濾 callback 回傳值是 `true` 的陣列值。

:::warning
注意是淺拷貝，只有第一層不會受到影響
:::

#### 公式
```javascript=
let newArray = arr.filter(callback(element[, index, [array]])[, thisArg])
```

**第二個參數可以綁定 this，但前提是前面的 callback 非 arrow function，因為箭頭函式沒有 this ！** 綁定匿名、箭頭函式的差異：

```javascript=
var c = [12,12,12,12,{a:11}]
var b  ={}

// no 箭頭函式無法綁定
c.filter((e,i,a)=>{
    console.log(e,i,a);
    console.log(this)
}, b)

// yes 匿名函式可以
c.filter(function(e,i,a){
    console.log(e,i,a);
    console.log(this)
}, b)
```

---

### curl
**cURL**是一個利用URL語法在[指令行](https://baike.baidu.com/item/%E5%91%BD%E4%BB%A4%E8%A1%8C)下工作的檔案傳輸工具（可以幫助我們處理網頁協議），1997年首次發行。它支持檔案上傳和下載，所以是綜合傳輸工具，但按傳統，習慣稱cURL為下載工具。cURL還包含了用於程式開發的libcurl。

cURL支持的通信協定有[FTP](https://baike.baidu.com/item/FTP)、[FTPS](https://baike.baidu.com/item/FTPS)、[HTTP](https://baike.baidu.com/item/HTTP)、[HTTPS](https://baike.baidu.com/item/HTTPS)、[TFTP](https://baike.baidu.com/item/TFTP)、[SFTP](https://baike.baidu.com/item/SFTP)、[Gopher](https://baike.baidu.com/item/Gopher)、[SCP](https://baike.baidu.com/item/SCP)、[Telnet](https://baike.baidu.com/item/Telnet)、DICT、[FILE](https://baike.baidu.com/item/FILE)、[LDAP](https://baike.baidu.com/item/LDAP)、LDAPS、[IMAP](https://baike.baidu.com/item/IMAP)、[POP3](https://baike.baidu.com/item/POP3)、[SMTP](https://baike.baidu.com/item/SMTP)和[RTSP](https://baike.baidu.com/item/RTSP)。

---

### 數字排版

在這題，有需要對於數字使用千分為排版，作者使用了正則

#### 使用 numeral.js 解決
過時，現在多用 toLocalString
```htmlmixed=
<script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
```

```javascript=
numeral(city.population).format(0,000)
```

#### 使用正則
之前看過一次，容易忘記是大問題。別人看不看得懂也是問題。

#### 使用 toLocalString
> [https://www.techonthenet.com/js/number_tolocalestring.php](https://www.techonthenet.com/js/number_tolocalestring.php)

因為toLocaleString（）是在JavaScript中，toLocaleString（）是一個數字方法，用於將數字轉換為特定於語言環境的數字表示形式（必要時對結果進行舍入），將其值作為字符串返回。 Number對象的方法，所以必須通過Number類的特定實例調用它。
**將數字表達為本地的數字字串表達方式：百分比、進位方式、小數點、是否為表達貨幣的數字**

```javascript=
number.toLocaleString([local [, options]]);
```

#### local
表達所在地區。在忽略`locales`和`options`參數的實現中，使用的語言環境和返回的字符串形式完全取決於實現。

```javascript=
const number = 1024.1234

number.toLocaleString('zh-TW')
// "1,024.123"

number.toLocaleString('zh-Hans-CN-u-nu-hanidec')
// "一,〇二四.一二三"
```

#### options

```javascript=
number.toLocaleString('zh-TW',{
    style: 'decimal', useGrouping: true,  minimumIntegerDigits: 15,
})
```

![](https://i.imgur.com/LSw7hHE.png)

重點就是可以選擇：小數點（預設）、百分比、貨幣等表示方是。

接著設定細向即可。

懶得記，請查：
> [https://www.w3schools.com/jsref/jsref\_tolocalestring\_number.asp](https://www.w3schools.com/jsref/jsref_tolocalestring_number.asp) 表格可以查
> [https://ououe.com/posts/2019/12/06/tolocalestring/](https://ououe.com/posts/2019/12/06/tolocalestring/) 個人博客寫的清楚

---

### string.match

**`match()`** 方法檢索返回一個字符串匹配正則表達式的的結果。

```javascript=
str.match(regexp)
```

-   如果使用g標誌，則將返回與完整正則表達式匹配的所有結果，但不會返回捕獲組。
-   如果未使用g標誌，則僅返回第一個完整匹配及其相關的捕獲組（`Array`）。 在這種情況下，返回的項目將具有如下所述的其他屬性。

```javascript=
var regexpG = /e/gi;
var regexp = /e/;
var text = 'Hello elaa'

var one = text.match(regexp);
var two = text.match(regexpG);
```

### Document.createDocumentFragment()

建立新的 [`DocumentFragment`](https://developer.mozilla.org/zh-TW/docs/Web/API/DocumentFragment "DocumentFragment 介面表示了一個沒有父節點的最小化文件物件。DocumentFragment 被當作一種輕量化的 Document，用如同標準文件一般的方式保存片段的文件結構（由節點組成）。關鍵的區別在於文件片段不是真實的 DOM 結構，文件片段的變動並不會影響目前的網頁文件，也不會導致回流（reflow）或引起任何影響效能的情況發生。").

```javascript=
var fragment = document.createDocumentFragment();
```


### innerHTML vs textContent

前者會解析傳入的值成 HTML，後者不會。

[https://codepen.io/yunru1230/pen/GRpzwwP?editors=1011](https://codepen.io/yunru1230/pen/GRpzwwP?editors=1011)
