function createLineChart(divId, url, branch, idChiSo, from, to) {
    postData(url, {
        ChiNhanh: branch,
        ChiSo: idChiSo,
        TuNgay: from,
        DenNgay: to
    })
        .then(data => {

            am5.array.each(am5.registry.rootElements, function (root) {
                if (root.dom.id == divId) {
                    root.dispose();
                }
            });

            am5.ready(function () {

                // Create root element
                // https://www.amcharts.com/docs/v5/getting-started/#Root_element
                var root = am5.Root.new(divId);

                // Set themes
                // https://www.amcharts.com/docs/v5/concepts/themes/
                root.setThemes([
                    am5themes_Animated.new(root)
                ]);

                // Create chart
                // https://www.amcharts.com/docs/v5/charts/xy-chart/
                var chart = root.container.children.push(am5xy.XYChart.new(root, {
                    focusable: true,
                    panX: true,
                    panY: true,
                    wheelX: "panX",
                    wheelY: "zoomX",
                    pinchZoomX: true
                }));

                // Create axes
                // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
                var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
                    maxDeviation: 0.5,
                    renderer: am5xy.AxisRendererX.new(root, {
                        minGridDistance: 50, pan: "zoom"
                    }),
                    tooltip: am5.Tooltip.new(root, {})
                }));

                var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                    maxDeviation: 1,
                    baseValue: data.mucTieu,
                    renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" })
                }));


                // Add series
                // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
                var series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
                    minBulletDistance: 10,
                    connect: false,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "value",
                    valueXField: "key",
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText: "{valueY}"
                    })
                }));

                series.fills.template.setAll({ fillOpacity: 0.2, visible: true });

                // Add series axis range for a different stroke/fill
                // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/#Series_axis_ranges
                var rangeDataItem = yAxis.makeDataItem({
                    value: 0,
                    endValue: 1000
                });

                var color = chart.get("colors").getIndex(3);

                var range = series.createAxisRange(rangeDataItem);

                range.strokes.template.setAll({
                    stroke: color
                });

                range.fills.template.setAll({
                    fill: color,
                    fillOpacity: 0.2,
                    visible: true
                });


                // Set up data processor to parse string dates
                // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
                series.data.processor = am5.DataProcessor.new(root, {
                    numericFields: ["key"]
                });

                series.data.setAll(data.data);

                series.bullets.push(function () {
                    var circle = am5.Circle.new(root, {
                        radius: 4,
                        fill: series.get("fill"),
                        stroke: root.interfaceColors.get("background"),
                        strokeWidth: 2
                    })

                    circle.adapters.add("fill", function (fill, target) {
                        var dataItem = circle.dataItem;
                        if (dataItem.get("valueY") >= 0) {
                            return color;
                        }
                        return fill
                    })

                    return am5.Bullet.new(root, {
                        sprite: circle
                    })
                });


                // Add cursor
                // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
                var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
                    xAxis: xAxis
                }));
                cursor.lineY.set("visible", false);

                // add scrollbar
                // chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));

                // Make stuff animate on load
                // https://www.amcharts.com/docs/v5/concepts/animations/
                chart.appear(1000, 100);

            });

            $("#" + divId + "-title").text(data.tenChiSo);
        });
}
