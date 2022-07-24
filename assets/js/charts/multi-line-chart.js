async function createChartImer(divID ,branch, from, to) {
  let request = { ChiNhanh: branch, TuNgay: from, DenNgay: to }
  fetch(endpoint + 'chiso/capcuu', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(request)
  })
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Error: ' + response.status);
          return;
        }
        response.json().then(ApiData => {
          createMultiLineChart(divID, ApiData);
        })
      }
    )
    .catch(err => {
      console.log('Error: ', err)
    });
}

function createMultiLineChart(divID, data) {
  am5.array.each(am5.registry.rootElements, function (root) {
    if (root.dom.id == divID) {
      root.dispose();
    }
  });

  am5.ready(function () {

    var root = am5.Root.new(divID);

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
        pinchZoomX: true
      })
    );

    chart.get("colors").set("colors", [
      am5.color("#F25961"),
      am5.color("#FF9E27"),
      am5.color(0x5aaa95),
      am5.color(0x86a873),
      am5.color(0xbb9f06)
    ]);

    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);

    var xRenderer = am5xy.AxisRendererX.new(root, {});
    xRenderer.grid.template.set("location", 0.5);
    xRenderer.labels.template.setAll({
      location: 0.5,
      multiLocation: 0.5
    });

    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      })
    );

    xAxis.data.setAll(data);

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxPrecision: 0,
        renderer: am5xy.AxisRendererY.new(root, {
          inversed: false
        })
      })
    );

    function createSeries(name, field) {
      var series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: field,
          categoryXField: "year",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "[bold]{name}[/]\n{categoryX}: {valueY}"
          })
        })
      );

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: series.get("fill")
          })
        });
      });

      series.set("setStateOnChildren", true);
      series.states.create("hover", {});

      series.mainContainer.set("setStateOnChildren", true);
      series.mainContainer.states.create("hover", {});

      series.strokes.template.states.create("hover", {
        strokeWidth: 4
      });

      series.data.setAll(data);
      series.appear(500);
    }

    createSeries("Cấp cứu", "tongCapCuu");
    createSeries("Nhập viện", "tongCapCuuNhapVien");
    createSeries("Chuyển viện", "tongCapCuuChuyenVien");
    createSeries("Ra viện", "tongCapCuuRaVien");
    createSeries("Tử vong", "tongCapCuuTuVong");

    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal",
      marginBottom: 20
    }));

    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      })
    );

    legend.itemContainers.template.states.create("hover", {});

    legend.itemContainers.template.events.on("pointerover", function (e) {
      e.target.dataItem.dataContext.hover();
    });
    legend.itemContainers.template.events.on("pointerout", function (e) {
      e.target.dataItem.dataContext.unhover();
    });

    legend.data.setAll(chart.series.values);
    chart.appear(500, 100);

  });
}