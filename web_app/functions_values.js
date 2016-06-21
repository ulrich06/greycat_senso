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

/**
 * Created by cyrilcecchinel on 17/06/2016.
 */

function getSensors() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://localhost:11000/settings/sensors", false);
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText)
}

function submitFormValues() {
    var name = document.getElementById("sensorsList").value;
    var tbegin = new Date(document.getElementById("begin").value).getTime() / 1000;
    var tend = new Date(document.getElementById("end").value).getTime() / 1000;

    printData(getValues(name, tbegin, tend), "chartdiv1");
}

function submitFormInflexions() {
    var name = document.getElementById("sensorsList").value;
    var tbegin = new Date(document.getElementById("begin").value).getTime() / 1000;
    var tend = new Date(document.getElementById("end").value).getTime() / 1000;

    printData(getInflexionsValues(name, tbegin, tend), "chartdiv2");
}

function submitFormAll() {
    submitFormValues();
    submitFormInflexions();
}

function getValues(name, tbegin, tend) {
    var xmlHttp = new XMLHttpRequest("GET");
    xmlHttp.open("GET", "http://localhost:11000/sensors/" + name + "/data/" + tbegin + "/" + tend, false);
    xmlHttp.send(null);
    var answer = JSON.parse(xmlHttp.responseText).reverse();
    for (var i = 0; i < answer.length; i++) {
        answer[i].t = new Date(answer[i].t * 1000);
    }
    console.log(answer);
    return answer;
}

function getInflexionsValues(name, tbegin, tend) {
    var xmlHttp = new XMLHttpRequest("GET");
    xmlHttp.open("GET", "http://localhost:11000/sensors/" + name + "/compression/inflexion/" + tbegin + "/" + tend, false);
    xmlHttp.send(null);
    var answer = JSON.parse(xmlHttp.responseText).reverse();
    var result = [];
    for (var i = 0; i < answer.length; i++) {

        var singleValue = new XMLHttpRequest("GET");
        singleValue.open("GET", "http://localhost:11000/sensors/" + name + "/compression/inflexion/data/" + answer[i], false);
        singleValue.send(null);

        var valueAnswer = JSON.parse(singleValue.responseText);
        console.log(answer[i]);
        if (valueAnswer.v < 10000) {
            if (valueAnswer.v > -100) {
                var resObject = {'n': valueAnswer.n, 'v': valueAnswer.v, 't': new Date(answer[i] * 1000)};
                result.push(resObject);
            }
        }
    }
    console.log(result);
    return result;
}

function printData(data, target) {
    var chart = AmCharts.makeChart(target, {
        "type": "serial",
        "theme": "light",
        "marginTop": 0,
        "marginRight": 80,
        "dataDateFormat": "YYYY-MM-DD HH:MM:SS",
        "valueAxes": [{
            "id": "v1",
            "title": "Values",
            "position": "left"
        }],
        "graphs": [{
            "id": "g1",
            "valueAxis": "v1",
            "valueField": "v",
            "balloonText": "<span style='font-size:18px;'>[[v]]</span>"
        }],
        "chartScrollbar": {
            "graph": "g1",
            "gridAlpha": 0,
            "color": "#888888",
            "scrollbarHeight": 55,
            "backgroundAlpha": 0,
            "selectedBackgroundAlpha": 0.1,
            "selectedBackgroundColor": "#888888",
            "graphFillAlpha": 0,
            "autoGridCount": true,
            "selectedGraphFillAlpha": 0,
            "graphLineAlpha": 0.2,
            "graphLineColor": "#c2c2c2",
            "selectedGraphLineColor": "#888888",
            "selectedGraphLineAlpha": 1
        },
        "chartCursor": {
            "cursorAlpha": 0,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "valueLineAlpha": 0.5,
            "fullWidth": true
        },
        "valueScrollbar": {
            "oppositeAxis": false,
            "offset": 50,
            "scrollbarHeight": 10
        },
        "categoryField": "t",
        "categoryAxis": {
            "parseDates": false,
            "dashLength": 1,
            "minorGridEnabled": true,
            "labelRotation": 20

        },
        "export": {
            "enabled": true
        },
        "dataProvider": data
    });

    chart.addListener("rendered", zoomChart);
    if (chart.zoomChart) {
        chart.zoomChart();
    }

    function zoomChart() {
        chart.zoomToIndexes(Math.round(chart.dataProvider.length * 0.4), Math.round(chart.dataProvider.length * 0.55));
    }
}