void (function playVideoIIFE() {

  const video = document.querySelector(".player .viewer");
  const toggle = document.querySelector(".player .toggle");
  const ranges = document.querySelectorAll(".player .player__slider");
  const progress = document.querySelector(".player .progress");
  const skipButtons = document.querySelectorAll(".player [data-skip]");
  const progressBar = document.querySelector(".player .progress__filled");

  /**
   * play pause change
   *
   * @param {*} event
   * @param {*} videoElement
   */
  function toggleVideo(event, videoElement) {
    videoElement.paused ? videoElement.play() : videoElement.pause();
  }
  toggle.addEventListener("click", function (event) {
    void toggleVideo.call(this, event, video);
  });

  /**
   * play icon change
   *
   * @param {*} event
   * @param {*} toggleElement
   */
  function switchVideoIcon(event, toggleElement) {
    const icon = event.currentTarget.paused ? "►" : "❚❚";
    toggleElement.textContent = icon;
  }
  video.addEventListener("pause", function (event) {
    void switchVideoIcon.call(this, event, toggle);
  });
  video.addEventListener("play", function (event) {
    void switchVideoIcon.call(this, event, toggle);
  });

  /**
   * updateTimeDisplay
   *
   * @param {*} event
   * @param {*} progressElement
   */
  function updateTimeDisplay(event, progressElement) {
    const percent =
      (event.currentTarget.currentTime / event.currentTarget.duration) * 100;
    progressElement.style.flexBasis = `${percent}%`;
  }
  video.addEventListener("timeupdate", function (event) {
    void updateTimeDisplay.call(this, event, progressBar);
  });

  /**
   * skip video time
   *
   * @param {*} event
   * @param {*} videoElement
   */
  function skipVideo(event, videoElement) {
    videoElement.currentTime += parseFloat(event.currentTarget.dataset.skip);
  }
  skipButtons.forEach((skipButton) => {
    skipButton.addEventListener("click", function (event) {
      void skipVideo.call(this, event, video);
    });
  });

  /**
   * update volume and speed time
   *
   * @param {*} event
   * @param {*} videoElement
   */
  function updateValue(event, videoElement) {
    videoElement[event.currentTarget.name] = event.currentTarget.value;
  }
  ranges.forEach((range) => {
    range.addEventListener("input", function (event) {
      void updateValue.call(this, event, video);
    });
  });

  /**
   * scroll progress to change vide time
   *
   * @param {*} event
   * @param {*} videoElement
   */
  function updateProgressBar(event, videoElement) {
    const percent =
      (event.offsetX / event.currentTarget.offsetWidth) *
      parseFloat(videoElement.duration);
    videoElement.currentTime = percent;
  }
  progress.addEventListener("click", function (event) {
    return updateProgressBar.call(this, event, video);
  });
})();
