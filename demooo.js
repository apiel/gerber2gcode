const gerber = `
G04 Layer: BoardOutlineLayer*
G04 EasyEDA v6.5.39, 2024-01-06 15:16:36*
G04 d67026258dc9402a94cee8dd9b3bc9af,24315905b9734375b2ccc5c6aeea7757,10*
G04 Gerber Generator version 0.2*
G04 Scale: 100 percent, Rotated: No, Reflected: No *
G04 Dimensions in inches *
G04 leading zeros omitted , absolute positions ,3 integer and 6 decimal *

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
`;

// %MOIN*% -> G20
// %MOMM*% -> G21

// %FSLAX36Y36*% -> format X 3.6 Y 3.6

let ratioX = 0.000001;
let ratioY = 0.000001;

const lines = gerber.split("\n");
for (const line of lines) {
  if (line === "%MOIN*%") {
    console.log("G20");
  } else if (line === "%MOMM*%") {
    console.log("G21");
  } else if (line.startsWith("%FSLAX")) {
    // %FSLAX36Y36*%
    const [x, y] = line.substring(6, line.length - 2).split("Y");
    const xDecimal = Number(x[1]);
    ratioX = Number((0.1 ** xDecimal).toFixed(xDecimal)); // ** = Math.pow = exponentiation operator
    const yDecimal = Number(y[1]);
    ratioY = Number((0.1 ** yDecimal).toFixed(yDecimal));
    console.log({ ratioX, ratioY });
  } else if (line.endsWith("D02*")) {
    // X4975000Y2200000D02*
    const [x, y] = line.substring(1, line.length - 4).split("Y");
    console.log(`\nG0 X${x * ratioX} Y${y * ratioY}`);
  } else if (line.endsWith("D01*")) {
    // X4975000Y475000D01*
    // or
    // X5175000Y250000I225615J-842D01*
    const l = line.replace("G03", "");
    const [x, restY = ""] = l.substring(1, l.length - 4).split("Y");
    const [y, restI = ""] = restY.split("I");
    const [i, j = ""] = restI.split("J");
    // console.log({ line, x, y, i, j });
    if (i !== "" && j !== "") {
      console.log(
        `G3 X${x * ratioX} Y${y * ratioY} I${i * ratioX} J${j * ratioY}`
      );
    } else {
      console.log(`G1 X${x * ratioX} Y${y * ratioY}`);
    }
  }
}

// for (const child of tree.children) {
//   if (child.type === "graphic") {
//     if (child.graphic === "move") { // D02
//       console.log(
//         `\nG0 X${child.coordinates.x * 0.000001} Y${
//           child.coordinates.y * 0.000001
//         }`
//       );
//     } else if (child.graphic === "segment") { // D01
//       const { x, y, i, j } = child.coordinates;
//       if (i !== undefined && j !== undefined) {
//         console.log(
//           `G3 X${x * 0.000001} Y${y * 0.000001} I${i * 0.000001} J${
//             j * 0.000001
//           }`
//         );
//       } else {
//         console.log(`G1 X${x * 0.000001} Y${y * 0.000001}`);
//       }
//     }
//   }
// }
