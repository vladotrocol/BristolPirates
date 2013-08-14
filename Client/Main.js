var canvas, ctx, out;
window.onload = ViewDidLoad;

	function ViewDidLoad(){
		canvas = document.getElementById("TrackPad");
		canvas.style.position = "absolute";
		canvas.style.left = "0px";
		canvas.style.top = "0px";

		out = document.getElementById("out");
		out.style.position = "absolute";
		out.style.left = "10px";
		out.style.top = "0px";
		canvas.addEventListener('mousemove', ev_mousemove, false);
		canvas.width = 600;
		canvas.height = 400;
		ctx = canvas.getContext("2d");
		ctx.fillStyle="#FF0000";
		ctx.fillRect(0,0,600,400);
	};

	function text(fieldName) {
  		while(out.childNodes.length >= 1) {
    		out.removeChild(out.firstChild);
  		}
  		out.appendChild(out.ownerDocument.createTextNode(fieldName));
	};

	function ev_mousemove (ev) {
  		var x, y;

  		// Get the mouse position relative to the canvas element.
  		if (ev.layerX || ev.layerX == 0) { // Firefox
    		x = ev.layerX - canvas.offsetLeft;
    		y = ev.layerY - canvas.offsetTop;
  		} else if (ev.offsetX || ev.offsetX == 0) { // Opera
    		x = ev.offsetX - canvas.offsetLeft;
    		y = ev.offsetY - canvas.offsetTop;
    	}
    	ctx.fillStyle="#44aaaa";
		ctx.fillRect(0,0,600,400);

    	ctx.beginPath();
      	ctx.moveTo(300, 200);
      	ctx.lineTo(x, y);
      	ctx.lineWidth =20;
      	ctx.stroke();
      	ctx.closePath();


    	ctx.beginPath();
      	ctx.arc(x, y, 50, 0, 2 * Math.PI, false);
      	ctx.fillStyle = '#eeaa00';
      	ctx.fill();
      	ctx.lineWidth = 5;
      	ctx.strokeStyle = '#663300';
      	ctx.stroke();
      	ctx.closePath();


    	text(x+" "+y);
  	};