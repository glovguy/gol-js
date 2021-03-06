var pixels = [];
module.exports = pixels;

describe("Pixels", function() {
  var Pixels = require('../gol.js');

  beforeEach(function() {

    pixels = new Pixels();
    
  });

  it("should add pixels and count the number of pixels it has accurately", function() {
    expect(pixels.numPixels()).toEqual(0);
    var p5 = {x: 14, y: 11, s1: "black", s2: "black"};
    pixels.addPixel(p5);
    expect(pixels.numPixels()).toEqual(1);
  });

  it("should be able to add pixels and recognize when a pixel is alive", function() {
    var p1 = {x: 14, y: 11, s1: "black", s2: "black"};
    pixels.addPixel(p1);
    expect(pixels.isPixelAlive(14, 11, pixels.then)).toEqual(true);
    expect(pixels.isPixelAlive(11, 14, pixels.then)).toEqual(false);
    var p2 = {x: 12, y: 12, s1: "white", s2: "white"};
    pixels.addPixel(p2);
    expect(pixels.isPixelAlive(12, 12, pixels.then)).toEqual(false);
  });

  it("should be able to count neighbors for a pixel", function() {
    var p1 = {x: 14, y: 11, s1: "black", s2: "black"};
    var p2 = {x: 12, y: 12, s1: "black", s2: "black"};
    pixels.addPixel(p1);
    pixels.addPixel(p2);
    expect(pixels.countNeighbors(14, 11)).toEqual(0);
    expect(pixels.countNeighbors(14, 10)).toEqual(1);
    expect(pixels.countNeighbors(11, 11)).toEqual(1);
    var p3 = {x: 12, y: 11, s1: "black", s2: "black"};
    pixels.addPixel(p3);
    expect(pixels.countNeighbors(11, 11)).toEqual(2);
  });

  it("should be able to clean up dead pixels in array", function() {
    var p1 = {x: 14, y: 11, s1: "white", s2: "white"};
    var p2 = {x: 12, y: 12, s1: "black", s2: "black"};
    pixels.addPixel(p1);
    pixels.addPixel(p2);
    expect(pixels.numPixels()).toEqual(2);
    pixels.cleanupDeadPixelsFromArray();
    expect(pixels.numPixels()).toEqual(1);
  });

  it("should update pixels in a glider correctly", function() {
    var p1 = {x: 11, y: 12, s1: "black", s2: "black"};
    var p2 = {x: 13, y: 11, s1: "black", s2: "black"};
    var p3 = {x: 13, y: 12, s1: "black", s2: "black"};
    var p4 = {x: 13, y: 13, s1: "black", s2: "black"};
    var p5 = {x: 12, y: 13, s1: "black", s2: "black"};
    pixels.addPixel(p1);
    pixels.addPixel(p2);
    pixels.addPixel(p3);
    pixels.addPixel(p4);
    pixels.addPixel(p5);
    pixels.updatePixelsDict();
    expect(pixels.isPixelAlive(12, 11, pixels.now)).toEqual(true);
    expect(pixels.isPixelAlive(13, 11, pixels.now)).toEqual(false);
    expect(pixels.isPixelAlive(11, 12, pixels.now)).toEqual(false);
    expect(pixels.isPixelAlive(12, 12, pixels.now)).toEqual(false);
    expect(pixels.isPixelAlive(13, 12, pixels.now)).toEqual(true);
    expect(pixels.isPixelAlive(14, 12, pixels.now)).toEqual(true);
    expect(pixels.isPixelAlive(11, 13, pixels.now)).toEqual(false);
    expect(pixels.isPixelAlive(12, 13, pixels.now)).toEqual(true);
    expect(pixels.isPixelAlive(13, 13, pixels.now)).toEqual(true);
    expect(pixels.isPixelAlive(14, 13, pixels.now)).toEqual(false);
  });

  it("should not memory leak when adding pixels", function() {
    // glider pattern should be stable over time
    var p1 = {x: 11, y: 12, s1: "black", s2: "black"};
    var p2 = {x: 13, y: 11, s1: "black", s2: "black"};
    var p3 = {x: 13, y: 12, s1: "black", s2: "black"};
    var p4 = {x: 13, y: 13, s1: "black", s2: "black"};
    var p5 = {x: 12, y: 13, s1: "black", s2: "black"};
    pixels.addPixel(p1);
    pixels.addPixel(p2);
    pixels.addPixel(p3);
    pixels.addPixel(p4);
    pixels.addPixel(p5);
    for (var i = 0; i < 10; i++) {
        pixels.updatePixelsDict();
    }
    expect(pixels.numPixels()).toBeLessThan(13);
    for (var ii = 0; ii < 7; ii++) {
        pixels.updatePixelsDict();
    }
    expect(pixels.numPixels()).toBeLessThan(13);
  });

  it("should recognize square statue", function() {
    var statues = require('../statues.js');
    var p1 = {x: 11, y: 12, s1: "black", s2: "black"};
    var p2 = {x: 11, y: 11, s1: "black", s2: "black"};
    var p3 = {x: 12, y: 11, s1: "black", s2: "black"};
    var p4 = {x: 12, y: 12, s1: "black", s2: "black"};
    pixels.addPixel(p1);
    pixels.addPixel(p2);
    pixels.addPixel(p3);
    pixels.addPixel(p4);
    pixels.recognizeStatues();
    expect(pixels.statues.length).toEqual(1);
    // expect(pixels.statues[0]).toEqual(new statues.Square());
  });

});
