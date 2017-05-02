var canvas = null;
var ctx;
var cnvW = 10, cnvH = 10;
var drawTimerInterval, fadeTimerInterval;
var hslaclr = 0

function LineTo(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

var StartDraw = () => {
    clearInterval(drawTimerInterval)
    clearInterval(fadeTimerInterval)
    canvas = document.getElementById("canvas")
    if (canvas == null || canvas == undefined) return

    cnvW = canvas.width = window.innerWidth - 100
    cnvH = canvas.height = window.innerHeight - 350
    ctx = canvas.getContext("2d")
    //ctx.fillStyle = "rgba(200, 200, 100, 1)";
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, cnvW, cnvH);

    var circles = []//make something to draw
    for (var i = 0; i < 50; i++) {
        circles.push(new create_circle())
    }

    function create_circle() {
        //Random position on the canvas
        this.x = Math.random() * cnvW;
        this.y = Math.random() * cnvH;
        var u = 1.25;        var q = 0.01;
        //velocities
        this.vx = Math.random() * u - (u / 2);        this.vy = Math.random() * u - (u / 2);
        this.veerx = Math.random() * q - (q / 2);        this.veery = Math.random() * q - (q / 2);
        //Random colors
        clr(); this.clr1 = hslaclr; clr(); this.clr2 = hslaclr;
        clr(); this.clr3 = hslaclr; clr(); this.clr4 = hslaclr;
        clr(); this.clr5 = hslaclr; clr(); this.clr6 = hslaclr;
        clr(); this.clr7 = hslaclr; clr(); this.clr8 = hslaclr;
        clr(); this.clr9 = hslaclr; clr(); this.clr10 = hslaclr;
        clr(); this.clr9 = hslaclr; clr(); this.clr11 = hslaclr;
        clr(); this.clr9 = hslaclr; clr(); this.clr12 = hslaclr;
        //Random size
        this.radius = Math.random() * cnvW / 30 + 30;
        this.angle = Math.round(Math.random() * 360);
        var inc = Math.PI / 3;
        this.inc = Math.random() * inc;
        this.linewidth = Math.random() * .08;
    }

    function draw() {
        for (var t = 0; t < circles.length; t++) {
            var c = circles[t]
            var sin = Math.sin(c.angle * Math.PI / 180) * c.radius
            var cos = Math.cos(c.angle * Math.PI / 180) * c.radius;
            ctx.lineWidth = c.linewidth
            ctx.shadowOffsetX = c.radius / 20
            ctx.shadowOffsetY = c.radius / 20
            ctx.shadowColor = c.clr4
            ctx.strokeStyle = c.clr1

            LineTo(c.x, c.y, c.x - cos, c.y + sin);
            ctx.strokeStyle = c.clr2; ctx.shadowColor = c.clr5;
            LineTo(c.x, c.y, c.x + cos, c.y - sin);
            ctx.shadowColor = c.clr6; ctx.strokeStyle = c.clr3;
            LineTo(c.x, c.y, c.x + cos, c.y + sin);
            ctx.shadowColor = c.clr7; ctx.strokeStyle = c.clr8;
            LineTo(c.x, c.y, c.x - cos, c.y - sin);
            ctx.shadowColor = c.clr9; ctx.strokeStyle = c.clr10;

            c.x += c.vx;
            c.y += c.vy;
            c.vx += c.veerx * Math.cos(c.angle * Math.PI / 180);
            c.vy -= c.veery * Math.sin(c.angle * Math.PI / 180);
            //once offscreen, replace it
            if (c.x > cnvW + (cnvW / 2) || c.x < -(cnvW / 2) ||
                c.y > cnvH + cnvH / 2 || c.y < -(cnvH / 2) || c.radius <= 0) {
                circles[t] = new create_circle();
            }
            c.angle += c.inc;
            c.radius -= .01;//slowly decrease radius
            if (c.angle > 360) c.angle = c.angle - 360;
            if (c.angle < 0) c.angle = 360 + c.angle;
            ctx.beginPath();
        }
   }

    function fade() {
        ctxfade("rgba(255,255,255, 0.05)");
    }

    drawTimerInterval = setInterval(draw, 5);
    fadeTimerInterval = setInterval(fade, 500);
}


//helpers
function clr() {
    hslaclr = "hsla(" + Math.round(Math.random() * 360) + ", " +
        Math.round(80 + Math.random() * 20) + "%," +
        Math.round(Math.random() * 80) + "%, " +
        (0.8 + Math.random() * 0.2) + ")";
}

function ctxfade(color) {
    var old = ctx.shadowColor;
    ctx.shadowColor = color;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, cnvW, cnvH);
    //restore old shadow
    ctx.shadowColor = old;

}

