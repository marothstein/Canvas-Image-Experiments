drawImage = (imageObj, canvas) ->
  # resize canvas to fit image
  canvas.height   = imageObj.height
  canvas.width    = imageObj.width
  context         = canvas.getContext("2d")
  context.drawImage imageObj, 0,0


expand = (src,dest,factor)->
  # Source Canvas
  srcCtx      = src.getContext("2d")
  imageData   = srcCtx.getImageData(0, 0, src.width, src.height)
  srcWidth    = src.width
  srcHeight   = src.height
  data = imageData.data

  # Destination Canvas
  width  = dest.width   = srcWidth*factor
  height = dest.height  = srcHeight*factor
  context       = dest.getContext("2d")
  gridImageData = context.createImageData(width, height)
  gridData = gridImageData.data

  getNewIndex = (index,x,y) ->
    if y is 0 and x is 0
      return index
    else
      x = x*factor
      y = y*factor
      return (y * width + x) * 4

  for y in [0..srcHeight]
    for x in [0..srcWidth]
      index = (y * srcWidth + x) * 4
      newIndex = getNewIndex(index,x,y)
      gridData[newIndex]   = data[index]   # red
      gridData[newIndex+1] = data[index+1] # green
      gridData[newIndex+2] = data[index+2] = 255 # blue
      gridData[newIndex+3] = data[index+3] # alpha

  context.putImageData(gridImageData, 0, 0);


constructImage = ->
  console.log("Construct Image called");
  imageObj = new Image()
  imageObj.onload = ->
    drawImage(imageObj, document.getElementById('canvas-original'))
    expand(document.getElementById('canvas-original'), document.getElementById('canvas-exp'),3)

  imageObj.src = "/images/flower.jpg";
  $('#source-img').attr('src', imageObj.src)


constructImage()