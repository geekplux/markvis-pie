function addStyle (css) {
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  head.appendChild(style);
}

function pie ({
  data,
  d3,
  d3node,
  selector: _selector = '#chart',
  container: _container = `
    <div id="container">
      <h2>Pie Chart</h2>
      <div id="chart"></div>
    </div>
  `,
  style: _style = '',
  width: _width = 400,
  radius: _radius = _width / 2 * 0.9,
  export: _export = false,
} = {}) {
  const _svgStyles = `
    .arc text {font: 10px sans-serif; text-anchor: middle;}
    .arc path {stroke: #fff;}
  ` + _style;

  let _d3;
  let d3n;
  let svg;
  let _div;

  if (d3node) {
    d3n = new d3node({
      selector: _selector,
      styles: _svgStyles,
      container: _container
    });
    _d3 = d3n.d3;
    svg = d3n.createSVG();
  } else {
    _div = document.createElement('div');
    _div.innerHTML = _container;
    _d3 = d3;
    svg = _d3.select(_div).select('#chart').append('svg');
    addStyle(_style);
  }

  const color = _d3.scaleOrdinal(_d3.schemeCategory20b);
  const arc = _d3.arc()
        .outerRadius(_radius - 10)
        .innerRadius(0);

  const labelArc = _d3.arc()
        .outerRadius(_radius - 40)
        .innerRadius(_radius - 40);

  const pie = _d3.pie()
        .sort(null)
        .value((d) => d.value);

  const margin = _width / 2 * 0.1 + _radius;
  const g = svg.attr('width', _width)
    .attr('height', _width)
    .append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

  const gArc = g
        .selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');

  gArc.append('path')
    .attr('d', arc)
    .style('fill', (d) => color(d.data.key));

  gArc.append('text')
    .attr('transform', (d) => `translate(${labelArc.centroid(d)})`)
    .attr('dy', '.35em')
    .text((d) => d.data.key);

  let result;
  if (d3node) {
    if (_export) result = d3n;
    else result = d3n.chartHTML();
  } else result = _div.querySelector('#container').innerHTML;

  return result;
}

module.exports = pie;
