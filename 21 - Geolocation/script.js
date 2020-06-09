void function IIFE() {
  const speed = document.querySelector(".speed-value");
  const units = document.querySelector(".units");

  if(!navigator.geolocation) return;

  // 當位置改變時，重新加載
  navigator.geolocation.watchPosition(setLocation, setLocationFail);

  function setLocation(data) {
    console.log(data.coords)
    speed.textContent = data.coords.latitude;
    units.textContent = data.coords.longitude;
  }

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
