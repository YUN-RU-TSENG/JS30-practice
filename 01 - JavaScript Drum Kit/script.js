(() => {

  document.body.addEventListener("keyup", removeClassAndStopMusic);
  document.body.addEventListener("keydown", playMusicAndAddClass); // 他就是從 body 開始回傳


  function playMusicAndAddClass(event) {
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    const button = document.querySelector(`div[data-key="${event.keyCode}"]`);
    audio && playMusic(audio);
    button && addClass(button);
  }

  function playMusic(audioElement) {
    audioElement.load(); // 重新加載
    audioElement.play();
  }

  function addClass(buttonElement) {
    buttonElement.classList.add("playing");
  }

  function removeClassAndStopMusic(event) {
    const button = document.querySelector(`div[data-key="${event.keyCode}"]`);
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    audio && stopMusic(audio);
    button && removeClass(button);
  }

  function removeClass(buttonElement) {
    buttonElement.classList.remove("playing");
  }

  function stopMusic(audioElement) {
    audioElement.pause();
  }

  // function removeClassVersion2(event) {
  //   if (e.propertyName === "transform") e.target.classList.remove("playing");
  // }  // 猜測使用 transform 是為了確保變化都變了後才取消？可能是渲染順序

  // keys.forEach((key) =>
  //   key.addEventListener("transitionend", removeClassVersion2)
  // ); // 老師使用的這個版本會有問題，會導致連點擊的時候，出現 bug

})();
