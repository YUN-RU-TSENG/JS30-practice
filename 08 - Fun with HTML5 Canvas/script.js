(() => {
  const canvas = document.querySelector("canvas");
  canvasContext = canvas.getContext("2d");

  setCanvas({
    width: canvas.parentElement.clientWidth,
    height: 700,
    lineCap: "square",
    lineWidth: 0,
  });

  canvas.addEventListener("mousemove", drawInCanvas);
  canvas.addEventListener("mousedown", openDraw);
  canvas.addEventListener("mouseup", closeDraw);

  let [huePath, colorPath, isActive] = [true, true, false];
  let hue = 360;
  let [lastX, lastY] = [null, null];
  const [MAX_HUE_OF_HSL, MIN_HUE_OF_HSL] = [360, 1];

  /**
   * 設置基礎 canvas 細節
   * @param {*} width
   * @param {*} height
   * @param {*} lineCap
   * @param {*} lineWidth
   */
  function setCanvas({ width, height, lineCap, lineWidth }) {
    canvas.width = width;
    canvas.height = height;
    canvasContext.lineCap = lineCap;
    canvasContext.lineWidth = lineWidth;
  }

  /**
   * 繪製畫布
   * @param {*} e
   */
  function drawInCanvas(e) {
    // 非正在點擊的滑鼠移動不算
    if (!isActive) return;

    // 設定筆畫顏色
    canvasContext.strokeStyle = `hsl(${hue}, 90%, 80%)`;
    // 設定開始的新筆畫
    canvasContext.beginPath();
    // 移動到上次路徑
    canvasContext.moveTo(lastX, lastY);
    // 繪製上次路徑到這次路徑的線條
    canvasContext.lineTo(e.offsetX, e.offsetY);
    // 描邊該路徑
    canvasContext.stroke();

    // 設定筆畫全域變數變色，下一次會重新設定一次筆畫顏色
    if (hue === MAX_HUE_OF_HSL || hue === MIN_HUE_OF_HSL) huePath = !huePath;
    // 當顏色循環環，從另一個方向重新循環
    !!huePath ? hue++ : hue--;

    // 設定筆畫寬度全域變數變化
    if (canvasContext.lineWidth === 10 || canvasContext.lineWidth === 1)
      colorPath = !colorPath;
    !!colorPath ? canvasContext.lineWidth++ : canvasContext.lineWidth--;
    // 設定本次的最終路徑儲存
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }

  function openDraw(e) {
    isActive = !isActive;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }

  function closeDraw(e) {
    isActive = !isActive;
  }
})();
