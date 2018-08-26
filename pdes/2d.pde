int i = 0;
void setup() {
  size(200, 200);
  frameRate(24);
  background(255);
  strokeWeight(15);
  smooth();
}
void draw() {
  stroke(random(50), random(255), random(255), 100);
  line(i++, 0, random(0, width), height);
  if (i >= width) i = 0;
}
void mousePressed() {
  background(255);
  redraw();
}
