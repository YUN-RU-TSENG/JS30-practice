(function playVideoIIFE() {
  const video = document.querySelector('.player .viewer')
  const toggle = document.querySelector('.player .toggle')
  const ranges = document.querySelectorAll('.player .player__slider')
  const progress = document.querySelector('.player .progress')
  const skipButtons = document.querySelectorAll('.player [data-skip]')
  const progressBar = document.querySelector('.player .progress__filled')

  /**
   * play pause change
   *
   * @param {Object} event
   * @param {Object} videoElement
   */
  function toggleVideo(event, videoElement) {
    videoElement.paused ? videoElement.play() : videoElement.pause()
  }
  toggle.addEventListener('click', function (event) {
    void toggleVideo.call(this, event, video)
  })

  /**
   * play icon change
   *
   * @param {Object} event
   * @param {Object} toggleElement
   */
  function switchVideoIcon(event, toggleElement) {
    const pauseIcon = '<span>&#10074;&#10074;<span>'
    const playIcon = '<span>&#9658;<span>'

    toggleElement.innerHTML = event.currentTarget.paused ? playIcon : pauseIcon
  }
  video.addEventListener('pause', function (event) {
    void switchVideoIcon.call(this, event, toggle)
  })
  video.addEventListener('play', function (event) {
    void switchVideoIcon.call(this, event, toggle)
  })

  /**
   * updateTimeDisplay
   *
   * @param {Object} event
   * @param {Object} progressElement
   */
  function updateTimeDisplay(event, progressElement) {
    const videoCurrentTime = event.currentTarget.currentTime
    const videoTime = event.currentTarget.duration

    progressElement.style.flexBasis = `${(videoCurrentTime / videoTime) * 100}%`
  }
  video.addEventListener('timeupdate', function (event) {
    void updateTimeDisplay.call(this, event, progressBar)
  })

  /**
   * skip video time
   *
   * @param {Object} event
   * @param {Object} videoElement
   */
  function skipVideo(event, videoElement) {
    videoElement.currentTime += parseFloat(event.currentTarget.dataset.skip)
    // videoElement.currentTime += +(event.currentTarget.dataset.skip);
    // videoElement.currentTime += Number(event.currentTarget.dataset.skip);
  }
  skipButtons.forEach((skipButton) => {
    skipButton.addEventListener('click', function (event) {
      void skipVideo.call(this, event, video)
    })
  })

  /**
   * update volume and speed time
   *
   * @param {Object} event
   * @param {Object} videoElement
   */
  function updateValue(event, videoElement) {
    videoElement[event.currentTarget.name] = event.currentTarget.value
  }
  ranges.forEach((range) => {
    range.addEventListener('input', function (event) {
      void updateValue.call(this, event, video)
    })
  })

  /**
   * scroll progress to change vide time
   *
   * @param {Object} event
   * @param {Object} videoElement
   */
  function updateProgressBar(event, videoElement) {
    const [curseOfElementDistance, elementWidth] = [event.offsetX, event.currentTarget.offsetWidth]
    const videoTime = videoElement.duration

    videoElement.currentTime = (curseOfElementDistance / elementWidth) * videoTime
  }
  progress.addEventListener('click', function (event) {
    void updateProgressBar.call(this, event, video)
  })
}())