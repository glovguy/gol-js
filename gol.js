var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var pSize = 5;
var pixels = [];
var now = "s1";
var then = "s2";

//  Seed data
var p1 = {x: 13, y: 12, s1: "black", s2: "white"};
pixels.push(p1);
var p2 = {x: 13, y: 13, s1: "black", s2: "white"};
pixels.push(p2);
var p3 = {x: 12, y: 12, s1: "black", s2: "white"};
pixels.push(p3);
var p4 = {x: 13, y: 11, s1: "black", s2: "white"};
pixels.push(p4);
var p5 = {x: 14, y: 11, s1: "black", s2: "white"};
pixels.push(p5);

function updateCanvas() {

    var numPixels = pixels.length;
    for (var p = 0; p < numPixels; p++) {
        ctx.fillStyle = pixels[p][now];
        ctx.fillRect(
            pixels[p].x * pSize,
            pixels[p].y * pSize,
            pSize,
            pSize);
    }

    console.log(numPixels);
}

function countNeighbors(atX, atY) {
    var count = 0;
    var numPixels = pixels.length;
    for (var p = 0; p < numPixels; p++) {
        if (Math.abs(pixels[p].x - atX) == 1 || Math.abs(pixels[p].y - atY) == 1) {
            count += 1;
        }
    }
    return count;
}

function isPixelAlive(atX, atY) {
    var numPixels = pixels.length;
    for (var p = 0; p < numPixels; p++) {
        if (pixels[p].x == atX && pixels[p].y == atY && pixels[p][then] == "black") {
            return true;
        }
    }
    return false;
}

function gameRules(pixelLife, neighbors) {
    var aliveOrDead = "live";
    if (pixelLife == true) {
        if (neighbors < 2) {
            aliveOrDead = "die";
        } else if (neighbors > 3) {
            aliveOrDead = "die";
        } else {
            aliveOrDead = "live";
        }
    } else if (pixelLife == false) {
        if (neighbors == 3) {
            aliveOrDead = "live";
        } else {
            aliveOrDead = "die";
        }
    }
    return aliveOrDead;
}

function cleanupDeadPixelsFromArray() {
    var numPixels = pixels.length;
    for (var p = 0; p < numPixels; p++) {
        if (pixels[p][then] == pixels[p][now] == "white") {
            pixels.splice(p, 1);
            p = p - 1;
        }
    }
}

function updatePixelsDict() {
    var _then = now;
    now = then;
    then = _then;
    var numPixels = pixels.length;
    for (var p = 0; p < numPixels; p++) {

        for (var px = -1; px < 2; px++) {
            for (var py = -1; py < 2; py++) {

                var offset = true;
                if (px == py == 0) {
                    offset = false;
                }
                iX = pixels[p].x + px;
                iY = pixels[p].y + py;

                var neighbors = countNeighbors(iX, iY);
                var pixelLife = isPixelAlive(iX, iY);

                var liveOrDie = gameRules(pixelLife, neighbors);
    
                if (liveOrDie == "live" && offset == false) {
                    pixels[p][now] = "black";
                } else if (liveOrDie == "die" && offset == false) {
                    pixels[p][now] = "white";
                } else if (offset == true && liveOrDie == "live" && pixelLife == false) {
                    var newPixel = {x: iX, y: iY};
                    newPixel[then] = "white";
                    newPixel[now] = "black";
                    pixels.push(newPixel);
                }
            }
        }

    }

    cleanupDeadPixelsFromArray();
    
}

function cycleOfLife() {
    updateCanvas();
    updatePixelsDict();
}

var varOn = setInterval(cycleOfLife, 1110);