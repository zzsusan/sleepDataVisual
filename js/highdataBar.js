// URL: https://observablehq.com/@d3/stacked-to-grouped-bars
// Title: Stacked-to-Grouped Bars
// Author: D3 (@d3)
// Version: 215
// Runtime version: 1

const m0 = {
    id: "208ac4d6c3f58ab1@215",
    variables: [
      {
        inputs: ["md"],
        value: (function(md){return(
  md`# Stacked-to-Grouped Bars
  
  Animations can preserve object constancy, allowing the reader to follow the data across views. See [Heer and Robertson](http://vis.berkeley.edu/papers/animated_transitions/) for more.`
  )})
      },
      {
        name: "viewof layout",
        inputs: ["html"],
        valaue: (function(html)
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
  [[87, 110, 139, 136, 140, 187, 200, 224, 130, 190, 163, 230, 188, 94, 94, 1493, 146, 240, 194, 154, 120, 141, 128, 259, 124, 127, 182, 181, 171, 153, 206, 152, 116, 127, 162, 172, 123, 152, 286, 126, 208, 180, 154, 131, 161, 152, 136, 228, 190, 152, 212, 109, 99, 168, 133, 173, 138, 84, 122, 193, 159, 272, 200, 143, 177, 156, 145, 187, 140, 227, 165, 114, 183, 169, 145],
  [527, 509, 481, 493, 474, 480, 471, 396, 450, 380, 461, 419, 525, 513, 520, 556, 434, 390, 499, 415, 455, 489, 491, 416, 516, 480, 448, 406, 399, 438, 365, 419, 500, 507, 598, 459, 502, 478, 338, 474, 474, 419, 435, 449, 461, 480, 494, 418, 445, 443, 480, 492, 491, 436, 482, 492, 479, 530, 493, 422, 455, 467, 490, 457, 428, 434, 450, 472, 575, 489, 448, 487, 427, 501, 310],
  [615, 620, 620, 630, 615, 668, 672, 620, 581, 570, 625, 650, 713, 607, 615, 610, 580, 630, 694, 570, 575, 631, 619, 675, 640, 608, 631, 588, 571, 591, 571, 572, 616, 635, 761, 632, 626, 630, 625, 601, 683, 600, 590, 580, 622, 632, 630, 647, 635, 595, 692, 602, 590, 605, 615, 665, 617, 615, 615, 615, 615, 739, 691, 600, 605, 590, 596, 660, 716, 716, 614, 602, 611, 671, 455],
  [528, 510, 481, 494, 475, 481, 472, 396, 451, 380, 462, 420, 525, 513, 521, -883, 434, 390, 500, 416, 455, 490, 491, 416, 516, 481, 449, 407, 400, 438, 365, 420, 500, 508, 599, 460, 503, 478, 339, 475, 475, 420, 436, 449, 461, 480, 494, 419, 445, 443, 480, 493, 491, 437, 482, 492, 479, 531, 493, 422, 456, 467, 491, 457, 428, 434, 451, 473, 576, 489, 449, 488, 428, 502, 310]])})
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
  75
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
  
  const notebook2 = {
    id: "208ac4d6c3f58ab1@215",
    modules: [m0]
  };
  
  export default notebook2;
  