var constructImage, drawImage, drawVisualization;

drawVisualization = function(colorData) {
  var data, inputData, options, visualizationElem;
  inputData = [['Red', 'Green', 'Blue']].concat(colorData);
  data = google.visualization.arrayToDataTable(inputData);
  visualizationElem = document.getElementById('visualization');
  options = {
    title: "Pixel Count By Color",
    width: 600,
    height: 400,
    vAxis: {
      title: "Count"
    },
    hAxis: {
      title: "Color"
    },
    colors: ['red', 'green', 'blue']
  };
  return new google.visualization.ColumnChart(visualizationElem).draw(data, options);
};

drawImage = function(imageObj) {
  var alpha, blue, blueSum, canvas, colorData, context, data, green, greenSum, i, imageData, imageHeight, imageWidth, imageX, imageY, n, numPixels, red, redSum, sourceHeight, sourceWidth;
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  imageX = 0;
  imageY = 0;
  imageWidth = imageObj.width;
  imageHeight = imageObj.height;
  context.drawImage(imageObj, imageX, imageY);
  imageData = context.getImageData(imageX, imageY, imageWidth, imageHeight);
  sourceHeight = imageData.height;
  sourceWidth = imageData.width;
  data = imageData.data;
  colorData = [];
  i = 0;
  n = data.length;
  numPixels = n / 4;
  redSum = 0;
  greenSum = 0;
  blueSum = 0;
  while (i < n) {
    red = data[i];
    green = data[i + 1];
    blue = data[i + 2];
    alpha = data[i + 3];
    redSum += red;
    greenSum += green;
    blueSum += blue;
    i += 4;
  }
  context.putImageData(imageData, imageX, imageY);
  return [[redSum / numPixels, greenSum / numPixels, blueSum / numPixels]];
};

constructImage = function() {
  var imageObj;
  console.log("Construct Image called");
  imageObj = new Image();
  imageObj.onload = function() {
    var colorData;
    colorData = drawImage(this);
    return drawVisualization(colorData);
  };
  return imageObj.src = "/images/flower.jpg";
};
