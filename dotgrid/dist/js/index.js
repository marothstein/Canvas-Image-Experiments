var constructImage, drawImage, expand;

drawImage = function(imageObj, canvas) {
  var context;
  canvas.height = imageObj.height;
  canvas.width = imageObj.width;
  context = canvas.getContext("2d");
  return context.drawImage(imageObj, 0, 0);
};

expand = function(src, dest, factor) {
  var context, data, getNewIndex, gridData, gridImageData, height, imageData, index, newIndex, srcCtx, srcHeight, srcWidth, width, x, y, _i, _j;
  srcCtx = src.getContext("2d");
  imageData = srcCtx.getImageData(0, 0, src.width, src.height);
  srcWidth = src.width;
  srcHeight = src.height;
  data = imageData.data;
  width = dest.width = srcWidth * factor;
  height = dest.height = srcHeight * factor;
  context = dest.getContext("2d");
  gridImageData = context.createImageData(width, height);
  gridData = gridImageData.data;
  getNewIndex = function(index, x, y) {
    if (y === 0 && x === 0) {
      return index;
    } else {
      x = x * factor;
      y = y * factor;
      return (y * width + x) * 4;
    }
  };
  for (y = _i = 0; 0 <= srcHeight ? _i <= srcHeight : _i >= srcHeight; y = 0 <= srcHeight ? ++_i : --_i) {
    for (x = _j = 0; 0 <= srcWidth ? _j <= srcWidth : _j >= srcWidth; x = 0 <= srcWidth ? ++_j : --_j) {
      index = (y * srcWidth + x) * 4;
      newIndex = getNewIndex(index, x, y);
      gridData[newIndex] = data[index];
      gridData[newIndex + 1] = data[index + 1];
      gridData[newIndex + 2] = data[index + 2] = 255;
      gridData[newIndex + 3] = data[index + 3];
    }
  }
  return context.putImageData(gridImageData, 0, 0);
};

constructImage = function() {
  var imageObj;
  console.log("Construct Image called");
  imageObj = new Image();
  imageObj.onload = function() {
    drawImage(imageObj, document.getElementById('canvas-original'));
    return expand(document.getElementById('canvas-original'), document.getElementById('canvas-exp'), 3);
  };
  imageObj.src = "/images/flower.jpg";
  return $('#source-img').attr('src', imageObj.src);
};

constructImage();
