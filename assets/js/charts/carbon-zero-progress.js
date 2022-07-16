am5.ready(function () {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv3");


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Micro.new(root)
    ]);


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.verticalLayout
    }));


    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var legend = chart.children.push(
        am5.Legend.new(root, {
            centerX: am5.p50,
            x: am5.p50
        })
    );

    var data = [{
        category: "200",
        value: 100,
        columnSettings: {
            fill: am5.color('#F6F6F7')
        }
    }, {
        category: "190",
        value: 100,
        columnSettings: {
            fill: am5.color('#F6F6F7')
        }
    }, {
        category: "180",
        value: 100,
        columnSettings: {
            fill: am5.color('#F6F6F7')
        }
    }, {
        category: "170",
        value: 100,
        columnSettings: {
            fill: am5.color('#F6F6F7')
        }
    }, {
        category: "160",
        value: 100,
        columnSettings: {
            fill: am5.color('#F6F6F7')
        }
    }, {
        category: "150",
        value: 100,
        columnSettings: {
            fill: am5.color('#F6F6F7')
        }
    }, {
        category: "140",
        value: 100,
        columnSettings: {
            fill: am5.color('#F6F6F7')
        }
    }, {
        category: "130",
        value: 100,
        columnSettings: {
            fill: am5.color(0xc6251a)
        }
    }, {
        category: "120",
        value: 100,
        columnSettings: {
            fill: am5.color(0xc6251a)
        }
    }, {
        category: "110",
        value: 100,
        columnSettings: {
            fill: am5.color(0xc6251a)
        }
    }, {
        category: "100",
        value: 100,
        currentBullet: true,
        columnSettings: {
            fill: am5.color(0xfcc034)
        }
    }, {
        category: "90",
        value: 100,
        columnSettings: {
            fill: am5.color(0xfcc034)
        }
    }, {
        category: "80",
        value: 100,
        columnSettings: {
            fill: am5.color(0xfcc034)
        }
    }, {
        category: "70",
        value: 100,
        columnSettings: {
            fill: am5.color(0xfcc034)
        }
    }, {
        category: "60",
        value: 100,
        columnSettings: {
            fill: am5.color(0xfcc034)
        }
    }, {
        category: "50",
        value: 100,
        columnSettings: {
            fill: am5.color(0x6bc352)
        }
    }, {
        category: "40",
        value: 100,
        columnSettings: {
            fill: am5.color(0x6bc352)
        }
    }, {
        category: "30",
        value: 100,
        columnSettings: {
            fill: am5.color(0x6bc352)
        }
    }, {
        category: "20",
        value: 100,
        columnSettings: {
            fill: am5.color(0x6bc352)
        }
    }, {
        category: "10",
        value: 100,
        columnSettings: {
            fill: am5.color(0x6bc352)
        }
    }, {
        category: "0",
        value: 100,
        targetBullet: true,
        columnSettings: {
            fill: am5.color(0xffffff)
        }
    }];


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererX.new(root, {

        }),
        tooltip: am5.Tooltip.new(root, {})
    }));

    var xRenderer = xAxis.get("renderer");

    xRenderer.grid.template.set("forceHidden", true);
    xRenderer.labels.template.set("forceHidden", true);

    xAxis.data.setAll(data);

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        min: 0,
        max: 400,
        strictMinMax: true,
        renderer: am5xy.AxisRendererY.new(root, {})
    }));

    var yRenderer = yAxis.get("renderer");

    yRenderer.grid.template.set("forceHidden", true);
    yRenderer.labels.template.set("forceHidden", true);


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category",
        maskBullets: false
    }));

    series.columns.template.setAll({
        //tooltipText: "{categoryX}: {valueY}",
        width: am5.p100,
        tooltipY: 0,
        strokeOpacity: 1,
        strokeWidth: 2,
        stroke: am5.color(0xffffff),
        templateField: "columnSettings"
    });

    series.data.setAll(data);

    // Add labels
    function addAxisLabel(category, text) {
        var rangeDataItem = xAxis.makeDataItem({
            category: category
        });

        var range = xAxis.createAxisRange(rangeDataItem);

        range.get("label").setAll({
            //fill: am5.color(0xffffff),
            text: text,
            forceHidden: false
        });

        range.get("grid").setAll({
            //stroke: color,
            strokeOpacity: 1,
            location: 1
        });
    }

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(500);
    chart.appear(1000, 100);
});