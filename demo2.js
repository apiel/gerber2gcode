const svgGcode = require('svg_gcode');

// Read SVG file contents from a file or a string
var svgString = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="121.285mm" height="72.39mm"
viewBox="4010 3118 477.5 285">
<polyline points="4022.5 3393 4020 3393" stroke-width="0.5" stroke-linecap="round" fill="none" stroke="black" />
<polyline points="4020 3393 4020 3388.43 4020 3128 4477.5 3128 4477.5 3393 4022.5 3393" stroke-width="0.5"
    stroke-linecap="round" fill="none" stroke="black" />
<circle cx="4140" cy="3158" r="16.7705" stroke-width="0.5" fill="none" stroke="black" />
<circle cx="4242.5" cy="3158" r="16.7705" stroke-width="0.5" fill="none" stroke="black" />
<circle cx="4345" cy="3158" r="16.7705" stroke-width="0.5" fill="none" stroke="black" />
<circle cx="4447.5" cy="3158" r="16.7705" stroke-width="0.5" fill="none" stroke="black" />
<circle cx="4447.5" cy="3258" r="16.7705" stroke-width="0.5" fill="none" stroke="black" />
<circle cx="4345" cy="3258" r="16.7705" stroke-width="0.5" fill="none" stroke="black" />
<circle cx="4242.5" cy="3258" r="16.7705" stroke-width="0.5" fill="none" stroke="black" />
<circle cx="4140" cy="3258" r="16.7705" stroke-width="0.5" fill="none" stroke="black" />
<circle cx="4242.5" cy="3358" r="16.7705" stroke-width="0.5" fill="none" stroke="black" />
<circle cx="4140" cy="3358" r="16.0078" stroke-width="0.5" fill="none" stroke="black" />
<circle cx="4345" cy="3358" r="16.7705" stroke-width="0.5" fill="none" stroke="black" />
<circle cx="4447.5" cy="3358" r="16.7705" stroke-width="0.5" fill="none" stroke="black" />
<circle cx="4452.5" cy="3208" r="5.5902" stroke-width="0.5" fill="none" stroke="black" />
<circle cx="4452.5" cy="3308" r="5.5902" stroke-width="0.5" fill="none" stroke="black" />
</svg>`;

// Convert SVG to G-code

svgGcode(svgString, {
  laserIntensity: 22,
  laserOnSpeed: 400,
  laserOffSpeed: 259,
}).then((gcode)=> console.log(gcode));