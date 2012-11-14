drawImage = (imageObj, canvas) ->
  # resize canvas to fit image
  canvas.height   = imageObj.height
  canvas.width    = imageObj.width
  context         = canvas.getContext("2d")
  context.drawImage imageObj, 0,0


blueify = (canvas)->
  context     = canvas.getContext("2d")
  imageData   = context.getImageData(0, 0, canvas.width, canvas.height)
  width       = canvas.width
  height      = canvas.height

  data = imageData.data;

  for y in [0..height]
    for x in [0..width]
      index = (y * width + x) * 4
      # value = x * y & 0xff

      # data[index]   = 0     # red
      # data[index+1] = 0     # green
      data[index+2] = 255     # blue
      # data[index+3] = 255   # alpha

  context.putImageData(imageData, 0, 0);

  # bluePixels = getBluePixels(imageData)

  # blueImageData = context.createImageData(width,height)
  # blueImageData.data = bluePixels

  # context.putImageData(blueImageData, 0, 0)

constructImage = ->
  console.log("Construct Image called");
  imageObj = new Image()
  imageObj.onload = ->
    colorData = drawImage(this, document.getElementById('canvas-blueify'))
    blueify(document.getElementById('canvas-blueify'))

  imageObj.src = "/images/flower.jpg";
  $('#source-img').attr('src', imageObj.src)


constructImage()