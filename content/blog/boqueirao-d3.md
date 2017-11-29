---
title: "Boqueirão D3"
date: 2017-11-29T11:47:46-02:00
draft: false
---
<!-- markdownlint-disable MD033 -->

# O Açude Epitácio Pessoa

adsadasdasd

<div class="mychart" id="test-chart"></div>

<script src="https://d3js.org/d3.v4.min.js"></script>

<style>
      .mychart rect {
          fill: steelblue;
      }

      .mychart rect:hover {
          fill: goldenrod;
      }

      .mychart text {
          font: 12px sans-serif;
          text-anchor: left;
      }
</style>

<script type="text/javascript">
    "use strict"

    class Box {
        constructor(measurements) {
            if (typeof (measurements) === 'string') {
                this._values = measurements.split(" ");
                this._string = measurements;
            } else if (Array.isArray(measurements)) {
                this._values = measurements;
                this._string = measurements.join(" ");
            }
        }

        toString() {
            return this._string;
        }

        get minX() {
            return this._values[0];
        }

        set minX(val) {
            this._values[0] = val;
        }

        get top() {
            return this._values[0];
        }

        set top(val) {
            this._values[0] = val;
        }

        get minY() {
            return this._values[1];
        }

        set minY(val) {
            this._values[1] = val;
        }

        get right() {
            return this._values[1];
        }

        set right(val) {
            this._values[1] = val;
        }

        get width() {
            return this._values[2];
        }

        set width(val) {
            this._values[2] = val;
        }

        get bottom() {
            return this._values[2];
        }

        set bottom(val) {
            this._values[2] = val;
        }

        get height() {
            return this._values[3];
        }

        set height(val) {
            this._values[3] = val;
        }

        get left() {
            return this._values[3];
        }

        set left(val) {
            this._values[3] = val;
        }
    }

    /**
     * Creates a range of numbers in an array, starting at a specified number and
     * ending before a different specified number.
     * @param {number} start  Indicates what number should be used as the first
     *     number in the returned array.  If this is the only number argument
     *     supplied, this will be used as the edge and 0 will be used as the start.
     * @param {number=} edge  Indicates the first number that should not appear in
     *     the range of numbers.  If this number preceeds the start in the range
     *     (taking into account the step), an empty array will be returned.  If not
     *     specified and not inferred this defaults to 0.
     * @param {number=} step  Indicates the difference between one number and the
     *     subsequent number placed in the returned array.  If not specified this
     *     defaults to 1.
     * @return {!Array.<number>}  Array of numbers in the specified range.
     */
    function range(start, edge, step) {
        // If only one number was passed in make it the edge and 0 the start.
        if (arguments.length == 1) {
            edge = start;
            start = 0;
        }

        // Validate the edge and step numbers.
        edge = edge || 0;
        step = step || 1;

        // Create the array of numbers, stopping befor the edge.
        for (var ret = [];
            (edge - start) * step > 0; start += step) {
            ret.push(start);
        }
        return ret;
    }

    var viewbox = new Box("0 0 800 500");
    var margin = new Box("10 20 30 45");
    var vis = new Box([
        0, 0,
        viewbox.width - margin.left - margin.right,
        viewbox.height - margin.top - margin.bottom
    ]);

    function boqueiraoBoxplotMesChuva(dados) {
        var graph = d3.select('#test-chart')
            .append('svg')
            .attr('viewBox', viewbox.toString())
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        var x = d3.scaleBand()
            .domain(range(1, 12))
            .range([0, 800])
            .padding(0.35);

        var y = d3.scaleLinear()
            .domain([1, 0])
            .rangeRound([0, 360])

        graph.selectAll('g')
            .data(dados)
            .enter()
            .append('rect')
            .attr('x', d => x(d.mes))
            .attr('width', x.bandwidth())
            .attr('y', d => y(d.mediana))
            .attr('height', (d) => vis.height - y(d.mediana));

        graph.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + vis.height + ")")
            .call(d3.axisBottom(x));

        graph.append('g')
            .attr("class", "y axis")
            .attr('transform', 'translate(0,0)')
            .call(d3.axisLeft(y))

        graph.append("text")
            .attr("transform", "translate(-36," + (vis.height + margin.top) / 2 + ") rotate(-90)")
            .text("Frequencia");
    }

    d3.json('https://raw.githubusercontent.com/nazareno/intro-d3/master/dados/boqueirao-por-mes.json', boqueiraoBoxplotMesChuva);
</script>