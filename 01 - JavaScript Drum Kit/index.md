# JS30 - 1
頁面上一共有九個按鈕框框，請製作當按下相應的鍵盤時，會發出聲音效果的功能。

## 作法

1. 監聽鍵盤事件，並且透過預先在元件上實作的 dataset 確認相對應的資料，當資料相符改變元件樣式、且播放聲音。

:::warning
分成兩種，一種是概念深入、一種是作法紀錄、一種是記錄下操作方式
:::

## 概念深入

### [audio & video](https://www.w3.org/standards/webdesign/audiovideo)
The terms audio and video commonly refers to the time-based media storage format for sound/music and moving pictures information. Audio and video digital recording, also referred as audio and video codecs, can be uncompressed, lossless compressed, or lossy compressed depending on the desired quality and use cases.

#### What is Audio and Video Used For?
Audio and video are used for enhancing the experience with Web pages (e.g. audio background) to serving music, family videos, presentations, etc. The Web content accessibility guidelines recommend to always provide alternatives for time-based media, such as captions, descriptions, or sign language.

#### [HTMLMediaElement](https://html.spec.whatwg.org/multipage/media.html#htmlmediaelement)

```javascript=
enum CanPlayTypeResult { "" /* empty string */, "maybe", "probably" };
typedef (MediaStream or MediaSource or Blob) MediaProvider;

[Exposed=Window]
interface HTMLMediaElement : HTMLElement {

  // error state
  readonly attribute MediaError? error;

  // network state
  [CEReactions] attribute USVString src;
  attribute MediaProvider? srcObject;
  readonly attribute USVString currentSrc;
  [CEReactions] attribute DOMString? crossOrigin;
  const unsigned short NETWORK_EMPTY = 0;
  const unsigned short NETWORK_IDLE = 1;
  const unsigned short NETWORK_LOADING = 2;
  const unsigned short NETWORK_NO_SOURCE = 3;
  readonly attribute unsigned short networkState;
  [CEReactions] attribute DOMString preload;
  readonly attribute TimeRanges buffered;
  void load();
  CanPlayTypeResult canPlayType(DOMString type);

  // ready state
  const unsigned short HAVE_NOTHING = 0;
  const unsigned short HAVE_METADATA = 1;
  const unsigned short HAVE_CURRENT_DATA = 2;
  const unsigned short HAVE_FUTURE_DATA = 3;
  const unsigned short HAVE_ENOUGH_DATA = 4;
  readonly attribute unsigned short readyState;
  readonly attribute boolean seeking;

  // playback state
  attribute double currentTime;
  void fastSeek(double time);
  readonly attribute unrestricted double duration;
  object getStartDate();
  readonly attribute boolean paused;
  attribute double defaultPlaybackRate;
  attribute double playbackRate;
  readonly attribute TimeRanges played;
  readonly attribute TimeRanges seekable;
  readonly attribute boolean ended;
  [CEReactions] attribute boolean autoplay;
  [CEReactions] attribute boolean loop;
  Promise<void> play();
  void pause();

  // controls
  [CEReactions] attribute boolean controls;
  attribute double volume;
  attribute boolean muted;
  [CEReactions] attribute boolean defaultMuted;

  // tracks
  [SameObject] readonly attribute AudioTrackList audioTracks;
  [SameObject] readonly attribute VideoTrackList videoTracks;
  [SameObject] readonly attribute TextTrackList textTracks;
  TextTrack addTextTrack(TextTrackKind kind, optional DOMString label = "", optional DOMString language = "");
};
```

#### [HTMLAudioElement](https://html.spec.whatwg.org/multipage/media.html#htmlmediaelement)

接口本身沒有屬性、方法，play()等方法是繼承自 media 的方法。
> 個人偏好的方法還是使用 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement) 整理好的最快。

```javascript=
[Exposed=Window,
 LegacyFactoryFunction=Audio(optional DOMString src)]
interface HTMLAudioElement : HTMLMediaElement {
  [HTMLConstructor] constructor();
};
```

> 繼承自 media 在本題中使用到的屬性

| 屬性 | 類型    | 功能以及描述    |
| -------- | ------ | ------------- |
| play()   | void（指的是沒有回傳數值） | 開始播放                                 |
| pause()  | void  | 暫停播放                                 |
| load()   | void   | 重置媒體元素並重新啟動選擇媒體資源的操作 |
| currentTime  |  double   |  當前播放時間，單位為秒。為其賦值將會使媒體跳到一個新的時間。  |


### NodeList vs HTMLCollection

**`NodeList`** objects are collections of [nodes](https://developer.mozilla.org/en-US/docs/Glossary/Node/DOM), usually returned by properties such as [`Node.childNodes`](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes) and methods such as [`document.querySelectorAll()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll).

#### [Live vs. Static NodeLists](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)
Although they are both considered `NodeList`s, there are 2 varieties of NodeList: _live_ and _static_.

#### Live NodeLists
In some cases, the `NodeList` is _live_, which means that changes in the DOM automatically update the collection.

For example, [`Node.childNodes`](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes) is live

```javascript=
const parent = document.getElementById('parent');
let child_nodes = parent.childNodes;
console.log(child_nodes.length); // let's assume "2"
parent.appendChild(document.createElement('div'));
console.log(child_nodes.length); // outputs "3"
```

#### Static NodeLists
In other cases, the `NodeList` is _static, _where any changes in the DOM does not affect the content of the collection. The ubiquitous [`document.querySelectorAll()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) method returns a _static_ `NodeList`.

### [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection)

The **`HTMLCollection`** interface represents a generic collection (array-like object similar to [`arguments`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)) of elements (in document order) and offers methods and properties for selecting from the list.

An `HTMLCollection` in the HTML DOM is live; it is automatically updated when the underlying document is changed.

### keyboard 事件

事件傳遞到 `body` 上，仍在研究為什麼。
```javascript=
document.addEventListener('keydown',(e)=>{console.log('keydown',e)})
document.addEventListener('keypress',(e)=>{console.log('keypress',e)})
document.addEventListener('keyup',(e)=>{console.log('keyup',e)})
```



| 事件 | 觸發頻率 | 解釋 |
| -------- | -------- | -------- |
| keydown | 一直觸發（和 keypress 交互連續觸發）     | 可以取得按下的鍵盤相對應代碼`keycode`，但是不區分大小寫（都是大寫）     |
| keypress |   一直觸發（和 keydown 交互連續觸發）     |   ==只針對可以輸出文字的內容有效，指的是 `esc` 這種無效== 可以取得按下的鍵盤相對應代碼`keycode`，且區分大小寫   |
| keyup  |    只觸發一次    |  可以取得按下的鍵盤相對應代碼`keycode`，但是不區分大小寫（都是大寫）  |

觸發順序：keydown → keypress → keyup

> [Tommy 參考文章：比較 keydown, keypress, keyup 的差異](https://medium.com/@yitailin/%E6%AF%94%E8%BC%83-keydown-keypress-keyup-%E7%9A%84%E5%B7%AE%E7%95%B0-4e873ba17e81)

:::info
### [Legacy Key & Mouse Event Attributes](https://w3c.github.io/uievents/#legacy-key-attributes)
These features were never formally specified and the current browser implementations vary in significant ways. The large amount of legacy content, including script libraries, that relies upon detecting the [user agent](https://w3c.github.io/uievents/#user-agent) and acting accordingly means that any attempt to formalize these legacy attributes and events would risk breaking as much content as it would fix or enable. Additionally, these attributes are not suitable for international usage, nor do they address accessibility concerns.

Therefore, this specification does not normatively define the events and attributes commonly employed for handling keyboard input, though they MAY be present in [user agents](https://w3c.github.io/uievents/#user-agent) for compatibility with legacy content. Authors SHOULD use the `[key](https://w3c.github.io/uievents/#dom-keyboardevent-key)` attribute instead of the `[charCode](https://w3c.github.io/uievents/#dom-keyboardevent-charcode)` and `[keyCode](https://w3c.github.io/uievents/#dom-keyboardevent-keycode)` attributes.
* 用 key 就好，其他不要用。
> 也一樣，看 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) 查更快
> 快速查 `key` [keycode](https://keycode.info/)
:::

### data-* attribute
> 節錄：[pjchender data-attribute](https://pjchender.blogspot.com/2017/01/html-5-data-attribute.html)
> 參考：[MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)
> [spec](https://www.w3.org/TR/2011/WD-html5-20110525/elements.html#embedding-custom-non-visible-data-with-the-data-attributes)



之所以會有 data-* attribute 的出現，是因為在製作網頁的過程中，我們常常會添加一些自己需要用到的屬性名稱，以方便自己容易理解，但總不能每個人在自己的網頁裡面都定義自己的屬性名稱，於是為了要避免大家在 HTML 結構中隨意的添加屬性，在 HTML5 中就多了 data-* attribte 這個屬性，其中的 * 就是一個可以自定義的名稱，例如：data-key='83' 或者是 data-item='1'

#### JS
```javascript=
div.dataset
```

```css=
div[data-key="${event.keyCode}"]
```

### [EventTarget](https://dom.spec.whatwg.org/#eventtarget)
An `[EventTarget](https://dom.spec.whatwg.org/#eventtarget)` object represents a target to which an [event](https://dom.spec.whatwg.org/#concept-event) can be [dispatched](https://dom.spec.whatwg.org/#concept-event-dispatch) when something has occurred.


```javascript=
[Exposed=(Window,Worker,AudioWorklet)]
interface EventTarget {
  constructor();

  void addEventListener(DOMString type, EventListener? callback, optional (AddEventListenerOptions or boolean) options = {});
  void removeEventListener(DOMString type, EventListener? callback, optional (EventListenerOptions or boolean) options = {});
  boolean dispatchEvent(Event event);
};

callback interface EventListener {
  void handleEvent(Event event);
};

dictionary EventListenerOptions {
  boolean capture = false;
};

dictionary AddEventListenerOptions : EventListenerOptions {
  boolean passive = false;
  boolean once = false;
};
```

### [Introduction to DOM Events](https://dom.spec.whatwg.org/#introduction-to-dom-events)

Throughout the web platform [events](https://dom.spec.whatwg.org/#concept-event) are [dispatched](https://dom.spec.whatwg.org/#concept-event-dispatch) to objects to signal an occurrence, such as network activity or user interaction. These objects implement the [EventTarget](https://dom.spec.whatwg.org/#eventtarget) interface and can therefore add [event listeners](https://dom.spec.whatwg.org/#concept-event-listener) to observe [events](https://dom.spec.whatwg.org/#concept-event) by calling [addEventListener()](https://dom.spec.whatwg.org/#dom-eventtarget-addeventlistener):

### [Event](https://dom.spec.whatwg.org/#event)
An [Event](https://dom.spec.whatwg.org/#event) object is simply named an event. It allows for signaling that something has occurred, e.g., that an image has completed downloading.

```javascript=
[Exposed=(Window,Worker,AudioWorklet)]
interface Event {
  constructor(DOMString type, optional EventInit eventInitDict = {});

  readonly attribute DOMString type;
  readonly attribute EventTarget? target;
  readonly attribute EventTarget? srcElement; // historical
  readonly attribute EventTarget? currentTarget;
  sequence<EventTarget> composedPath();

  const unsigned short NONE = 0;
  const unsigned short CAPTURING_PHASE = 1;
  const unsigned short AT_TARGET = 2;
  const unsigned short BUBBLING_PHASE = 3;
  readonly attribute unsigned short eventPhase;

  void stopPropagation();
           attribute boolean cancelBubble; // historical alias of .stopPropagation
  void stopImmediatePropagation();

  readonly attribute boolean bubbles;
  readonly attribute boolean cancelable;
           attribute boolean returnValue;  // historical
  void preventDefault();
  readonly attribute boolean defaultPrevented;
  readonly attribute boolean composed;

  [LegacyUnforgeable] readonly attribute boolean isTrusted;
  readonly attribute DOMHighResTimeStamp timeStamp;

  void initEvent(DOMString type, optional boolean bubbles = false, optional boolean cancelable = false); // historical
};

dictionary EventInit {
  boolean bubbles = false;
  boolean cancelable = false;
  boolean composed = false;
};
```


### [Difference between log() and dir()](https://developer.mozilla.org/en-US/docs/Web/API/Console/log#Difference_between_log_and_dir)
