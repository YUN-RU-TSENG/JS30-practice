void function playVideoIIFE() {

  // 變數宣告--------------------------------
  // 註冊事件監聽元素
  const video = document.querySelector('.player .viewer')
  const toggle = document.querySelector('.player .toggle')
  const ranges = document.querySelectorAll('.player .player__slider')
  const progress = document.querySelector('.player .progress')
  const skipButtons = document.querySelectorAll('.player [data-skip]')

  // 樣式更改元素
  const progressBar = document.querySelector('.player .progress__filled')


  // 事件註冊--------------------------------
  video.addEventListener('play',  function(event){
    void switchVideoIcon.call(this, event, toggle)
  })

  video.addEventListener('pause', function(event){
    void switchVideoIcon.call(this, event, toggle)
  })

  video.addEventListener('timeupdate', function(event) {
    void updateTimeDisplay.call(this, event, progressBar)
  })

  toggle.addEventListener('click', function(event){
    void toggleVideo.call(this, event, video)
  })

  skipButtons.forEach((skipButton) => {
    skipButton.addEventListener('click', function(event){
      void skipVideo.call(this, event, video)
    })
  })

  ranges.forEach((range) => {
    range.addEventListener('input', function(event){
      void updateValue.call(this, event, video)
    })
  })

  progress.addEventListener('click', function(event){
    return updateProgressBar.call(this, event, video)
  })


  // 事件函式--------------------------------
  // play pause change
  function toggleVideo(event, videoElement){
    videoElement.paused ? videoElement.play() : videoElement.pause()
  }

  // play icon change
  function switchVideoIcon(event, toggleElement){
    const icon = event.currentTarget.paused ?  '►' : '❚❚'
    toggleElement.textContent = icon
  }

  // play progressbar display change
  function updateTimeDisplay(event, progressElement){
    const percent = (event.currentTarget.currentTime / event.currentTarget.duration) * 100
    progressElement.style.flexBasis = `${percent}%`
  }

  // skip video time
  function skipVideo(event, videoElement){
    videoElement.currentTime += parseFloat(event.currentTarget.dataset.skip);
  }

  // update volume and speed time
  function updateValue(event,videoElement){
    videoElement[event.currentTarget.name] = event.currentTarget.value
  }

  // scroll progress to change vide time
  function updateProgressBar(event, videoElement){
    const percent = (event.offsetX / event.currentTarget.offsetWidth) * parseFloat(videoElement.duration)
    videoElement.currentTime = percent
  }

}();