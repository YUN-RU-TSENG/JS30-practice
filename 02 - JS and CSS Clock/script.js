(() => {

  // debugger;
  // setInitialTime();
  // setInterval(setCurrentTime, 1000);

  let clockTime;
  clockTime = {};

  setInitialTime();
  setInterval(setCurrentTime, 1000);

  function setInitialTime(){
    setInitialTimeData();
    setTimeDisaply();
  }

  function setCurrentTime(){
    addTimeData();
    setTimeDisaply();
    console.log(clockTime)
  }

  function setInitialTimeData() {
    const time = new Date();

    clockTime.second = time.getSeconds();
    clockTime.minute = time.getMinutes();
    clockTime.hour = time.getHours();
  }

  function setTimeDisaply(){
    const hourHand = document.querySelector(".hour-hand");
    const minHand = document.querySelector(".min-hand");
    const secondHand = document.querySelector(".second-hand");

    secondHand.style.transform = timeToDegress(clockTime.second, "second");
    minHand.style.transform = timeToDegress(clockTime.minute, "minute");
    hourHand.style.transform = timeToDegress(clockTime.hour, "hour");
  }

  function addTimeData() {
    clockTime.second += 1;
    clockTime.minute += 1 / 60;
    clockTime.hour += 1 / 3600;
  }

  function timeToDegress(time, timeType) {
    const displayDegTransform = 90;
    switch (timeType) {
      case "second":
            return `rotate(${(time / 60) * 360 + displayDegTransform}deg)`
      case "minute":
            return `rotate(${(time / 60) * 360 + displayDegTransform}deg)`
      case "hour":
            return `rotate(${((time % 12) / 12) * 360 + displayDegTransform}deg)`
    }
  }

})();















// 方法二

// (() => {
//   window.requestAnimationFrame(step);

//   function setInitialTime() {
//     const hourHand = document.querySelector(".hour-hand");
//     const minHand = document.querySelector(".min-hand");
//     const secondHand = document.querySelector(".second-hand");

//     const time = new Date(), clockTime = {}, clockDisplayDeg = {};

//     // 由於的變數 clockTime 不只 minute、hour 會用到，顧不與下面的畫面邏輯整理一起，避免後續他人調整順序錯誤造成不知邏輯錯誤出在哪裡。
//     // 避免畫面回到零度時出現逆時鐘
//     clockTime.second = time.getSeconds();
//     clockTime.minute = time.getMinutes();
//     clockTime.hour = time.getHours();

//     // 這裡是展示的角度，時針與分針會加上分鐘秒數造成的細微不同
//     clockDisplayDeg.second = (clockTime.second / 60) * 360;
//     clockDisplayDeg.minute = (clockTime.minute / 60) * 360 + (clockTime.second / 60) * 6;
//     clockDisplayDeg.hour = ((clockTime.hour % 12) / 12) * 360 + (clockTime.minute / 60) * 30;

//     secondHand.style.transform = addDisplayDeg(clockDisplayDeg.second);
//     minHand.style.transform = addDisplayDeg(clockDisplayDeg.minute);
//     hourHand.style.transform = addDisplayDeg(clockDisplayDeg.hour);
//   }

//   // 由於畫面中使用 transform: 90deg 達到 0 度，所以最終要加上 90 度
//   function addDisplayDeg(deg) {
//     return `rotate(${deg + 90}deg)`;
//   }

//   function step() {
//     setInitialTime();
//     window.requestAnimationFrame(step);
//   }
// })();

// 方法三

// window.setInterval(addInlineStyle, 1000)

// function addInlineStyle() {
//   const time = new Date();
//   const currentTime = {};
//   const angle = {};

//   const second_hand = document.querySelector(".second-hand");
//   currentTime["second"] = time.getSeconds();
//   angle.second = (currentTime.second / 60) * 360 + 90;
//   second_hand.style.transform = `rotate(${angle.second}deg)`;

//   const min_hand = document.querySelector(".min-hand");
//   currentTime["minute"] = time.getMinutes();
//   angle.minute =
//     (currentTime.minute / 60) * 360 + (currentTime.second / 60) * 6 + 90;
//   min_hand.style.transform = `rotate(${angle.minute}deg)`;

//   const hour_hand = document.querySelector(".hour-hand");
//   currentTime["hour"] = time.getHours();
//   angle.hour = (currentTime.hour / 12) * 360 + (currentTime.minute / 60) * 30 + 90;
//   hour_hand.style.transform = `rotate(${angle.hour}deg)`;

// }
