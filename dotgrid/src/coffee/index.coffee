drawImage = (imageObj, canvas) ->
  # resize canvas to fit image
  canvas.height = imageObj.height
  canvas.width =  imageObj.width
  context = canvas.getContext("2d")
  context.drawImage imageObj, 0,0


getBluePixels = (imageData) ->
  bluePixels = []
  pixelData = imageData.data

  pushBluePixel = (i) ->
    console.log "pixelData.length = #{pixelData.length}"
    blueVal = pixelData[i+2]
    console.log "Blue pixel value = #{blueVal}"
    bluePixels.push(pixelData[i], pixelData[i+1], pixelData[i+2], pixelData[i+3])

  pushBluePixel(i) for i in [0..imageData.data.length] by 4
  return bluePixels

blueify = (canvas)->
  context = canvas.getContext("2d")
  imageData = context.getImageData(0, 0, canvas.width, canvas.height)
  width = canvas.width
  height = canvas.height

  bluePixels = getBluePixels(imageData)

  blueImageData = context.createImageData(width,height)
  blueImageData.data = bluePixels

  context.putImageData(blueImageData, 0, 0)

constructImage = ->
  console.log("Construct Image called");
  imageObj = new Image()
  imageObj.onload = ->
    colorData = drawImage(this, document.getElementById('canvas-blueify'))
    blueify(document.getElementById('canvas-blueify'))

  imageObj.src = "/images/flower.jpg";
  $('#source-img').attr('src', imageObj.src)


constructImage()