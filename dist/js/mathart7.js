

//functions for drawing on canvas
var r, g, b, a, hslaclr, hslagreen, hslSingle, dc, cvw, cvh, rgba;

function cvInit(canvas) {
    if (canvas == null) {
        alert('canvas is null')
        return;
    }
    if (window == null) {
        alert('window is null')
        return;
    }
    cvw = canvas.width = window.innerWidth;
    cvh = canvas.height = window.innerHeight;
    dc = canvas.getContext("2d");
    return dc;
}

function cvFade(color) {

    var old = dc.shadowColor;
    dc.shadowColor = color;
    dc.globalCompositeOperation = "source-over";
    dc.fillStyle = color;
    dc.fillRect(0, 0, cvw, cvh);
    //restore old shadow
    dc.shadowColor = old;

}


function LineTo(x1, y1, x2, y2) {
    //var dc = document.getElementById("canvas").getContext("2d");
    dc.beginPath();
    dc.moveTo(x1, y1);
    dc.lineTo(x2, y2);
    dc.stroke();
    //dc.fill();
}

function drawSph(dc, x, y, r, clrs, clrtype) {
    var op = dc.globalCompositeOperation;
    dc.globalCompositeOperation = "difference";
    dc.beginPath();
    hslaclr = clrtype;
    var gradient = dc.createRadialGradient(x, y, Math.random() * r, x, y, r);
    var useClr = 0;
    if (clrtype == undefined)
        useClr = 1;
    if (useClr > 0)
        clr();
    var div = clrs;
    gradient.addColorStop(0, hslaclr);
    if (clrs > 1) {
        clrs -= 1;
        var stops = clrs / div;
        for (var i = stops; i <= 1; i += stops) {
            if (useClr > 0)
                clr();
            gradient.addColorStop(i, hslaclr);

        }

    }
    dc.fillStyle = gradient;
    dc.arc(x, y, r, Math.PI * 2, false);
    dc.fill();
    dc.globalCompositeOperation = op;

}

//generate random colors
function clr() {
    r = Math.round(Math.random() * 255);
    g = Math.round(Math.random() * 255);
    b = Math.round(Math.random() * 255);
    a = Math.random();
    hslaclr = "hsla(" + Math.round(Math.random() * 360) + ", " +
        Math.round(80 + Math.random() * 20) + "%," +
        Math.round(Math.random() * 80) + "%, " +
        (0.8 + Math.random() * 0.2) + ")";
    //red to green (autum)
    hslagreen = "hsla(" + Math.round(Math.random() * 138) + ", " +
        Math.round(80 + Math.random() * 20) + "%," +
        Math.round(Math.random() * 80) + "%, " +
        (0.8 + Math.random() * 0.2) + ")";

    //autum colors
    b = Math.round(Math.random() * 120);
    rgba = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    //rgba = "rgba(0,0,255,1)";
    hslagreen = rgba;


}

function clrSingle(hue, a) {
    if (a == undefined)
        a = (Math.random());;
    hslaclr = "hsla(" + hue + ", " +
        Math.round(80 + Math.random() * 20) + "%," +
        Math.round(Math.random() * 80) + "%, " +
        a + ")";

}
var canvas = null;
var ctx ;
var W = 10, H = 10;
var drawInt, fadeInt;

function ClearTimers() {
    clearInterval(drawInt)
    clearInterval(fadeInt)
    canvas = null;
}
function DrawArt() {
    ClearTimers()
    if (canvas == null) {
        canvas = document.getElementById("canvas");
        if (canvas == null) {
            return
        }
        if (window == null) {
            return;
        }
        ctx = cvInit(canvas);
        W = window.innerWidth/2, H = window.innerHeight/2;
    }
    canvas.width = W;
    canvas.height = H;
    var angle = 0;
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0, 0, W, H);

    var circles = [];
    for (var i = 0; i < 30; i++) {
        circles.push(new create_circle());
    }

    function create_circle() {
        //Random position on the canvas
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        var u = 1.025;
        var q = 0.03;
        //velocities
        this.vx = Math.random() * u - (u / 2);
        this.vy = Math.random() * u - (u / 2);
        this.veerx = Math.random() * q - (q / 2);
        this.veery = Math.random() * q - (q / 2);
        //Random colors
        clr(); this.clr1 = hslaclr; clr(); this.clr2 = hslaclr;
        clr(); this.clr3 = hslaclr; clr(); this.clr4 = hslaclr;
        clr(); this.clr5 = hslaclr; clr(); this.clr6 = hslaclr;
        clr(); this.clr7 = hslaclr; clr(); this.clr8 = hslaclr;
        clr(); this.clr9 = hslaclr; clr(); this.clr10 = hslaclr;
        clr(); this.clr9 = hslaclr; clr(); this.clr11 = hslaclr;
        clr(); this.clr9 = hslaclr; clr(); this.clr12 = hslaclr;
        //Random size
        this.radius = Math.random() * W / 10 + 30;
        this.angle = Math.round(Math.random() * 360);
        var inc = Math.PI / 3;
        this.inc = Math.random() * inc;
        this.linewidth = Math.random() * .08;
    }

    function fade() {
     //   alert("fade")
      cvFade("rgba(0,0,0, 0.1)");
    }

    function draw() {
        //alert("draw")
       //ctx.shadowOffsetX =9.1;
        //ctx.shadowOffsetY =9.1;
        //ctx.shadowBlur =9.1;
        var xaxis = true;
        for (var t = 0; t < circles.length; t++) {
            var c = circles[t];
            ctx.lineWidth = c.linewidth;
            ctx.shadowOffsetX = c.radius / 20;
            ctx.shadowOffsetY = c.radius / 20;

            var sin = Math.sin(c.angle * Math.PI / 180) * c.radius;
            ctx.shadowColor = c.clr4;
            ctx.strokeStyle = c.clr1;
            var cos = Math.cos(c.angle * Math.PI / 180) * c.radius;
            var sec = 1 / (Math.cos(c.angle * Math.PI / 180)) * c.radius;
            var csc = 1 / (Math.sin(c.angle * Math.PI / 180)) * c.radius;
            LineTo(c.x, c.y, c.x - cos, c.y + sin);
            ctx.strokeStyle = c.clr2;
            ctx.shadowColor = c.clr5;
            LineTo(c.x, c.y, c.x + cos, c.y - sin);

            ctx.shadowColor = c.clr6;
            ctx.strokeStyle = c.clr3;
            LineTo(c.x, c.y, c.x + cos, c.y + sin);
            ctx.shadowColor = c.clr7;
            ctx.strokeStyle = c.clr8;
            LineTo(c.x, c.y, c.x - cos, c.y - sin);
            ctx.shadowColor = c.clr9;
            ctx.strokeStyle = c.clr10;

            ctx.lineWidth = .02;

            //LineTo(c.x, c.y, c.x -sec, c.y - csc);
            ctx.shadowColor = c.clr11;
            ctx.strokeStyle = c.clr12;
            //LineTo(c.x, c.y, c.x +sec, c.y +csc);
            c.x += c.vx;
            c.y += c.vy;
            c.vx += c.veerx * Math.cos(c.angle * Math.PI / 180);
            c.vy -= c.veery * Math.sin(c.angle * Math.PI / 180);
            //once offscreen, replace it
            if (c.x > W + (W / 2) || c.x < -(W / 2) || c.y > H + H / 2 || c.y < -(H / 2) || c.radius <= 0) {
                circles[t] = new create_circle();
            }
            c.angle += c.inc;
            c.radius -= .01;
            if (c.angle > 360) {
                c.angle = c.angle - 360;
            }
            if (c.angle < 0) {
                c.angle = 360 + c.angle;
            }
            ctx.beginPath();
        }
    }
    drawInt =  setInterval(draw, 5);
    fadeInt = setInterval(fade, 2200);
}
