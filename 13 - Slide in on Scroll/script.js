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
    let timeout;
    return function () {
      const arg = arguments,
            constext = this;
      let later = function () {
        timeout = null;
        if(!immediate) functionCallback.call(this, ...arg);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, waitingTime);
      callNow && functionCallback.call(this, ...arg);
    };
  }
}();
