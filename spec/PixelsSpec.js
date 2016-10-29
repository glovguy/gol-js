var pixels = [];
module.exports = pixels;

describe("Player", function() {
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
    expect(pixels.isPixelAlive(14, 11)).toEqual(true);
    expect(pixels.isPixelAlive(11, 14)).toEqual(false);
    var p2 = {x: 12, y: 12, s1: "white", s2: "white"};
    pixels.addPixel(p2);
    expect(pixels.isPixelAlive(12, 12)).toEqual(false);
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
    var p1 = {x: 11, y: 12, s1: "white", s2: "white"};
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
    console.log(pixels.countNeighbors(13, 13));
    console.log(pixels);
    expect(pixels.numPixels()).toEqual(5);
  });

//   describe("when song has been paused", function() {
//     beforeEach(function() {
//       player.play(song);
//       player.pause();
//     });

//     it("should indicate that the song is currently paused", function() {
//       expect(player.isPlaying).toBeFalsy();

//       // demonstrates use of 'not' with a custom matcher
//       expect(player).not.toBePlaying(song);
//     });

//     it("should be possible to resume", function() {
//       player.resume();
//       expect(player.isPlaying).toBeTruthy();
//       expect(player.currentlyPlayingSong).toEqual(song);
//     });
//   });

//   // demonstrates use of spies to intercept and test method calls
//   it("tells the current song if the user has made it a favorite", function() {
//     spyOn(song, 'persistFavoriteStatus');

//     player.play(song);
//     player.makeFavorite();

//     expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
//   });

//   //demonstrates use of expected exceptions
//   describe("#resume", function() {
//     it("should throw an exception if song is already playing", function() {
//       player.play(song);

//       expect(function() {
//         player.resume();
//       }).toThrowError("song is already playing");
//     });
//   });
});
