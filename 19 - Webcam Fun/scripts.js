const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

getVideo();
video.addEventListener("canplay", paintToCanvas);

// await運算子可被用來等待 Promise，只能在 async function內使用。
function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ audio: false, video: true })
    .then(result => {
      console.dir(result);
      video.srcObject = result;
      video.play();
    })
    .catch(err => {
      console.log("G!G!", err);
    });
}

function paintToCanvas(e) {
    console.log(canvas.width)
    console.log(canvas.height)
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  setInterval(() => {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    pixels = rgbSplit(pixels);
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function rgbSplit(pixels) {
  pixels.data = pixels.data.reduce((acc, data, index, arr) => {
    if(index % 4 == 0) arr[index + 4] = arr[index + 4] + 100;
    if(index % 4 == 1) arr[index + 4] = arr[index + 4] - 50;
    if(index % 4 == 2) arr[index + 4] = arr[index + 4] * 0.5;
  })
  // for (let i = 0; i < pixels.data.length; i += 4) {
  //   pixels.data[i - 150] = pixels.data[i + 0]; // RED
  //   pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
  //   pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  // }
  // return pixels;
  // return pixels.data.map((pixel, index) =>{
  //     if(index%4 === 0) return 255;
  //     if(index%4 === 1) return 10;
  //     if(index%4 ===2) return 10;
  //     return pixel;
  // })
}

function takePhoto(e){
    snap.currentTime = 0;
    snap.play();
    const data = canvas.toDataURL('image/jpeg');
    console.log(data)
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('downland', 'handsome');
    link.innerHTML = `<img src="${data}" alt="Handsome Man" />`
    strip.insertBefore(link, strip.firstChild)
}


