var blueify, constructImage, drawImage, getBluePixels;

drawImage = function(imageObj, canvas) {
  var context;
  canvas.height = imageObj.height;
  canvas.width = imageObj.width;
  context = canvas.getContext("2d");
  return context.drawImage(imageObj, 0, 0);
};

getBluePixels = function(imageData) {
  var bluePixels, i, pixelData, pushBluePixel, _i, _ref;
  bluePixels = [];
  pixelData = imageData.data;
  pushBluePixel = function(i) {
    var blueVal;
    console.log("pixelData.length = " + pixelData.length);
    blueVal = pixelData[i + 2];
    console.log("Blue pixel value = " + blueVal);
    return bluePixels.push(pixelData[i], pixelData[i + 1], pixelData[i + 2], pixelData[i + 3]);
  };
  for (i = _i = 0, _ref = imageData.data.length; _i <= _ref; i = _i += 4) {
    pushBluePixel(i);
  }
  return bluePixels;
};

blueify = function(canvas) {
  var blueImageData, bluePixels, context, height, imageData, width;
  context = canvas.getContext("2d");
  imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  width = canvas.width;
  height = canvas.height;
  bluePixels = getBluePixels(imageData);
  blueImageData = context.createImageData(width, height);
  blueImageData.data = bluePixels;
  return context.putImageData(blueImageData, 0, 0);
};

constructImage = function() {
  var imageObj;
  console.log("Construct Image called");
  imageObj = new Image();
  imageObj.onload = function() {
    var colorData;
    colorData = drawImage(this, document.getElementById('canvas-blueify'));
    return blueify(document.getElementById('canvas-blueify'));
  };
  imageObj.src = "/images/flower.jpg";
  return $('#source-img').attr('src', imageObj.src);
};

constructImage();
