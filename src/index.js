/**
 * @fileOverview Generate pie chart for markvis
 * @name index.js<src>
 * @author GeekPlux
 * @license MIT
 */
const { addStyle } = require('./utils')

/**
 * Pie chart generator
 * @param {array} data
 * @param {object} d3 d3 will get in browser environment
 * @param {function} D3Node D3Node will get in node environment
 * @param {string} selector DOM selector in container
 * @param {string} container DOM contained the visualization result
 * @param {string} style Pie chart style
 * @param {number} width
 * @param {number} radius
 * @param {boolean} export Whether to export to a PNG image
 * @returns {}
 */
function pie ({
  data,
  d3,
  d3node: D3Node,
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
  export: _export = false
} = {}) {
  const _svgStyles = `
    .arc text { font: 10px sans-serif; text-anchor: middle; }
    .arc path { stroke: #fff; }
  ` + _style

  let _d3 // Instance of d3
  let d3n // Instance of D3Node
  let svg // SVG element held the pie chart
  let _div // Temporary DOM element used to operate

  const isNodeEnv = () => D3Node // To check node environment

  if (isNodeEnv()) {
    d3n = new D3Node({
      // Node environment
      selector: _selector,
      styles: _svgStyles,
      container: _container
    })
    _d3 = d3n.d3
    svg = d3n.createSVG()
  } else {
    // Browser environment
    _div = document.createElement('div')
    _div.innerHTML = _container
    _d3 = d3
    svg = _d3.select(_div).select('#chart').append('svg')
    addStyle(_svgStyles) // Add style for pie chart in browser
  }

  const color = _d3.scaleOrdinal(_d3.schemeCategory20b)
  const arc = _d3.arc()
        .outerRadius(_radius - 10)
        .innerRadius(0)

  const labelArc = _d3.arc()
        .outerRadius(_radius - 40)
        .innerRadius(_radius - 40)

  const pie = _d3.pie()
        .sort(null)
        .value(d => d.value)

  const margin = _width / 2
  const g = svg.attr('width', _width)
    .attr('height', _width)
    .append('g')
    .attr('transform', `translate(${margin}, ${margin})`)

  const gArc = g
        .selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc')

  gArc.append('path')
    .attr('d', arc)
    .style('fill', d => color(d.data.key))

  gArc.append('text')
    .attr('transform', d => `translate(${labelArc.centroid(d)})`)
    .attr('dy', '.35em')
    .text(d => d.data.key)

  let result
  if (isNodeEnv()) {
    if (_export) result = d3n
    else result = d3n.chartHTML()
  } else result = _div.querySelector('#container').innerHTML

  return result
}

module.exports = pie
