void function IIFE() {
  if(!navigator.geolocation) return;
  // 當位置改變時，重新加載
  navigator.geolocation.watchPosition(setLocation, setLocationFail);

  /**
   * @brief 當取得位置資訊，執行打印畫面經緯度
   * @param {GeolocationCoordinates } 位置資訊
   */
  function setLocation(data) {
    const speed = document.querySelector(".speed-value");
    const units = document.querySelector(".units");
    
    speed.textContent = data.coords.latitude;
    units.textContent = data.coords.longitude;
  }

  /**
   * @brief 當取得位置資訊產生問題時，執行此函數透過 alert 告知使用者。
   * @param {GeolocationPositionError} 無法取得時產生的錯誤資訊物件
   */
  function setLocationFail(err) {
    switch (err.code) {
      case 1:
        alert('沒有使用地理資訊權限，請開啟權限');
        break;
      case 2:
        alert('位置無法使用，請重整');
        break;
      case 3:
        alert('請求超時，請重整');
        break;
    }
  }
}();
