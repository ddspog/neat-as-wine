var svg = d3.select('#chart')
    .classed('chart', true)
    .append('svg')
    .attr('width', 700)
    .attr('height', 500);

var margin = {
        top: 20,
        right: 20,
        bottom: 50,
        left: 50
};

var width = +svg.attr("width") - margin.left - margin.right;
var height = +svg.attr("height") - margin.top - margin.bottom;
var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xAxis = g.append("g")
    .attr("id", "xAxis");
var yAxis = g.append("g")
    .attr("id", "yAxis");
var nameUnit = yAxis.append("text");

var dataURL = "https://gist.githubusercontent.com/ddspog/eb2a48f10c1107411acd264112dc5845/raw/67c21c968fc5b2fd8643704fc3e927eeaed04e81/labrua_acude-velho.csv";

var parseTime = d3.timeParse("%H:%M");

var x = d3.scaleTime()
    .rangeRound([0, width]);
var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var info = [
    {
        name: "cars",
        text: "Carros",
        color: "steelblue",
        path: g.append("path").attr("id", "carsLine"),
        legend: svg.append("text").attr("id", "carsLegend"),
        active: true
    },
    {
        name: "bikes",
        text: "Motos",
        color: "#A07A19",
        path: g.append("path").attr("id", "bikesLine"),
        legend: svg.append("text").attr("id", "bikesLegend"),
        active: false
    },
    {
        name: "buses",
        text: "Ônibus",
        color: "#AC30C0",
        path: g.append("path").attr("id", "busesLine"),
        legend: svg.append("text").attr("id", "busesLegend"),
        active: false
    },
    {
        name: "trucks",
        text: "Caminhões",
        color: "#EB9A72",
        path: g.append("path").attr("id", "trucksLine"),
        legend: svg.append("text").attr("id", "trucksLegend"),
        active: false
    },
    {
        name: "cyclists",
        text: "Ciclistas",
        color: "#BA86F5",
        path: g.append("path").attr("id", "cyclistsLine"),
        legend: svg.append("text").attr("id", "cyclistsLegend"),
        active: true
    },
    {
        name: "pedestrians",
        text: "Pedestres",
        color: "#EA22A8",
        path: g.append("path").attr("id", "pedestriansLine"),
        legend: svg.append("text").attr("id", "pedestriansLegend"),
        active: true
    },
];

var render = function (options) {
    d3.csv(dataURL, function (el) {
        return {
            time: parseTime(el.horario_inicial),
            place: el.local,
            values: [+el.carros, +el.motos, +el.onibus, +el.caminhoes, +el.total_ciclistas, +el.total_pedestres],
        };
    }, function (error, dataAll) {
        if (error) throw error;

        d3.selectAll(".placeActive").classed("placeActive", false);
        d3.select("#" + options.place).classed("placeActive", true);

        var data = dataAll.filter(function (d) {
            return d.place == options.place;
        });

        var yMin = d3.min(data, function (d) { return d3.min(d.values);});
        var yMax = d3.max(data, function(d) { return d3.max(d.values);});

        x.domain(d3.extent(data, function (d) {
            return d.time;
        }));
        y.domain([yMin, yMax]);

        xAxis.attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .select(".domain")
            .remove();

        yAxis.call(d3.axisLeft(y));
        
        nameUnit.classed("name-unit", true)
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Unidades");

        var legendSpace = width/info.length;

        for(var i = 0; i < info.length; i++) {
            info[i].path.datum(data)
                .attr("fill", "none")
                .attr("stroke", info[i].color)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 1.5)
                .classed("pathActive", info[i].active)
                .attr("d", d3.line()
                    .x(function (d) {
                        return x(d.time);
                    })
                    .y(function (d) {
                        return y(d.values[i]);
                    })
                    .curve(d3.curveBasis));

            // Add the legend
            info[i].legend.attr("x", (legendSpace / 2) + i * legendSpace) // spacing
                .attr("y", height + (margin.bottom / 2) + 40)
                .attr("class", "legend") // style the legend
                .style("fill", info[i].color)
                .style("font-size", function() {
                    if(info[i].active) {
                        return "25px";
                    } else {
                        return "16px"
                    }
                })
                .on("click", (function(index) {
                    return function () {
                        // Determine if current line is visable
                        var active = info[index].active ? false : true,
                            newOpacity = active ? 1 : 0;
                        d3.selectAll('#' + info[index].name + 'Line')
                            .transition().duration(100)
                            .style("opacity", newOpacity);
                        d3.select(this)
                            .style("font-size", function () {
                                if (active) {
                                    return "25px";
                                }
                            });
                        // Update whether or not the elements are active
                        info[index].active = active;
                    };
                })(i))
                .on("mouseover", (function(index) {
                    return function () {
                        if (info[index].active != true) {
                            d3.selectAll('#' + info[index].name + 'Line')
                                .transition()
                                .duration(50)
                                .style("opacity", 1);
                            d3.select(this)
                                .transition()
                                .duration(50)
                                .style("font-size", function () {
                                    if (info[index].active != true) {
                                        return "25px";
                                    }
                                });
                        }
                        //Get this bar's x/y values, then augment for the tooltip
                        var xPosition = legendSpace / 2 + index * legendSpace; // spacing
                        var yPosition = height + (margin.bottom / 2) + 5;
                        //Update the tooltip position and value
                        var tooltip = d3.select("#tooltip")
                            .style("left", (180 + xPosition) + "px")
                            .style("bottom", yPosition - 30 + "px");
                        
                        getValue = function(d) {return d.values[index];};

                        var meanTip = d3.mean(data, getValue);
                        var minTip = d3.min(data, getValue);
                        var maxTip = d3.max(data, getValue);

                        tooltip.select("#meanTip")
                            .text(meanTip.toFixed(3));
                        tooltip.select("#minTip")
                            .text(minTip);
                        tooltip.select("#maxTip")
                            .text(maxTip);

                        //Show the tooltip
                        d3.select("#tooltip").classed("hidden", false);
                    };
                })(i))
                .on("mouseout", (function(index) {
                    return function () {
                        if (info[index].active != true) {
                            d3.selectAll('#' + info[index].name + 'Line')
                                .transition()
                                .duration(1000)
                                .style("opacity", 0);
                            d3.select(this)
                                .transition()
                                .duration(1000)
                                .style("font-size", function () {
                                    return "16px";
                                });
                        }
                        //Hide the tooltip
                        d3.select("#tooltip").classed("hidden", true);
                    };
                })(i))
                .text(info[i].text);
        }
    });
};

render({
    place: 'jackson'
});

d3.select("#burrinhos").on("click", function () {
    render({
        place: 'burrinhos'
    });
});

d3.select("#jackson").on("click", function () {
    render({
        place: 'jackson'
    });
});

d3.select("#bobs").on("click", function () {
    render({
        place: 'bobs'
    });
});

d3.select("nav.placeOp").classed("nav-fixed", false);