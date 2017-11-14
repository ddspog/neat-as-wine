const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
        "data": {
            "url": "https://api.insa.gov.br/reservatorios/12172/monitoramento",
            "format": {
                "type": "json",
                "property": "volumes",
                "parse": {
                    "DataInformacao": "utc:'%d/%m/%Y'"
                }
            }
        },
        "transform": [{
            "calculate": "100*datum.Volume/datum.VolumePercentual",
            "as": "TamanhoAcude"
        }, {
            "calculate": "datum.Volume/411.71*100.0",
            "as": "VolumePercentualCorrigido"
        }],
        "vconcat": [{
            "title": {
                "text": "Volume do Açude Boqueirão 1999-2017"
            },
            "width": 700,
            "height": 295,
            "mark": "point",
            "encoding": {
                "x": {
                    "field": "DataInformacao",
                    "type": "temporal",
                    "scale": {
                        "domain": {
                            "selection": "brush"
                        }
                    },
                    "axis": {
                        "title": ""
                    }
                },
                "y": {
                    "field": "VolumePercentualCorrigido",
                    "type": "quantitative",
                    "axis": {
                        "title": "Volume de Boqueirão (%)"
                    }
                }
            }
        }, {
            "width": 700,
            "height": 60,
            "mark": "area",
            "selection": {
                "brush": {
                    "type": "interval",
                    "encodings": [
                        "x"
                    ],
                    "on": "[mousedown, window:mouseup] > window:mousemove!",
                    "translate": "[mousedown, window:mouseup] > window:mousemove!",
                    "zoom": "wheel!",
                    "mark": {
                        "fill": "#333",
                        "fillOpacity": 0.125,
                        "stroke": "white"
                    },
                    "resolve": "global"
                }
            },
            "encoding": {
                "x": {
                    "field": "DataInformacao",
                    "type": "temporal",
                    "axis": {
                        "title": "Selecione o Período",
                        "format": "%Y"
                    }
                },
                "y": {
                    "field": "VolumePercentualCorrigido",
                    "type": "quantitative",
                    "axis": {
                        "title": "",
                        "tickCount": 3,
                        "grid": false
                    }
                }
            }
        }]
    };
    vegaEmbed('#vis', spec).catch(console.warn);