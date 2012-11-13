drawVisualization = (colorData) ->
  # Create and populate the data table.
  inputData = [['Red', 'Green', 'Blue']].concat(colorData)
  data = google.visualization.arrayToDataTable(inputData)
      
  # Create and draw the visualization.
  
  visualizationElem = document.getElementById('visualization')
  options = 
      title:"Pixel Count By Color"
      width:600, height:400
      vAxis: {title: "Count"}
      hAxis: {title: "Color"}
      colors: ['red', 'green', 'blue']
      
  new google.visualization.ColumnChart(visualizationElem).draw(data,options)
  

drawImage = (imageObj) ->
  canvas = document.getElementById("canvas")
  context = canvas.getContext("2d")
  imageX = 0
  imageY = 0
  imageWidth = imageObj.width
  imageHeight = imageObj.height
  context.drawImage imageObj, imageX, imageY
  imageData = context.getImageData(imageX, imageY, imageWidth, imageHeight)
  # debugger
  sourceHeight = imageData.height
  sourceWidth = imageData.width
  data = imageData.data
  colorData = []
  i = 0
  n = data.length
  numPixels = n/4

  # sums
  redSum = 0
  greenSum = 0
  blueSum = 0

  while i < n
    red = data[i]
    green = data[i + 1]
    blue = data[i + 2]
    alpha = data[i + 3]
    # update the color counts
    redSum += red
    greenSum += green
    blueSum += blue
    
    i += 4
  # y = 0
  # 
  # while y < sourceHeight
  #   x = 0
  # 
  #   while x < sourceWidth
  #     red = data[((sourceWidth * y) + x) * 4]
  #     green = data[((sourceWidth * y) + x) * 4 + 1]
  #     blue = data[((sourceWidth * y) + x) * 4 + 2]
  #     alpha = data[((sourceWidth * y) + x) * 4 + 3]
  #     x++
  #   y++
  context.putImageData imageData, imageX, imageY
  
  # return the colorData
  return [[redSum/numPixels ,greenSum/numPixels ,blueSum/numPixels]]

constructImage = ->
  console.log("Construct Image called");
  imageObj = new Image()
  imageObj.onload = ->
    colorData = drawImage this
    drawVisualization(colorData)

  imageObj.src = "/images/flower.jpg";

# constructImage()