// https://observablehq.com/@nikita-sharov/feather-icon-inspector@694
import define1 from "./e93997d5089d7165@2285.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Feather Icon Inspector

Bad icons get tarred and feathered.`
)});
  main.variable(observer("viewof iconSelect")).define("viewof iconSelect", ["select","feather"], function(select,feather){return(
select({
  title: "Suspect",
  options: Object.keys(feather.icons),
  value: "feather"
})
)});
  main.variable(observer("iconSelect")).define("iconSelect", ["Generators", "viewof iconSelect"], (G, _) => G.input(_));
  main.variable(observer("viewof cellLength")).define("viewof cellLength", ["slider"], function(slider){return(
slider({
  title: "Provisional detention cell length",
  min: 10,
  max: 30, // use width variable
  value: 15,
  step: 5
})
)});
  main.variable(observer("cellLength")).define("cellLength", ["Generators", "viewof cellLength"], (G, _) => G.input(_));
  main.variable(observer()).define(["cellLength","grid","icon","html"], function(cellLength,grid,icon,html)
{
  const cellCount = 24; // per line
  const sideLength = cellLength * cellCount;
    
  // svgs can be nested
  const composition = `
<svg class="inspector" width="${sideLength + 1}" height="${sideLength + 1}">
  <g class="grid">
    ${grid(sideLength, cellLength)}
  </g>
  <g class="icon">
    ${icon(sideLength)}
  </g>
</svg>`;

  return html`
<figure>
  ${composition}
  <figcaption>Each icon is designed on a 24x24 grid.</figcaption>
</figure>`;
}
);
  main.variable(observer("viewof strokeWidth")).define("viewof strokeWidth", ["slider"], function(slider){return(
slider({
  title: "stroke-width",
  min: 0.5,
  max: 3,
  step: 0.5,
  value: 2,
  format: v => `${v.toFixed(1)} (no unit of length set)`,
  description: "Represents a distance in the coordinate system defined by the icon's viewBox."
})
)});
  main.variable(observer("strokeWidth")).define("strokeWidth", ["Generators", "viewof strokeWidth"], (G, _) => G.input(_));
  main.variable(observer("viewof strokeOpacity")).define("viewof strokeOpacity", ["slider"], function(slider){return(
slider({
  title: "stroke-opacity",
  min: 0.1,
  max: 1,
  step: 0.1,
  value: 0.3,
  format: ".0%",
  description: "Reveals the shapes the icon is made of."
})
)});
  main.variable(observer("strokeOpacity")).define("strokeOpacity", ["Generators", "viewof strokeOpacity"], (G, _) => G.input(_));
  main.variable(observer("viewof strokeLinecap")).define("viewof strokeLinecap", ["radio","md"], function(radio,md){return(
radio({
  title: "stroke-linecap",
  options: ["butt", "round", "square"],
  value: "round",
  description: md`Defines the shape at the end of [open subpaths](https://svgwg.org/svg2-draft/paths.html#TermClosedSubpath) (when they are stroked).`
})
)});
  main.variable(observer("strokeLinecap")).define("strokeLinecap", ["Generators", "viewof strokeLinecap"], (G, _) => G.input(_));
  main.variable(observer("viewof strokeLinejoin")).define("viewof strokeLinejoin", ["radio"], function(radio){return(
radio({
  title: "stroke-linejoin",
  options: ["arcs", "bevel", "miter", "miter-clip", "round"],
  value: "round",
  description: "Defines the shape at the corners of paths."
})
)});
  main.variable(observer("strokeLinejoin")).define("strokeLinejoin", ["Generators", "viewof strokeLinejoin"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`---

## Appendix`
)});
  main.variable(observer("feather")).define("feather", ["require"], function(require){return(
require("feather-icons")
)});
  const child1 = runtime.module(define1);
  main.import("select", child1);
  main.import("slider", child1);
  main.import("radio", child1);
  main.variable(observer("icon")).define("icon", ["strokeWidth","strokeOpacity","strokeLinecap","strokeLinejoin","feather","iconSelect"], function(strokeWidth,strokeOpacity,strokeLinecap,strokeLinejoin,feather,iconSelect){return(
(sideLength) => {
  const options = { 
    "width": sideLength, 
    "height": sideLength,
    "stroke": "black",
    "stroke-width": strokeWidth, 
    "stroke-opacity": strokeOpacity,
    "stroke-linecap": strokeLinecap,
    "stroke-linejoin": strokeLinejoin
  };    
  
  return feather.icons[iconSelect].toSvg(options);
}
)});
  main.variable(observer("grid")).define("grid", function(){return(
(sideLength, cellLength) => {
  const magicOffset = 0.5; // see: https://stackoverflow.com/a/61013292

  const className = (tick) => {
    if ((tick === magicOffset) || (tick === (sideLength + magicOffset))) {
      return "outer-grid-line";
    } else {
      return "inner-grid-line";
    }    
  }
  
  const verticalLine = (x) => 
    `<line class="${className(x)}" x1="${x}" y1="${magicOffset}" x2="${x}" y2="${sideLength + magicOffset}" />`;  
  
  const horizontalLine = (y) => 
    `<line class="${className(y)}" x1="${magicOffset}" y1="${y}" x2="${sideLength + magicOffset}" y2="${y}" />`;
  
  let grid = "";    
  for (let tick = magicOffset; tick <= (sideLength + magicOffset); tick += cellLength) {
    grid += verticalLine(tick);
    grid += horizontalLine(tick);
  }
  
  return grid;
}
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<style>
  .outer-grid-line {
    stroke: #767676;
  }

  .inspector:hover .outer-grid-line {
    stroke: #4f4f4f;
  }

  .inner-grid-line {
    stroke: #e8e8e9;
  }
</style>`
)});
  return main;
}
