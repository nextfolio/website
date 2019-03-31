// generate portfolio pi chart 
let data = [{"symbol": "AAPL", "percent": 50}, {"symbol": "MSFT", "percent": 20}, {"symbol": "CELG", "percent": 30}];
var colors = d3.scaleOrdinal(d3.schemeSet1)
const pie = d3.select("#pie svg");

let alteredData = d3.pie().sort(null).value(d => d.percent)(data)

let segments = d3.arc()
                .innerRadius(0)
                .outerRadius(170)
                .padRadius(50)

let sections = pie.append("g").attr("transform", "translate(200, 170)").selectAll("path").data(alteredData)

sections.enter().append("path").attr("d", segments).attr("fill", d => colors(d.data.percent))

let legend = pie.append("g").attr("class", "legend")

data.forEach(function(d, i) {
    legend.append("text").attr("transform", `translate(410, ${150 + 30*i})`).text(`${d.symbol} - ${d.percent}%`).attr("fill", colors(d.percent))
})
// end of pi chart generator


// make line chart for profit over time

let chartData = [{"percent": 30, "time": 100}, {"percent": 15, "time": 120}, {"percent": 37, "time": 150}]
const lineChart = d3.select("#line-chart svg")
const lineWidth = lineChart.attr("width")
const lineHeight = lineChart.attr("height")
const margin = {top: 10, right: 10, bottom: 10, left: 10}
const lineChartWidth = lineWidth - margin.left - margin.right
const lineChartHeight = lineHeight - margin.top - margin.bottom

const xScale = d3.scaleLinear().range([0, lineChartWidth]).domain(d3.extent(chartData, d => d.time))
const yScale = d3.scaleLinear().range([lineChartHeight, 0]).domain(d3.extent(chartData, d => d.percent))

const xAxis = d3.axisBottom(xScale)
const yAxis = d3.axisLeft(yScale)

lineChart.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(${margin.left + 30}, ${lineChartHeight - (margin.top)})`)
    .call(xAxis)

lineChart.append("g")
    .attr("class", "y axis")
    .attr("transform", `translate(${margin.left + 30}, ${margin.top - 20})`)
    .call(yAxis)

let line = d3.line()
            .x(d => xScale(d.time))
            .y(d => yScale(d.percent))

lineChart.append("g")
    .attr("transform", `translate(${margin.top + 30}, ${margin.left - 20})`)
    .append("path").attr("class", "line")
    .datum(chartData)
    .attr("d", line)

lineChart.select(".line").datum(chartData).transition().duration(300).attr("d", line);