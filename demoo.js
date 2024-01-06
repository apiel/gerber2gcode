// import { createParser } from "@tracespace/parser";
// commonjs is cool, too
const { createParser } = require("@tracespace/parser");
const { plot } = require("@tracespace/plotter");

const parser = createParser();

// G04 Layer: BoardOutlineLayer*
// G04 EasyEDA v6.5.39, 2024-01-06 15:16:36*
// G04 d67026258dc9402a94cee8dd9b3bc9af,24315905b9734375b2ccc5c6aeea7757,10*
// G04 Gerber Generator version 0.2*
// G04 Scale: 100 percent, Rotated: No, Reflected: No *
// G04 Dimensions in inches *
// G04 leading zeros omitted , absolute positions ,3 integer and 6 decimal *

parser.feed(`
%FSLAX36Y36*%
%MOIN*%

%ADD10C,0.0050*%
%ADD11C,0.0020*%
D10*
X4975000Y2200000D02*
G01*
X4975000Y475000D01*
X5175000Y250000D02*
G01*
X6375000Y250000D01*
X6600000Y450000D02*
G01*
X6600000Y2175000D01*
X6400000Y2400000D02*
G01*
X5200000Y2400000D01*
D11*
X0Y0D02*
G01*
X0Y45700D01*
X0Y2650000D01*
X6900000Y2650000D01*
X6900000Y0D01*
X25000Y0D01*
X25000Y0D02*
G01*
X0Y0D01*
D10*
G75*
G01
X4442710Y2350000D02*
G03X4442710Y2350000I-167710J0D01*
G75*
G01
X4442710Y350000D02*
G03X4442710Y350000I-167710J0D01*
G75*
G01*
X5200000Y2400000D02*
G03*
X4975000Y2200000I-842J-225615D01*
G75*
G01*
X6600000Y2175000D02*
G03*
X6400000Y2400000I-225615J842D01*
G75*
G01*
X6375000Y250000D02*
G03*
X6600000Y450000I842J225615D01*
G75*
G01*
X4975000Y475000D02*
G03*
X5175000Y250000I225615J-842D01*

%LPD*%
M02*

`);
const tree = parser.results();

// console.log(tree.children);
// console.log(JSON.stringify(tree, null, 2));

// %MOIN*% -> G20
// %MOMM*% -> G21

// %FSLAX36Y36*% -> format X 3.6 Y 3.6

for (const child of tree.children) {
  console.log(child);
}

for (const child of tree.children) {
  if (child.type === "graphic") {
    if (child.graphic === "move") { // D02
      console.log(
        `\nG0 X${child.coordinates.x * 0.000001} Y${
          child.coordinates.y * 0.000001
        }`
      );
    } else if (child.graphic === "segment") { // D01
      const { x, y, i, j } = child.coordinates;
      if (i !== undefined && j !== undefined) {
        console.log(
          `G3 X${x * 0.000001} Y${y * 0.000001} I${i * 0.000001} J${
            j * 0.000001
          }`
        );
      } else {
        console.log(`G1 X${x * 0.000001} Y${y * 0.000001}`);
      }
    }
  }
}
