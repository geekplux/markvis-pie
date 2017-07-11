import d3node from 'd3-node'
import pie from '../src/index'

const data = [
  { key: 1, value: 1 },
  { key: 2, value: 2 },
  { key: 3, value: 3 },
  { key: 4, value: 4 },
  { key: 5, value: 5 }
]
const result = `<divid=\"chart\"><svgxmlns=\"http://www.w3.org/2000/svg\"width=\"400\"height=\"400\"><defs><styletype=\"text/css\"><![CDATA[.arctext{font:10pxsans-serif;text-anchor:middle;}.arcpath{stroke:#fff;}]]></style></defs><gtransform=\"translate(200,200)\"><gclass=\"arc\"><pathd=\"M1.0409497792752502e-14,-170A170,170,0,0,1,69.14522932288604,-155.30272779924215L0,0Z\"style=\"fill:#393b79;\"></path><texttransform=\"translate(29.107636714486322,-136.94066410273277)\"dy=\".35em\">1</text></g><gclass=\"arc\"><pathd=\"M69.14522932288604,-155.30272779924215A170,170,0,0,1,161.6796077701761,-52.53288904374106L0,0Z\"style=\"fill:#5254a3;\"></path><texttransform=\"translate(104.04027556683519,-93.67828489024015)\"dy=\".35em\">2</text></g><gclass=\"arc\"><pathd=\"M161.6796077701761,-52.53288904374106A170,170,0,0,1,99.92349288972044,137.53288904374108L0,0Z\"style=\"fill:#6b6ecf;\"></path><texttransform=\"translate(133.14791228132148,43.26237921249263)\"dy=\".35em\">3</text></g><gclass=\"arc\"><pathd=\"M99.92349288972044,137.53288904374108A170,170,0,0,1,-147.22431864335454,85.00000000000006L0,0Z\"style=\"fill:#9c9ede;\"></path><texttransform=\"translate(-29.107636714486276,136.9406641027328)\"dy=\".35em\">4</text></g><gclass=\"arc\"><pathd=\"M-147.22431864335454,85.00000000000006A170,170,0,0,1,-3.122849337825751e-14,-170L0,0Z\"style=\"fill:#637939;\"></path><texttransform=\"translate(-121.24355652982146,-69.99999999999991)\"dy=\".35em\">5</text></g></g></svg></div>`

function removeAllSpace (str) {
  return str.replace(/\s+/g, '')
}

test('pie chart generator', () => {
  expect(pie).toBeDefined()
  expect(removeAllSpace(pie({ data, d3node }))).toBe(removeAllSpace(result))
})
