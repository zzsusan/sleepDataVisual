// URL: https://observablehq.com/@d3/stacked-to-grouped-bars
// Title: Stacked-to-Grouped Bars
// Author: D3 (@d3)
// Version: 215
// Runtime version: 1

const m0 = {
  id: "208ac4d6c3f58ab1@215",
  variables: [
    {
      name: "viewof layout",
      inputs: ["html"],
      value: (function(html)
{
  const form = html`<form>
  <label style="margin-right:0.5em;"><input type=radio name=radio value="stacked" checked> Stacked</label>
  <label style="margin-right:0.5em;"><input type=radio name=radio value="grouped"> Grouped</label>
</form>`;
  form.oninput = () => form.value = form.radio.value;
  form.onchange = () => { // Safari…
    form.value = form.radio.value;
    form.dispatchEvent(new CustomEvent("input"));
  };
  form.value = form.radio.value;
  setTimeout(() => {
    form.value = form.radio.value = "grouped";
    form.dispatchEvent(new CustomEvent("input"));
  }, 3000);
  return form;
}
)
    },
    {
      name: "layout",
      inputs: ["Generators","viewof layout"],
      value: (G, _) => G.input(_)
    },
    {
      name: "chart",
      inputs: ["d3","DOM","width","height","y01z","z","x","margin","xAxis","y","yMax","n","y1Max"],
      value: (function(d3,DOM,width,height,y01z,z,x,margin,xAxis,y,yMax,n,y1Max)
{
  const svg = d3.select(DOM.svg(width, height));

  const rect = svg.selectAll("g")
    .data(y01z)
    .enter().append("g")
      .attr("fill", (d, i) => z(i))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", height - margin.bottom)
      .attr("width", x.bandwidth())
      .attr("height", 0);

  svg.append("g")
      .call(xAxis);

  function transitionGrouped() {
    y.domain([0, yMax]);

    rect.transition()
        .duration(500)
        .delay((d, i) => i * 20)
        .attr("x", (d, i) => x(i) + x.bandwidth() / n * d[2])
        .attr("width", x.bandwidth() / n)
      .transition()
        .attr("y", d => y(d[1] - d[0]))
        .attr("height", d => y(0) - y(d[1] - d[0]));
  }

  function transitionStacked() {
    y.domain([0, y1Max]);

    rect.transition()
        .duration(500)
        .delay((d, i) => i * 20)
        .attr("y", d => y(d[1]))
        .attr("height", d => y(d[0]) - y(d[1]))
      .transition()
        .attr("x", (d, i) => x(i))
        .attr("width", x.bandwidth());
  }

  function update(layout) {
    if (layout === "stacked") transitionStacked();
    else transitionGrouped();
  }

  return Object.assign(svg.node(), {update});
}
)
    },
    {
      inputs: ["chart","layout"],
      value: (function(chart,layout){return(
chart.update(layout)
)})
    },
    {
      name: "xz",
      inputs: ["d3","m"],
      value: (function(d3,m){return(
d3.range(m)
)})
    },
    {
      name: "yz",
      inputs: ["d3","n","bumps","m"],
      value: (function(d3,n,bumps,m){return(
[[465, 453, 505, 629, 492, 489, 450, 499, 493, 457, 513, 468, 490, 479, 467, 410, 549, 512, 560, 491, 470, 462, 381, 437, 435, 454, 492, 474, 596, 476, 488, 456, 480, 509, 451, 483, 464, 430, 450, 501, 507, 416, 459, 508, 468, 393, 482, 470, 466, 437, 484, 511, 448, 454, 456, 456, 499, 340, 520, 482, 441, 467, 451, 452, 455, 444], [125, 162, 118, 124, 128, 133, 188, 111, 126, 229, 232, 172, 130, 141, 153, 188, 158, 208, 60, 131, 151, 148, 285, 164, 185, 166, 115, 146, 146, 148, 134, 159, 131, 146, 173, 137, 142, 190, 170, 246, 203, 209, 144, 113, 153, 247, 198, 158, 148, 168, 146, 180, 172, 173, 154, 133, 134, 338, 247, 141, 184, 168, 175, 183, 256, 166], [464, 453, 504, 628, 491, 489, 450, 499, 493, 457, 513, 468, 489, 479, 467, 410, 549, 512, 560, 490, 470, 461, 381, 437, 434, 454, 492, 473, 596, 475, 487, 456, 479, 509, 451, 483, 464, 429, 449, 500, 506, 416, 458, 508, 468, 393, 482, 469, 465, 436, 484, 510, 447, 454, 455, 455, 499, 339, 520, 481, 441, 466, 450, 452, 454, 443], [590, 615, 623, 753, 620, 622, 638, 610, 619, 686, 745, 640, 620, 620, 620, 598, 707, 720, 620, 622, 621, 610, 666, 601, 620, 620, 607, 620, 742, 624, 622, 615, 611, 655, 624, 620, 606, 620, 620, 747, 710, 625, 603, 621, 621, 640, 680, 628, 614, 605, 630, 691, 620, 627, 610, 589, 633, 678, 767, 623, 625, 635, 626, 635, 711, 610]]
)})
    },
    {
      name: "y01z",
      inputs: ["d3","n","yz"],
      value: (function(d3,n,yz){return(
[[[0, 87, 0], [0, 110, 0], [0, 139, 0], [0, 136, 0], [0, 140, 0], [0, 187, 0], [0, 200, 0], [0, 224, 0], [0, 130, 0], [0, 190, 0], [0, 163, 0], [0, 230, 0], [0, 188, 0], [0, 94, 0], [0, 94, 0], [0, 1493, 0], [0, 146, 0], [0, 240, 0], [0, 194, 0], [0, 154, 0], [0, 120, 0], [0, 141, 0], [0, 128, 0], [0, 259, 0], [0, 124, 0], [0, 127, 0], [0, 182, 0], [0, 181, 0], [0, 171, 0], [0, 153, 0], [0, 206, 0], [0, 152, 0], [0, 116, 0], [0, 127, 0], [0, 162, 0], [0, 172, 0], [0, 123, 0], [0, 152, 0], [0, 286, 0], [0, 126, 0], [0, 208, 0], [0, 180, 0], [0, 154, 0], [0, 131, 0], [0, 161, 0], [0, 152, 0], [0, 136, 0], [0, 228, 0], [0, 190, 0], [0, 152, 0], [0, 212, 0], [0, 109, 0], [0, 99, 0], [0, 168, 0], [0, 133, 0], [0, 173, 0], [0, 138, 0], [0, 84, 0], [0, 122, 0], [0, 193, 0], [0, 159, 0], [0, 272, 0], [0, 200, 0], [0, 143, 0], [0, 177, 0], [0, 156, 0], [0, 145, 0], [0, 187, 0], [0, 140, 0], [0, 227, 0], [0, 165, 0], [0, 114, 0], [0, 183, 0], [0, 169, 0], [0, 145, 0]], [[87, 615, 1], [110, 620, 1], [139, 620, 1], [136, 630, 1], [140, 615, 1], [187, 668, 1], [200, 672, 1], [224, 620, 1], [130, 581, 1], [190, 570, 1], [163, 625, 1], [230, 650, 1], [188, 713, 1], [94, 607, 1], [94, 615, 1], [1493, 610, 1], [146, 580, 1], [240, 630, 1], [194, 694, 1], [154, 570, 1], [120, 575, 1], [141, 631, 1], [128, 619, 1], [259, 675, 1], [124, 640, 1], [127, 608, 1], [182, 631, 1], [181, 588, 1], [171, 571, 1], [153, 591, 1], [206, 571, 1], [152, 572, 1], [116, 616, 1], [127, 635, 1], [162, 761, 1], [172, 632, 1], [123, 626, 1], [152, 630, 1], [286, 625, 1], [126, 601, 1], [208, 683, 1], [180, 600, 1], [154, 590, 1], [131, 580, 1], [161, 622, 1], [152, 632, 1], [136, 630, 1], [228, 647, 1], [190, 635, 1], [152, 595, 1], [212, 692, 1], [109, 602, 1], [99, 590, 1], [168, 605, 1], [133, 615, 1], [173, 665, 1], [138, 617, 1], [84, 615, 1], [122, 615, 1], [193, 615, 1], [159, 615, 1], [272, 739, 1], [200, 691, 1], [143, 600, 1], [177, 605, 1], [156, 590, 1], [145, 596, 1], [187, 660, 1], [140, 716, 1], [227, 716, 1], [165, 614, 1], [114, 602, 1], [183, 611, 1], [169, 671, 1], [145, 455, 1]], [[615, 614, 2], [620, 619, 2], [620, 620, 2], [630, 629, 2], [615, 614, 2], [668, 667, 2], [672, 671, 2], [620, 620, 2], [581, 580, 2], [570, 570, 2], [625, 624, 2], [650, 649, 2], [713, 713, 2], [607, 607, 2], [615, 614, 2], [610, 2049, 2], [580, 580, 2], [630, 630, 2], [694, 693, 2], [570, 569, 2], [575, 575, 2], [631, 630, 2], [619, 619, 2], [675, 675, 2], [640, 640, 2], [608, 607, 2], [631, 630, 2], [588, 587, 2], [571, 570, 2], [591, 591, 2], [571, 571, 2], [572, 571, 2], [616, 616, 2], [635, 634, 2], [761, 760, 2], [632, 631, 2], [626, 625, 2], [630, 630, 2], [625, 624, 2], [601, 600, 2], [683, 682, 2], [600, 599, 2], [590, 589, 2], [580, 580, 2], [622, 622, 2], [632, 632, 2], [630, 630, 2], [647, 646, 2], [635, 635, 2], [595, 595, 2], [692, 692, 2], [602, 601, 2], [590, 590, 2], [605, 604, 2], [615, 615, 2], [665, 665, 2], [617, 617, 2], [615, 614, 2], [615, 615, 2], [615, 615, 2], [615, 614, 2], [739, 739, 2], [691, 690, 2], [600, 600, 2], [605, 605, 2], [590, 590, 2], [596, 595, 2], [660, 659, 2], [716, 715, 2], [716, 716, 2], [614, 613, 2], [602, 601, 2], [611, 610, 2], [671, 670, 2], [455, 455, 2]], [[614, 615, 3], [619, 620, 3], [620, 620, 3], [629, 630, 3], [614, 615, 3], [667, 668, 3], [671, 672, 3], [620, 620, 3], [580, 581, 3], [570, 570, 3], [624, 625, 3], [649, 650, 3], [713, 713, 3], [607, 607, 3], [614, 615, 3], [2049, 610, 3], [580, 580, 3], [630, 630, 3], [693, 694, 3], [569, 570, 3], [575, 575, 3], [630, 631, 3], [619, 619, 3], [675, 675, 3], [640, 640, 3], [607, 608, 3], [630, 631, 3], [587, 588, 3], [570, 571, 3], [591, 591, 3], [571, 571, 3], [571, 572, 3], [616, 616, 3], [634, 635, 3], [760, 761, 3], [631, 632, 3], [625, 626, 3], [630, 630, 3], [624, 625, 3], [600, 601, 3], [682, 683, 3], [599, 600, 3], [589, 590, 3], [580, 580, 3], [622, 622, 3], [632, 632, 3], [630, 630, 3], [646, 647, 3], [635, 635, 3], [595, 595, 3], [692, 692, 3], [601, 602, 3], [590, 590, 3], [604, 605, 3], [615, 615, 3], [665, 665, 3], [617, 617, 3], [614, 615, 3], [615, 615, 3], [615, 615, 3], [614, 615, 3], [739, 739, 3], [690, 691, 3], [600, 600, 3], [605, 605, 3], [590, 590, 3], [595, 596, 3], [659, 660, 3], [715, 716, 3], [716, 716, 3], [613, 614, 3], [601, 602, 3], [610, 611, 3], [670, 671, 3], [455, 455, 3]]])})
    },
    {
      name: "yMax",
      inputs: ["d3","yz"],
      value: (function(d3,yz){return(
d3.max(yz, y => d3.max(y))
)})
    },
    {
      name: "y1Max",
      inputs: ["d3","y01z"],
      value: (function(d3,y01z){return(
d3.max(y01z, y => d3.max(y, d => d[1]))
)})
    },
    {
      name: "x",
      inputs: ["d3","xz","margin","width"],
      value: (function(d3,xz,margin,width){return(
d3.scaleBand()
    .domain(xz)
    .rangeRound([margin.left, width - margin.right])
    .padding(0.08)
)})
    },
    {
      name: "y",
      inputs: ["d3","y1Max","height","margin"],
      value: (function(d3,y1Max,height,margin){return(
d3.scaleLinear()
    .domain([0, y1Max])
    .range([height - margin.bottom, margin.top])
)})
    },
    {
      name: "z",
      inputs: ["d3","n"],
      value: (function(d3,n){return(
d3.scaleSequential(d3.interpolateBlues)
    .domain([-0.5 * n, 1.5 * n])
)})
    },
    {
      name: "xAxis",
      inputs: ["height","margin","d3","x"],
      value: (function(height,margin,d3,x){return(
svg => svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0).tickFormat(() => ""))
)})
    },
    {
      name: "n",
      value: (function(){return(
4
)})
    },
    {
      name: "m",
      value: (function(){return(
66
)})
    },
    {
      name: "height",
      value: (function(){return(
500
)})
    },
    {
      name: "margin",
      value: (function(){return(
{top: 0, right: 0, bottom: 10, left: 0}
)})
    },
    {
      name: "bumps",
      value: (function(){return(
function bumps(m) {
  const values = [];

  // Initialize with uniform random values in [0.1, 0.2).
  for (let i = 0; i < m; ++i) {
    values[i] = 0.1 + 0.1 * Math.random();
  }

  // Add five random bumps.
  for (let j = 0; j < 5; ++j) {
    const x = 1 / (0.1 + Math.random());
    const y = 2 * Math.random() - 0.5;
    const z = 10 / (0.1 + Math.random());
    for (let i = 0; i < m; i++) {
      const w = (i / m - y) * z;
      values[i] += x * Math.exp(-w * w);
    }
  }

  // Ensure all values are positive.
  for (let i = 0; i < m; ++i) {
    values[i] = Math.max(0, values[i]);
  }

  return values;
}
)})
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require("d3@5")
)})
    }
  ]
};

const notebook = {
  id: "208ac4d6c3f58ab1@215",
  modules: [m0]
};

export default notebook;
