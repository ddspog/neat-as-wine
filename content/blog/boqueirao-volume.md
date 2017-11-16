---
title: "O volume de Boqueirão"
date: 2017-11-14T00:56:51-02:00
draft: false
---
<!-- markdownlint-disable MD033 -->
# O Açude Epitácio Pessoa

Em torno de Campina Grande (PB - Brazil), minha cidade natal, há diversas cidades recebendo água de um mesmo ponto: o açude Epitácio Pessoa, localizado no município de Boqueirão, por isso o açude também é conhecido como simplesmente Boqueirão. Consistindo na principal fonte d'água na região, diversos estudos e pesquisas são feitos por lá.

Nos últimos anos, a Paraíba esteve em um período longo de estiagem, que também esteve presente em outras regiões do Brasil. A falta de chuva ao redor do açude Epitácio Pessoa levou a uma redução no nível d'água a níveis alarmantes. Vários opções foram analisadas para conter o problema da água. A principal solução proposta foi a transposição do rio São Francisco, cujas obras permitiram abastecer o açude de Boqueirão em 2017. Mas no período em que a transposição ainda estava para alcançar a região, um racionamento foi proposto em diversas cidades do entorno.

Neste post, iremos discutir dados sobre o volume do açude nas últimas duas décadas. Pretendemos entender como o volume tem crescido ou diminuído em alguns pontos, e o que podemos refletir acompanhando esses dados.

## Volume baixo

O gráfico abaixo mostra o volume percentual do açude ao longo das duas últimas décadas. A barra de baixo permite selecionar o período no ano.

<div id="grafico-percentual" class="no-vega-bar"></div>

Podemos notar os períodos em que o açude transbordou, superando 100% de sua capacidade entre 2009 e 2012. Menos dados nos períodos de cheia, mais dados quando o açude reduzia de volume.

![](https://github.com/ddspog/neat-as-wine/raw/master/static/images/boqueirao-volume/boqueirao-full-and-empty.png)

No início dos anos 2000, e 2004, o açude Epitácio Pessoa atingiu seus mais baixos níveis de volume. Mas em Junho de 2016 esse recorde foi batido pela pior estiagem do açude.

Para conter essa estiagem, que na época já se sabia que ia ser longa, iniciou-se racionamento de água nas cidades no entorno de Boqueirão. O racionamento entrou em vigor dia 6 de dezembro de 2014 tendo seu fim recentemente. E muito há de se saber sobre seu papel na economia da água de Boqueirão. Uma pergunta que podemos fazer inicialmente é:

- **O racionamento freou a redução no nível da água de Boqueirão?**

## Vazão e racionamento

Peguei os dados e realizei uma simples transformação: calculei para cada ponto, a partir do ponto anterior a velocidade média de volume perdido por semana, ou a vazão semanal. Esta transformação está disposta no gráfico seguinte:

<div id="grafico-vazao" class="no-vega-bar"></div>

Ao analisar o todo, não dá para concluir muita coisa, pois há baixos que ofuscam a vazão nos demais pontos. Por isso, nesse gráfico, pode-se dar um zoom e arrastar os dados para o período ou escala desejada.

De início, podemos constatar que o padrão do açude é perder água. Ele tem uma vazão constante ao longo de sua vida, e em determinados pontos (as chuvas), o açude velozmente adquire água. Quando constatou-se que a estiagem seria prolongada em 2013, vazão da água continuava normal, reagindo a algumas chuvas em Novembro, havendo uma época de chuvas em Fevereiro a Julho de 2014, mas com a vazão ainda normal.

Se analisarmos em Dezembro de 2014 até Agosto de 2015, vemos que a vazão diminui levemente, mas volta a aumentar até Dezembro. Foi no final de Janeiro de 2016 que a vazão pareceu dar uma diminuída, mantendo um nível baixo até diminuir de vez em Abril de 2017, quando as águas da transposição chegaram.

Não podemos concluir nada. Segundo os dados o racionamento não fez mudança significativa na vazão da água. Em várias cidades, quem tivesse caixa d'água, praticamente não reduzia de consumo, apenas garantia uma cota semanal de água utilizada. Assim, fica difícil saber sobre a eficiência do racionamento em si.

## Coleta regular?

Os dados estudados aqui, foram obtidos por uma API do INSA (Instituto Nacional do Semiárido). E só observando o primeiro gráfico, podemos nos intrigar em relação a coleta de dados. O gráfico seguinte mostra a frequência mensal da coleta:

<div id="grafico-coleta" class="no-vega-bar"></div>

Até 1998, podemos perceber que a frequência das coletas era bem baixa. A partir de 1999, possivelmente motivado pelo governo, estiagem da época, as coletas de dados começaram a serem feitas diariamente. Entretanto, isso não se manteve todos os anos.

De Fevereiro a Abril de 2004, um período que o açude começava a encher-se de água, decorrente as chuvas da época, houve quase nenhuma coleta. No mês de Fevereiro não houve nenhuma. Nos anos seguintes aparecem outros períodos de baixas coletas, sempre em pontos que o açude transbordava.

A partir da estiagem longa, os dados voltaram a ser coletados em frequência diária. Mas por algum motivo, essa frequência foi diminuindo em 2014 a 2016, só aumentando com a perspectiva da transposição do Rio São Francisco chegando na Paraíba no início deste ano.

Há vários questionamentos interessantes a serem feitos. O transbordar do açude dificultava a coleta? Houve motivos políticos para a redução de coletas duranta a estiagem? Entre outros questionamentos.

## Por fim...

Espero que tenham achado interessante a análise proposta aqui. Os dados foram tirados da api do INSA, a partir do link <https://api.insa.gov.br/reservatorios/12172/monitoramento>. Espero que tenham ficados motivados a analisar os dados também. Até a próxima!

<script src="https://cdnjs.cloudflare.com/ajax/libs/vega/3.0.7/vega.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-lite/2.0.1/vega-lite.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-embed/3.0.0-rc7/vega-embed.js"></script>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

<script>
    $.getJSON("https://api.insa.gov.br/reservatorios/12172/monitoramento", dados => {
        const Semana = 7.0 * 86400000.0;

        const VolumeTotalAcude = 100.0 / 411.71;

        EN = ptDate => ptDate.replace(/(\d{2}\/)(\d{2}\/)(\d{4})/, '$2$1$3');

        dados.volumes.forEach((it, i, arr) => {
            arr[i].DataInformacao = EN(it.DataInformacao);
            arr[i].DataValor = new Date(arr[i].DataInformacao);
            arr[i].VolumePercentualCorrigido = it.Volume * VolumeTotalAcude;
            arr[i].Volume = parseFloat(it.Volume);
            if (i != 0) {
                arr[i].TempoDesdeUltimaColeta = arr[i].DataValor - arr[i - 1].DataValor;
                arr[i].TempoDesdeUltimaColetaEmSemanas = arr[i].TempoDesdeUltimaColeta / Semana;

                arr[i].ColetaPorSemana = 1.0 / arr[i].TempoDesdeUltimaColetaEmSemanas;
                arr[i].VazaoPorSemanas = (arr[i - 1].Volume - arr[i].Volume) / arr[i].TempoDesdeUltimaColetaEmSemanas;
            } else {
                arr[i].TempoDesdeUltimaColeta = Infinity;
                arr[i].TempoDesdeUltimaColetaEmSemanas = Infinity;

                arr[i].ColetaPorSemana = 1.0;
                arr[i].VazaoPorSemanas = 0.0;
            }
        })

        const GraficoPercentual = {
            "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
            "data": {
                "values": dados.volumes
            },
            "vconcat": [{
                "title": {
                    "text": "Volume do Açude Boqueirão 1999-2017"
                },
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
        const GraficoVazao = {
            "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
            "data": {
                "values": dados.volumes
            },
            "title": {
                "text": "Vazão d'água semanal do Açude Boqueirão 1999-2017"
            },
            "height": 295,
            "mark": "line",
            "selection": {
                "grid": {
                    "type": "interval",
                    "bind": "scales"
                }
            },
            "encoding": {
                "x": {
                    "field": "DataInformacao",
                    "type": "temporal",
                    "axis": {
                        "title": ""
                    }
                },
                "y": {
                    "field": "VazaoPorSemanas",
                    "type": "quantitative",
                    "axis": {
                        "title": "Vazão Semanal do Açude"
                    }
                }
            }
        };

        const GraficoColeta = {
            "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
            "data": {
                "values": dados.volumes
            },
            "title": {
                "text": "Nº de Coletas Mensais no Açude Boqueirão 1999-2017"
            },
            "height": 295,
            "mark": "point",
            "encoding": {
                "x": {
                    "timeUnit": "year",
                    "field": "DataInformacao",
                    "type": "temporal",
                    "axis": {
                        "title": ""
                    }
                },
                "y": {
                    "timeUnit": "month",
                    "field": "DataInformacao",
                    "type": "temporal",
                    "axis": {
                        "title": ""
                    }
                },
                "size": {
                    "aggregate": "count", 
                    "field": "Volume", 
                    "type": "quantitative",
                    "legend": {
                        "title": "Número de coletas"
                    }
                }
            }
        };

        vegaEmbed('#grafico-percentual', GraficoPercentual, {
            "width": $('#grafico-percentual').width() * 0.8
        }).catch(console.warn);
        vegaEmbed('#grafico-vazao', GraficoVazao, {
            "width": $('#grafico-vazao').width() * 0.8
        }).catch(console.warn);
        vegaEmbed('#grafico-coleta', GraficoColeta, {
            "width": $('#grafico-coleta').width() * 0.8
        }).catch(console.warn);
    })
</script>

<!-- markdownlint-enable MD033 -->