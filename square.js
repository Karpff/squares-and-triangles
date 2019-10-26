class Square
{
  constructor(angle)
  {
    this.angle = angle;
    this.x;
    this.y;
  }

  update()
  {
    this.angle++;
    this.x = innerWidth/2 + Math.sin(this.angle/180*Math.PI)*squareToCenter;
    this.y = innerHeight/2 + -Math.cos(this.angle/180*Math.PI)*squareToCenter;
    c.beginPath();
    c.arc(this.x,this.y,squareSize,0,Math.PI*2);
    c.strokeStyle = "#FF00FF";
    c.globalAlpha = circlesOpacity;
    c.stroke();
    c.globalAlpha = 1;
  }
}
