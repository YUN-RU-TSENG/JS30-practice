(() => {
  const canvas = document.querySelector('canvas');
  const canvasContext = canvas.getContext('2d');
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = 700;
  canvasContext.strokeStyle = '#19caad';
  canvasContext.lineCap = 'square';
  canvasContext.lineJoin = 'minter';
  canvasContext.lineWidth = 100

  let hue = 360;
  let lastX = 0;
  let lastY = 0;
  let isActive = false;
  let colorPath = true;
  let huePath = true;

  canvas.addEventListener('mousemove', function(e){

    if(!isActive) return

    canvasContext.strokeStyle = `hsl(${hue}, 90%, 80%)`
    canvasContext.beginPath()

    canvasContext.moveTo(lastX, lastY);

    canvasContext.lineTo(e.offsetX, e.offsetY);
    canvasContext.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];

    if (hue >= 360 || hue <= 1) {
      huePath = !huePath
    }

    console.log(huePath)
    if(huePath){
      hue += 1;
    }else{
      hue -= 1;
    }

    if(canvasContext.lineWidth >= 100 || canvasContext.lineWidth <= 1){
      colorPath = !colorPath
    }

    if(colorPath){
      canvasContext.lineWidth ++
    }else{
      canvasContext.lineWidth --
    }

    // console.log('e.clientX', e.clientX)
    // console.log('e.offsetX', e.offsetX)
    // console.log('e.pageX', e.pageX)
    // console.log('e.screenX', e.screenX)
    // console.log('e.layerX', e.layerX)

  })

  canvas.addEventListener('mousedown', (e)=>{
    isActive = !isActive;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  })
  canvas.addEventListener('mouseup', ()=>{
    isActive = !isActive
  })

})();
