$(document).ready(function(){
  $.ajax({
        type: "GET",
        url: "data.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=0; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                    tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    console.log(lines);
    
     $('#container').highcharts({
        data: {
            rows: lines,
            lineDelimiter: '\n',
            seriesMapping: [{
                x: 0, // X values are pulled from column 0 by default
                y: 1, // Y values are pulled from column 1 by default
                //label: 2 // Labels are pulled from column 2 and picked up in the dataLabels.format below
            }]
        },
        chart: {
            type: 'column'
        },
        title: {
            text: 'World Population (Billions)'
        },
        xAxis: {
            title: {
                text: headers[0]
            },
            labels: {
                format: '{value}'
            }
            //minTickInterval: 24 * 36e5
        },
        yAxis: {
            title: {
                text: headers[1]
            },
            labels: {
                format: '{value} billion'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.label}'
                },
                tooltip: {
                    valueSuffix: ' billion'
                }
            }
        }
    });
}