var canvas = document.getElementsByTagName("canvas")[3];
canvas.width = innerWidth;
canvas.height = innerHeight;
var c = canvas.getContext('2d');
var canvas1 = document.getElementsByTagName("canvas")[2];
canvas1.width = innerWidth;
canvas1.height = innerHeight;
var c1 = canvas1.getContext('2d');
var canvas2 = document.getElementsByTagName("canvas")[1];
canvas2.width = innerWidth;
canvas2.height = innerHeight;
var c2 = canvas2.getContext('2d');
var canvas3 = document.getElementsByTagName("canvas")[0];
canvas3.width = innerWidth;
canvas3.height = innerHeight;
var c3 = canvas3.getContext('2d');

drawingSquares = false;
drawingTriangles = false;
drawingCircles = false;
drawingStar = false;
drawingAtom = false;

squaresOpacity = 0;
trianglesOpacity = 0;
circlesOpacity = 0;
starOpacity = 0;
atomOpacity = 0;

var squareToCenter = 80;
var squareSize = 130;
var rotation1 = 0;
var rotation2 = 0;
c1.strokeStyle = "yellow";
c2.strokeStyle = "#00FF99";

var squares = [];
var points = [];

for(i=0;i<3;i++)
{
  squares[i] = new Square(120*i);
  for(j=0;j<4;j++)
  {
    if(j>0)points[i*4+j] = new Point(90*j,squares[i],points[i*4+j-1]);
    else points[i*4+j] = new Point(90*j,squares[i],null);
  }
  points[i*4].squareFriend = points[i*4+3];
}

for(i=0;i<4;i++)
{
  points[i].triangleFriend = points[i+4];
  points[i+4].triangleFriend = points[i+8];
  points[i+8].triangleFriend = points[i];
}

window.addEventListener('keydown',e=>
{
  if(e.keyCode=='90')
  {
    if(drawingSquares)drawingSquares = false;
    else drawingSquares = true;
  }
  if(e.keyCode=='88')
  {
    if(drawingTriangles)drawingTriangles = false;
    else drawingTriangles = true;
  }
  if(e.keyCode=='67')
  {
    if(drawingCircles)drawingCircles = false;
    else drawingCircles = true;
  }
  if(e.keyCode=='86')
  {
    if(drawingStar)drawingStar = false;
    else drawingStar = true;
  }
  if(e.keyCode=='66')
  {
    if(drawingAtom)drawingAtom = false;
    else drawingAtom = true;
  }
});

var transition = 0.02;

function animate()
{
  if(drawingSquares && squaresOpacity < 1)squaresOpacity += transition;
  if(drawingCircles && circlesOpacity < 1)circlesOpacity += transition;
  if(drawingTriangles && trianglesOpacity < 1)trianglesOpacity += transition;
  if(drawingStar && starOpacity < 1)starOpacity += transition;
  if(drawingAtom && atomOpacity < 1)atomOpacity += transition;
  if(!drawingSquares && squaresOpacity > 0)squaresOpacity -= transition;
  if(!drawingCircles && circlesOpacity > 0)circlesOpacity -= transition;
  if(!drawingTriangles && trianglesOpacity > 0)trianglesOpacity -= transition;
  if(!drawingStar && starOpacity > 0)starOpacity -= transition;
  if(!drawingAtom && atomOpacity > 0)atomOpacity -= transition;
  if(squaresOpacity > 1)squaresOpacity = 1;
  if(circlesOpacity > 1)circlesOpacity = 1;
  if(trianglesOpacity > 1)trianglesOpacity = 1;
  if(starOpacity > 1)starOpacity = 1;
  if(atomOpacity > 1)atomOpacity = 1;
  if(squaresOpacity < 0)squaresOpacity = 0;
  if(circlesOpacity < 0)circlesOpacity = 0;
  if(trianglesOpacity < 0)trianglesOpacity = 0;
  if(starOpacity < 0)starOpacity = 0;
  if(atomOpacity < 0)atomOpacity = 0;

  c1.translate(innerWidth/2,innerHeight/2);
  //c1.rotate(0.14286/180*Math.PI);
  //rotation1-=0.14286;
  var xy = 0.14286;
  var kek = xy;
  c1.rotate(kek/180*Math.PI);
  rotation1-=kek;
  canvas1.style.transform = `rotate(${rotation1}deg)`;
  c1.translate(-innerWidth/2,-innerHeight/2);

  c.clearRect(0,0,innerWidth,innerHeight);
  for(i=0;i<3;i++)
  {
    squares[i].update();
    for(j=0;j<4;j++)
    {
      points[i*4+j].update();
    }
  }
  c.globalAlpha = circlesOpacity;
  for(i=0;i<4;i++)
  {
    let x = (points[i].x + points[i+4].x + points[i+8].x)/3;
    let y = (points[i].y + points[i+4].y + points[i+8].y)/3;
    c.beginPath();
    c.arc(x,y,squareSize*0.62,0,Math.PI*2);
    c.strokeStyle = "#FF00FF";
    c.stroke();
    canvas1.style.opacity = starOpacity;
    canvas2.style.opacity = atomOpacity;
  }
  c.globalAlpha = 1;
  window.requestAnimationFrame(animate);
}
animate();
