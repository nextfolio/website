d3.select("nav").selectAll("a").each(function() {
    let link = d3.select(this)
    link.style("background", "#005ce6")

    link.on("mouseenter", function() {
        link.transition().duration(300)
            .style("background", "#0047b3")
    }).on("mouseout", function() {
        link.transition().duration(300)
            .style("background", "#005ce6")
    })
})