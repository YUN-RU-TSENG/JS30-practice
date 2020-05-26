void function playVideoIIFE() {

  // 註冊事件監聽元素
  const video = document.querySelector(".player .viewer");
  const toggle = document.querySelector(".player .toggle");
  const ranges = document.querySelectorAll(".player .player__slider");
  const progress = document.querySelector(".player .progress");
  const skipButtons = document.querySelectorAll(".player [data-skip]");
  // 樣式更改元素
  const progressBar = document.querySelector(".player .progress__filled");




  // play pause change
  toggle.addEventListener("click", function (event) {
    void toggleVideo.call(this, event, video);
  });

  function toggleVideo(event, videoElement) {
    videoElement.paused ? videoElement.play() : videoElement.pause();
  }


  // play icon change
  video.addEventListener("pause", function (event) {
    void switchVideoIcon.call(this, event, toggle);
  });

  video.addEventListener("play", function (event) {
    void switchVideoIcon.call(this, event, toggle);
  });

  function switchVideoIcon(event, toggleElement) {
    const icon = event.currentTarget.paused ? "►" : "❚❚";
    toggleElement.textContent = icon;
  }


  // play progressbar display change
  video.addEventListener("timeupdate", function (event) {
    void updateTimeDisplay.call(this, event, progressBar);
  });

  function updateTimeDisplay(event, progressElement) {
    const percent =
      (event.currentTarget.currentTime / event.currentTarget.duration) * 100;
    progressElement.style.flexBasis = `${percent}%`;
  }


  // skip video time
  skipButtons.forEach((skipButton) => {
    skipButton.addEventListener("click", function (event) {
      void skipVideo.call(this, event, video);
    });
  });

  function skipVideo(event, videoElement) {
    videoElement.currentTime += parseFloat(event.currentTarget.dataset.skip);
  }


  // update volume and speed time
  ranges.forEach((range) => {
    range.addEventListener("input", function (event) {
      void updateValue.call(this, event, video);
    });
  });

  function updateValue(event, videoElement) {
    videoElement[event.currentTarget.name] = event.currentTarget.value;
  }


  // scroll progress to change vide time
  progress.addEventListener("click", function (event) {
    return updateProgressBar.call(this, event, video);
  });

  function updateProgressBar(event, videoElement) {
    const percent =
      (event.offsetX / event.currentTarget.offsetWidth) *
      parseFloat(videoElement.duration);
    videoElement.currentTime = percent;
  }

}();
