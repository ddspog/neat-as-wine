---
title: "Treinando D3 com Boqueirão"
date: 2017-11-29T11:47:46-02:00
draft: false
---
<!-- markdownlint-disable MD033 -->

# Treinando D3 com Boqueirão

Estou testando o gráfico primeiro, para depois escrever o post.

<div class="mychart" id="test-chart"></div>

<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="static/scripts/ddspog-d3-kit.js"></script>

<style>
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

    var viewbox = new Box("0 0 450 415");
    var margin = new Box("10 20 45 45");
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

        var x = d3.scaleLinear()
            .domain([84, 106])
            .rangeRound([0, 360])

        var y = d3.scaleLinear()
            .domain([30, 16])
            .rangeRound([0, 360])

        function isRainyMonth(month) {
            return 2 < month && month < 8;
        }

        function monthColor(month) {
            return isRainyMonth(month) ? 'blue' : 'black';
        }

        graph.selectAll('g')
            .data(dados)
            .enter()
            .append('circle')
            .attr('class', 'median')
            .attr('fill', d => monthColor(d.mes))
            .attr('stroke', d => monthColor(d.mes))
            .attr('cx', d => x(d.noventa_percentil))
            .attr('cy', d => y(d.dez_percentil))
            .attr('r', 3.5);

        graph.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + vis.height + ")")
            .call(d3.axisBottom(x));

        graph.append('g')
            .attr("class", "y axis")
            .attr('transform', 'translate(0,0)')
            .call(d3.axisLeft(y))

        graph.append("text")
            .attr("transform", "translate(-36," + ((vis.height / 2) + 5) + ") rotate(-90)")
            .text("10-percentil");

        graph.append("text")
            .attr("transform", "translate(" + ((vis.width / 2) - margin.left) + ", " + (vis.height + 36) + ")")
            .text("90-percentil");
    }

    d3.json('https://raw.githubusercontent.com/nazareno/intro-d3/master/dados/boqueirao-por-mes.json', boqueiraoBoxplotMesChuva);
</script>