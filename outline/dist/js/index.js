var constructImage, drawImage, drawOutline, pixelize;

drawImage = function(imageObj, canvas) {
  var context;
  canvas.height = imageObj.height;
  canvas.width = imageObj.width;
  context = canvas.getContext("2d");
  return context.drawImage(imageObj, 0, 0);
};

pixelize = function(canvas) {
  var A, B, G, R, averageNeighbors, context, getDown, getDownRight, getRight, i, imageData, isBottomEdge, isRightEdge, mushPixel, rowIsEven, setColor, width, _i, _ref;
  context = canvas.getContext("2d");
  imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  width = canvas.width;
  rowIsEven = function(i) {
    return true;
  };
  isRightEdge = function(i) {
    return i % width === width - 1;
  };
  isBottomEdge = function(i) {
    return i > imageData.data.length - (width + 1);
  };
  getRight = function(i) {
    return i + 4;
  };
  getDown = function(i) {
    return i + width * 4;
  };
  getDownRight = function(i) {
    return getRight(getDown(i));
  };
  setColor = function(i, r, g, b, a) {
    imageData.data[i] = r;
    imageData.data[i + 1] = g;
    imageData.data[i + 2] = b;
    return imageData.data[i + 3] = a;
  };
  R = function(i) {
    if (i < imageData.data.length) {
      return imageData.data[i];
    }
  };
  G = function(i) {
    if (i + 1 < imageData.data.length) {
      return imageData.data[i + 1];
    }
  };
  B = function(i) {
    if (i + 2 < imageData.data.length) {
      return imageData.data[i + 2];
    }
  };
  A = function(i) {
    if (i + 3 < imageData.data.length) {
      return imageData.data[i + 3];
    }
  };
  averageNeighbors = function(i) {
    var avgA, avgB, avgG, avgR, down, downRight, right;
    right = getRight(i);
    down = getDown(i);
    downRight = getDownRight(i);
    avgR = (R(i) + R(right) + R(down) + R(downRight)) / 4;
    avgG = (G(i) + G(right) + G(down) + G(downRight)) / 4;
    avgB = (B(i) + B(right) + B(down) + B(downRight)) / 4;
    avgA = (A(i) + A(right) + A(down) + A(downRight)) / 4;
    setColor(i, avgR, avgG, avgB, avgA);
    setColor(right, avgR, avgG, avgB, avgA);
    setColor(down, avgR, avgG, avgB, avgA);
    return setColor(downRight, avgR, avgG, avgB, avgA);
  };
  mushPixel = function(i) {
    if (rowIsEven(i) && !isRightEdge(i) && !isBottomEdge(i)) {
      return averageNeighbors(i);
    }
  };
  for (i = _i = 0, _ref = imageData.data.length; _i <= _ref; i = _i += 8) {
    mushPixel(i);
  }
  return context.putImageData(imageData, 0, 0);
};

drawOutline = function() {
  var canvas, colorPixel, context, height, i, imageData, width, x, y, _i, _ref;
  canvas = document.getElementById("canvas-border");
  context = canvas.getContext("2d");
  imageData = context.getImageData(0, 0, $(canvas).width(), $(canvas).height());
  console.log("Got image data from canvas...");
  console.log("Canvas: ", context);
  console.log("--- Width: ", context.width);
  console.log("--- Height: ", context.height);
  console.log("ImageData: ", imageData);
  width = canvas.width;
  height = canvas.height;
  x = 0;
  y = 0;
  colorPixel = function(i) {
    if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
      console.log("Found a border pixel!");
      imageData.data[i] = 255;
      imageData.data[i + 1] = 0;
      imageData.data[i + 2] = 0;
      imageData.data[i + 3] = 255;
    }
    if (x === width - 1) {
      x = 0;
      return y++;
    } else {
      return x++;
    }
  };
  for (i = _i = 0, _ref = imageData.data.length; _i <= _ref; i = _i += 4) {
    colorPixel(i);
  }
  return context.putImageData(imageData, 0, 0);
};

constructImage = function() {
  var imageObj;
  console.log("Construct Image called");
  imageObj = new Image();
  imageObj.onload = function() {
    var colorData;
    colorData = drawImage(this, document.getElementById('canvas-border'));
    colorData = drawImage(this, document.getElementById('canvas-pixelize'));
    drawOutline();
    return pixelize(document.getElementById('canvas-pixelize'));
  };
  imageObj.src = "/images/flower.jpg";
  return $('#source-img').attr('src', imageObj.src);
};

constructImage();
