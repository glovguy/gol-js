function glider(pixels) {
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
}

function fPentamino(pixels) {
    var p1 = {x: 93, y: 52, s1: "black", s2: "black"};
    pixels.addPixel(p1);
    var p2 = {x: 93, y: 53, s1: "black", s2: "black"};
    pixels.addPixel(p2);
    var p3 = {x: 92, y: 52, s1: "black", s2: "black"};
    pixels.addPixel(p3);
    var p4 = {x: 93, y: 51, s1: "black", s2: "black"};
    pixels.addPixel(p4);
    var p5 = {x: 94, y: 51, s1: "black", s2: "black"};
    pixels.addPixel(p5);
}
