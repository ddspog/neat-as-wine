---
title: "O volume de Boqueirão"
date: 2017-11-14T00:56:51-02:00
draft: false
---
# O Açude Epitácio Pessoa

Em torno de Campina Grande (PB - Brazil), minha cidade de origem, há diversas cidades recebendo água de um mesmo ponto: o açude Epitácio Pessoa. Por isso, o açude de Boqueirão, como é conhecido, é bem importante na região.

Nos últimos anos, a Paraíba esteve em um período longo de estiagem, particularmente maior ao redor do açude Epitácio Pessoa que teve seu nível reduzido a níveis alarmantes. Vários estudos foram feitos em busca de uma solução para o problema da água. Um deles foi a transposição do rio São Francisco, cujas obras permitiram abastecer o açude de Boqueirão em 2017.

Neste post, iremos discutir dados sobre o volume do açude nas últimas duas décadas.

## Volume baixo

O gráfico abaixo mostra o volume percentual do açude ao longo das duas últimas décadas.

<!-- markdownlint-disable MD033 -->
<div id="vis" width=900></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vega/3.0.7/vega.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-lite/2.0.1/vega-lite.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-embed/3.0.0-rc7/vega-embed.js"></script>
<script>
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
</script>
<!-- markdownlint-enable MD033 -->