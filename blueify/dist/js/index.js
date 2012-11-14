var blueify, constructImage, drawImage;

drawImage = function(imageObj, canvas) {
  var context;
  canvas.height = imageObj.height;
  canvas.width = imageObj.width;
  context = canvas.getContext("2d");
  return context.drawImage(imageObj, 0, 0);
};

blueify = function(canvas) {
  var context, data, height, imageData, index, width, x, y, _i, _j;
  context = canvas.getContext("2d");
  imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  width = canvas.width;
  height = canvas.height;
  data = imageData.data;
  for (y = _i = 0; 0 <= height ? _i <= height : _i >= height; y = 0 <= height ? ++_i : --_i) {
    for (x = _j = 0; 0 <= width ? _j <= width : _j >= width; x = 0 <= width ? ++_j : --_j) {
      index = (y * width + x) * 4;
      data[index + 2] = 255;
    }
  }
  return context.putImageData(imageData, 0, 0);
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
