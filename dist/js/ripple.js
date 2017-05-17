/**
 * Water ripple effect.
 * Original code (Java) by Neil Wallis 
 * @link http://www.neilwallis.com/java/water.html
 * 
 * @author Sergey Chikuyonok (serge.che@gmail.com)
 * @link http://chikuyonok.ru
 */


var drawRipTimerInterval;
var disturbTimerInterval;
var img = new Image()
img.src = "/images/BT.jpg";
img.width = 475; img.height = 271;

var ClearRippleTimers = () => {
    clearInterval(drawRipTimerInterval)
    clearInterval(disturbTimerInterval)
    canvas = null
    //console.log('cleared ripple')

}

function Ripple() {
    ClearRippleTimers()
    var canvas = document.getElementById('c'),
        ctx = canvas.getContext('2d'),
        width = img.width,
        height = img.height,
        half_width = width >> 1,
        half_height = height >> 1,
        line_width = 20,
        step = line_width * 2,
        count = height / line_width;
        oldind = width,
        newind = width * (height + 3),
        riprad = 3,
        ripplemap = [],
        last_map = [],
        ripple = 0,
        texture = 0,
        lastdx = -1,
        lastdy = -1,
        shift = 5;
    z = 1;
    size = width * (height + 2) * 2;
    canvas.width = width;
    canvas.height = height;
    with (ctx) {
        //console.log('draw image')
        ctx.drawImage(img, 0, 0);
        restore();
    }


    ctx.drawImage(img, 0, 0);
    texture = ctx.getImageData(0, 0, width, height);
    ripple = ctx.getImageData(0, 0, width, height);

    for (var i = 0; i < size; i++) {
        last_map[i] = ripplemap[i] = 0;
    }

    /**
     * Main loop
     */
    function run() {
        newframe();
        ctx.putImageData(ripple, 0, 0);
    }


    //my addition to the brew, this adds a circular ripple effect
    function DepthMap(dx, dy) {
        //add a sin wave to the bit shift
        wave = 8;
        train = 3.4;
        r = (Math.sqrt(dx * dx + dy * dy) - riprad) / wave;
        n = r - (1 - 1.5) * riprad / wave;
        z = (1 / (1 + (r / train) * (r / train))) * (Math.sin(n * 2 * 3.14159));
        z *= 31.4159;
    }
    /**
     * Disturb water at specified point
     */
    function disturb(dx, dy) {
        dx <<= 0;
        dy <<= 0;
        riprad++;
        if (riprad > 6)
            riprad = 3;

        for (var j = dy - riprad; j < dy + riprad; j++) {
            for (var k = dx - riprad; k < dx + riprad; k++) {
                dlx = k - dx;
                dly = j - dy;
                DepthMap(dlx, dly);//add trig influence
                ripplemap[oldind + (j * width) + k] += (64 * z) << 0;
            }
        }
    }
    function newframe() {
        var a, b, data, cur_pixel, new_pixel, old_data;

        var t = oldind; oldind = newind; newind = t;
        var i = 0;

        // create local copies of variables to decrease
        // scope lookup time in Firefox
        var _width = width,
            _height = height,
            _ripplemap = ripplemap,
            _last_map = last_map,
            _rd = ripple.data,
            _td = texture.data,
            _half_width = half_width,
            _half_height = half_height;

        for (var y = 0; y < _height; y++) {
            for (var x = 0; x < _width; x++) {
                var _newind = newind + i, _mapind = oldind + i;
                var o = _ripplemap[_mapind - _width];
                var t = _ripplemap[_mapind + _width];
                var th = _ripplemap[_mapind - 1];
                var f = _ripplemap[_mapind + _width];
                data = (
                    _ripplemap[_mapind - _width] +
                    _ripplemap[_mapind + _width] +
                    _ripplemap[_mapind - 1] +
                    _ripplemap[_mapind + 1]) >> 1;

                data -= _ripplemap[_newind];
                shift = 3;//controls the amount of array shift, smaller will 'dissipate' faster
                shift = (Math.random() * 5 + 1) << 0;

                data -= data >> shift;
                _ripplemap[_newind] = data;

                //where data = 0 then still, where data > 0 then wave
                data = 1024 - data;
                if (data > 0) {
                    var t = 0;
                }

                old_data = _last_map[i];
                _last_map[i] = data;

                if (old_data != data) {
                    //offsets
                    a = (((x - _half_width) * (data) / 1024) << 0) + _half_width;
                    b = (((y - _half_height) * (data) / 1024) << 0) + _half_height;

                    //bounds check
                    if (a >= _width) a = _width - 1;
                    if (a < 0) a = 0;
                    if (b >= _height) b = _height - 1;
                    if (b < 0) b = 0;

                    new_pixel = (a + (b * _width)) * 4;
                    cur_pixel = i * 4;

                    _rd[cur_pixel] = _td[new_pixel];
                    _rd[cur_pixel + 1] = _td[new_pixel + 1];
                    _rd[cur_pixel + 2] = _td[new_pixel + 2];
                }

                ++i;
            }
        }
    }
    canvas.onmousemove = function (/* Event */ evt) {
        disturb(evt.offsetX || evt.layerX, evt.offsetY || evt.layerY);
    };

    drawRipTimerInterval = setInterval(run, 50);
    // generate random ripples
    var rnd = Math.random;
    disturbTimerInterval = setInterval(function () {
        disturb(rnd() * width, rnd() * height);
    }, 1000);

};



