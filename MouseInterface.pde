class MouseTracker {
  private int currX, currY;
  private int originX, originY;
  
  public MouseTracker()
  {
  }
  
  public void setOrigin(int newX, int newY){
    this.originX = newX;
    this.originY = newY;
  }
  
  public int getXOffset()
  {
    return (this.currX - this.originX) / 5;
  }
  
  public int getYOffset()
  {
    return (this.currY - this.originY) / 5;
  }
  
  public void setX(int x){
    this.currX = x;
  }
  
  public void setY(int y){
    this.currY = y;
  }
}
