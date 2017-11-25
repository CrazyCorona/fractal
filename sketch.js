var rxslider;
var ryslider;
var a=0;
var b=0;
var aa=0;
var bb=0;
var iter=100;
var ca=0;
var cb=0;
var c=100;
var rx=2;
var ry=2;
var canvasSize=700;
var prev_x;
var prev_y;
var col;
var HSBmode=false;
var input;
var prev_iter;
function setup() {

	var canvas=createCanvas(canvasSize, canvasSize);
	canvas.position(windowWidth/2-canvasSize/2,0);
	background(200);
	var p=createElement('h1','MendelBrot Set');
	p.position(width-100,20);
	var button=createButton('Change Color');
	button.mousePressed(changeColor);
	button.position(100,height/2);
	createP('Slider x : To move in Set Space');
	rxslider=createSlider(0,100,50);
	createP('Slider y : To move in Set Space');
	ryslider=createSlider(0,100,50);

	var ip=createP('Move Slider to change No of Iterations :');
	input=createSlider(1,500,100);
	iterText=createElement('h2','No. of Iterations : ');
	iterText.html('No. of Iterations : '+iter);
	prev_y=ryslider.value();
	prev_x=rxslider.value();
	prev_iter=input.value();

		generateMendel();
}

function changeColor(){
	HSBmode=!HSBmode;
	generateMendel();
}

function draw() {

	if(rxslider.value()!=prev_x||ryslider.value()!=prev_y||prev_iter!=input.value())
	{
		prev_iter=input.value();
		iter=prev_iter;
		iterText.html('No. of Iterations : '+iter);
		prev_x=rxslider.value();
		prev_y=ryslider.value();
		generateMendel();
	}

}



function generateMendel()
{
	iter=floor(input.value());
	ry=(map(ryslider.value(),0,100,0,4));
	rx=(map(rxslider.value(),0,100,-4,0));
		loadPixels();
		for (var x = 0; x <width ; x++) {
			for (var y = 0; y < height; y++) {

				a=map(x,0,width,rx,ry);
				b=map(y,0,height,rx ,ry);

				ca=a;
				cb=b;

				var it=0;
				while(it<iter)
				{
					aa=a*a-b*b+ca;
					bb=2*a*b+cb;
					a=aa;
					b=bb;
					if(aa>20||bb>20){
						break;
					}
					it++;
				}

				if(it==iter){
					c=0;
				}else{
					c=map(it,0,iter,255,0);
				}
				if(HSBmode){
					colorMode(HSB,255);
					col=color(c,250,255);
				}
				else
				{
				col=color(c);
				}
			i=4*(x+y*width);
		  	pixels[i] =red(col);
		  	pixels[i+1] = blue(col);
		  	pixels[i+2] = green(col);
		  	pixels[i+3] = 255;
			}
		}
		updatePixels();
}
