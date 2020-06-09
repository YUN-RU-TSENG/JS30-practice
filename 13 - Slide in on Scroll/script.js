/**
 * @brief 滑動時圖片將出現。
 */

// 避免洩露，使用 IIFE
void function IIFE() {
  window.addEventListener("scroll", debounce(addImgAppearClass));

  function addImgAppearClass(e) {
    const sliderImages = document.querySelectorAll('.slide-in');
    sliderImages.forEach((sliderImage) => {
      const sliderImages = document.querySelectorAll(".slide-in");
      // window.scroll 滾動距離 window.innerHeight 視窗內部高度，兩者相加可得目前屏幕底部距離滾動為多少
      const slideInAt =
        window.scrollY + window.innerHeight - sliderImage.height / 2;
      // offsetTop 為距離包含塊距離，由於沒有脫離留，等於距離視窗頂部的距離，再加上元素本身高 height 即可以得到元素底部與視窗高度的距離
      const imageBottom = sliderImage.offsetTop + sliderImage.height;
      // 判斷視窗底部滾動高度是否大於圖片之餘頂部的高度
      const isHalfShown = slideInAt > sliderImage.offsetTop;
      // 判斷視窗頂部滾動高度是否小於圖片底部距離視窗高度
      const isNotScrolledPast = window.scrollY < imageBottom;
      if (isHalfShown && isNotScrolledPast) {
        sliderImage.classList.add("active");
      } else {
        sliderImage.classList.remove("active");
      }
    });
  }

  /**
   * @brief 由於 scroll 事件監聽會造成過多的效能耗費，所以使用了 debounce。
   * @param {function} functionCallback debounce 執行的函式
   * @param {Number} waitingTime debounce 時間
   */
  function debounce(functionCallback, waitingTime = 30) {
    // 設置 dobunce 是否結束，初始值為 undefined，當第一次 setTimeout 執行後，會產生數字，所以 callNow 在第一次執行 callback 後便會由於 setTimeOut 一直新增，回傳數字而一直為 Number 所以 callNow 會是 !Number 便會是 false。
    // 直到第一次 debounce 函數 setTimeout 執行 later 後，才會再變成 !Null，才可以在執行一次，依此循環。
    let timeout;
    return function () {
      let later = function () {
        timeout = null;
      };
      // 現在是否是可以執行的時間點
      let callNow = immediate && !timeout;
      // clearTimeout(timeout); 目前實行起來作用不太確定，好像沒有清除？
      timeout = setTimeout(later, waitingTime);
      callNow && functionCallback();
    };
  }
}();
