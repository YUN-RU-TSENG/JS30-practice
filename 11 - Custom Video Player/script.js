(function playVideoIIFE() {
  
  const video = document.querySelector('.player .viewer'),
        toggle = document.querySelector('.player .toggle')
        ranges = document.querySelectorAll('.player .player__slider'),
        progress = document.querySelector('.player .progress'),
        skipButtons = document.querySelectorAll('.player [data-skip]'),
        progressBar = document.querySelector('.player .progress__filled');

  /**
   * play pause change
   * @param {*} event
   * @param {*} videoElement
   */
  function toggleVideo(event, videoElement) {
    return videoElement.paused ? videoElement.play() : videoElement.pause()
  }
  toggle.addEventListener('click', function (event) {
    return void toggleVideo.call(this, event, video) // 寫 return void 是過了
  })

  /**
   * play icon change
   * @param {*} event
   * @param {*} toggleElement
   */
  function switchVideoIcon(event, toggleElement) {
    const pauseIcon = '<span>&#10074;&#10074;<span>',
          playIcon = '<span>&#9658;<span>';

    toggleElement.innerHTML = event.currentTarget.paused ? playIcon : pauseIcon
  }
  video.addEventListener('pause', function (event) {
    return void switchVideoIcon.call(this, event, toggle) // 寫 return void 是過了
  })
  video.addEventListener('play', function (event) {
    return void switchVideoIcon.call(this, event, toggle) // 寫 return void 是過了
  })

  /**
   * updateTimeDisplay
   * @param {*} event
   * @param {*} progressElement
   */
  function updateTimeDisplay(event, progressElement) {
    const videoCurrentTime = event.currentTarget.currentTime,
          videoTime = event.currentTarget.duration;

    progressElement.style.flexBasis = `${(videoCurrentTime / videoTime) * 100}%`
  }
  video.addEventListener('timeupdate', function (event) {
    return void updateTimeDisplay.call(this, event, progressBar) // 寫 return void 是過了
  })

  /**
   * skip video time
   * @param {*} event
   * @param {*} videoElement
   */
  function skipVideo(event, videoElement) {
    videoElement.currentTime += parseFloat(event.currentTarget.dataset.skip)
    // videoElement.currentTime += +(event.currentTarget.dataset.skip);
    // videoElement.currentTime += Number(event.currentTarget.dataset.skip);
  }
  skipButtons.forEach((skipButton) => {
    skipButton.addEventListener('click', function (event) {
      return void skipVideo.call(this, event, video) // 寫 return void 是過了
    })
  })

  /**
   * update volume and speed time
   * @param {*} event
   * @param {*} videoElement
   */
  function updateValue(event, videoElement) {
    videoElement[event.currentTarget.name] = event.currentTarget.value
  }
  ranges.forEach((range) => {
    range.addEventListener('input', function (event) {
      return void updateValue.call(this, event, video) // 寫 return void 是過了
    })
  })

  /**
   * scroll progress to change vide time
   * @param {*} event
   * @param {*} videoElement
   */
  function updateProgressBar(event, videoElement) {
    const [curseOfElementDistance, elementWidth] = [event.offsetX, event.currentTarget.offsetWidth],
          videoTime = videoElement.duration

    videoElement.currentTime = (curseOfElementDistance / elementWidth) * videoTime
  }
  progress.addEventListener('click', function (event) {
    return void updateProgressBar.call(this, event, video) // 寫 return void 是過了
  })
}())