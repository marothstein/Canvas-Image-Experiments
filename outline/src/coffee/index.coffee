drawImage = (imageObj, canvas) ->
  # resize canvas to fit image
  canvas.height = imageObj.height
  canvas.width =  imageObj.width
  context = canvas.getContext("2d")
  context.drawImage imageObj, 0,0

pixelize = (canvas) ->
  context = canvas.getContext("2d")
  imageData = context.getImageData(0, 0, canvas.width, canvas.height)
  width = canvas.width
  
  # row helpers
  rowIsEven = (i) -> true # Math.floor(i/width)%2 is 0
  isRightEdge = (i) -> i%width is width-1
  isBottomEdge = (i) -> i>imageData.data.length-(width+1)
  
  # pixel finder helpers
  getRight = (i) -> i+4
  getDown = (i) -> i+width*4
  getDownRight = (i) -> getRight(getDown(i))
  
  # pixel setter helpers
  setColor = (i,r,g,b,a) ->
    imageData.data[i] = r
    imageData.data[i+1] = g
    imageData.data[i+2] = b  
    imageData.data[i+3] = a
    
  # color helper methods
  R = (i) -> if i < imageData.data.length then imageData.data[i]
  G = (i) -> if i+1 < imageData.data.length then imageData.data[i+1]
  B = (i) -> if i+2 < imageData.data.length then imageData.data[i+2]
  A = (i) -> if i+3 < imageData.data.length then imageData.data[i+3]  
  
  # action methods
  averageNeighbors = (i) -> 
    right = getRight(i)
    down = getDown(i)
    downRight = getDownRight(i)
    
    # get average color values
    avgR = (R(i) + R(right) + R(down) + R(downRight))/4
    avgG = (G(i) + G(right) + G(down) + G(downRight))/4
    avgB = (B(i) + B(right) + B(down) + B(downRight))/4
    avgA = (A(i) + A(right) + A(down) + A(downRight))/4
    # console.log "Average color: (#{avgR},#{avgG},#{avgB},#{avgA})"
    
    # set new pixel data 
    setColor(i,avgR,avgG,avgB,avgA)
    setColor(right,avgR,avgG,avgB,avgA)
    setColor(down,avgR,avgG,avgB,avgA)
    setColor(downRight,avgR,avgG,avgB,avgA)
    
    # DEBUG: set to blue to make sure we are mapped correctly
    # setColor(i,avgR,avgG,255,avgA)
    # setColor(right,avgR,avgG,255,avgA)
    # setColor(down,avgR,avgG,255,avgA)
    # setColor(downRight,avgR,avgG,255,avgA)
    
    
  mushPixel = (i) ->
    if rowIsEven(i) and not isRightEdge(i) and not isBottomEdge(i)
      averageNeighbors(i)
    
  mushPixel(i) for i in [0..imageData.data.length] by 8
  
  context.putImageData(imageData, 0, 0)


drawOutline = ->
  canvas = document.getElementById("canvas-border")
  context = canvas.getContext("2d")
  imageData = context.getImageData(0, 0, $(canvas).width(), $(canvas).height())
  # debugger
  console.log "Got image data from canvas..."
  console.log "Canvas: ", context
  console.log "--- Width: ", context.width
  console.log "--- Height: ", context.height
  console.log "ImageData: ", imageData

  width = canvas.width
  height = canvas.height
  x = 0
  y = 0
  colorPixel = (i) ->
    if x is 0 or x is width-1 or y is 0 or y is height-1
      console.log "Found a border pixel!"
      imageData.data[i] = 255
      imageData.data[i+1] = 0
      imageData.data[i+2] = 0
      imageData.data[i+3] = 255
      
    if x is width-1 
      x = 0 
      y++
    else
      x++
      
  colorPixel(i) for i in [0..imageData.data.length] by 4
    
  context.putImageData(imageData, 0, 0)

  
constructImage = ->
  console.log("Construct Image called");
  imageObj = new Image()
  imageObj.onload = ->
    colorData = drawImage(this, document.getElementById('canvas-border'))
    colorData = drawImage(this, document.getElementById('canvas-pixelize'))
    drawOutline()
    pixelize(document.getElementById('canvas-pixelize'))

  imageObj.src = "/images/flower.jpg";
  $('#source-img').attr('src', imageObj.src)
  

constructImage()