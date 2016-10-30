function Pixels() {
    this.pixelList = [];
    this.now = "s1";
    this.then = "s2";
}

function updateCanvas(pixels) {

    var numPixels = pixels.length;
    for (var p = 0; p < pixels.numPixels(); p++) {
        ctx.fillStyle = pixels.pixelList[p][pixels.now];
        ctx.fillRect(
            pixels.pixelList[p].x * pSize,
            pixels.pixelList[p].y * pSize,
            pSize,
            pSize);
    }

}

Pixels.prototype.numPixels = function() {
    return this.pixelList.length;
};

Pixels.prototype.addPixel = function(pixel) {
    this.pixelList.push(pixel);
};

Pixels.prototype.isPixelAlive = function(atX, atY, time) {
    for (var p = 0; p < this.numPixels(); p++) {
        if (this.pixelList[p].x == atX && this.pixelList[p].y == atY && this.pixelList[p][time] == "black") {
            return true;
        }
    }
    return false;
};

Pixels.prototype.countNeighbors = function(atX, atY) {
    var count = 0;
    for (var px = -1; px < 2; px++) {
        for (var py = -1; py < 2; py++) {
            if (this.isPixelAlive(atX+px, atY+py, this.then) && (px !== 0 || py !== 0)) {
                count += 1;
            }
        }
    }
    return count;
};

function gameRules(pixelLife, neighbors) {
    var aliveOrDead = "live";
    if (pixelLife === true) {
        if (neighbors < 2) {
            aliveOrDead = "die";
        } else if (neighbors > 3) {
            aliveOrDead = "die";
        } else {
            aliveOrDead = "live";
        }
    } else if (pixelLife === false) {
        if (neighbors == 3) {
            aliveOrDead = "live";
        } else {
            aliveOrDead = "die";
        }
    }
    return aliveOrDead;
}

Pixels.prototype.cleanupDeadPixelsFromArray = function() {
    for (var p = 0; p < this.numPixels(); p++) {
        if (this.pixelList[p][this.then] == this.pixelList[p][this.now] && this.pixelList[p][this.now] == "white") {
            this.pixelList.splice(p, 1);
            p = p - 1;
        }
    }
};

Pixels.prototype.updatePixelsDict = function() {
    var _then = this.now;
    this.now = this.then;
    this.then = _then;
    for (var p = 0; p < this.numPixels(); p++) {

        for (var px = -1; px < 2; px++) {
            for (var py = -1; py < 2; py++) {

                var offset = true;
                if (px == py && py === 0) {
                    offset = false;
                }
                iX = this.pixelList[p].x + px;
                iY = this.pixelList[p].y + py;

                var neighbors = this.countNeighbors(iX, iY);
                var pixelLife = this.isPixelAlive(iX, iY, this.then);
                var liveOrDie = gameRules(pixelLife, neighbors);
    
                if (liveOrDie == "live" && offset === false) {
                    this.pixelList[p][this.now] = "black";
                } else if (liveOrDie == "die" && offset === false) {
                    this.pixelList[p][this.now] = "white";
                } else if (offset === true && liveOrDie == "live" && this.isPixelAlive(iX, iY, this.now) === false) {
                    var newPixel = {x: iX, y: iY};
                    newPixel[this.then] = "white";
                    newPixel[this.now] = "black";
                    this.addPixel(newPixel);
                }
            }
        }

    }

    this.cleanupDeadPixelsFromArray();
    
};

module.exports = Pixels;