---
title: "Fluxo de Pessoas no Açude Velho"
date: 2018-03-21T19:16:01-03:00
draft: false
---
<!-- markdownlint-disable MD033 -->
<style>
    @import url("https://fonts.googleapis.com/css?family=Oswald:500");
    div.placeOp {
        position: relative !important;
        width: 100%;
        top: 50px;
        text-align: center;
    }

    div.placeOp button,
    div.placeOp p {
        font-family: 'Oswald', sans-serif;
        font-style: regular;
        text-decoration: none;
        color: #16151b;
        margin: 0 15px;
        font-size: 16px;
        letter-spacing: 1px;
        position: relative;
        display: inline-block;
        border: none;
        padding: 0;
        background: none;
    }

    div.placeOp button:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        background: #16151b;
        top: 47%;
        animation: out 0.2s cubic-bezier(1, 0, 0.58, 0.97) 1 both;
    }

    div.placeOp button:hover:before,
    div.placeOp button.placeActive:before {
        animation: in 0.2s cubic-bezier(1, 0, 0.58, 0.97) 1 both;
    }

    #tooltip {
        position: absolute;
        width: 200px;
        height: auto;
        padding: 10px;
        background-color: white;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        -webkit-box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
        -moz-box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
        pointer-events: none;
    }

    #tooltip.hidden {
        display: none;
    }

    #tooltip p {
        margin: 0;
        font-family: sans-serif;
        font-size: 16px;
        line-height: 20px;
    }

    .legend {
        font-size: 16px;
        font-weight: bold;
        text-anchor: middle;
    }

    @keyframes in {
        0% {
            width: 0;
            left: 0;
            right: auto;
        }
        100% {
            left: 0;
            right: auto;
            width: 100%;
        }
    }

    @keyframes out {
        0% {
            width: 100%;
            left: auto;
            right: 0;
        }
        100% {
            width: 0;
            left: auto;
            right: 0;
        }
    }

    @keyframes show {
        0% {
            opacity: 0;
            transform: translateY(-10px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    div.placeOp button:nth-child(1) {
        animation: show 0.2s 1.1s ease 1 both;
    }

    div.placeOp button:nth-child(2) {
        animation: show 0.2s 1.2s ease 1 both;
    }

    div.placeOp button:nth-child(3) {
        animation: show 0.2s 1.3s ease 1 both;
    }

    .name-unit {
        font-style: regular;
    }

    #xAxis, #yAxis {
        font-size: 8pt !important;
    }
</style>

# Inicialmente...

Neste post, irei tratar sobre um conjunto de dados sobre o Açude Velho em Campina Grande. Trata-se de uma análise de pedestres e automóveis que passam sobre determinados pontos no Açude. Os dados foram coletados pelo [LabRua](https://labrua.github.io/site-labrua/), aonde os integrantes do grupo contaram carros, motos, pedestres, ciclistas, entre outros passantes.

Os dados foram coletados em 3 pontos diferentes: no monumento feito em comemoração aos 150 anos de Campina Grande, mais conhecido como o "Monumento dos Burrinhos"; o famoso monumento de Jackson do Pandeiro ao lado de Luiz Gonzaga; e por fim uma franquia da rede Bob's.

# Olhando os Dados

Coloquei este gráfico abaixo para explorarmos os dados coletados. O gráfico permite ver o número de passantes em cada local, o padrão está no monumento de Jackson do pandeiro, mas você pode selecionar outro local na parte de cima do gráfico.

Na parte de baixo pode-se selecionar ou dar uma espiada no número de passantes em cada horário por tipo. Os tipos de passantes são: carros, motos, ônibus, caminhões, ciclistas e pedestres. Ao passar o mouse por cima de um dos nomes, a linha dos dados é destacada e informações de média, mínimo e máximo são mostradas.

<div id="chart">
<div class="placeOp">
    <p>Escolha o local dos dados:</p>
    <button id="burrinhos">Burrinhos</button>
    <button id="jackson" class="placeActive">Jackson</button>
    <button id="bobs">Bob's</button>
</div>
<div id="tooltip" class="hidden">
    <p><strong>Detalhes:</strong></p>
    <p>- Média: <span id="meanTip"></span></p>
    <p>- Mínimo: <span id="minTip"></span></p>
    <p>- Máximo: <span id="maxTip"></span></p>
</div>
</div>

## Analisando os locais

A área dos Burrinhos é um conjunto de cruzamentos bastante importantes na cidade. Eles formam um percurso comum para quem vêm ou volta do centro da cidade. Não é o melhor canto para estacionar, e seguir uma caminhada no Açude a partir dali.

As outras duas áreas, são locais próximos a bastante vagas de estacionamento (para pedestres e clientes dos estabelecimentos da região), cujas rua são de mão única.

Assim podemos notar a razão de que o número de carros perto do monumento dos Burrinhos, atinge certos picos durante às 6 da manhã, meio-dia e 6 da tarde. Nos outros locais, o número de automóveis não muda muito ao longo do dia.

Já em relação aos pedestres perto do Bob's ou do monumento de Jackson do Pandeiro, notamos de cara os principais horários para caminhada dos pedestres: de 6 da manhã e de 6 da tarde. Algo que é justificável pela pouca incidência de luz do sol na região, tornando a caminhada mais agradável.

Em relação aos ciclistas, eles seguem o mesmo padrão dos pedestres. Mas nos Burrinhos têm picos em horários ainda mais escuros. Isto se dêve possivelmente ao costume de alguns grupos de ciclismo só correrem por estes horários na cidade. Estes grupos andam pelas ruas de Campina, e não nas ciclovias do Açude Velho, por isso este pico só é aparente nos Burrinhos.

<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="scripts/acude-fluxo.js"></script>