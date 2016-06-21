/*
 * ************************************************************************
 *                  Université de Nice Sophia-Antipolis (UNS) - 
 *                  Centre National de la Recherche Scientifique (CNRS)
 *                  Copyright © 2016 UNS, CNRS
 *  
 *   This library is free software; you can redistribute it and/or
 *   modify it under the terms of the GNU Lesser General Public
 *   License as published by the Free Software Foundation; either
 *   version 3 of the License, or (at your option) any later version.
 *
 *   This library is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *   Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public
 *   License along with this library; if not, write to the Free Software
 *   Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 *
 *
 *
 *     Author: Cyril Cecchinel – Laboratoire I3S – cecchine@i3s.unice.fr 
 * ***********************************************************************
 */

function toDataSet(arrayTotal) {
    var result = [];
    for (var i = 0; i < arrayTotal.length - 1; i++) {
        result.push({time: i, value: arrayTotal[i]})
    }
    return result;
}

function getStatsValues(sensor) {
    var call = new XMLHttpRequest();
    call.open("GET", "http://localhost:11000/sensors/" + sensor + "/stats", false);
    call.send(null);
    var answer = JSON.parse(call.responseText);
    return toDataSet(answer[0]._total);
}

function getActivityValues(sensor) {
    var call = new XMLHttpRequest();
    call.open("GET", "http://localhost:11000/sensors/" + sensor + "/activity", false);
    call.send(null);
    var answer = JSON.parse(call.responseText);
    return toDataSet(answer[0]._total);
}

function submitFormStats() {
    var name = document.getElementById("sensorsList").value;

    printStatsData(getStatsValues(name), "chartdiv3");
}


function submitFormActivity() {
    var name = document.getElementById("sensorsList").value;

    printStatsData(getActivityValues(name), "chartdiv4");
}

function printStatsData(datasset, target) {
    var chart = AmCharts.makeChart(target, {
        "type": "serial",
        "theme": "light",
        "dataProvider": datasset,
        "valueAxes": [{
            "gridColor": "#FFFFFF",
            "gridAlpha": 0.2,
            "dashLength": 0
        }],
        "gridAboveGraphs": true,
        "startDuration": 1,
        "graphs": [{
            "balloonText": "[[time]]: <b>[[value]]</b>",
            "fillAlphas": 0.8,
            "lineAlpha": 0.2,
            "type": "column",
            "valueField": "value"
        }],
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "time",
        "categoryAxis": {
            "gridPosition": "start",
            "gridAlpha": 0,
            "tickPosition": "start",
            "tickLength": 20
        },
        "export": {
            "enabled": true
        }

    });

    chart.addListener("rendered", zoomChart);
    if (chart.zoomChart) {
        chart.zoomChart();
    }

    function zoomChart() {
        chart.zoomToIndexes(Math.round(chart.dataProvider.length * 0.4), Math.round(chart.dataProvider.length * 0.55));
    }

    charts.push(chart);
}