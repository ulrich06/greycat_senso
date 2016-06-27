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
    return toDataSet(answer);
}

function getInflexionsStats(sensor) {
    var call = new XMLHttpRequest();
    call.open("GET", "http://localhost:11000/sensors/" + sensor + "/compression/inflexion/stats", false);
    call.send(null);
    var answer = JSON.parse(call.responseText);
    return toDataSet(answer);
}
function submitAnalytics() {
    var name = document.getElementById("sensorsList").value;
    printAnalytics(combineAnalytics(name), "statsdiv");
}

function combineAnalytics(sensor) {
    var stat = getStatsValues(sensor);
    var activity = getActivityValues(sensor);
    var inflexions = getInflexionsStats(sensor);
    var result = [];
    for (var i = 0; i < Math.min(stat.length, activity.length) - 1; i++) {
        result.push({time: i, value1: stat[i].value, value2: activity[i].value, value3: inflexions[i].value})
    }
    return result
}

function printAnalytics(dataset, target) {
    AmCharts.makeChart(target, {
        "type": "serial",
        "theme": "light",
        "legend": {
            "useGraphSettings": true
        },
        "dataProvider": dataset,
        "synchronizeGrid": true,
        "valueAxes": [{
            "id": "value1",
            "axisColor": "#FF6600",
            "axisThickness": 2,
            "axisAlpha": 1,
            "position": "left"
        }, {
            "id": "value2",
            "axisColor": "#FCD202",
            "axisThickness": 2,
            "axisAlpha": 1,
            "position": "left",
            "offset": 50
        }, {
            "id": "value3",
            "axisColor": "#B0DE09",
            "axisThickness": 2,
            "gridAlpha": 0,
            "offset": 50,
            "axisAlpha": 1,
            "position": "right"
        }],
        "graphs": [{
            "valueAxis": "value1",
            "lineColor": "#FF6600",
            "fillAlphas": 0.8,
            "lineAlpha": 0.2,
            "title": "# collected data",
            "valueField": "value1",
            "type": "column",
            "minimum": 0

        }, {
            "valueAxis": "value2",
            "lineColor": "#FCD202",
            "fillAlphas": 0.8,
            "lineAlpha": 0.2,
            "title": "# activity triggered",
            "valueField": "value2",
            "type": "column",
            "minimum": 0
        }, {
            "valueAxis": "value3",
            "lineColor": "#B0DE09",
            "fillAlphas": 0.8,
            "lineAlpha": 0.2,
            "title": "# inflexions",
            "valueField": "value3",
            "type": "column",
            "minimum": 0
        }],
        "chartScrollbar": {},
        "chartCursor": {
            "cursorPosition": "mouse"
        },
        "categoryField": "time",
        "categoryAxis": {
            "parseDates": false,
            "axisColor": "#DADADA",
            "minorGridEnabled": true
        },
        "export": {
            "enabled": true,
            "position": "bottom-right"
        }
    });
}