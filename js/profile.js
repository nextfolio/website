// generate portfolio pi chart 
let data = [{"symbol": "AAPL", "percent": 50}, {"symbol": "MSFT", "percent": 20}, {"symbol": "CELG", "percent": 30}];
var colors = d3.scaleOrdinal(d3.schemeSet1)
const svg = d3.select("svg");

let alteredData = d3.pie().sort(null).value(d => d.percent)(data)

let segments = d3.arc()
                .innerRadius(0)
                .outerRadius(170)
                .padRadius(50)

let sections = svg.append("g").attr("transform", "translate(200, 170)").selectAll("path").data(alteredData)

sections.enter().append("path").attr("d", segments).attr("fill", d => colors(d.data.percent))

let legend = svg.append("g").attr("class", "legend")

data.forEach(function(d, i) {
    legend.append("text").attr("transform", `translate(410, ${150 + 30*i})`).text(`${d.symbol} - ${d.percent}%`).attr("fill", colors(d.percent))
})
// end of pi chart generator