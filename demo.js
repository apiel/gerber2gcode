// import { createParser } from "@tracespace/parser";
// commonjs is cool, too
const { createParser } = require("@tracespace/parser");
const { plot } = require("@tracespace/plotter");

const parser = createParser();
parser.feed(`
%FSLAX36Y36*%
%MOIN*%

%ADD10C,0.0050*%
%ADD11C,0.0020*%
D10*
X6600000Y450000D02*
G01*
X6600000Y2175000D01*
X5175000Y250000D02*
G01*
X6375000Y250000D01*
X4975000Y2200000D02*
G01*
X4975000Y475000D01*
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
X4975000Y475000D02*
G03*
X5175000Y250000I225615J-842D01*
G75*
G01*
X6375000Y250000D02*
G03*
X6600000Y450000I842J225615D01*

%LPD*%
M02*

`);
const tree = parser.results();

// console.log(tree.children);
// console.log(JSON.stringify(tree, null, 2));

for (const child of tree.children) {
  console.log(child);
}

const plotResult = plot(tree);
// console.log(plotResult);
for (const child of plotResult.children) {
  console.log("----");
  console.log(child.segments);
}

let last = [9999999, 9999999];
for (const child of plotResult.children) {
  // console.log("----");
  // console.log(child.segments);

  for (const segment of child.segments) {
    if (segment.type === "line") {
      if (last[0] !== segment.start[0] || last[1] !== segment.start[1]) {
        console.log(`\nG0 X${segment.start[0]} Y${segment.start[1]}`);
      }
      console.log(`G1 X${segment.end[0]} Y${segment.end[1]}`);
    } else if (segment.type === "arc") {
      // console.log(`G2 X${segment.end[0] - 0.00001} Y${segment.end[1]} R${-segment.radius}`);

      console.log(`\nG0 X${segment.start[0]} Y${segment.start[1]}`);
      console.log(
        `G3 X${segment.end[0]} Y${segment.end[1] - 0.00001} R${segment.radius}`
      );
    }
    last = segment.end;
  }
}
