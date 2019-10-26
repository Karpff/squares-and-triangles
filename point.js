class Point
{
  constructor(angle,parent,squareFriend,circleFriend)
  {
    this.angle = angle;
    this.x;
    this.y;
    this.parent = parent;
    this.squareFriend = squareFriend;
    this.triangleFriend = circleFriend;
  }

  update()
  {
    c1.beginPath();
    c1.moveTo(this.x,this.y);
    c2.beginPath();
    c2.moveTo(this.x,this.y);

    this.angle--;
    this.x = this.parent.x + Math.sin(this.angle/180*Math.PI)*squareSize;
    this.y = this.parent.y + -Math.cos(this.angle/180*Math.PI)*squareSize;
    c.beginPath();
    c.moveTo(this.x,this.y);
    c.lineTo(this.squareFriend.x,this.squareFriend.y);
    c.strokeStyle = "#00BBFF";
    c.globalAlpha = squaresOpacity;
    c.stroke();
    c.beginPath();
    c.moveTo(this.x,this.y);
    c.lineTo(this.triangleFriend.x,this.triangleFriend.y);
    c.strokeStyle = "#FF0000";
    c.globalAlpha = trianglesOpacity;
    c.stroke();
    c.globalAlpha = 1;

    c1.lineTo(this.x,this.y);
    c1.stroke();
    c2.lineTo(this.x,this.y);
    c2.stroke();

    c.beginPath();
    c.arc(this.x,this.y,4,0,Math.PI*2);
    c.fillStyle = "white";
    c.fill();
  }
}
