const video = document.querySelector("video");
const player__button = document.querySelector(".toggle");
const skip__button = document.querySelectorAll("[data-skip]");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");

function audioPlay(e) {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

function changeIcon(e) {
  const icon = video.paused ? "►" : "❚ ❚";
  player__button.textContent = icon;
  // 和 innerHTML 差別
}

function skipAudio(e) {
    video.currentTime += Math.floor(this.dataset.skip);
    // console.log(Number(e.target.dataset.skip))
    console.dir(video.duration)
    // 這裡遇到的問題是報錯，這是因為之前的選擇器選錯了！
}

function changeProcess(e){
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
    // video.currentTime += (e.offsetX / progress.duration) * video
}

function changePercentVideo(e){
    const change = (e.offsetX / progress.offsetWidth ) * video.duration
    video.currentTime = change
}

function changePercentVideo(e){
    const change = (e.offsetX / progress.offsetWidth ) * video.duration
    video.currentTime = change
}

player__button.addEventListener("click", audioPlay);
player__button.addEventListener("click", changeIcon);
progress.addEventListener('click', changeProcess)
progress.addEventListener('click', changePercentVideo)
skip__button.forEach(e => {
  e.addEventListener("click", skipAudio);
});

// 偵測到畫面變動就會產生影片進度條
// 偵測到播放暫停就會產生變動
