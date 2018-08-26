void setup() {
	size($(window).width() - 320, $(window).height() - 145);
	frameRate(30);
}

void draw() {
	if(!task)
		return;
	background(255);
	stroke(255);
	float cw = width / task.state.length;
	for(int i = 0; i < task.state.length; i++) {
		if(task.state[i][1])
			fill(174, 228, 150);
		else
			fill(117, 192, 238);
		float ch = map(task.state[i][0], 0, 100, 0, height);
		rect(i*cw, height-ch, cw, ch);
	}
}