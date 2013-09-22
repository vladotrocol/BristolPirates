var canvas, ctx, out, container;
var w,h, wold, hold;
var x=0, y=0;
var move = false;

window.onload = ViewDidLoad;
window.onresize = Resize;

function resizeCanvas(){
  wold = canvas.width;
  hold = canvas.height;
  canvas.width = window.innerWidth/4;
  canvas.height = window.innerHeight/2;
  w = window.innerWidth/4;
  h = window.innerHeight/2;
};

function getWRatio(){
  return canvas.width/wold;
};

function getHRatio(){
  return canvas.height/hold;
};

function Init(){
  canvas = document.getElementById("TrackPad");
  container = document.getElementById("mid");
  ctx = canvas.getContext("2d");
  out = document.getElementById("out");
  Resize();
  wold = canvas.width;
  hold = canvas.height;
  DrawTrack(true);
};

function addListeners(){
  canvas.addEventListener('mousemove', ev_mousemove, false);
  canvas.addEventListener('mousedown', ev_mousedown, false);
  canvas.addEventListener('mouseup', ev_mouseup, false);
  canvas.addEventListener('mouseout', ev_mouseout, false);
};

function ViewDidLoad(){
    Init();
    addListeners();
};

function Resize(){
  resizeCanvas();
  DrawTrack(true);
};

function text(fieldName) {
  while(out.childNodes.length >= 1) {
  	out.removeChild(out.firstChild);
  }
  out.appendChild(out.ownerDocument.createTextNode(fieldName));
};


function DrawTrack(resized){
 if(resized||move){
    ctx.fillStyle="#44aaaa";
    ctx.fillRect(0,0,w,h);

    ctx.beginPath();
    ctx.moveTo(w/2, h/2);
    ctx.lineTo(x, y);
    ctx.lineWidth =20;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(x, y, 50*getWRatio()*getHRatio(), 0, 2 * Math.PI, false);
    text(getWRatio()+" " +canvas.height+" " + hold+" ");
    ctx.fillStyle = '#eeaa00';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#663300';
    ctx.stroke();
    ctx.closePath();
  }
};

function ev_mousemove (ev) {
	// Get the mouse position relative to the canvas element.
	if (ev.layerX || ev.layerX == 0) { // Firefox
		x = ev.layerX ;
		y = ev.layerY ;
	} else if (ev.offsetX || ev.offsetX == 0) { // Opera
		x = ev.offsetX ;
		y = ev.offsetY ;
	}
  DrawTrack(false);
	text(x+" "+y);
};

function ev_mousedown(){
  move = true;
};

function ev_mouseup(){
  move = false;
};

function ev_mouseout(){
  move = false;
};